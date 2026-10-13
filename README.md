# Maryion

A personal project to learn SEO by building a site and keeping a public record of it.

Plain HTML and CSS. No framework, no build step, no JavaScript — every file in this
repo is served exactly as it is written.

## Pages

| File | URL once live | What it is |
|---|---|---|
| `index.html` | `/` | About — what the site is for |
| `notes/index.html` | `/notes/` | Notes index. Currently an empty state: no notes published yet |
| `notes/notes.css` | — | Shared styling for the notes section |
| `404.html` | any unmatched address | Custom "page not found" page |

## Canonical addresses

One page can be reached at several addresses — with and without `www`, over `http` and
`https`, at the `github.io` address and at the custom domain. The `<link rel="canonical">`
tag in each page's `<head>` names which one is official, so search engines treat them as a
single page rather than several copies.

`index.html` and `notes/index.html` currently declare `https://maryionseo.com/`.

**This becomes wrong the moment the custom domain goes live.** When `maryionseo.com` is
serving the site, update the canonical and `og:url` in both files to match:

    cd ~/Desktop/maryion-site && grep -rl "maryionseo.github.io" . \
      | xargs sed -i '' 's|https://maryionseo.com|https://maryionseo.com|g'

Then re-upload the two changed files. Not before — a canonical pointing at a domain that
isn't answering yet is worse than one pointing at a working address you plan to retire.

## Previewing locally

Opening `index.html` by double-clicking works for moving between pages, but it is not how
the site will behave once hosted. To preview it properly, serve it:

    cd ~/Desktop/maryion-site && python3 -m http.server 4173

Then open <http://localhost:4173>. Stop the server with Ctrl+C.

The 404 page can only be tested this way, not by double-clicking — it needs a server to be
served in response to a wrong address.
