# substate-preact

```jsx
import { h } from 'preact';
import { Store } from '@intrnl/substate';
import { useStoreState } from '@intrnl/substate-preact';


let countStore = new Store({
  initialState: {
    count: 0,
  },
});

function increment () {
  countStore.update((store) => ({ count: store.count++ }));
}

function decrement () {
  countStore.update((store) => ({ count: store.count++ }));
}


function App () {
  // Omitting the second parameter returns the whole store value
  let count = useStoreState(countStore, (store) => store.count);

  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```
