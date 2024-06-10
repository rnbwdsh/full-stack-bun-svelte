<script lang="ts">
	import Fa from 'svelte-fa';
	import { settings } from '../store';

	export let setting: string;
	export let icon;
	export let secondaryIcon = null;
	export let onClick = null;
	export let className = '';

	function handleClick() {
		if (onClick) {
			onClick();
		} else if (setting != null) {
			$settings[setting] = !$settings[setting];
		}
	}
</script>

<button class:secondary={$settings[setting] || className === 'secondary'} class={className} on:click={handleClick}>
	<Fa icon={$settings[setting] && secondaryIcon ? secondaryIcon : icon} />
</button>

<style>
	button {
		padding: var(--p-sma) var(--p-mid);
		outline: 1px groove grey;
	}
</style>
