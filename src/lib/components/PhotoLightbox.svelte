<script>
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import XIcon from '@lucide/svelte/icons/x';

	let {
		photos = [],
		entityName,
		galleryId,
		open = $bindable(false),
		startIndex = $bindable(0)
	} = $props();

	let dialog;
	let activeIndex = $state(0);
	let wasOpen = false;
	let returnFocus;

	function boundedIndex(index) {
		return (index + photos.length) % photos.length;
	}

	function previousPhoto() {
		activeIndex = boundedIndex(activeIndex - 1);
	}

	function nextPhoto() {
		activeIndex = boundedIndex(activeIndex + 1);
	}

	function closeGallery() {
		open = false;
	}

	function handleClose() {
		open = false;
		returnFocus?.focus?.();
	}

	function handleKeydown(event) {
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			previousPhoto();
		}
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			nextPhoto();
		}
	}

	$effect(() => {
		if (open && !wasOpen) {
			activeIndex = Math.min(Math.max(startIndex, 0), photos.length - 1);
			returnFocus = document.activeElement;
			dialog?.showModal();
		}

		if (!open && wasOpen && dialog?.open) dialog.close();
		wasOpen = open;
	});
</script>

<dialog
	bind:this={dialog}
	id={`${galleryId}-dialog`}
	aria-labelledby={`${galleryId}-title`}
	onclose={handleClose}
	onkeydown={handleKeydown}
	class="m-auto w-[min(94vw,56rem)] max-w-none rounded-xl border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/70 motion-reduce:transition-none"
>
	{#if open && photos.length}
		{@const photo = photos[activeIndex]}
		<div class="space-y-3 p-3 sm:p-4">
			<div class="flex items-center justify-between gap-3">
				<div>
					<h2 id={`${galleryId}-title`} class="text-sm font-medium">Фото: {entityName}</h2>
					<p class="text-muted-foreground text-xs">{activeIndex + 1} из {photos.length}</p>
				</div>
				<button
					type="button"
					aria-label="Закрыть галерею"
					onclick={closeGallery}
					class="hover:bg-muted focus-visible:ring-ring rounded-md p-2 outline-none focus-visible:ring-3"
				>
					<XIcon class="size-4" aria-hidden="true" />
				</button>
			</div>

			<div class="relative">
				<img
					src={photo.src}
					alt={photo.alt}
					class="max-h-[68vh] min-h-48 w-full rounded-md object-contain bg-muted"
				/>
				{#if photos.length > 1}
					<button
						type="button"
						aria-label="Предыдущее фото"
						onclick={previousPhoto}
						class="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow hover:bg-background focus-visible:ring-3"
					>
						<ChevronLeftIcon class="size-5" aria-hidden="true" />
					</button>
					<button
						type="button"
						aria-label="Следующее фото"
						onclick={nextPhoto}
						class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow hover:bg-background focus-visible:ring-3"
					>
						<ChevronRightIcon class="size-5" aria-hidden="true" />
					</button>
				{/if}
			</div>

			{#if photo.credit}
				<a
					href={photo.credit.url}
					target="_blank"
					rel="noreferrer"
					class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs underline underline-offset-4"
				>
					Источник фото: {photo.credit.label}
					<ExternalLinkIcon class="size-3" aria-hidden="true" />
				</a>
			{/if}
		</div>
	{/if}
</dialog>
