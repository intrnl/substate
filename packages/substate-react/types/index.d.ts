import type { Store } from '@intrnl/substate';

export function useStoreState<S> (store: Store<S>): S
export function useStoreState<S, T> (
	store: Store<S>,
	selector: ((store: S) => T),
	deps?: ReadonlyArray<any>
): T
