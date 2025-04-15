<script lang="ts">
  import type { Snippet } from "svelte";

  const {
    children, onClick, id
  }: {
    children: Snippet,
    onClick: () => void,
    id?: string
  } = $props()
</script>

<button id={id} 
  class="px-4 py-2 self-center text-2xl
        flex items-center transition-all
        bg-thirdly hover:bg-accent hover:scale-105
        hover:cursor-pointer font-mono 
        dark:bg-secondary-dark"
        onclick={onClick}>
  {@render children()}
</button>

