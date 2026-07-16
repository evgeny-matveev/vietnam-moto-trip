<script>
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import RouteIcon from '@lucide/svelte/icons/route';
	import FootprintsIcon from '@lucide/svelte/icons/footprints';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	let { day } = $props();
</script>

<article class="space-y-5" aria-live="polite">
	<div class="space-y-2">
		<div class="flex flex-wrap items-center gap-2">
			<Badge variant={day.kind === 'hike' ? 'default' : 'secondary'}>Day {day.day}</Badge>
			<Badge variant="outline">
				{#if day.kind === 'hike'}
					<FootprintsIcon aria-hidden="true" />
				{:else}
					<RouteIcon aria-hidden="true" />
				{/if}
				{day.distance}
			</Badge>
		</div>
		<h2 class="text-2xl font-medium tracking-tight">{day.title}</h2>
		<p class="text-muted-foreground leading-relaxed">{day.summary}</p>
	</div>

	<Separator />

	<div class="space-y-1.5">
		<h3 class="text-sm font-medium">Road</h3>
		<p class="text-sm leading-relaxed">{day.roads}</p>
		<p class="text-muted-foreground text-sm">{day.rideTime}</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-sm font-medium">Choose on the day</h3>
		<ul class="space-y-2 text-sm leading-relaxed">
			{#each day.stops as stop}
				<li class="flex gap-2">
					<span class="text-muted-foreground" aria-hidden="true">—</span>
					<span>{stop}</span>
				</li>
			{/each}
		</ul>
	</div>

	<p class="border-l-2 border-primary/30 pl-3 text-sm leading-relaxed">{day.note}</p>

	{#if day.sources?.length}
		<div class="flex flex-wrap gap-x-4 gap-y-2 text-sm">
			{#each day.sources as source}
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
	{/if}
</article>
