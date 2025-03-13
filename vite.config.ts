import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['zod', '@hookform/resolvers/zod']
  },
  build: {
    commonjsOptions: {
      include: [/zod/, /node_modules/]
    },
    rollupOptions: {
      // Make sure external packages that shouldn't be bundled are listed here
      external: [],
      // Provide globals for packages that are externalized
      output: {
        // Global variables to use in UMD build for externalized deps
        globals: {},
        manualChunks(id) {
          // Create a separate chunk for zod
          if (id.includes('node_modules/zod')) {
            return 'zod';
          }
        }
      },
    },
  },
}));
