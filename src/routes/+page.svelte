<script>
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import DayDetails from '$lib/components/DayDetails.svelte';
	import RouteMap from '$lib/components/RouteMap.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { itineraryOptions, getItinerary } from '$lib/data/itineraries.js';

	let variantId = $state('main');
	let selectedNumber = $state(0);
	let itinerary = $derived(getItinerary(variantId));
	let selectedDay = $derived(
		selectedNumber ? itinerary.days.find((day) => day.day === selectedNumber) : null
	);

	function selectVariant(event) {
		variantId = event.currentTarget.value;
		selectedNumber = 0;
	}

	function selectDay(number) {
		selectedNumber = number;
	}
</script>

<svelte:head>
	<title>Quiet Roads Vietnam — route map</title>
</svelte:head>

<div class="mx-auto max-w-[1500px] space-y-5 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
	<header class="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
		<div class="max-w-3xl space-y-2">
			<p class="text-muted-foreground text-sm font-medium">12 days · Đà Nẵng → Đà Lạt → Đà Nẵng</p>
			<h1 class="text-3xl font-medium tracking-tight sm:text-4xl">The quiet-highlands loop</h1>
			<p class="text-muted-foreground max-w-2xl leading-relaxed">
				A different road out and back: coast, forest, high passes and deliberately empty hours for the
				thing you did not plan.
			</p>
		</div>
		<Button href="/guide" variant="outline" class="self-start lg:self-auto">
			<BookOpenIcon data-icon="inline-start" aria-hidden="true" />
			Read the complete ride plan
			<ChevronRightIcon data-icon="inline-end" aria-hidden="true" />
		</Button>
	</header>

	<section aria-label="Map controls" class="grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
		<label class="space-y-1.5 text-sm font-medium">
			<span>Route version</span>
			<select
				value={variantId}
				onchange={selectVariant}
				class="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:ring-3"
			>
				{#each itineraryOptions as option}
					<option value={option.id}>{option.shortName}</option>
				{/each}
			</select>
		</label>
		<label class="space-y-1.5 text-sm font-medium">
			<span>Map focus</span>
			<select
				bind:value={selectedNumber}
				class="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:ring-3"
			>
				<option value={0}>Entire loop</option>
				{#each itinerary.days as day}
					<option value={day.day}>Day {day.day}: {day.title}</option>
				{/each}
			</select>
		</label>
	</section>

	<p class="text-muted-foreground max-w-4xl text-sm leading-relaxed">{itinerary.description}</p>

	<div class="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
		<section class="h-[54svh] min-h-[390px] max-h-[760px] xl:h-[68svh]" aria-label="Route map">
			<RouteMap {itinerary} {selectedDay} onSelect={selectDay} />
		</section>

		<aside class="min-w-0 xl:max-h-[68svh] xl:overflow-y-auto xl:pr-2" aria-label="Selected route details">
			{#if selectedDay}
				<DayDetails day={selectedDay} />
			{:else}
				<div class="space-y-5">
					<div class="space-y-2">
						<h2 class="text-2xl font-medium tracking-tight">Whole loop</h2>
						<p class="text-muted-foreground leading-relaxed">
							Select a numbered stop or a day above to see its roads, possible stops and the choice that
							shapes it.
						</p>
					</div>
					<div class="space-y-3 text-sm">
						<div class="flex items-center gap-2">
							<span class="h-1 w-8 rounded-full bg-[var(--map-route-outbound)]"></span>
							<span>Outbound through Măng Đen and the coast</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="h-1 w-8 rounded-full bg-[var(--map-route-return)]"></span>
							<span>Western return through Lắk, Pleiku and Kon Tum</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="h-3 w-3 rounded-full bg-[var(--map-route-hike)]"></span>
							<span>Hiking areas around Đà Lạt</span>
						</div>
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
