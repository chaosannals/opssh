import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dirs: ["src/dialogs", "src/components", "src/layouts"],
        resolvers: [ElementPlusResolver()],
      }),
    ],
    clearScreen: false,
    server: {
      port: 1420,
      strictPort: true,
    },
    envPrefix: ["VITE_", "TAURI_"],
    build: {
      // Windows：使用 Chromium ； macOS 使用 WebKit
      target:
        process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
      // // don't minify for debug builds
      // minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
      // // 为调试构建生成源代码映射 (sourcemap)
      sourcemap: !!process.env.TAURI_DEBUG,
    },
  };
});
