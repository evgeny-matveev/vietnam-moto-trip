<script>
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import MapPinIcon from '@lucide/svelte/icons/map-pin';
	import TimerIcon from '@lucide/svelte/icons/timer';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { placeCategories } from '$lib/data/places.js';

	let { place, onBack } = $props();
	let category = $derived(placeCategories.find((item) => item.id === place.category));

	function visitTime([minimum, maximum]) {
		if (minimum === maximum) return `${minimum} min`;
		if (minimum >= 240 && maximum >= 240) return `${Math.round(minimum / 60)}–${Math.round(maximum / 60)} hr`;
		return `${minimum}–${maximum} min`;
	}
</script>

<article class="space-y-5" aria-live="polite">
	<Button variant="ghost" size="sm" class="-ml-2" onclick={onBack}>
		<ArrowLeftIcon data-icon="inline-start" aria-hidden="true" />
		Back to route details
	</Button>

	<div class="space-y-2">
		<div class="flex flex-wrap items-center gap-2">
			<Badge variant="secondary">
				<span aria-hidden="true">{category?.symbol}</span>
				{category?.label ?? place.category}
			</Badge>
			<Badge variant="outline">
				<TimerIcon aria-hidden="true" />
				{visitTime(place.visitMinutes)}
			</Badge>
		</div>
		<h2 class="text-2xl font-medium tracking-tight">{place.name}</h2>
		<p class="text-muted-foreground leading-relaxed">{place.whyWorthIt}</p>
	</div>

	<Separator />

	<div class="grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
		<div class="rounded-md border p-3">
			<div class="text-muted-foreground flex items-center gap-1.5">
				<MapPinIcon class="size-4" aria-hidden="true" />
				Approximate detour
			</div>
			<p class="mt-1 font-medium">{place.detourKm === 0 ? 'On the planned line' : `${place.detourKm} km`}</p>
		</div>
		<div class="rounded-md border p-3">
			<div class="text-muted-foreground flex items-center gap-1.5">
				<TimerIcon class="size-4" aria-hidden="true" />
				Allow
			</div>
			<p class="mt-1 font-medium">{visitTime(place.visitMinutes)}</p>
		</div>
	</div>

	{#if place.accessNote}
		<div class="rounded-md border border-amber-700/25 bg-amber-500/5 p-3 text-sm leading-relaxed">
			<span class="font-medium">Access:</span> {place.accessNote}
		</div>
	{/if}

	{#if place.seasonNote}
		<div class="rounded-md border border-sky-700/25 bg-sky-500/5 p-3 text-sm leading-relaxed">
			<span class="font-medium">For this trip:</span> {place.seasonNote}
		</div>
	{/if}

	{#if place.sources?.length}
		<div class="space-y-2 text-sm">
			<h3 class="font-medium">Read more</h3>
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
