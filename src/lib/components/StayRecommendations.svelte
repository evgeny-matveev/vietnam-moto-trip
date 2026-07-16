<script>
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { stayCategoryLabels } from '$lib/data/stays.js';

	let { stayPlan } = $props();

	const categoryNumbers = {
		special: 1,
		luxury: 2,
		regular: 3
	};
</script>

{#if stayPlan?.stays?.length}
	<section class="space-y-3" aria-labelledby="stay-recommendations-title">
		<div class="space-y-1">
			<h3 id="stay-recommendations-title" class="text-sm font-medium">Where to stay in {stayPlan.location}</h3>
			<p class="text-muted-foreground text-xs leading-relaxed">
				Estimated total per night for six adults in late September–early October 2026. Taxes,
				breakfast and cancellation terms may change.
			</p>
			<p class="text-xs leading-relaxed">{stayPlan.note}</p>
		</div>

		<div class="grid gap-2">
			{#each stayPlan.stays as stay}
				<article class="rounded-lg border p-3">
					<div class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
						<div>
							<p class="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
								{categoryNumbers[stay.category]}. {stayCategoryLabels[stay.category]}
							</p>
							<h4 class="mt-0.5 text-sm font-medium">{stay.name}</h4>
						</div>
						<p class="shrink-0 text-sm font-medium sm:text-right">
							{stay.priceUsd}
							<span class="text-muted-foreground block text-xs font-normal">{stay.priceVnd}</span>
						</p>
					</div>

					<p class="mt-2 text-xs leading-relaxed">{stay.setup}</p>
					<p class="text-muted-foreground mt-1 text-xs leading-relaxed">{stay.why}</p>

					{#if stay.caution}
						<p class="mt-2 border-l-2 border-amber-600/35 pl-2 text-xs leading-relaxed">
							<span class="font-medium">Check:</span> {stay.caution}
						</p>
					{/if}

					<a
						href={stay.url}
						target="_blank"
						rel="noreferrer"
						class="decoration-muted-foreground hover:decoration-foreground mt-2 inline-flex items-center gap-1 text-xs underline underline-offset-4"
					>
						View property
						<ExternalLinkIcon class="size-3" aria-hidden="true" />
					</a>
				</article>
			{/each}
		</div>
	</section>
{/if}
