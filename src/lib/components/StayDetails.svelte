<script>
	import { onMount } from 'svelte';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import StayGallery from '$lib/components/StayGallery.svelte';
	import { stayCategoryLabels, stayLinkLabel } from '$lib/data/stays.js';
	import {
		exchangeRateAttributionUrl,
		fallbackRateInfo,
		fallbackRateSourceUrl,
		formatRateDate,
		formatRubRange,
		loadUsdRubRate
	} from '$lib/exchange-rates.js';

	let { stay, onBack } = $props();

	const categoryNumbers = {
		special: 1,
		luxury: 2,
		regular: 3
	};

	let rateInfo = $state(fallbackRateInfo);

	onMount(async () => {
		rateInfo = await loadUsdRubRate();
	});
</script>

<article class="space-y-5" aria-live="polite">
	<Button variant="ghost" size="sm" class="-ml-2" onclick={onBack}>
		<ArrowLeftIcon data-icon="inline-start" aria-hidden="true" />
		К маршруту дня
	</Button>

	<div class="space-y-2">
		<div class="flex flex-wrap items-center gap-2">
			<Badge variant="secondary">
				<span aria-hidden="true">{categoryNumbers[stay.category]}.</span>
				{stayCategoryLabels[stay.category]}
			</Badge>
			{#if stay.experience}<Badge variant="outline">{stay.experience}</Badge>{/if}
			<Badge variant="outline"
				>{stay.pricePerPersonUsd} · {stay.pricePerPersonVnd} · {formatRubRange(stay.pricePerPersonUsd, rateInfo.rate)} за человека / сутки</Badge
			>
		</div>
		<h2 class="text-2xl font-medium tracking-tight">{stay.name}</h2>
		<p class="text-muted-foreground leading-relaxed">{stay.why}</p>
	</div>

	<StayGallery {stay} />

	<Separator />

	<div class="rounded-md border p-3 text-sm leading-relaxed">
		<p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Размещение группы</p>
		<p class="mt-1">{stay.setup}</p>
	</div>

	{#if stay.caution}
		<div class="rounded-md border border-amber-700/25 bg-amber-500/5 p-3 text-sm leading-relaxed">
			<span class="font-medium">Перед бронированием:</span> {stay.caution}
		</div>
	{/if}

	{#if stay.mapNote}
		<div class="rounded-md border border-sky-700/25 bg-sky-500/5 p-3 text-sm leading-relaxed">
			<span class="font-medium">Отметка на карте:</span> {stay.mapNote}
		</div>
	{/if}

	<p class="text-muted-foreground text-xs leading-relaxed">
		{#if rateInfo.source === 'current'}
			Рубли рассчитаны по текущему курсу ЦБ РФ на {formatRateDate(rateInfo.date)}
		{:else}
			Рубли рассчитаны по <a class="underline underline-offset-4" href={fallbackRateSourceUrl} target="_blank" rel="noreferrer">сохранённому курсу ЦБ РФ</a> на {formatRateDate(rateInfo.date)} — свежий курс загрузить не удалось.
		{/if}
		Расчёт приблизительный: курс банка или карты может отличаться.
		<a class="underline underline-offset-4" href={exchangeRateAttributionUrl} target="_blank" rel="noreferrer">API курсов ЦБ РФ</a>.
	</p>

	<a
		href={stay.url}
		target="_blank"
		rel="noreferrer"
		class="decoration-muted-foreground hover:decoration-foreground inline-flex items-center gap-1 text-sm underline underline-offset-4"
	>
		{stayLinkLabel(stay.url)}
		<ExternalLinkIcon class="size-3.5" aria-hidden="true" />
	</a>
</article>
