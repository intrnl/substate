import { useState, useEffect } from 'preact/hooks';
import { Store } from '@intrnl/substate';


export function useStoreState<S> (store: Store<S>): S
export function useStoreState<S, T> (
	store: Store<S>,
	selector: ((store: S) => T),
	comparator?: ((a: any, b: any) => boolean)
): T
export function useStoreState (
	store: Store<any>,
	selector?: ((store: any) => any),
	comparator?: ((a: any, b: any) => boolean)
): any {
	let [state, setState] = useState(() => (
		selector ? selector(store.currentState) : store.currentState
	));

	useEffect(() => (
		selector
			? store.watch(selector, setState, comparator)
			: store.subscribe(setState)
	), []);

	return state;
}
