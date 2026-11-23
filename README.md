# Kaiserapps

Run `npm ci` and `npm run dev` for local development. `npm run build` generates
the static site in `dist/`.

Production runs on the `kaiserapps` Dokku app at `benkaiser.dev`. Push changes
to its `master` branch to deploy:

```sh
git push ssh://dokku@benkaiser.dev/kaiserapps HEAD:master
```

The Docker build compiles the site with Node; the runtime image only serves the
generated files with Nginx on port 5000. Dokku handles public domains and HTTPS.
GitHub Pages remains available as a separate build, without the production
custom domain.
