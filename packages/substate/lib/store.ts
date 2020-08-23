import { equal } from './comparator';


export class Store<S extends Record<string | number | symbol, any>> {
	public name: string;
	public initialState: S;
	public currentState: S;

	private _subscribers: (() => void)[] = [];

	public constructor (opts: StoreOpts<S>) {
		this.name = opts.name || 'Store';
		this.initialState = opts.initialState;
		this.currentState = opts.initialState;
	}

	/**
	 * Set the current state value
	 * @param value Value to set
	 */
	public set (value: S)  {
		this.currentState = value;
		this._notify();
	}

	/**
	 * Reset current state to initial state
	 */
	public reset () {
		this.set(this.initialState);
	}

	/**
	 * Update the current state value
	 * @param producer Producer function for changing the draft
	 */
	public update (producer: ((draft: S) => Partial<S>)) {
		let prevState = this.currentState;
		let nextState = producer(this.currentState);

		this.set({ ...prevState, ...nextState });
	}

	/**
	 * Watch a selection of the current state value, useful for derived state
	 * values as well.
	 * @param selector Function for selecting a state value
	 * @param callback Function that gets called on change
	 * @param comparator Function that compares previous and next state
	 * @returns Unsubscribe function
	 */
	public watch<T> (
		selector: ((store: S) => T),
		callback: ((value: T) => void),
		comparator: ((a: any, b: any) => boolean) = equal
	) {
		let prevState = selector(this.currentState);

		let subscription = () => {
			let currState = selector(this.currentState);

			if (!comparator(currState, prevState)) {
				try { callback(currState) } catch {}
				prevState = currState;
			}
		};

		this._subscribers.push(subscription);

		return () => {
			let i = this._subscribers.findIndex((subscriber) => subscriber === subscription);
			this._subscribers.splice(i, 1);
		};
	}

	/**
	 * Watch the entire current state value
	 * @param callback Function that gets called on change
	 * @returns Unsubscribe function
	 */
	public subscribe (callback: ((store: S) => void)) {
		return this.watch((store) => store, callback);
	}

	private _notify () {
		for (let subscriber of this._subscribers) {
			try { subscriber() } catch {}
		}
	}
}

export interface StoreOpts<S> {
	name?: string,
	initialState: S,
}
