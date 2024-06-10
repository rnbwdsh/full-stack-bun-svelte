<script lang="ts">
    import {currentUser, pb} from "../db";
    import {Fa} from "svelte-fa";
    import {
        faCaretDown,
        faHamburger,
        faMoon,
        faPencil,
        faPlus,
        faRotate,
        faRotateBack,
        faSignOut,
        faSun,
        faTrash
    } from "@fortawesome/free-solid-svg-icons";
    import {currentChatId, settings} from "../store";
    import {onMount} from "svelte";
    import FaButton from "./FaButton.svelte";

    /* for a theme picker, we just need this code, but we'll do that later
    const allowedColors = ["amber", "blue", "cyan", "fuchsia", "green", "grey", "indigo", "jade", "lime", "orange", "pink", "pumpkin", "purple", "red", "sand", "slate", "violet", "yellow", "zinc"]
    let randColor = allowedColors[Math.floor(Math.random() * allowedColors.length)];
    import ("@picocss/pico/css/pico."+randColor+".css");
    */

    let chats: Array<{ id: string, title: string }> = [];

    settings.subscribe(value => {
        document.querySelector("html")?.setAttribute("data-theme", value.darkMode ? "dark" : "light");
    });

    async function reload() {
        pb.collection("chats").getList(1, 999).then(
            async (res) => {
                chats = res.items
                if (chats.length == 0) {
                    await createChat();
                }
                if ($currentChatId == null || !chats.find(chat => chat.id === $currentChatId)) {
                    $currentChatId = chats[0].id;
                }
            }
        );
    }

    onMount(reload);

    function createChat() {
        const timestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
        pb.collection("chats").create({title: timestamp, user: $currentUser.id}).then((chat) => {
            $currentChatId = chat.id;
            chats = [...chats, chat];
        })
    }

    function renameChat() {
        let chat = chats.find(chat => chat.id === $currentChatId);
        let title = window.prompt("Enter new chat name", chat.title);
        if (title != null && title.trim() !== "") {
            chat.title = title;
            pb.collection("chats").update($currentChatId, {title: chat.title}).then(reload);
        }
    }

    function deleteChat() {
        pb.collection("chats").delete($currentChatId).then(reload);
    }
</script>

<nav>
    <div>
        <fieldset role="group">
            <FaButton setting="sidebarOpen" icon={faHamburger}/>
            {#if $settings.sidebarOpen}
                <select bind:value={$settings.queries}>
                    {#each [1, 2, 3, 4, 5] as query}
                        <option value={query}>{query}</option>
                    {/each}
                </select>
            {/if}
    </div>

    <div>
        <fieldset role="group">
            <select bind:value={$currentChatId}>
                {#each chats as chat}
                    <option value={chat.id}>{chat.title}</option>
                {/each}
            </select>
            <!-- modal button to rename chat -->
            <FaButton onClick={createChat} icon={faPlus} />
            <FaButton onClick={renameChat} icon={faPencil} className="secondary" />
            <FaButton onClick={deleteChat} icon={faTrash} className="outline" />
        </fieldset>
    </div>

    <!-- both fieldsets are in the same row -->
    <div>
        <fieldset role="group">
            <button on:click={() => $settings.darkMode = !$settings.darkMode}>
                <Fa icon={$settings.darkMode ? faSun : faMoon}/>
            </button>

            <FaButton setting="rotate1" icon={faRotate}/>
            <FaButton setting="rotate2" icon={faRotateBack}/>
            <FaButton setting="collapse" icon={faCaretDown}/>

            <button class="outline" disabled>
                {$currentUser.username}
            </button>
            <button class="" on:click={() => pb.authStore.clear()}>
                <Fa icon={faSignOut}/>
            </button>
        </fieldset>
    </div>
</nav>

<style>
    dialog form div button {
        flex-grow: 1;
        margin: var(--p-mid);
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

    fieldset {
        margin-bottom: var(--p-sma);
    }
</style>