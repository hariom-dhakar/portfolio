import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/portfolio/",
  server: {
    host: true,
    allowedHosts: [".loca.lt"],
  },
  build: {
    target: "esnext",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("framer-motion")) {
              return "framer-motion-vendor";
            }
            if (id.includes("lucide-react") || id.includes("react-icons")) {
              return "icons-vendor";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
