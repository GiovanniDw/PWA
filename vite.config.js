import { defineConfig, loadEnv } from 'vite';
import {fileURLToPath} from 'url'
// export default defineConfig({
//   server: {
//     port: 3000,
//   },
//   preview: {
//     port: 8080,
//   },
// });


export default defineConfig({
  base: "/",
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
  build: {
    outDir: 'docs',
    sourcemap: true,
    minify: false,
    optimizeDeps: {
    include: ['./src/js/vendor/routie.js'],
    },
  },
  resolve: {
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@@': fileURLToPath(new URL('./src/server', import.meta.url))
    }
},
},({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
})