<script lang="ts">
    import { onMount } from "svelte";

  let toggleOn = $state(false);

  onMount(() => {
    toggleOn = document.documentElement.classList.contains('dark');
  })

  function toggleTheme() {
    toggleOn = !toggleOn;
    document.documentElement.classList.toggle('dark', toggleOn);
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/theme-toggles@4.10.1/css/inner-moon.min.css">
</svelte:head>

<button
  class="theme-toggle {toggleOn ? 'theme-toggle--toggled' : ''} h-10 w-10 pt-2
       text-secondary dark:text-primary-font-color-dark drop-shadow-md"
  onclick={toggleTheme}
  type="button"
  title="Toggle theme"
  aria-label="Toggle theme"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width="100%"
    height="100%"
    fill="currentColor"
    class="theme-toggle__inner-moon"
    viewBox="0 0 32 32"
  >
    <path d="M27.5 11.5v-7h-7L16 0l-4.5 4.5h-7v7L0 16l4.5 4.5v7h7L16 32l4.5-4.5h7v-7L32 16l-4.5-4.5zM16 25.4a9.39 9.39 0 1 1 0-18.8 9.39 9.39 0 1 1 0 18.8z" />
    <circle cx="16" cy="16" r="8.1" />
  </svg>
</button>
