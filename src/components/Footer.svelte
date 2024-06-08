<script>
    const credits = {
        backend: 'SvelteKit',
        server: 'Bun',
        text_ai: 'Ollama',
        css: 'PicoCss',
        database: 'Pocketbase'
    };
    const links = {
        backend: 'https://kit.svelte.dev/',
        server: 'https://bun.sh/',
        text_ai: 'https://ollama.com/',
        css: 'https://picocss.com/',
        database: 'https://pocketbase.io/'
    };
</script>

<footer>
    <!-- mention tech stack: SvelteKit backend, Bun server, Ollama llm server, ComfyUi image server, pocketbase database -->
    <small>Created by Markus Vogl using
		&#123;
        {#each Object.keys(credits) as key}
			{key}: <a href={links[key]}>{credits[key]}</a>,&nbsp;
		{/each}
        &#125;
	</small>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--p-sma) 0;
    }
</style>