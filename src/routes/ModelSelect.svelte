<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from "svelte/store";

    export let url = "http://localhost:11434/";
    // create variable that binds to localstorage.enabledModels
    let tags = [];
    let store;

    onMount(async () => {
        store = writable(JSON.parse(localStorage.getItem("store")) || {});
        store.subscribe(val => localStorage.setItem("store", JSON.stringify(val)));

        // fetch the tags from the server
        const response = await fetch(url + "api/tags");
        tags = await response.json()
            .then(data => data.models)
            .then(models => models.sort((a, b) => a.name.localeCompare(b.name)))
            .catch(error => console.error('Error:', error));
        console.log(tags);
    });

    function formatDetails(details) {
        return Object.entries(details).map(([key, value]) => `${key}: ${value}`).join("\n");
    }

    function formatTitle(tag) {
        return tag.name.replace(":latest", "").split("/").pop();
    }
</script>

<ul>
    {#each tags as tag}
    <li>
        <!-- mouseover text: jsonified tag.details, each detail in a separate line, i.e. a: asdf\nb: bsdf without trailing {/}-->
        <label class:enabled={$store[tag.name]} title={formatDetails(tag.details)}>
            <input type="checkbox" bind:checked={$store[tag.name]} value={tag.name} />
            {formatTitle(tag)}
        </label>
    </li>
    {/each}

</ul>

<style>
    /* selected tags are bold */
    label.enabled {
        font-weight: bold;
    }
    /* checkboxes in front are not shown, but working internally */
    input {
        display: none;
    }
    /* no list items */
    ul {
        list-style-type: none;
        padding: 0.2em;
    }
</style>