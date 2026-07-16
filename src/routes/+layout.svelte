<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import SiteHeader from '$lib/components/SiteHeader.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta
		name="description"
		content="A quiet-road scooter loop from Đà Nẵng to Đà Lạt and back through the Central Highlands."
	/>
</svelte:head>

<SiteHeader />
<main>{@render children()}</main>
