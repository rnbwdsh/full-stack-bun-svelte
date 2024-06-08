<script>
    import {currentUser, pb} from "../db";
    import {Fa} from "svelte-fa";
    import {faSun, faMoon, faHamburger, faPencil, faPlus, faSignOut} from "@fortawesome/free-solid-svg-icons";
    import {sidebarOpen, darkMode} from "../store";
    import {onMount} from "svelte";

    /* for a theme picker, we just need this code, but we'll do that later
    const allowedColors = ["amber", "blue", "cyan", "fuchsia", "green", "grey", "indigo", "jade", "lime", "orange", "pink", "pumpkin", "purple", "red", "sand", "slate", "violet", "yellow", "zinc"]
    let randColor = allowedColors[Math.floor(Math.random() * allowedColors.length)];
    import ("@picocss/pico/css/pico."+randColor+".css");
    */

    function logout() {
        pb.authStore.clear()
    }

    darkMode.subscribe(value => {
        document.querySelector("html")?.setAttribute("data-theme", value ? "dark" : "light");
    });

    let chats = [];

    onMount(async () => {
        // fetch the chat messages from the server
        const results = await pb.collection("chats").getList(1, 999);
        chats = results.items;
    });
</script>

<nav>
    <div>
        <button on:click={() => $sidebarOpen = !$sidebarOpen}>
            <Fa icon={faHamburger}/>
        </button>
        {#if $sidebarOpen} &nbsp; Model select{/if}
    </div>

    <div>
        <fieldset role="group">
            <select>
                {#each chats as chat}
                    <option value={chat.title}>{chat.title}</option>
                {/each}
                <option value="New chat">New chat</option>
            </select>
            <!-- modal button to rename chat -->
            <button class="secondary">
                <Fa icon={faPencil}/>
            </button>

            <button>
                <Fa icon={faPlus}/>
            </button>

            <button on:click={() => darkMode.update(value => !value)}>
                <Fa icon={$darkMode ? faSun : faMoon}/>
            </button>
        </fieldset>
    </div>

    <div>
        <fieldset role="group">
        <button disabled class="outline">
            {$currentUser.username}
        </button>
        <button on:click={logout} class="">
            <Fa icon={faSignOut}/>
        </button>
        </fieldset>
    </div>
</nav>

<style>
    .username {
        border: 1px solid var(--pico-primary);
        border-radius: var(--pico-border-radius);
        padding: calc(var(--p-mid) - 3px);
    }

    nav div button {
        padding-right: var(--p-mid);
    }

    nav div select,
    nav div button {
        padding-top: var(--p-sma);
        padding-bottom: var(--p-sma);
        padding-left: var(--p-mid);
        outline: 1px groove grey;
    }
</style>