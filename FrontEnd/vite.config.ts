import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  },
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ["@ant-design/charts"],
  },
});
