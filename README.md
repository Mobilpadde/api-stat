# API-stat

I could not keep my eyes of off [readme.com](https://readme.com/metrics)'s beautiful API-metrics - so I did what any other (in)sane person would do, and re-created it with [svelte](https://kit.svelte.dev/)!

## Caveats

As for now, it's simply using a `setTimeout` to tell when a `request` has finished. Though, in the future, I'd love to use web-sockets - moreover actually listen for when a request has finished.

This might not be possible on vercel alone, but could be if I decide to couple on a datastore - e.g. redis?

## Stats!

[plausible](https://plausible.placetree.art/api-stat.vercel.app)
