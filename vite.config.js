import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const partials = resolve(__dirname, 'src/partials');

export default defineConfig({
  root: 'src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about.html'),
        projects: resolve(__dirname, 'src/projects.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        lab: resolve(__dirname, 'src/lab/index.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: partials,
      context: {
        siteName: 'Kaiserapps',
        year: new Date().getFullYear(),
      },
    }),
  ],
  publicDir: '../public',
  appType: 'mpa',
});
