<script lang="ts">
    import {onMount} from 'svelte';
    import {enabledModels} from '../store';
    import ollama from "ollama/browser";
    import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
    import {Fa} from "svelte-fa";

    // correct typing for messages: Array {role: assistant | user}, content: string}
    let messages: {role: "assistant" | "user", content: string}[] = [];
    let nextMessage = "reply 'test'";

    async function chat() {
        messages.push({role: "user", content: nextMessage});
        nextMessage = "";  // clear the input
        messages = [...messages];  // trigger reactivity
        // get the first enabledModel
        const model = Object.keys($enabledModels)[0];
        const response = await ollama.chat({model, messages, stream: true});
        let lastMessage = {role: "assistant", content: ""};
        messages.push(lastMessage)
        for await (const resp of response) {
            const message = resp.message;
            lastMessage.content += message.content
            messages = [...messages];  // trigger reactivity
            if(resp.done) break;
        }
        console.log(messages);
    }
</script>

<section>
    <div class="chat-history">
        <card class="user">
            Hi! I have a question.
        </card>
        <card class="assistant">
            Hello! How can I help you today?
        </card>
        {#each messages as message}
            <card class={message.role}>
                {message.content}
            </card>
        {/each}
    </div>
    <fieldset role="group">
        <input placeholder="Type your message here" type="text" bind:value={nextMessage}/>
        <button on:click={chat}>
            <Fa icon={faPaperPlane}/>
        </button>
    </fieldset>
</section>

<style>
    .assistant {
        text-align: left;
        align-self: start;
        background-color: var(--pico-primary-background);
        border-color: var(--pico-primary);
        border-top-left-radius: 0;
    }

    .user {
        text-align: right;
        align-self: end;
        background-color: var(--pico-secondary-background);
        border-color: var(--pico-secondary);
        border-top-right-radius: 0;
    }

    card {
        padding: var(--p-mid);
        margin: 0;
        width: fit-content;
        border: calc(var(--pico-border-width)*2) solid;
        border-radius: calc(var(--pico-border-radius)*4);
        color: var(--pico-primary-inverse);
    }

    .chat-history {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem;
        margin: 0;
        width: 100%;
    }

    section {
        flex: 1;
        display: flex;
        flex-direction: column;
        /* center vertically and horicontally */
        justify-content: center;
        align-items: center;
        padding-bottom: 0;
        margin-bottom: 0;
    }

    fieldset {
        padding-bottom: 0;
        margin-bottom: 0;
    }

    .chat-history {
        flex: 1;
        overflow-y: auto;
    }
</style>