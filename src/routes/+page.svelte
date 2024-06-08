<script>
    import "@picocss/pico";
    import './styles.css';
    import Sidebar from "../components/Sidebar.svelte";
    import Login from "../components/Login.svelte";
    import Footer from "../components/Footer.svelte";

    import {currentUser} from "../db";
    import Navbar from "../components/Navbar.svelte";
    import Chat from "../components/Chat.svelte";
</script>

<div class="app">
    <!-- if not logged in, show login form -->
    {#if !$currentUser}
        <Login/>
    {:else}
        <Navbar/>
        <main>
            <Sidebar/>
            <Chat/>
        </main>
    {/if}

    <Footer/>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        padding: var(--p-sma) var(--p-mid);
    }

    main {
        display: flex;
        height: calc(100vh - 5.2em);
    }

</style>
