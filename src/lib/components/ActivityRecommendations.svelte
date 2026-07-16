<script>
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';

	let { activities = [] } = $props();
</script>

{#if activities.length}
	<section class="space-y-2.5" aria-labelledby="optional-activities-title">
		<div class="space-y-0.5">
			<h3 id="optional-activities-title" class="text-sm font-medium">Optional activities</h3>
			<p class="text-muted-foreground text-xs">Choose one when it fits the day; these are alternatives, not extra obligations.</p>
		</div>

		<div class="grid gap-2 sm:grid-cols-2">
			{#each activities as activity}
				<article class="rounded-lg border p-3">
					<div class="flex items-start gap-2">
						<span class="font-emoji mt-0.5 text-base leading-none" aria-hidden="true">{activity.symbol}</span>
						<div class="min-w-0">
							<h4 class="text-sm font-medium">{activity.name}</h4>
							<p class="text-muted-foreground mt-0.5 text-xs">{activity.time} · {activity.detour}</p>
						</div>
					</div>

					<p class="mt-2 text-xs leading-relaxed">{activity.summary}</p>
					<p class="text-muted-foreground mt-1 text-xs leading-relaxed">{activity.condition}</p>

					<div class="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
						{#each activity.sources as source}
							<a
								href={source.url}
								target="_blank"
								rel="noreferrer"
								class="decoration-muted-foreground hover:decoration-foreground inline-flex items-center gap-1 text-xs underline underline-offset-4"
							>
								{source.label}
								<ExternalLinkIcon class="size-3" aria-hidden="true" />
							</a>
						{/each}
					</div>
				</article>
			{/each}
		</div>
	</section>
{/if}
