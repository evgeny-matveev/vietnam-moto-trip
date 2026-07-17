<script>
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import Clock3Icon from '@lucide/svelte/icons/clock-3';
	import CompassIcon from '@lucide/svelte/icons/compass';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import PhotoGallery from '$lib/components/PhotoGallery.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { placeCategories } from '$lib/data/places.js';

	let { place, onBack } = $props();
	let category = $derived(placeCategories.find((item) => item.id === place.category));

	function visitTime([minimum, maximum]) {
		if (minimum === maximum) return `${minimum} мин`;
		if (minimum >= 240 && maximum >= 240) return `${Math.round(minimum / 60)}–${Math.round(maximum / 60)} ч`;
		return `${minimum}–${maximum} мин`;
	}
</script>

<article class="space-y-5" aria-live="polite">
	<Button variant="ghost" size="sm" class="-ml-2" onclick={onBack}>
		<ArrowLeftIcon data-icon="inline-start" aria-hidden="true" />
		К маршруту дня
	</Button>

	<div class="space-y-2">
		<div class="flex flex-wrap items-center gap-2">
			<Badge variant="secondary">
				{#if category?.icon}
					<img src={category.icon} alt="" class="size-4 object-contain" />
				{/if}
				{category?.label ?? place.category}
			</Badge>
			<Badge variant="outline">
				<Clock3Icon class="size-3.5" aria-hidden="true" />
				{visitTime(place.visitMinutes)}
			</Badge>
		</div>
		<h2 class="text-2xl font-medium tracking-tight">{place.name}</h2>
		<p class="text-muted-foreground leading-relaxed">{place.whyWorthIt}</p>
	</div>

	<PhotoGallery
		photos={place.photos}
		photoFallback={place.photoFallback}
		entityName={place.name}
		galleryId={`place-details-${place.id}`}
	/>

	<Separator />

	<div class="grid gap-3 text-sm sm:grid-cols-2">
		<div class="rounded-md border p-3">
			<div class="text-muted-foreground flex items-center gap-1.5">
				<CompassIcon class="size-4" aria-hidden="true" />
				Примерный крюк
			</div>
			<p class="mt-1 font-medium">{place.detourKm === 0 ? 'На линии маршрута' : `${place.detourKm} км`}</p>
		</div>
		<div class="rounded-md border p-3">
			<div class="text-muted-foreground flex items-center gap-1.5">
				<Clock3Icon class="size-4" aria-hidden="true" />
				Заложите времени
			</div>
			<p class="mt-1 font-medium">{visitTime(place.visitMinutes)}</p>
		</div>
	</div>

	{#if place.accessNote}
		<div class="rounded-md border border-amber-700/25 bg-amber-500/5 p-3 text-sm leading-relaxed">
			<span class="font-medium">Доступ:</span> {place.accessNote}
		</div>
	{/if}

	{#if place.seasonNote}
		<div class="rounded-md border border-sky-700/25 bg-sky-500/5 p-3 text-sm leading-relaxed">
			<span class="font-medium">Для этой поездки:</span> {place.seasonNote}
		</div>
	{/if}

	{#if place.sources?.length}
		<div class="space-y-2 text-sm">
			<h3 class="font-medium">Подробнее</h3>
			<div class="flex flex-wrap gap-x-4 gap-y-2">
				{#each place.sources as source}
					<a
						href={source.url}
						target="_blank"
						rel="noreferrer"
						class="decoration-muted-foreground hover:decoration-foreground inline-flex items-center gap-1 underline underline-offset-4"
					>
						{source.label}
						<ExternalLinkIcon class="size-3.5" aria-hidden="true" />
					</a>
				{/each}
			</div>
		</div>
	{/if}
</article>
