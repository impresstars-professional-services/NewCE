
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import compression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        vue(),
        compression()  // Added gzip compression for optimized builds
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 5173,
        strictPort: true,
        host: true
    },
    build: {
        sourcemap: false,  // Disable sourcemaps for production
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['vue', 'vue-router', 'pinia']  // Code splitting
                }
            }
        }
    }
});
