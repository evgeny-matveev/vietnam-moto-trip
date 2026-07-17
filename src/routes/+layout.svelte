<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import SiteHeader from '$lib/components/SiteHeader.svelte';

	const socialPreviewUrl =
		'https://vietnam-moto-trip.vercel.app/images/social/route-preview.jpg';
	const socialPreviewAlt =
		'Три путешественника на байках поднимаются по мокрому горному серпантину среди леса и облаков во Вьетнаме.';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" sizes="64x64" href={favicon} />
	<meta
		name="description"
		content="Двенадцать дней на байках из Дананга (Đà Nẵng) через рыбацкие деревни, перевалы, сосновое нагорье и кофейные земли к Далату (Đà Lạt), Нячангу (Nha Trang) и обратно по побережью."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="ru_RU" />
	<meta property="og:site_name" content="Верхом на байках по югу Вьетнама" />
	<meta property="og:image" content={socialPreviewUrl} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={socialPreviewAlt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={socialPreviewUrl} />
	<meta name="twitter:image:alt" content={socialPreviewAlt} />
</svelte:head>

<SiteHeader />
<main>{@render children()}</main>
