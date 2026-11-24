import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { productGroups, products } from './src/products.js';

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
        products: resolve(__dirname, 'src/products.html'),
        ...Object.fromEntries(products.map(({ slug }) => [slug, resolve(__dirname, `src/${slug}.html`)])),
        contact: resolve(__dirname, 'src/contact.html'),
        lab: resolve(__dirname, 'src/lab/index.html'),
        'vidgrid-privacy': resolve(__dirname, 'src/vidgrid/privacy.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: partials,
      context: (pagePath) => ({
        siteName: 'Kaiserapps',
        year: new Date().getFullYear(),
        productGroups,
        product: products.find(({ slug }) => pagePath === `/${slug}.html`),
      }),
    }),
  ],
  publicDir: '../public',
  appType: 'mpa',
});
