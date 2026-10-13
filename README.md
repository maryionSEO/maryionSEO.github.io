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

## Before the first deploy

Both real pages declare `https://maryionseo.github.io/` as their canonical address, in
`<link rel="canonical">` and `og:url`. **A canonical that doesn't match the address the
site actually serves from is worse than having none** — it tells search engines the wrong
thing confidently. Update both files to the real URL before or immediately after going live.

## Previewing locally

Opening `index.html` by double-clicking works for moving between pages, but it is not how
the site will behave once hosted. To preview it properly, serve it:

    cd ~/Desktop/maryion-site && python3 -m http.server 4173

Then open <http://localhost:4173>. Stop the server with Ctrl+C.

The 404 page can only be tested this way, not by double-clicking — it needs a server to be
served in response to a wrong address.
