<script lang="ts">
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	import { Fa } from 'svelte-fa';
	import autosize from 'svelte-autosize';
	import AssistantMessage from './AssistantMessage.svelte';
	import { pb } from '../db';
	import { currentChatId, enabledModels, messagesCache } from '../store';
	import { afterUpdate, onMount } from 'svelte';

	currentChatId.subscribe(refreshMessages);

	function refreshMessages(id) {
		pb.collection('messages')
			.getFullList({ sort: 'created', filter: "chat='" + id + "'" })
			.then((res) => {
				$messagesCache = res;
			});
	}

	async function sendChat(event: Event) {
		const form = event.target as HTMLFormElement;
		const input = form.querySelector('textarea') as HTMLTextAreaElement;
		const content = input?.value.trim();
		if (!content || !enabledModels) return;

		const message = { role: 'user', content: input?.value.trim(), chat: $currentChatId };
		$messagesCache = [...$messagesCache, message];
		input.value = '';
		input.dispatchEvent(new Event('input')); // trigger autosize

		// insert in the background
		pb.collection('messages').create(message).then();
		$messagesCache = [
			...$messagesCache,
			{ role: 'assistant', content: '', messages: $messagesCache, chat: $currentChatId, other: {} }
		];
	}

	function handleKeyDown(event: KeyboardEvent) {
		const textarea = event.target as HTMLTextAreaElement;
		const form = textarea.form as HTMLFormElement;
		if (event.key == 'Enter' && textarea.value.at(textarea.value.length - 1) == '\n') {
			event.preventDefault(); // no need to attach a newline
			form.querySelector('button')?.click();
		}
	}

	// bottom scroll magic
	let toScroll;
	onMount(scrollToBottom);
	afterUpdate(scrollToBottom);
	async function scrollToBottom() {
		toScroll.scroll({ top: 100000, behavior: 'smooth' });
	}
</script>

<section class="flex1c">
	<div class="chat-history flex1c" bind:this={toScroll}>
		{#each $messagesCache as message}
			{#if message.role === 'assistant'}
				<AssistantMessage {message} {scrollToBottom} />
			{:else}
				<card class="bubble-chat">
					{message.content}
				</card>
			{/if}
		{/each}
	</div>

	<form on:submit|preventDefault={sendChat}>
		<fieldset role="group">
			<textarea
				on:keydown={handleKeyDown}
				placeholder="Type your message here"
				rows="1"
				use:autosize
			/>
			<button>
				<Fa icon={faPaperPlane} />
			</button>
		</fieldset>
	</form>
</section>

<style>
	card {
		text-align: right;
		align-self: end;
		background-color: color-mix(
			in lch,
			var(--pico-secondary-background) 60%,
			var(--pico-background-color)
		);
		border-color: var(--pico-secondary);
		border-top-right-radius: 0;
	}

	.chat-history {
		min-height: calc(100vh - 5rem - 6 * var(--p-sma) - 2 * var(--p-mid));
		max-height: calc(100vh - 5rem - 6 * var(--p-sma) - 2 * var(--p-mid));
		gap: 0.5rem;
		padding: 0.5rem;
		overflow: auto;
	}

	.chat-history,
	form {
		width: 100%;
	}

	section,
	fieldset {
		padding-bottom: 0;
		margin-bottom: 0;
	}
</style>
