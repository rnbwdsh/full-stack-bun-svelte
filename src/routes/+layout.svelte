<script>
	import './styles.css';
	import ModelSelect from "./ModelSelect.svelte";
	import ChatHistory from "./ChatHistory.svelte";
	import Sidebar from "./Sidebar.svelte";

	let open = true;
</script>

<div class="app">
	<Sidebar bind:open/>

	<main>
		<slot />
	</main>

	<footer>
		<p>Created by Markus Vogl</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
