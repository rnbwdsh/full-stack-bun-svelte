<script lang="ts">
	import { pb } from '../db';
	import { fade } from 'svelte/transition';

	let username: string;
	let password: string;
	let error = '';

	async function handleError(fn: () => Promise<void>) {
		try {
			await fn();
		} catch (e) {
			error = e.message + " Hint: len(password) >= 5";
			setTimeout(() => (error = ''), 3000);
		}
	}

	async function login() {
		await handleError(async () => {
			await pb.collection('users').authWithPassword(username, password);
		});
	}

	async function register() {
		await handleError(async () => {
			await pb
				.collection('users')
				.create({ username, password, passwordConfirm: password, name: username });
			await login();
		});
	}
</script>

<form class="flex1" on:submit|preventDefault>
	<h1>Login</h1>
	<input bind:value={username} placeholder="Username" type="text" />
	<input bind:value={password} placeholder="Password" type="password" />
	<span>
		<button on:click={login}>Login</button>
		<button on:click={register}>Register</button>
	</span>
	<!-- error message that fades out over 10 seconds -->
	{#if error}
		<p class="error" out:fade={{ duration: 1000 }} in:fade={{ duration: 100 }}>{error}</p>
	{/if}
</form>

<style>
	form {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
		margin: auto;
	}

	button {
		width: 10em;
		align-items: center;
	}
</style>
