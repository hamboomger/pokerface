<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="min-h-screen w-full dark:bg-neutral-800">
	{@render children()}
</main>
