<script>
	import '@picocss/pico';
	import './styles.css';
	import Sidebar from '../components/Sidebar.svelte';
	import Login from '../components/Login.svelte';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	import Chat from '../components/Chat.svelte';
	import { currentUser } from '../db';
</script>

<div class="app flex1">
	<!-- if not logged in, show login form -->
	{#if !$currentUser}
		<Login />
	{:else}
		<Navbar />
		<main class="flex1">
			<Sidebar />
			<Chat />
		</main>
	{/if}

	<Footer />
</div>

<style>
	.app {
		flex-direction: column;
		padding: var(--p-sma) var(--p-mid);
	}
</style>
