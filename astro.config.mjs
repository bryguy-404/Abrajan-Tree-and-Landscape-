import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://abrajantreeandcompletelandscape.com',
  output: 'static',
  devToolbar: { enabled: false },
  vite: {
    server: {
      proxy: {
        '/api/google-reviews': { target: 'http://127.0.0.1:8787' },
      },
    },
  },
});
