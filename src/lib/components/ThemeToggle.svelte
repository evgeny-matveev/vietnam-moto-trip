<script>
	import { onMount } from 'svelte';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SunIcon from '@lucide/svelte/icons/sun';

	let isDark = $state(false);

	function applyTheme(nextTheme, persist = false) {
		isDark = nextTheme;
		document.documentElement.classList.toggle('dark', nextTheme);
		document.documentElement.style.colorScheme = nextTheme ? 'dark' : 'light';
		if (persist) localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
	}

	function toggleTheme() {
		applyTheme(!isDark, true);
	}

	onMount(() => {
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
		const savedTheme = localStorage.getItem('theme');
		const hasSavedTheme = savedTheme === 'dark' || savedTheme === 'light';

		applyTheme(hasSavedTheme ? savedTheme === 'dark' : systemTheme.matches);

		function syncSystemTheme(event) {
			if (!hasSavedTheme && localStorage.getItem('theme') === null) applyTheme(event.matches);
		}

		systemTheme.addEventListener('change', syncSystemTheme);
		return () => systemTheme.removeEventListener('change', syncSystemTheme);
	});
</script>

<button
	type="button"
	aria-label={isDark ? 'Включить дневную тему' : 'Включить ночную тему'}
	aria-pressed={isDark}
	onclick={toggleTheme}
	class="hover:bg-muted focus-visible:ring-ring inline-flex h-8 items-center gap-1 rounded-md px-1.5 text-xs font-medium outline-none focus-visible:ring-3 sm:px-2.5 sm:text-sm"
>
	{#if isDark}
		<SunIcon class="size-4" aria-hidden="true" />
		<span class="hidden sm:inline">День</span>
	{:else}
		<MoonIcon class="size-4" aria-hidden="true" />
		<span class="hidden sm:inline">Ночь</span>
	{/if}
</button>
