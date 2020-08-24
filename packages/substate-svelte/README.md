# substate-svelte

```svelte
<script>
  import { useStoreState } from '@intrnl/substate-svelte';
  import { todosStore } from './store.js';

  let items = useStoreState(todosStore, (store) => store.items);
</script>

{#each $items as item (item.id)}
  <li>{item.text}</li>
{/each}
```
