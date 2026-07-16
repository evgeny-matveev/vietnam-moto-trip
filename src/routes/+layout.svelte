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
		content="Двенадцатидневный маршрут на байках из Đà Nẵng (Дананга) через Центральное нагорье и обратно по побережью."
	/>
</svelte:head>

<SiteHeader />
<main>{@render children()}</main>
