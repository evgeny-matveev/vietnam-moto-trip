<script>
	import { tick } from 'svelte';
	import CloudRainIcon from '@lucide/svelte/icons/cloud-rain';
	import DayDetails from '$lib/components/DayDetails.svelte';
	import PlaceDetails from '$lib/components/PlaceDetails.svelte';
	import RouteMap from '$lib/components/RouteMap.svelte';
	import RouteDownloads from '$lib/components/RouteDownloads.svelte';
	import { itinerary } from '$lib/data/itineraries.js';
	import {
		filterPlacesByCategory,
		getPlace,
		placeCategories,
		placesForIds,
		placesForItinerary
	} from '$lib/data/places.js';

	let selectedNumber = $state(0);
	let selectedPlaceId = $state(null);
	let activeCategoryIds = $state(placeCategories.map((category) => category.id));
	let detailsPanel = null;
	let previousDetailsScroll = 0;
	let selectedDay = $derived(
		selectedNumber ? itinerary.days.find((day) => day.day === selectedNumber) : null
	);
	let routePlaces = $derived(
		selectedDay ? placesForIds(selectedDay.placeIds) : placesForItinerary(itinerary)
	);
	let visiblePlaces = $derived(filterPlacesByCategory(routePlaces, activeCategoryIds));
	let selectedPlace = $derived(selectedPlaceId ? getPlace(selectedPlaceId) : null);

	async function moveDetailsTo(top) {
		await tick();
		if (detailsPanel) detailsPanel.scrollTop = top;
	}

	function selectDay(number) {
		selectedNumber = number;
		selectedPlaceId = null;
		previousDetailsScroll = 0;
		void moveDetailsTo(0);
	}

	function selectPlace(id) {
		previousDetailsScroll = detailsPanel?.scrollTop ?? 0;
		selectedPlaceId = id;
		void moveDetailsTo(0);
	}

	function backToDay() {
		selectedPlaceId = null;
		void moveDetailsTo(previousDetailsScroll);
	}

	function changeFocus(event) {
		selectDay(Number(event.currentTarget.value));
	}

	function toggleCategory(id) {
		if (activeCategoryIds.includes(id)) {
			activeCategoryIds = activeCategoryIds.filter((categoryId) => categoryId !== id);
			if (selectedPlace?.category === id) backToDay();
		} else {
			activeCategoryIds = [...activeCategoryIds, id];
		}
	}
</script>

<svelte:head>
	<title>Quiet Roads Vietnam — relaxed highlands and coast route</title>
	<meta
		name="description"
		content="A relaxed 12-day scooter route from Đà Nẵng through the Central Highlands and home along Vietnam’s coast."
	/>
</svelte:head>

<div
	class="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:h-[calc(100dvh-49px)] xl:min-h-0 xl:overflow-hidden xl:pt-4 xl:pb-6"
