import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
export default defineConfig(() => {

  return {
    base: './',
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    // server config
    server: {
      host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      port: 3000,
      open: true,
      cors: true,
    },
    // plugins
    plugins: [
      react(),
    ],
    // build configure
    build: {
      outDir: "build",
      // target: 'es2015', // 最低支持 es2015（ES6）
      // polyfillDynamicImport: true,

      minify: "esbuild",
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
