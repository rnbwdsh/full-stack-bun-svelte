import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			// Proxy /ollama/* to Ollama with path rewrite to /api/*
			'/api/chat': {
				target: 'http://localhost:11434',
				changeOrigin: true,
			},
			'/api/tags': {
				target: 'http://localhost:11434',
				changeOrigin: true,
			},
			// Proxy api/collections/* to Pocketbase
			'/api/': {
				target: 'http://localhost:8090',
				changeOrigin: true,
				configure: (proxy, options) => {
					proxy.on('proxyReq', (proxyReq, req, res) => {
						// Forward the Authorization header
						if (req.headers['authorization']) {
							proxyReq.setHeader('Authorization', req.headers['authorization']);
						}
					});
				}
			},
			"/_": {
				target: 'http://localhost:8090',
				changeOrigin: true,
				configure: (proxy, options) => {
					proxy.on('proxyReq', (proxyReq, req, res) => {
						// Forward the Authorization header
						if (req.headers['authorization']) {
							proxyReq.setHeader('Authorization', req.headers['authorization']);
						}
					});
				}
			},
		}
	}
});
