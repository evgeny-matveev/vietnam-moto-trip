<script>
	import MapIcon from '@lucide/svelte/icons/map';
	import NotebookTextIcon from '@lucide/svelte/icons/notebook-text';
</script>

<header class="border-b bg-background/95">
	<div class="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
		<a href="/" class="min-w-0 font-medium tracking-tight">Quiet Roads Vietnam</a>
		<nav aria-label="Main navigation" class="flex shrink-0 items-center gap-1">
			<a
				href="/"
				class="hover:bg-muted focus-visible:ring-ring inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium outline-none focus-visible:ring-3"
			>
				<MapIcon class="size-4" aria-hidden="true" />
				<span class="hidden sm:inline">Route map</span>
			</a>
			<a
				href="/guide"
				class="hover:bg-muted focus-visible:ring-ring inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium outline-none focus-visible:ring-3"
			>
				<NotebookTextIcon class="size-4" aria-hidden="true" />
				<span>Ride plan</span>
			</a>
		</nav>
	</div>
</header>
