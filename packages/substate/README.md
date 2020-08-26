# `substate`

Small and simple global state management

## Installation

- Install it with your package manager of choice
  - npm: `npm i @intrnl/substate`
  - pnpm: `pnpm i @intrnl/substate`
  - yarn: `yarn add @intrnl/substate`

## Usage

```js
import { Store } from '@intrnl/substate';

// Initialize your store
let todosStore = new Store({
  initialState: {
    filter: 'SHOW_FINISHED',
    items: [
      { id: 1, text: 'Write documentation', done: false },
    ],
  },
});

// Subscribe with a specific selector, callback will be called if it changes
todosStore.watch((store) => store.items[0], (item) => {
  console.log(item); // { id: 1, text: 'Say hello!', ... }
});

// Subscribe to the entire store
todosStore.subscribe((store) => {
  console.log(store); // { filter: 'SHOW_ALL', items: [ ... ] }
});

// Update the store, it will do a shallow merge
todosStore.update((store) => ({ filter: 'SHOW_ALL' }));

// Replace the store value
todosStore.set({
  filter: 'SHOW_UNFINISHED',
  items: [
    { id: 1, text: 'Say hello!', done: false },
  ],
});

// Reset the store to initial value
todosStore.reset();
```
