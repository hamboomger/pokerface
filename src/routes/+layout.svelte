<script lang="ts">
	import '../app.css';
	import NavbarAndFootbar from './NavbarAndFootbar.svelte';

	let { children } = $props();
</script>

<main class="min-h-screen w-full bg-primary dark:bg-primary-dark transition-colors duration-300">
	<div class="mx-auto w-full sm:w-[52rem]">
		<NavbarAndFootbar />
		{@render children()}
		<NavbarAndFootbar hideThemeToggle />
	</div>
</main>
