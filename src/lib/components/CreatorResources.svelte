<script>
	let { resources = [] } = $props();
</script>

{#if resources.length}
	<section class="space-y-2.5" aria-labelledby="creator-resources-title">
		<div class="space-y-0.5">
			<h3 id="creator-resources-title" class="text-sm font-medium">Watch before you ride</h3>
			<p class="text-muted-foreground text-xs">Selected rider and local-creator perspectives; links open on YouTube.</p>
		</div>
		<div class="grid gap-2 sm:grid-cols-2">
			{#each resources as resource}
				<a
					href={resource.url}
					target="_blank"
					rel="noreferrer"
					class="hover:bg-muted focus-visible:ring-ring rounded-lg border p-3 outline-none transition-colors focus-visible:ring-3"
				>
					<p class="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
						{resource.platform} · {resource.language}
					</p>
					<p class="mt-1 text-sm font-medium">{resource.title}</p>
					<p class="text-muted-foreground mt-0.5 text-xs">{resource.creator}</p>
					<p class="text-muted-foreground mt-2 text-xs leading-relaxed">{resource.note}</p>
				</a>
			{/each}
		</div>
	</section>
{/if}
