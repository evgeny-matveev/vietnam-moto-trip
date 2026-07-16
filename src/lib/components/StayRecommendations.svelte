<script>
	import { onMount } from 'svelte';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
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

	let { stayPlan, onSelectStay } = $props();

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

{#if stayPlan?.stays?.length}
	<section class="space-y-3" aria-labelledby="stay-recommendations-title">
		<div class="space-y-1">
			<h3 id="stay-recommendations-title" class="text-sm font-medium">Где остановиться в {stayPlan.location}</h3>
			<p class="text-muted-foreground text-xs leading-relaxed">
				Ориентировочная стоимость за человека в сутки для шести взрослых в конце сентября —
				начале октября 2026 года. Налоги, завтрак и условия отмены могут измениться.
			</p>
			<p class="text-muted-foreground text-xs leading-relaxed">
				Первым идёт вариант с характером: кемпинг, ферма, деревенский дом или другое необычное
				место, если его можно рекомендовать без оговорок.
			</p>
			<p class="text-xs leading-relaxed">{stayPlan.note}</p>
		</div>

		<div class="grid gap-2">
			{#each stayPlan.stays as stay}
				<article
					class={`relative rounded-lg border p-3 ${onSelectStay ? 'cursor-pointer transition-colors hover:bg-muted/40' : ''}`}
				>
					{#if onSelectStay}
						<button
							type="button"
							aria-label={`Открыть карточку ${stay.name}`}
							onclick={() => onSelectStay(stay.id)}
							class="focus-visible:ring-ring absolute inset-0 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-inset"
						>
							<span class="sr-only">Открыть подробности</span>
						</button>
					{/if}

					<div class={onSelectStay ? 'pointer-events-none relative z-10' : ''}>
						<div class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
							<div>
								<p class="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
									{categoryNumbers[stay.category]}. {stayCategoryLabels[stay.category]}
									{#if stay.experience} · {stay.experience}{/if}
								</p>
								<h4 class="mt-0.5 text-sm font-medium">{stay.name}</h4>
							</div>
							<p class="shrink-0 text-sm font-medium sm:text-right">
								{stay.pricePerPersonUsd}
								<span class="text-muted-foreground block text-[11px] font-normal"
									>за человека / сутки</span
								>
								<span class="text-muted-foreground block text-xs font-normal"
									>{stay.pricePerPersonVnd}</span
								>
								<span class="text-muted-foreground block text-xs font-normal">
									{formatRubRange(stay.pricePerPersonUsd, rateInfo.rate)}
								</span>
							</p>
						</div>

						<div class="mt-3">
							<StayGallery {stay} compact />
						</div>

						<p class="mt-2 text-xs leading-relaxed">{stay.setup}</p>
						<p class="text-muted-foreground mt-1 text-xs leading-relaxed">{stay.why}</p>

						{#if stay.caution}
							<p class="mt-2 border-l-2 border-amber-600/35 pl-2 text-xs leading-relaxed">
								<span class="font-medium">Проверьте:</span> {stay.caution}
							</p>
						{/if}

						<div class="pointer-events-auto mt-2 flex flex-wrap gap-x-4 gap-y-2">
							{#if onSelectStay}
								<button
									type="button"
									aria-label={`Подробнее о ${stay.name}`}
									onclick={() => onSelectStay(stay.id)}
									class="decoration-muted-foreground hover:decoration-foreground inline-flex items-center gap-1 text-xs underline underline-offset-4"
								>
									Подробнее
									<ArrowRightIcon class="size-3" aria-hidden="true" />
								</button>
							{/if}
							<a
								href={stay.url}
								target="_blank"
								rel="noreferrer"
								class="decoration-muted-foreground hover:decoration-foreground inline-flex items-center gap-1 text-xs underline underline-offset-4"
							>
								{stayLinkLabel(stay.url)}
								<ExternalLinkIcon class="size-3" aria-hidden="true" />
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>

		<p class="text-muted-foreground text-xs leading-relaxed">
			{#if rateInfo.source === 'current'}
				Рубли рассчитаны по текущему курсу ЦБ РФ на {formatRateDate(rateInfo.date)}
			{:else}
				Рубли рассчитаны по <a class="underline underline-offset-4" href={fallbackRateSourceUrl} target="_blank" rel="noreferrer">сохранённому курсу ЦБ РФ</a> на {formatRateDate(rateInfo.date)} — свежий курс загрузить не удалось.
			{/if}
			Расчёт приблизительный: курс банка или карты может отличаться.
			<a class="underline underline-offset-4" href={exchangeRateAttributionUrl} target="_blank" rel="noreferrer">API курсов ЦБ РФ</a>.
		</p>
	</section>
{/if}
