# Kaiserapps

Run `npm ci` and `npm run dev` for local development. `npm run build` generates
the static site in `dist/`.

The Products catalog and its standalone pages share the data in `src/products.js`.
Each product has a root-level HTML entry and optimised artwork in
`public/product-media/<slug>/`.
Each directory includes a 1200×630 `share.jpg` for link previews. To refresh
these cards after changing product copy or artwork, install ImageMagick,
`rsvg-convert`, and DejaVu Sans, then run `node scripts/product-share-images.mjs`.
The same script generates the site share card and fallback PNG favicon from
`public/static/img/kaiserapps-frost.svg`. Set
`SHARE_CARD_FONT` and `SHARE_CARD_BOLD_FONT` to use other installed fonts.

Production runs on the `kaiserapps` Dokku app at `benkaiser.dev`. Push changes
to its `master` branch to deploy:

```sh
git push ssh://dokku@benkaiser.dev/kaiserapps HEAD:master
```

The Docker build compiles the site with Node; the runtime image only serves the
generated files with Nginx on port 5000. Dokku handles public domains and HTTPS.
GitHub Pages remains available as a separate build, without the production
custom domain.
