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
  // Ensure zod is properly pre-bundled
  optimizeDeps: {
    include: ['zod', '@hookform/resolvers/zod']
  },
  build: {
    // Ensure zod is properly bundled
    commonjsOptions: {
      include: [/node_modules/]
    },
    // Disable minification for debugging
    minify: mode === 'production',
    // Ensure source maps are generated
    sourcemap: true,
    // Ensure assets in the public directory are included in the build
    assetsInclude: ['**/*.ico'],
  },
  // Properly handle public directory assets
  publicDir: 'public',
}));
