<script>
	import DownloadIcon from '@lucide/svelte/icons/download';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		geoJsonFromFeatures,
		gpxFromFeatures,
		kmlFromFeatures,
		loadRouteFeatures
	} from '$lib/route-downloads.js';

	let { itinerary = null, day = null } = $props();
	let busyFormat = $state(null);
	let error = $state('');

	const formats = [
		{ id: 'gpx', label: 'GPX', detail: 'OsmAnd и большинство навигационных приложений' },
		{ id: 'kml', label: 'KML', detail: 'Google My Maps и Google Earth' },
		{ id: 'geojson', label: 'GeoJSON', detail: 'Organic Maps и ГИС-инструменты' }
	];

	function routeName() {
		return day ? `День ${day.day}: ${day.title}` : 'Верхом на байках по югу Вьетнама — весь маршрут';
	}

	function fileStem() {
		return day
			? `quiet-roads-vietnam-day-${String(day.day).padStart(2, '0')}`
			: 'quiet-roads-vietnam-whole-loop';
	}

	function downloadFile(content, filename, contentType) {
		const url = URL.createObjectURL(new Blob([content], { type: contentType }));
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.setTimeout(() => URL.revokeObjectURL(url), 0);
	}

	async function download(format) {
		if (busyFormat) return;
		busyFormat = format;
		error = '';

		try {
			const days = itinerary?.days ?? (day ? [day] : []);
			const features = await loadRouteFeatures({ days });
			const name = routeName();
			const output = {
				gpx: [gpxFromFeatures(features, name), 'application/gpx+xml'],
				kml: [kmlFromFeatures(features, name), 'application/vnd.google-earth.kml+xml'],
				geojson: [geoJsonFromFeatures(features), 'application/geo+json']
			}[format];

			if (!output) throw new Error('Неизвестный формат маршрута');
			downloadFile(output[0], `${fileStem()}.${format}`, output[1]);
		} catch (exception) {
			error = exception instanceof Error ? exception.message : 'Не удалось скачать маршрут.';
		} finally {
			busyFormat = null;
		}
	}
</script>

<section
	id={day ? undefined : 'route-downloads'}
	class="scroll-mt-4 space-y-2 rounded-md border bg-muted/20 p-3"
	aria-label="Скачать маршрут"
>
	<div class="space-y-1">
		<h3 class="text-sm font-medium">Открыть в навигаторе</h3>
		<p class="text-muted-foreground text-xs leading-relaxed">
			{day ? 'Скачайте трек этого ходового дня.' : 'Скачайте десять ходовых дней одним файлом с несколькими треками.'}
			Для OsmAnd лучше всего подходит GPX.
		</p>
	</div>

	<div class="flex flex-wrap gap-2">
		{#each formats as format}
			<Button
				type="button"
				variant={format.id === 'gpx' ? 'default' : 'outline'}
				size="sm"
				disabled={busyFormat !== null}
				onclick={() => download(format.id)}
				title={format.detail}
				aria-label={`Скачать маршрут ${day ? `дня ${day.day} ` : ''}в формате ${format.label}`}
			>
				<DownloadIcon data-icon="inline-start" aria-hidden="true" />
				{format.label}
			</Button>
		{/each}
	</div>

	{#if busyFormat}
		<p class="text-muted-foreground text-xs" role="status">Готовим {busyFormat.toUpperCase()}…</p>
	{:else if error}
		<p class="text-destructive text-xs" role="alert">{error}</p>
	{/if}
</section>
