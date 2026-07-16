<script>
	import { stayPhotoSourceLabel } from '$lib/data/stays.js';

	let { stay } = $props();
</script>

{#if stay.photos?.length}
	<section class="space-y-2" aria-labelledby="stay-gallery-title">
		<div class="flex items-baseline justify-between gap-3">
			<h3 id="stay-gallery-title" class="text-sm font-medium">Как выглядит место</h3>
			<span class="text-muted-foreground text-xs">{stay.photos.length} фото</span>
		</div>

		<div class="space-y-1.5">
			<img
				src={stay.photos[0]}
				alt={`${stay.name}: фото 1`}
				loading="eager"
				decoding="async"
				class="aspect-[2/1] w-full rounded-md object-cover"
			/>
			<div class="grid grid-cols-3 gap-1.5">
				{#each stay.photos.slice(1) as photo, index}
					<img
						src={photo}
						alt={`${stay.name}: фото ${index + 2}`}
						loading="lazy"
						decoding="async"
						class="aspect-[4/3] min-w-0 w-full rounded-md object-cover"
					/>
				{/each}
			</div>
		</div>

		<p class="text-muted-foreground text-xs">
			Фото:
			<a class="underline underline-offset-4" href={stay.url} target="_blank" rel="noreferrer">
				{stayPhotoSourceLabel(stay.url)}
			</a>
		</p>
	</section>
{/if}
