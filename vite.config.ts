import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteImagemin from 'vite-plugin-imagemin'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          includeAbsolute: true,
        },
      },
    }),
    viteImagemin({
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        progressive: true,
        quality: 65,
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    VueI18nPlugin({
      include: [
        fileURLToPath(new URL('./src/locales/**', import.meta.url)),
        fileURLToPath(new URL('./src/markdown/**/*.md', import.meta.url)),
      ],
    }),
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: 'esbuild',
    assetsInlineLimit: 4096,
    assetsDir: 'assets',
    chunkSizeWarningLimit: 800,
    cssCodeSplit: true,
    write: true,
    manifest: true,
    sourcemap: true,
    reportCompressedSize: true,
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'marked'],
    exclude: ['playground'],
  },

  esbuild: {
    treeShaking: true,
  },
})
