import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const DEFAULT_API_URL = 'http://localhost:9380';

const preconnectApi = (apiUrl) => ({
  name: 'preconnect-api',
  transformIndexHtml: () => [
    { tag: 'link', attrs: { rel: 'preconnect', href: new URL(apiUrl).origin, crossorigin: '' }, injectTo: 'head' },
  ],
});

const inlineCss = () => ({
  name: 'inline-css',
  apply: 'build',
  enforce: 'post',
  generateBundle(_options, bundle) {
    const html = Object.values(bundle).find((file) => file.fileName === 'index.html');
    if (!html) return;

    let source = String(html.source);
    for (const [fileName, file] of Object.entries(bundle)) {
      if (!fileName.endsWith('.css')) continue;
      const link = new RegExp(`<link rel="stylesheet"[^>]*href="/${fileName}"[^>]*>`);
      if (!link.test(source)) continue;
      source = source.replace(link, () => `<style>${file.source}</style>`);
      delete bundle[fileName];
    }
    html.source = source;
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiUrl = env.VITE_API_URL || DEFAULT_API_URL;

  return {
    plugins: [react(), tailwindcss(), preconnectApi(apiUrl), inlineCss()],
    server: { port: 5173 },
    preview: { port: 4173 },
    build: {
      target: 'es2022',
      reportCompressedSize: false,
    },
  };
});
