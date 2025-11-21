import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), viteCompression(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/",
  envDir: "./",
  envPrefix: "VITE_",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    port: 60263,
    // https: {
    //   key: readFileSync(keyFilePath),
    //   cert: readFileSync(certFilePath),
    // },
  },
});
