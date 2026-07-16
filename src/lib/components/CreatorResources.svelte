<script>
	import PlayIcon from '@lucide/svelte/icons/play';

	let { resources = [] } = $props();
</script>

{#if resources.length}
	<section class="space-y-2.5" aria-labelledby="creator-resources-title">
		<div class="space-y-0.5">
			<h3 id="creator-resources-title" class="text-sm font-medium">Посмотреть перед выездом</h3>
			<p class="text-muted-foreground text-xs">Личные впечатления путешественников и местных авторов; это идеи для маршрута, а не официальные сведения о дорогах и безопасности.</p>
		</div>
		<div class="grid gap-2 sm:grid-cols-2">
			{#each resources as resource}
				<a
					href={resource.url}
					target="_blank"
					rel="noreferrer"
					aria-label={`${resource.title} — ${resource.creator}, открыть на YouTube`}
					class="hover:bg-muted focus-visible:ring-ring overflow-hidden rounded-lg border outline-none transition-colors focus-visible:ring-3"
				>
					<div class="relative aspect-video overflow-hidden bg-muted" aria-hidden="true">
						<img
							src={resource.thumbnail}
							alt=""
							width="1280"
							height="720"
							loading="lazy"
							decoding="async"
							class="absolute inset-0 size-full object-cover"
							onerror={(event) => event.currentTarget.remove()}
						/>
						<span class="absolute inset-0 grid place-items-center">
							<span class="grid size-11 place-items-center rounded-full bg-black/70 text-white shadow-sm">
								<PlayIcon class="size-5 fill-current" />
							</span>
						</span>
					</div>
					<div class="p-3">
						<p class="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
							{resource.platform} · {resource.language}
						</p>
						<p class="mt-1 text-sm font-medium">{resource.title}</p>
						<p class="text-muted-foreground mt-0.5 text-xs">{resource.creator}</p>
						<p class="text-muted-foreground mt-2 text-xs leading-relaxed">{resource.note}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>
{/if}
