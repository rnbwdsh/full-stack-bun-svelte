<script>
import ModelSelect from "./ModelSelect.svelte";
import ChatHistory from "./ChatHistory.svelte";
export let open = false
export let url

</script>
<aside class:open>
    <!-- button to toggle open -->
    <span>
        <button on:click={() => open = !open}>
            {open ? "-" : "+"}
        </button>

        {#if open}
            <input type="text" bind:value={url} placeholder="Model" />
        {/if}
    </span>

    <!-- collapsible -->
    <ModelSelect bind:url={url} /><button value="+">+</button>
    <ChatHistory />

</aside>

<style>
    aside {
        max-width: 3rem;
        transition: left 0.5s;
        position: fixed;
        background-color: #f1f1f1;
        overflow: hidden;
        /* ignore all chars for overflow breaking */
        white-space: nowrap;
    }

    .open {
        max-width: 20rem;
        left: 0;
    }
</style>