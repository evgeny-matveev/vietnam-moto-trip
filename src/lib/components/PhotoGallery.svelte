<script>
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import PhotoLightbox from '$lib/components/PhotoLightbox.svelte';

	let { photos = [], photoFallback, entityName, galleryId } = $props();

	let galleryOpen = $state(false);
	let galleryIndex = $state(0);

	function openGallery(index) {
		galleryIndex = index;
		galleryOpen = true;
	}
</script>

{#if photos.length}
	<section class="space-y-2" aria-labelledby={`${galleryId}-gallery-title`}>
		<div class="flex items-baseline justify-between gap-3">
			<h3 id={`${galleryId}-gallery-title`} class="text-sm font-medium">Как выглядит место</h3>
			<span class="text-muted-foreground text-xs">{photos.length} фото</span>
		</div>

		<div class="space-y-1.5">
			<button
				type="button"
				aria-label={`Открыть фото 1: ${entityName}`}
				onclick={() => openGallery(0)}
				class="focus-visible:ring-ring block w-full overflow-hidden rounded-md outline-none focus-visible:ring-3"
			>
				<img src={photos[0].src} alt={photos[0].alt} loading="eager" decoding="async" class="aspect-[2/1] w-full object-cover" />
			</button>
			<div class="grid grid-cols-2 gap-1.5">
				{#each photos.slice(1) as photo, index}
					<button
						type="button"
						aria-label={`Открыть фото ${index + 2}: ${entityName}`}
						onclick={() => openGallery(index + 1)}
						class="focus-visible:ring-ring block min-w-0 overflow-hidden rounded-md outline-none focus-visible:ring-3"
					>
						<img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" class="aspect-[4/3] w-full object-cover" />
					</button>
				{/each}
			</div>
		</div>

		{#if photos[0].credit}
			<a
				href={photos[0].credit.url}
				target="_blank"
				rel="noreferrer"
				class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs underline underline-offset-4"
			>
				Источник фото: {photos[0].credit.label}
				<ExternalLinkIcon class="size-3" aria-hidden="true" />
			</a>
		{/if}
	</section>
	<PhotoLightbox
		{photos}
		{entityName}
		{galleryId}
		bind:open={galleryOpen}
		bind:startIndex={galleryIndex}
	/>
{:else if photoFallback}
	<a
		href={photoFallback.url}
		target="_blank"
		rel="noreferrer"
		class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm underline underline-offset-4"
	>
		{photoFallback.label}
		<ExternalLinkIcon class="size-3.5" aria-hidden="true" />
	</a>
{/if}
