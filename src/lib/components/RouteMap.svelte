<script>
	import { onMount, untrack } from 'svelte';
	import { loadRouteFeatures } from '$lib/route-downloads.js';
	import { boundsForFeatures, featureCollection } from '$lib/route-utils.js';
	import { placeCategories } from '$lib/data/places.js';

	let {
		itinerary,
		selectedDay = null,
		visiblePlaces = [],
		visibleStays = [],
		selectedPlace = null,
		selectedStay = null,
		onSelectDay,
		onSelectPlace,
		onSelectStay
	} = $props();

	let container = null;
	let map;
	let maplibregl;
	let ready = $state(false);
	let error = $state('');
	let routeFeatures = [];
	let renderVersion = 0;

	const sourceId = 'ride-routes';
	const markerSourceId = 'day-markers';
	const poiSourceId = 'route-places';
	const staySourceId = 'day-stays';
	const categoryById = new Map(placeCategories.map((category) => [category.id, category]));

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
		for (const id of [
			'route-selected',
			'route-hit',
			'route-lines',
			'poi-selected',
			'poi-icons',
			'poi-cluster-count',
			'poi-clusters',
			'stay-icons',
			'day-dots'
		]) {
			removeLayer(id);
		}
		for (const id of [sourceId, markerSourceId, poiSourceId, staySourceId]) removeSource(id);
	}

	function routeMarkers(features) {
		const markers = features.map((routeFeature) => ({
			type: 'Feature',
			properties: {
				day: routeFeature.properties.day,
				label: `Д${routeFeature.properties.day}`,
				markerImage: `day-marker-${routeFeature.properties.day}`,
				title: routeFeature.properties.title,
				kind: routeFeature.properties.kind
			},
			geometry: { type: 'Point', coordinates: routeFeature.geometry.coordinates.at(-1) }
		}));

		for (const day of itinerary.days.filter((item) => !item.routeFile && item.mapAnchor)) {
			markers.push({
				type: 'Feature',
				properties: {
					day: day.day,
					label: `Д${day.day}`,
					markerImage: `day-marker-${day.day}`,
					title: day.title,
					kind: day.kind
				},
				geometry: { type: 'Point', coordinates: day.mapAnchor }
			});
		}
		return markers;
	}

	function placeFeatures() {
		return visiblePlaces.map((place) => {
			const category = categoryById.get(place.category);
			return {
				type: 'Feature',
				properties: {
					id: place.id,
					name: place.name,
					category: place.category,
					icon: category ? `poi-${category.id}` : 'poi-nature'
				},
				geometry: { type: 'Point', coordinates: place.coordinates }
			};
		});
	}

	function stayFeatures() {
		return visibleStays.map((stay) => ({
			type: 'Feature',
			properties: {
				id: stay.id,
				name: stay.name,
				category: stay.category,
				icon: `stay-${stay.category}`
			},
			geometry: { type: 'Point', coordinates: stay.coordinates }
		}));
	}

	function imageData(width, height, draw) {
		const scale = 2;
		const canvas = document.createElement('canvas');
		canvas.width = width * scale;
		canvas.height = height * scale;
		const context = canvas.getContext('2d');
		context.scale(scale, scale);
		draw(context, width, height);
		return context.getImageData(0, 0, canvas.width, canvas.height);
	}

	function roundedRectangle(context, x, y, width, height, radius) {
		context.beginPath();
		context.moveTo(x + radius, y);
		context.lineTo(x + width - radius, y);
		context.quadraticCurveTo(x + width, y, x + width, y + radius);
		context.lineTo(x + width, y + height - radius);
		context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		context.lineTo(x + radius, y + height);
		context.quadraticCurveTo(x, y + height, x, y + height - radius);
		context.lineTo(x, y + radius);
		context.quadraticCurveTo(x, y, x + radius, y);
		context.closePath();
	}

	async function registerMarkerImages() {
		const marker = colorToken('--map-marker', '#172554');
		const markerText = colorToken('--map-marker-text', '#ffffff');
		const stayMarker = colorToken('--map-stay', '#0f766e');
		const fills = {
			outbound: colorToken('--map-route-outbound', '#b45309'),
			return: colorToken('--map-route-return', '#0369a1'),
			hike: colorToken('--map-route-hike', '#15803d'),
			rest: colorToken('--map-route-rest', '#7e22ce')
		};

		for (const category of placeCategories) {
			const id = `poi-${category.id}`;
			if (map.hasImage(id)) continue;
			const image = await map.loadImage(category.icon);
			map.addImage(id, image.data, { pixelRatio: 2 });
		}

		for (const [category, number] of [
			['special', 1],
			['luxury', 2],
			['regular', 3]
		]) {
			const id = `stay-${category}`;
			if (map.hasImage(id)) continue;
			map.addImage(
				id,
				imageData(32, 32, (context) => {
					context.beginPath();
					context.arc(16, 16, 13, 0, Math.PI * 2);
					context.fillStyle = stayMarker;
					context.fill();
					context.strokeStyle = markerText;
					context.lineWidth = 2;
					context.stroke();
					context.fillStyle = markerText;
					context.font = '600 13px "Inter Variable", sans-serif';
					context.textAlign = 'center';
					context.textBaseline = 'middle';
					context.fillText(String(number), 16, 16.5);
				}),
				{ pixelRatio: 2 }
			);
		}

		for (const day of itinerary.days) {
			const id = `day-marker-${day.day}`;
			if (map.hasImage(id)) continue;
			map.addImage(
				id,
				imageData(44, 28, (context) => {
					roundedRectangle(context, 1, 1, 42, 26, 13);
					context.fillStyle = fills[day.kind] ?? marker;
					context.fill();
					context.strokeStyle = markerText;
					context.lineWidth = 2;
					context.stroke();
					context.fillStyle = markerText;
					context.font = '600 11px "Inter Variable", sans-serif';
					context.textAlign = 'center';
					context.textBaseline = 'middle';
					context.fillText(`Д${day.day}`, 22, 14.5);
				}),
				{ pixelRatio: 2 }
			);
		}
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
		const dayFilter = selectedDay
			? ['==', ['get', 'day'], selectedDay.day]
			: ['==', ['get', 'day'], -1];
		map.setFilter('route-selected', dayFilter);

		const pois = placeFeatures();
		const stays = stayFeatures();
		map.getSource(poiSourceId)?.setData(featureCollection(pois));
		map.getSource(staySourceId)?.setData(featureCollection(stays));
		map.setFilter(
			'poi-selected',
			selectedPlace ? ['==', ['get', 'id'], selectedPlace.id] : ['==', ['get', 'id'], '']
		);
		map.setLayoutProperty(
			'stay-icons',
			'icon-size',
			selectedStay ? ['case', ['==', ['get', 'id'], selectedStay.id], 1.25, 1] : 1
		);

		if (selectedStay) {
			map.easeTo({
				center: selectedStay.coordinates,
				zoom: Math.max(map.getZoom(), 12),
				duration: 500
			});
			return;
		}

		if (selectedPlace) {
			map.easeTo({
				center: selectedPlace.coordinates,
				zoom: Math.max(map.getZoom(), 11),
				duration: 500
			});
			return;
		}

		if (selectedDay) {
			const routeFeature = routeFeatures.find(
				(feature) => feature.properties.day === selectedDay.day
			);
			fit([...(routeFeature ? [routeFeature] : []), ...pois, ...stays]);
		} else {
			fit([...routeFeatures, ...pois, ...stays]);
		}
	}

	async function renderItinerary() {
		if (!ready || !map) return;
		const currentVersion = ++renderVersion;
		error = '';

		try {
			const loaded = await loadRouteFeatures(itinerary);
			if (currentVersion !== renderVersion) return;
			routeFeatures = loaded;
			clearRouteLayers();

			map.addSource(sourceId, { type: 'geojson', data: featureCollection(routeFeatures) });
			map.addSource(markerSourceId, {
				type: 'geojson',
				data: featureCollection(routeMarkers(routeFeatures))
			});
			map.addSource(poiSourceId, {
				type: 'geojson',
				data: featureCollection(placeFeatures()),
				cluster: true,
				clusterRadius: 42,
				clusterMaxZoom: 10
			});
			map.addSource(staySourceId, {
				type: 'geojson',
				data: featureCollection(stayFeatures())
			});

			const outbound = colorToken('--map-route-outbound', '#b45309');
			const returning = colorToken('--map-route-return', '#0369a1');
			const selected = colorToken('--map-route-selected', '#7c2d12');
			const marker = colorToken('--map-marker', '#172554');
			const markerText = colorToken('--map-marker-text', '#ffffff');
			const cluster = colorToken('--map-cluster', '#fff7ed');
			const clusterText = colorToken('--map-cluster-text', '#172554');

			map.addLayer({
				id: 'route-lines',
				type: 'line',
				source: sourceId,
				paint: {
					'line-color': ['match', ['get', 'kind'], 'outbound', outbound, 'return', returning, marker],
					'line-width': 3,
					'line-opacity': 0.82
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
				type: 'symbol',
				source: markerSourceId,
				layout: {
					'icon-image': ['get', 'markerImage'],
					'icon-offset': [0, -40],
					'icon-allow-overlap': true
				}
			});

			map.addLayer({
				id: 'poi-clusters',
				type: 'circle',
				source: poiSourceId,
				filter: ['has', 'point_count'],
				paint: {
					'circle-radius': ['step', ['get', 'point_count'], 15, 8, 19, 20, 23],
					'circle-color': cluster,
					'circle-stroke-color': marker,
					'circle-stroke-width': 2,
					'circle-opacity': 0.92
				}
			});
			map.addLayer({
				id: 'poi-cluster-count',
				type: 'symbol',
				source: poiSourceId,
				filter: ['has', 'point_count'],
				layout: {
					'text-field': ['get', 'point_count_abbreviated'],
					'text-font': ['Noto Sans Regular'],
					'text-size': 11
				},
				paint: { 'text-color': clusterText }
			});
			map.addLayer({
				id: 'poi-icons',
				type: 'symbol',
				source: poiSourceId,
				filter: ['!', ['has', 'point_count']],
				layout: {
					'icon-image': ['get', 'icon'],
					'icon-allow-overlap': true
				}
			});
			map.addLayer({
				id: 'poi-selected',
				type: 'circle',
				source: poiSourceId,
				filter: ['==', ['get', 'id'], selectedPlace?.id ?? ''],
				paint: {
					'circle-radius': 17,
					'circle-color': 'rgba(0,0,0,0)',
					'circle-stroke-color': selected,
					'circle-stroke-width': 3
				}
			});
			map.addLayer({
				id: 'stay-icons',
				type: 'symbol',
				source: staySourceId,
				layout: {
					'icon-image': ['get', 'icon'],
					'icon-size': selectedStay
						? ['case', ['==', ['get', 'id'], selectedStay.id], 1.25, 1]
						: 1,
					'icon-offset': [
						'match',
						['get', 'category'],
						'special',
						['literal', [-16, 0]],
						'luxury',
						['literal', [0, 0]],
						['literal', [16, 0]]
					],
					'icon-allow-overlap': true
				}
			});
			updateSelection();
		} catch (exception) {
			error = exception instanceof Error ? exception.message : 'Не удалось отрисовать маршрут.';
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

			map.on('load', async () => {
				await Promise.allSettled([
					document.fonts.load('600 11px "Inter Variable"')
				]);
				await registerMarkerImages();
				ready = true;
				renderItinerary();
			});
			map.on('click', 'route-hit', (event) => {
				if (
					map.queryRenderedFeatures(event.point, {
						layers: ['poi-icons', 'poi-clusters', 'stay-icons']
					}).length
				)
					return;
				const number = event.features?.[0]?.properties?.day;
				if (number) onSelectDay?.(Number(number));
			});
			map.on('click', 'day-dots', (event) => {
				const number = event.features?.[0]?.properties?.day;
				if (number) onSelectDay?.(Number(number));
			});
			map.on('click', 'poi-icons', (event) => {
				const id = event.features?.[0]?.properties?.id;
				if (id) onSelectPlace?.(id);
			});
			map.on('click', 'stay-icons', (event) => {
				const id = event.features?.[0]?.properties?.id;
				if (id) onSelectStay?.(id);
			});
			map.on('click', 'poi-clusters', async (event) => {
				const clusterId = event.features?.[0]?.properties?.cluster_id;
				const coordinates = event.features?.[0]?.geometry?.coordinates;
				const source = map.getSource(poiSourceId);
				if (clusterId === undefined || !coordinates || !source) return;
				const zoom = await source.getClusterExpansionZoom(clusterId);
				map.easeTo({ center: coordinates, zoom, duration: 500 });
			});

			for (const layer of ['route-hit', 'day-dots', 'poi-icons', 'poi-clusters', 'stay-icons']) {
				map.on('mouseenter', layer, () => (map.getCanvas().style.cursor = 'pointer'));
				map.on('mouseleave', layer, () => (map.getCanvas().style.cursor = ''));
			}
		} catch (exception) {
			error = exception instanceof Error ? exception.message : 'Не удалось запустить карту.';
		}

		return () => map?.remove();
	});

	$effect(() => {
		if (ready && itinerary) untrack(() => void renderItinerary());
	});

	$effect(() => {
		const dependencyKey = `${selectedDay?.day ?? 0}|${selectedPlace?.id ?? ''}|${selectedStay?.id ?? ''}|${visiblePlaces.map((place) => place.id).join(',')}|${visibleStays.map((stay) => stay.id).join(',')}`;
		if (ready && dependencyKey) updateSelection();
	});
</script>

<div class="relative h-full min-h-[360px] w-full overflow-hidden rounded-lg bg-muted xl:min-h-0">
	<div
		bind:this={container}
		class="h-full w-full"
		role="application"
		aria-label="Интерактивная карта маршрута из Дананга (Đà Nẵng) через Центральное нагорье и побережье"
	></div>
	{#if !ready && !error}
		<div class="pointer-events-none absolute inset-0 grid place-items-center bg-muted text-sm text-muted-foreground">
			Загружаем карту маршрута…
		</div>
	{/if}
	{#if error}
		<div class="absolute inset-x-4 bottom-4 rounded-md border bg-background/95 p-3 text-sm shadow-sm">
			{error} Полный маршрут по-прежнему доступен в путеводителе.
		</div>
	{/if}
</div>
