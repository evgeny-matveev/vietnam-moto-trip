<script>
	import { onMount } from 'svelte';
	import { boundsForFeatures, featureCollection } from '$lib/route-utils.js';

	let { itinerary, selectedDay = null, onSelect } = $props();

	let container = null;
	let map;
	let maplibregl;
	let ready = $state(false);
	let error = $state('');
	let features = [];
	let renderVersion = 0;

	const sourceId = 'ride-routes';
	const markerSourceId = 'day-markers';
	const poiSourceId = 'selected-pois';

	function colorToken(name, fallback) {
		const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
		return value || fallback;
	}

	function removeLayer(id) {
		if (map?.getLayer(id)) map.removeLayer(id);
	}

	function removeSource(id) {
		if (map?.getSource(id)) map.removeSource(id);
	}

	function clearRouteLayers() {
		for (const id of ['route-selected', 'route-hit', 'route-lines', 'day-labels', 'day-dots', 'poi-labels', 'poi-dots']) {
			removeLayer(id);
		}
		for (const id of [sourceId, markerSourceId, poiSourceId]) removeSource(id);
	}

	function routeMarkers(routeFeatures) {
		const markers = [];
		for (const routeFeature of routeFeatures) {
			const coordinates = routeFeature.geometry.coordinates;
			const last = coordinates.at(-1);
			markers.push({
				type: 'Feature',
				properties: {
					day: routeFeature.properties.day,
					label: String(routeFeature.properties.day),
					title: routeFeature.properties.title
				},
				geometry: { type: 'Point', coordinates: last }
			});
		}

		for (const day of itinerary.days.filter((item) => !item.routeFile && item.pois?.length)) {
			markers.push({
				type: 'Feature',
				properties: { day: day.day, label: String(day.day), title: day.title },
				geometry: { type: 'Point', coordinates: day.pois[0].coordinates }
			});
		}
		return markers;
	}

	function selectedPois() {
		if (!selectedDay?.pois) return [];
		return selectedDay.pois.map((poi) => ({
			type: 'Feature',
			properties: { name: poi.name },
			geometry: { type: 'Point', coordinates: poi.coordinates }
		}));
	}

	function fit(featuresToFit) {
		const bounds = boundsForFeatures(featuresToFit);
		if (!bounds || !maplibregl) return;
		map.fitBounds(
			[
				[bounds.west, bounds.south],
				[bounds.east, bounds.north]
			],
			{ padding: 44, duration: 650, maxZoom: 11 }
		);
	}

	function updateSelection() {
		if (!ready || !map?.getSource(sourceId)) return;
		const filter = selectedDay
			? ['==', ['get', 'day'], selectedDay.day]
			: ['==', ['get', 'day'], -1];
		map.setFilter('route-selected', filter);

		const pois = selectedPois();
		map.getSource(poiSourceId)?.setData(featureCollection(pois));

		if (selectedDay) {
			const routeFeature = features.find((feature) => feature.properties.day === selectedDay.day);
			fit([...(routeFeature ? [routeFeature] : []), ...pois]);
		} else {
			fit(features);
		}
	}

	async function renderItinerary() {
		if (!ready || !map) return;
		const currentVersion = ++renderVersion;
		error = '';

		try {
			const routeDays = itinerary.days.filter((item) => item.routeFile);
			const loaded = await Promise.all(
				routeDays.map(async (day) => {
					const response = await fetch(`/routes/${day.routeFile}`);
					if (!response.ok) throw new Error(`Could not load Day ${day.day}`);
					const geojson = await response.json();
					return {
						...geojson.features[0],
						properties: {
							...geojson.features[0].properties,
							day: day.day,
							kind: day.kind,
							title: day.title
						}
					};
				})
			);
			if (currentVersion !== renderVersion) return;
			features = loaded;
			clearRouteLayers();

			map.addSource(sourceId, { type: 'geojson', data: featureCollection(features) });
			map.addSource(markerSourceId, {
				type: 'geojson',
				data: featureCollection(routeMarkers(features))
			});
			map.addSource(poiSourceId, { type: 'geojson', data: featureCollection(selectedPois()) });

			const outbound = colorToken('--map-route-outbound', '#b45309');
			const returning = colorToken('--map-route-return', '#0369a1');
			const hiking = colorToken('--map-route-hike', '#15803d');
			const selected = colorToken('--map-route-selected', '#7c2d12');
			const marker = colorToken('--map-marker', '#172554');
			const markerText = colorToken('--map-marker-text', '#ffffff');

			map.addLayer({
				id: 'route-lines',
				type: 'line',
				source: sourceId,
				paint: {
					'line-color': ['match', ['get', 'kind'], 'outbound', outbound, 'return', returning, hiking],
					'line-width': 3,
					'line-opacity': 0.8
				}
			});
			map.addLayer({
				id: 'route-hit',
				type: 'line',
				source: sourceId,
				paint: { 'line-color': markerText, 'line-width': 16, 'line-opacity': 0 }
			});
			map.addLayer({
				id: 'route-selected',
				type: 'line',
				source: sourceId,
				filter: ['==', ['get', 'day'], selectedDay?.day ?? -1],
				paint: { 'line-color': selected, 'line-width': 6, 'line-opacity': 1 }
			});
			map.addLayer({
				id: 'day-dots',
				type: 'circle',
				source: markerSourceId,
				paint: {
					'circle-radius': 11,
					'circle-color': marker,
					'circle-stroke-color': markerText,
					'circle-stroke-width': 2
				}
			});
			map.addLayer({
				id: 'day-labels',
				type: 'symbol',
				source: markerSourceId,
				layout: {
					'text-field': ['get', 'label'],
					'text-font': ['Noto Sans Regular'],
					'text-size': 11,
					'text-allow-overlap': true
				},
				paint: { 'text-color': markerText }
			});
			map.addLayer({
				id: 'poi-dots',
				type: 'circle',
				source: poiSourceId,
				paint: {
					'circle-radius': 6,
					'circle-color': hiking,
					'circle-stroke-color': markerText,
					'circle-stroke-width': 2
				}
			});
			map.addLayer({
				id: 'poi-labels',
				type: 'symbol',
				source: poiSourceId,
				layout: {
					'text-field': ['get', 'name'],
					'text-font': ['Noto Sans Regular'],
					'text-size': 12,
					'text-offset': [0, 1.2],
					'text-anchor': 'top'
				},
				paint: {
					'text-color': marker,
					'text-halo-color': markerText,
					'text-halo-width': 1.5
				}
			});

			updateSelection();
		} catch (exception) {
			error = exception instanceof Error ? exception.message : 'The route could not be drawn.';
		}
	}

	onMount(async () => {
		try {
			const module = await import('maplibre-gl');
			maplibregl = module.default;
			map = new maplibregl.Map({
				container,
				style: 'https://tiles.openfreemap.org/styles/liberty',
				center: [108.45, 13.9],
				zoom: 6.2,
				attributionControl: false
			});
			map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
			map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

			map.on('load', () => {
				ready = true;
				renderItinerary();
			});
			map.on('click', 'route-hit', (event) => {
				const number = event.features?.[0]?.properties?.day;
				if (number) onSelect?.(Number(number));
			});
			map.on('click', 'day-dots', (event) => {
				const number = event.features?.[0]?.properties?.day;
				if (number) onSelect?.(Number(number));
			});
			for (const layer of ['route-hit', 'day-dots']) {
				map.on('mouseenter', layer, () => (map.getCanvas().style.cursor = 'pointer'));
				map.on('mouseleave', layer, () => (map.getCanvas().style.cursor = ''));
			}
		} catch (exception) {
			error = exception instanceof Error ? exception.message : 'The map could not start.';
		}

		return () => map?.remove();
	});

	$effect(() => {
		if (ready && itinerary) void renderItinerary();
	});

	$effect(() => {
		if (ready && selectedDay !== undefined) updateSelection();
	});
</script>

<div class="relative h-full min-h-[360px] w-full overflow-hidden rounded-lg bg-muted">
	<div
		bind:this={container}
		class="h-full w-full"
		role="application"
		aria-label="Interactive map of the selected Đà Nẵng to Đà Lạt scooter route"
	></div>
	{#if !ready && !error}
		<div class="pointer-events-none absolute inset-0 grid place-items-center bg-muted text-sm text-muted-foreground">
			Loading route map…
		</div>
	{/if}
	{#if error}
		<div class="absolute inset-x-4 bottom-4 rounded-md border bg-background/95 p-3 text-sm shadow-sm">
			{error} The complete itinerary is still available in the Ride plan.
		</div>
	{/if}
</div>
