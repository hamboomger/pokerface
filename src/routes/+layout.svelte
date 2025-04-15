<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import NavbarAndFootbar from './NavbarAndFootbar.svelte';
    import DesktopOnlyScreen from './DesktopOnlyScreen.svelte';

	let addNoise = $state(false);

	onMount(() => {
		if (document.documentElement.classList.contains('dark')) {
			addNoise = false;
		} else {
			addNoise = true;
		}

		window.addEventListener('theme-changed', (event) => {
			if ((event as CustomEvent).detail.mode === 'dark') {
				addNoise = false;
			} else {
				addNoise = true;
			}
		})
	})

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preload" href="/noise-light.png" as="image" />
</svelte:head>

<main class="{addNoise && 'bg-noise'} min-h-screen w-full
						 bg-primary dark:bg-primary-dark
						 transition-colors duration-300">
	<div class="mx-auto w-full hidden sm:block sm:w-[52rem]">
		<NavbarAndFootbar />
		{@render children()}
		<NavbarAndFootbar hideThemeToggle />
	</div>
	<div class="w-full sm:hidden">
		<DesktopOnlyScreen />
	</div>
</main>

<style>
	.bg-noise {
    background-image: url('/noise-light.png');
	}
</style>
