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
		{ id: 'gpx', label: 'GPX', detail: 'OsmAnd and most navigation apps' },
		{ id: 'kml', label: 'KML', detail: 'Google My Maps and Google Earth' },
		{ id: 'geojson', label: 'GeoJSON', detail: 'Organic Maps and GIS tools' }
	];

	function routeName() {
		return day ? `Day ${day.day}: ${day.title}` : 'Quiet Roads Vietnam — whole loop';
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

			if (!output) throw new Error('Unknown route format');
			downloadFile(output[0], `${fileStem()}.${format}`, output[1]);
		} catch (exception) {
			error = exception instanceof Error ? exception.message : 'The route could not be downloaded.';
		} finally {
			busyFormat = null;
		}
	}
</script>

<section
	id={day ? undefined : 'route-downloads'}
	class="scroll-mt-4 space-y-2 rounded-md border bg-muted/20 p-3"
	aria-label="Download route"
>
	<div class="space-y-1">
		<h3 class="text-sm font-medium">Use in a map app</h3>
		<p class="text-muted-foreground text-xs leading-relaxed">
			{day ? 'Download this riding day.' : 'Download the ten riding days as one multi-track file.'}
			GPX is the best choice for OsmAnd.
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
				aria-label={`Download ${day ? `Day ${day.day} ` : ''}${format.label} route`}
			>
				<DownloadIcon data-icon="inline-start" aria-hidden="true" />
				{format.label}
			</Button>
		{/each}
	</div>

	{#if busyFormat}
		<p class="text-muted-foreground text-xs" role="status">Preparing {busyFormat.toUpperCase()}…</p>
	{:else if error}
		<p class="text-destructive text-xs" role="alert">{error}</p>
	{/if}
</section>
