<script>
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import CloudRainIcon from '@lucide/svelte/icons/cloud-rain';
	import DayDetails from '$lib/components/DayDetails.svelte';
	import PlaceDetails from '$lib/components/PlaceDetails.svelte';
	import RouteMap from '$lib/components/RouteMap.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
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
	let selectedDay = $derived(
		selectedNumber ? itinerary.days.find((day) => day.day === selectedNumber) : null
	);
	let routePlaces = $derived(
		selectedDay ? placesForIds(selectedDay.placeIds) : placesForItinerary(itinerary)
	);
	let visiblePlaces = $derived(filterPlacesByCategory(routePlaces, activeCategoryIds));
	let selectedPlace = $derived(selectedPlaceId ? getPlace(selectedPlaceId) : null);

	function selectDay(number) {
		selectedNumber = number;
		selectedPlaceId = null;
	}

	function selectPlace(id) {
		selectedPlaceId = id;
	}

	function changeFocus(event) {
		selectDay(Number(event.currentTarget.value));
	}

	function toggleCategory(id) {
		if (activeCategoryIds.includes(id)) {
			activeCategoryIds = activeCategoryIds.filter((categoryId) => categoryId !== id);
			if (selectedPlace?.category === id) selectedPlaceId = null;
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

<div class="mx-auto max-w-[1500px] space-y-5 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
	<header class="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
		<div class="max-w-3xl space-y-2">
			<p class="text-muted-foreground text-sm font-medium">Highlands south · coast home</p>
			<h1 class="text-3xl font-medium tracking-tight sm:text-4xl">The relaxed highlands-and-coast loop</h1>
			<p class="text-muted-foreground max-w-2xl leading-relaxed">
				12 days · approximately 1,650–1,800 km · one hiking day · one full Nha Trang day
			</p>
		</div>
		<Button href="/guide" variant="outline" class="self-start lg:self-auto">
			<BookOpenIcon data-icon="inline-start" aria-hidden="true" />
			Read the complete ride plan
			<ChevronRightIcon data-icon="inline-end" aria-hidden="true" />
		</Button>
	</header>

	<p class="text-muted-foreground max-w-4xl text-sm leading-relaxed">{itinerary.description}</p>

	<section aria-label="Map controls" class="space-y-3 rounded-lg border p-3 sm:p-4">
		<div class="grid gap-3 lg:grid-cols-[minmax(260px,0.7fr)_minmax(0,2fr)] lg:items-end">
			<label class="space-y-1.5 text-sm font-medium">
				<span>Map focus</span>
				<select
					value={selectedNumber}
					onchange={changeFocus}
					class="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:ring-3"
				>
					<option value={0}>Entire loop</option>
					{#each itinerary.days as day}
						<option value={day.day}>Day {day.day}: {day.title}</option>
					{/each}
				</select>
			</label>

			<fieldset class="space-y-1.5">
				<legend class="text-sm font-medium">Place categories</legend>
				<div class="flex flex-wrap gap-2">
					{#each placeCategories as category}
						<button
							type="button"
							aria-pressed={activeCategoryIds.includes(category.id)}
							onclick={() => toggleCategory(category.id)}
							class="focus-visible:ring-ring inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-medium outline-none transition-colors focus-visible:ring-3 aria-pressed:bg-muted aria-pressed:shadow-xs aria-[pressed=false]:text-muted-foreground aria-[pressed=false]:opacity-55"
						>
							<span style:color={category.color} aria-hidden="true">{category.symbol}</span>
							{category.label}
						</button>
					{/each}
				</div>
			</fieldset>
		</div>
	</section>

	<div class="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
		<section class="h-[54svh] min-h-[390px] max-h-[760px] xl:h-[68svh]" aria-label="Route map">
			<RouteMap
				{itinerary}
				{selectedDay}
				{visiblePlaces}
				{selectedPlace}
				onSelectDay={selectDay}
				onSelectPlace={selectPlace}
			/>
		</section>

		<aside class="min-w-0 xl:max-h-[68svh] xl:overflow-y-auto xl:pr-2" aria-label="Selected route details">
			{#if selectedPlace}
				<PlaceDetails place={selectedPlace} onBack={() => (selectedPlaceId = null)} />
			{:else if selectedDay}
				<DayDetails day={selectedDay} places={visiblePlaces} onSelectPlace={selectPlace} />
			{:else}
				<div class="space-y-5">
					<div class="space-y-2">
						<h2 class="text-2xl font-medium tracking-tight">Whole loop</h2>
						<p class="text-muted-foreground leading-relaxed">
							Select a numbered stop, route line or place marker. The filters hide places without changing
							the route.
						</p>
					</div>
					<div class="space-y-3 text-sm" aria-label="Map legend">
						<div class="flex items-center gap-2">
							<span class="h-1 w-8 rounded-full bg-[var(--map-route-outbound)]"></span>
							<span>Highlands south</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="h-1 w-8 rounded-full bg-[var(--map-route-return)]"></span>
							<span>Coast home</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="grid size-5 place-items-center rounded-full bg-[var(--map-route-hike)] text-[10px] text-white">6</span>
							<span>Hiking</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="grid size-5 place-items-center rounded-full bg-[var(--map-route-rest)] text-[10px] text-white">8</span>
							<span>Rest day</span>
						</div>
					</div>

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

					<ol class="divide-y text-sm">
						{#each itinerary.days as day}
							<li>
								<button
									type="button"
									onclick={() => selectDay(day.day)}
									class="hover:bg-muted focus-visible:ring-ring flex w-full items-start gap-3 rounded-md py-3 text-left outline-none focus-visible:ring-3"
								>
									<span class="text-muted-foreground w-5 shrink-0">{day.day}</span>
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
