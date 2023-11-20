import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": new URL("./src/", import.meta.url).pathname,
      "@app": new URL("./src/application/", import.meta.url).pathname,
      "@infra": new URL("./src/infrastructure/", import.meta.url).pathname,
      "@domain": new URL("./src/domain/", import.meta.url).pathname,
      "@ui": new URL("./src/presentation/", import.meta.url).pathname,
    },
  },
});
