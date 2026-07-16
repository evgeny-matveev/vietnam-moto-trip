<script>
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { stayCategoryLabels, stayLinkLabel } from '$lib/data/stays.js';

	let { stay, onBack } = $props();

	const categoryNumbers = {
		special: 1,
		luxury: 2,
		regular: 3
	};
</script>

<article class="space-y-5" aria-live="polite">
	<Button variant="ghost" size="sm" class="-ml-2" onclick={onBack}>
		<ArrowLeftIcon data-icon="inline-start" aria-hidden="true" />
		Back to day details
	</Button>

	<div class="space-y-2">
		<div class="flex flex-wrap items-center gap-2">
			<Badge variant="secondary">
				<span aria-hidden="true">{categoryNumbers[stay.category]}.</span>
				{stayCategoryLabels[stay.category]}
			</Badge>
			{#if stay.experience}<Badge variant="outline">{stay.experience}</Badge>{/if}
			<Badge variant="outline"
				>{stay.pricePerPersonUsd} · {stay.pricePerPersonVnd} per person / night</Badge
			>
		</div>
		<h2 class="text-2xl font-medium tracking-tight">{stay.name}</h2>
		<p class="text-muted-foreground leading-relaxed">{stay.why}</p>
	</div>

	<Separator />

	<div class="rounded-md border p-3 text-sm leading-relaxed">
		<p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Group setup</p>
		<p class="mt-1">{stay.setup}</p>
	</div>

	{#if stay.caution}
		<div class="rounded-md border border-amber-700/25 bg-amber-500/5 p-3 text-sm leading-relaxed">
			<span class="font-medium">Check before booking:</span> {stay.caution}
		</div>
	{/if}

	{#if stay.mapNote}
		<div class="rounded-md border border-sky-700/25 bg-sky-500/5 p-3 text-sm leading-relaxed">
			<span class="font-medium">Map position:</span> {stay.mapNote}
		</div>
	{/if}

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
