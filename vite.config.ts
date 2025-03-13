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
    // Custom plugin to resolve zod
    {
      name: 'resolve-zod',
      resolveId(source: string) {
        // Intercept zod imports
        if (source === 'zod') {
          return { id: 'zod', external: false };
        }
        return null;
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['zod']
  },
  optimizeDeps: {
    include: ['zod', '@hookform/resolvers/zod']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    },
    minify: mode === 'production',
    sourcemap: true,
    assetsInclude: ['**/*.ico'],
  },
  publicDir: 'public',
}));
