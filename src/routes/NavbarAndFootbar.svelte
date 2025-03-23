<script lang="ts">
    import { page } from "$app/state";
    import { onMount } from "svelte";

  let currentPage: 'reveal_message' | 'hide_message' = $derived.by(() => {
    if (page.url.pathname.includes('reveal_message')) {
      return 'reveal_message'
    } else {
      return 'hide_message'
    }
  })
</script>

<div class="w-full flex items-end py-1">
  {#if currentPage === 'reveal_message'}
    <a href="/" class="font-mono underline text-xl dark:text-white">{'<-'} hide message</a>
  {:else}
    <a href="/reveal_message" class="font-mono ml-auto text-xl underline dark:text-white">reveal hidden message -></a>
  {/if}
</div>
