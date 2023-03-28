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
  appType: "custom",
  server: {
    port: 3000,
    origin: 'http://localhost:3000',
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['.'],
    },
    proxy: {
      // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      '/sw.js': 'http://localhost:3000',
      // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
    },
  },
  preview: {
    port: 8080,
  },
  ssr: {
    external: false
  },
  build: {
    outDir: 'docs',
    sourcemap: true,
    minify: false,
    manifest: true,
    ssrManifest: true,
    ssr: true,
    rollupOptions: {
      input: '/src/client/client.js',
    }
  },
},({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), 'production')
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
})
