<script lang="ts">
  import { page } from "$app/state";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
    import ThemeToggleTwo from "$lib/components/ThemeToggle.svelte";

  const props: {
    hideThemeToggle?: boolean
  } = $props();

  let currentPage: 'reveal_message' | 'hide_message' = $derived.by(() => {
    if (page.url.pathname.includes('reveal_message')) {
      return 'reveal_message'
    } else {
      return 'hide_message'
    }
  })
</script>

<svelte:head>

</svelte:head>

<div class="w-full flex justify-between items-end py-2">
  {#if currentPage === 'reveal_message'}
    <a href="/" class="font-mono underline text-xl text-primary-font-color dark:text-primary-font-color-dark">{'<-'} hide message</a>
    {#if !props.hideThemeToggle}
      <ThemeToggle />
    {/if}
  {:else}
    {#if !props.hideThemeToggle}
      <ThemeToggle />
    {/if}
    <a href="/reveal_message" class="font-mono ml-auto text-xl underline text-primary-font-color dark:text-primary-font-color-dark">reveal hidden message -></a>
  {/if}
</div>
