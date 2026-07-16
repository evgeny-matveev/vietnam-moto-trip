<script>
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import PhotoLightbox from '$lib/components/PhotoLightbox.svelte';

	let { photos = [], photoFallback, entityName, galleryId } = $props();

	let galleryOpen = $state(false);
	let galleryIndex = $state(0);

	function openGallery(index = 0) {
		galleryIndex = index;
		galleryOpen = true;
	}
</script>

{#if photos.length}
	<div class="space-y-1.5">
		<button
			type="button"
			aria-label={`Показать фото: ${entityName}`}
			onclick={() => openGallery()}
			class="group focus-visible:ring-ring relative block w-full overflow-hidden rounded-md outline-none focus-visible:ring-3"
		>
			<img
				src={photos[0].src}
				alt={photos[0].alt}
				loading="lazy"
				decoding="async"
				class="aspect-video w-full object-cover transition-transform duration-200 group-hover:scale-[1.02] motion-reduce:transition-none"
			/>
			<span class="absolute right-2 bottom-2 rounded-full bg-background/90 px-2 py-1 text-xs font-medium shadow-sm">{photos.length} фото</span>
		</button>
		<p class="text-muted-foreground text-[11px]">Нажмите, чтобы открыть галерею</p>
	</div>
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
		class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs underline underline-offset-4"
	>
		{photoFallback.label}
		<ExternalLinkIcon class="size-3" aria-hidden="true" />
	</a>
{/if}