>
	<header class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
		<div class="flex min-w-0 items-baseline gap-3">
			<p class="text-muted-foreground shrink-0 text-xs font-medium tracking-wide uppercase">12-day route</p>
			<h1 class="truncate text-xl font-medium tracking-tight sm:text-2xl">Highlands south, coast home</h1>
		</div>
		<p class="text-muted-foreground shrink-0 text-sm">≈ 1,650–1,800 km · hike + Nha Trang rest day</p>
	</header>

	<section aria-label="Map controls" class="rounded-lg border px-3 py-2.5">
		<div class="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
			<label class="flex min-w-0 flex-1 items-center gap-2 text-sm font-medium sm:max-w-xl">
				<span class="shrink-0">Show</span>
				<select
					value={selectedNumber}
					onchange={changeFocus}
					class="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 min-w-0 flex-1 rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:ring-3"
				>
					<option value={0}>Entire loop</option>
					{#each itinerary.days as day}
						<option value={day.day}>Day {day.day}: {day.title}</option>
					{/each}
				</select>
			</label>

			<fieldset class="flex shrink-0 items-center gap-1.5">
				<legend class="sr-only">Place categories</legend>
				<span class="text-muted-foreground mr-1 hidden text-xs font-medium md:inline">Places</span>
				{#each placeCategories as category}
					<button
						type="button"
						aria-label={`${activeCategoryIds.includes(category.id) ? 'Hide' : 'Show'} ${category.label}`}
						aria-pressed={activeCategoryIds.includes(category.id)}
						title={category.label}
						onclick={() => toggleCategory(category.id)}
						class="font-emoji focus-visible:ring-ring grid size-8 place-items-center rounded-full border text-base outline-none transition-colors focus-visible:ring-3 aria-pressed:bg-foreground aria-pressed:text-background aria-[pressed=false]:text-muted-foreground aria-[pressed=false]:opacity-45"
					>
						{category.symbol}
					</button>
				{/each}
			</fieldset>
		</div>
	</section>

	<div
		class="grid gap-4 xl:min-h-0 xl:flex-1 xl:grid-cols-[minmax(360px,0.72fr)_minmax(560px,1.28fr)]"
	>
		<section class="h-[56svh] min-h-[360px] xl:h-auto xl:min-h-0" aria-label="Route map">
			<RouteMap
				{itinerary}
				{selectedDay}
				{visiblePlaces}
				{selectedPlace}
				onSelectDay={selectDay}
				onSelectPlace={selectPlace}
			/>
		</section>

		<aside
			bind:this={detailsPanel}
			class="min-w-0 rounded-lg border bg-card p-4 sm:p-5 xl:min-h-0 xl:overflow-y-auto xl:overscroll-contain xl:p-6 xl:[scrollbar-gutter:stable]"
			aria-label="Selected route details"
		>
			{#if selectedPlace}
				<PlaceDetails place={selectedPlace} onBack={backToDay} />
			{:else if selectedDay}
				<DayDetails day={selectedDay} places={visiblePlaces} onSelectPlace={selectPlace} />
			{:else}
				<div class="space-y-5">
					<div class="space-y-2">
						<h2 class="text-2xl font-medium tracking-tight">The whole loop</h2>
						<p class="text-muted-foreground leading-relaxed">
							A relaxed line through the highlands to Đà Lạt, then home along the coast. Choose a day
							or a place on the map; the story stays here while the map keeps its position.
						</p>
					</div>

					<div class="grid gap-3 text-sm sm:grid-cols-2" aria-label="Map legend">
						<div class="flex items-center gap-2">
							<span class="h-1 w-8 rounded-full bg-[var(--map-route-outbound)]"></span>
							<span>Highlands south</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="h-1 w-8 rounded-full bg-[var(--map-route-return)]"></span>
							<span>Coast home</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="grid h-5 min-w-8 place-items-center rounded-full bg-[var(--map-route-hike)] px-1 text-[9px] font-semibold text-white">D6</span>
							<span>Hiking</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="grid h-5 min-w-8 place-items-center rounded-full bg-[var(--map-route-rest)] px-1 text-[9px] font-semibold text-white">D8</span>
							<span>Rest day</span>
						</div>
					</div>

					<RouteDownloads {itinerary} />

					<div class="rounded-md border border-sky-700/25 bg-sky-500/5 p-3 text-sm leading-relaxed">
						<div class="mb-1 flex items-center gap-2 font-medium">
							<CloudRainIcon class="size-4" aria-hidden="true" />
							{itinerary.season.window}
						</div>
						<p class="text-muted-foreground">{itinerary.season.summary}</p>
						<div class="mt-2 flex flex-wrap gap-x-4 gap-y-1">
							{#each itinerary.season.sources as source}
								<a class="underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">
									{source.label}
								</a>
							{/each}
						</div>
						<p class="text-muted-foreground mt-2 text-xs">Last reviewed {itinerary.season.reviewedAt}.</p>
					</div>

					<ol class="grid gap-x-5 text-sm sm:grid-cols-2">
						{#each itinerary.days as day}
							<li class="border-t">
								<button
									type="button"
									onclick={() => selectDay(day.day)}
									class="hover:bg-muted focus-visible:ring-ring flex w-full items-start gap-3 rounded-md py-3 text-left outline-none focus-visible:ring-3"
								>
									<span class="text-muted-foreground w-6 shrink-0">D{day.day}</span>
									<span class="min-w-0 flex-1">
										<span class="block font-medium">{day.title}</span>
										<span class="text-muted-foreground mt-0.5 block">{day.distance}</span>
									</span>
								</button>
							</li>
						{/each}
					</ol>
				</div>
			{/if}
		</aside>
	</div>
</div>
