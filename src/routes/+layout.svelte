<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import SiteHeader from '$lib/components/SiteHeader.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" sizes="64x64" href={favicon} />
	<meta
		name="description"
		content="Двенадцать дней на байках из Дананга (Đà Nẵng) через рыбацкие деревни, перевалы, сосновое нагорье и кофейные земли к Далату (Đà Lạt), Нячангу (Nha Trang) и обратно по побережью."
	/>
</svelte:head>

<SiteHeader />
<main>{@render children()}</main>
