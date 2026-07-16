<script>
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import PhotoPreview from '$lib/components/PhotoPreview.svelte';
	import { placeCategories } from '$lib/data/places.js';

	let { places = [], onSelectPlace } = $props();
	const categoryById = new Map(placeCategories.map((category) => [category.id, category]));

	function visitTime([minimum, maximum]) {
		if (minimum === maximum) return `${minimum} мин`;
		if (minimum >= 240 && maximum >= 240) return `${Math.round(minimum / 60)}–${Math.round(maximum / 60)} ч`;
		return `${minimum}–${maximum} мин`;
	}
</script>

<div class="grid gap-2 sm:grid-cols-2">
	{#each places as place}
		{@const category = categoryById.get(place.category)}
		<article class="space-y-2 rounded-lg border p-2.5">
			<PhotoPreview
				photos={place.photos}
				photoFallback={place.photoFallback}
				entityName={place.name}
				galleryId={`place-preview-${place.id}`}
			/>

			<div class="space-y-1">
				<p class="text-muted-foreground flex items-center gap-1.5 text-[11px]">
					<span class="font-emoji text-sm" aria-hidden="true">{category?.symbol}</span>
					{category?.label ?? place.category}
				</p>
				<h4 class="text-sm font-medium leading-snug">
					<button
						type="button"
						onclick={() => onSelectPlace?.(place.id)}
						class="hover:underline focus-visible:ring-ring rounded-sm text-left outline-none focus-visible:ring-3"
					>
						{place.name}
					</button>
				</h4>
				<p class="text-muted-foreground text-xs">
					{visitTime(place.visitMinutes)} · {place.detourKm === 0 ? 'на маршруте' : `крюк ${place.detourKm} км`}
				</p>
			</div>

			<button
				type="button"
				onclick={() => onSelectPlace?.(place.id)}
				class="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1 self-start text-xs underline underline-offset-4 outline-none focus-visible:ring-3"
			>
				Открыть место
				<ArrowRightIcon class="size-3" aria-hidden="true" />
			</button>
		</article>
	{/each}
</div>
