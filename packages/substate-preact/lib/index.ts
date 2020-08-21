import { useState, useEffect } from 'preact/hooks';
import { Store } from '@intrnl/substate';


export function useStoreState<S> (store: Store<S>): S
export function useStoreState<S, T> (
	store: Store<S>,
	selector: ((store: S) => T),
	deps?: ReadonlyArray<any>
): T
export function useStoreState (
	store: Store<any>,
	selector?: ((store: any) => any),
	deps: ReadonlyArray<any> = []
): any {
	let [state, setState] = useState(() => (
		selector ? selector(store.currentState) : store
	));

	useEffect(() => (
		selector ? store.watch(selector, setState) : store.subscribe(setState)
	), deps);

	return state;
}
