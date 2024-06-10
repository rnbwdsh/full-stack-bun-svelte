<script>
	import { onMount } from 'svelte';
	import { enabledModels, settings } from '../store';

	let tags = [];

	onMount(async () => {
		// fetch the tags from the server
		const response = await fetch('api/tags');
		tags = await response
			.json()
			.then((data) => data.models)
			.then((models) =>
				models.sort((a, b) => formatTitle(a.name).localeCompare(formatTitle(b.name)))
			)
			.catch((error) => console.error('Error:', error));
	});

	function formatDetails(details) {
		return Object.entries(details)
			.map(([key, value]) => `${key}: ${value}`)
			.join('\n');
	}

	function formatTitle(name) {
		return name.replace(':latest', '').split('/').pop();
	}
</script>

<aside class:open={$settings.sidebarOpen}>
	<ol>
		{#each tags as tag}
			<li title={formatDetails(tag.details)}>
				<!-- mouseover text: jsonified tag.details, each detail in a separate line, i.e. a: asdf\nb: bsdf without trailing {/}-->
				<label class:enabled={$enabledModels[tag.name]}>
					<input type="checkbox" bind:checked={$enabledModels[tag.name]} value={tag.name} />
					{formatTitle(tag.name)}
				</label>
			</li>
		{/each}
	</ol>
</aside>

<style>
	aside {
		max-width: 0;
		overflow: hidden;
		/* ignore all chars for overflow breaking */
		white-space: nowrap;
		height: 100%;
	}

	.open {
		max-width: 20rem;
		min-width: 10rem;
		left: 0;
	}

	ol {
		padding: var(--p-sma) var(--p-mid);
		margin: 0;
	}

	li {
		padding: 0 0;
		margin: 0;
	}

	label {
		margin-bottom: 0;
	}

	input {
		display: none;
	}

	/* make enabled font weight bold */
	.enabled {
		font-weight: 900;
	}
</style>
