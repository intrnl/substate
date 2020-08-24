import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type { Store } from '@intrnl/substate';


export function useStoreState<S> (store: Store<S>): Readable<S>
export function useStoreState<S, T> (
	store: Store<S>,
	selector: ((store: S) => T),
	comparator?: ((a: any, b: any) => boolean)
): Readable<T>
export function useStoreState (
	store: Store<any>,
	selector?: ((store: any) => any),
	comparator?: ((a: any, b: any) => boolean)
): Readable<any> {
	return readable({} as any, (set) => {
		if (selector) {
			set(selector(store.currentState));
			return store.watch(selector, set, comparator);
		} else {
			set(store);
			return store.subscribe(set);
		}
	});
}
