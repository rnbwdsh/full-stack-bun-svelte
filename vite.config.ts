import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 1337,
		proxy: {
			// Proxy /ollama/* to Ollama with path rewrite to /api/*
			'/api/chat': {
				target: 'http://localhost:11434',
				configure: (proxy, options) => {
					proxy.on('proxyReq', (proxyReq, req, res) => {
						// Forward the Authorization header
						proxyReq.setHeader('Origin', 'http://127.0.0.1:1337');
					});
				}
			},
			'/api/tags': {
				target: 'http://localhost:11434',
				changeOrigin: true
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
			'/_/': {
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
			}
		}
	}
});
