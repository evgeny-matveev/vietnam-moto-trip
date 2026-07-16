<script>
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { marked } from 'marked';
	import { Button } from '$lib/components/ui/button/index.js';
	import ridePlan from '../../../docs/ride-plan.md?raw';

	const renderedPlan = marked.parse(ridePlan, { gfm: true });
</script>

<svelte:head>
	<title>Quiet Roads Vietnam — complete ride plan</title>
	<meta
		name="description"
		content="The complete relaxed 12-day scooter itinerary through Vietnam’s Central Highlands and home along the coast."
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
	<Button href="/" variant="ghost" class="mb-6 -ml-2">
		<ArrowLeftIcon data-icon="inline-start" aria-hidden="true" />
		Back to route map
	</Button>

	<article class="ride-plan prose prose-neutral max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:decoration-muted-foreground prose-a:underline-offset-4 prose-table:text-sm">
		{@html renderedPlan}
	</article>
</div>
