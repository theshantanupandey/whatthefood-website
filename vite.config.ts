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
      external: ['zod'],
      output: {
        globals: {
          zod: 'zod'
        },
      },
    },
    // Ensure assets in the public directory are included in the build
    assetsInclude: ['**/*.ico'],
  },
  // Properly handle public directory assets
  publicDir: 'public',
}));
