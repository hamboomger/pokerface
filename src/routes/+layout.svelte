<script lang="ts">
	import '../app.css';
	import NavbarAndFootbar from './NavbarAndFootbar.svelte';

	let { children } = $props();
</script>

<main class="app-background min-h-screen w-full
						 bg-radial from-gray-200 from-80% to-gray-900%
						 dark:bg-primary-dark transition-colors duration-300">
	<div class="mx-auto w-full sm:w-[52rem]">
		<NavbarAndFootbar />
		{@render children()}
		<NavbarAndFootbar hideThemeToggle />
	</div>
</main>

<style>
	.app-background {
    /* background-image: url($lib/components/images/noise-light.png); */
	}
</style>
