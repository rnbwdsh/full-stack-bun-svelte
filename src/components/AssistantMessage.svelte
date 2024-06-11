<!-- default ts component skleleton -->
<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { afterUpdate, onMount } from 'svelte';
	import { enabledModels, settings, messagesCache } from '../store';
	import { Ollama } from 'ollama/browser';
	import { pb } from '../db';

	export let message;
	export let scrollToBottom;
	afterUpdate(scrollToBottom);

	onMount(async () => {
		if (message.content) return;

		const ollama = new Ollama({ host: window.location.origin });
		const messages = message.messages;
		delete message.messages;

		const models = Object.keys($enabledModels);
		for (let j = 0; j < models.length; j++) {
			message.other[models[j]] = [];
			for (let i = 0; i < $settings.queries; i++) {
				message.other[models[j]].push(await queryModel(ollama, models[j], messages, !j && !i));
				message.other = Object.assign({}, message.other);
			}
		}

		pb.collection('messages').create(message).then();
		// replace last in $messagesCache with message
		$messagesCache = [...$messagesCache.slice(0, -1), message];
	});

	async function queryModel(ollama, model, messages, appendToMessage) {
		let responses = [];
		for await (const resp of await ollama.chat({ model, messages, stream: true })) {
			responses.push(resp.message);
			if (appendToMessage) {
				message.content += resp.message.content;
			}
			if (resp.done) break;
		}
		return responses;
	}

	async function setAnswer(event) {
		let bubble = event.target.closest('.bubble-inner');
		message.content = bubble.value;
		await pb.collection('messages').update(message.id, { content: message.content });
	}
</script>

<details class="bubble-chat" open={$settings.collapse}>
	<summary>
		<SvelteMarkdown source={message.content} />
	</summary>
	<span class={($settings.rotate1 ? 'flex1' : 'flex1c') + ' more'}>
		{#if message.other}
			{#each Object.keys(message.other) as model}
				<details open>
					<summary>{model}</summary>
					<div class={$settings.rotate2 ? 'flex1' : 'flex1c'}>
						{#each message.other[model] as responses_model}
							<button
								class="bubble-chat bubble-inner"
								on:dblclick={setAnswer}
								value={responses_model.map((r) => r.content).join('')}
							>
								{#each responses_model as response, i}
									<span class={'c' + (i % 2)}>{response.content}</span>
								{/each}
							</button>
						{/each}
					</div>
				</details>
			{/each}
		{/if}
	</span>
</details>

<style>
	.bubble-chat {
		text-align: left;
		align-self: start;
		background-color: color-mix(
			in lch,
			var(--pico-primary-background) 60%,
			var(--pico-background-color)
		);
		border: calc(var(--pico-border-width) * 2) solid;
		border-color: var(--pico-primary);
		border-radius: calc(var(--pico-border-radius) * 4);
		border-top-left-radius: 0;
	}

	.bubble-inner {
		background-color: var(--pico-secondary-background);
		margin: var(--p-sma);
	}

	/* used by `"c" + i % 2` magic */
	.c0 {
		color: color-mix(in srgb, var(--pico-primary) 80%, var(--pico-primary-inverse));
	}

	.c1 {
		color: color-mix(in srgb, var(--pico-secondary) 80%, var(--pico-primary-inverse));
	}
</style>
