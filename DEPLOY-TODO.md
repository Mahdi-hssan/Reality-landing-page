# Reality Sports landing: deploy and SEO checklist

Live address: **https://about.realitysport.net**
(`realitysport.net` itself is the club management app, a separate project.)

Work through the sections in order and tick each box as you go. Time estimates are for one person.

---

## 1. Before going live (in the code, about 10 min)

- [ ] **Contact email.** In `src/content/site.ts`, replace `contact@reality.tn` in `CONTACT.email` with the real sales inbox. Every "Book a demo" button sends an email there.
- [ ] **Store links.** In the same file, check that `APP_STORE_URL` and `PLAY_STORE_ID` point to the Reality Sports app.
- [ ] **Translations.** Ask a native speaker to read `/es` and `/ar`. The copy is in `src/content/dictionaries/es.ts` and `ar.ts`.
- [ ] Push to `main`. The pre-push hook runs `bun run build` and blocks the push if the build fails.

Already done in the code: the domain (`SITE_URL` = `https://about.realitysport.net`), titles starting with "Reality Sports", descriptions, hreflang for 4 languages, the sitemap, robots.txt, share images, structured data and Vercel Analytics/Speed Insights.

---

## 2. Connect the domain (about 5 min, plus up to 30 min waiting)

DNS for `realitysport.net` is managed in **Cloudflare**, not Route 53. The domain is registered with Amazon, but its nameservers point to Cloudflare, so **Route 53 records are ignored. Don't edit them.**

### Cloudflare
Open dash.cloudflare.com → **realitysport.net → DNS → Records → Add record**:

| Type | Name | Content | Proxy status |
|---|---|---|---|
| CNAME | `about` | `c9649505019fb8c8.vercel-dns-017.com` | **DNS only (grey cloud)** |
| TXT | `_vercel` | `vc-domain-verify=about.realitysport.net,89527eb7dd306d7fcbd2` | — |

- [ ] CNAME added, with the **grey** cloud. Orange breaks verification and HTTPS.
- [ ] TXT added. Keep it permanently; it's harmless.
- [ ] Don't delete records you don't recognise. The club app, `live.` and email depend on them.

### Vercel
- [ ] Project → **Settings → Domains** → click **Refresh** on `about.realitysport.net` and wait for **Valid Configuration**.
- [ ] Project → **Settings → Environment Variables**: if `NEXT_PUBLIC_SITE_URL` exists, set it to `https://about.realitysport.net` (no trailing slash). If it doesn't exist, you don't need to add it.
- [ ] **Deployments** → latest → **⋯ → Redeploy**.
- [ ] Project → **Analytics → Enable**, then **Speed Insights → Enable** (both free).

---

## 3. Check the live site (about 10 min)

- [ ] `https://about.realitysport.net/` redirects to `/en` (or the browser's language).
- [ ] `/fr`, `/en`, `/es`, `/ar` and each `/…/players` page load. `/ar` reads right to left.
- [ ] `https://about.realitysport.net/robots.txt` shows `Sitemap: https://about.realitysport.net/sitemap.xml`.
- [ ] `https://about.realitysport.net/sitemap.xml` lists 8 pages (4 languages × clubs and players), all on `about.realitysport.net`.
- [ ] **Share preview.** Paste the URL into https://www.opengraph.xyz and into a WhatsApp chat to yourself. The share image must appear.
- [ ] **Structured data.** Test `https://about.realitysport.net/en` at https://search.google.com/test/rich-results. Expected: Organization, SoftwareApplication, MobileApplication, FAQPage, with no errors.
- [ ] **Speed.** Test `/en` at https://pagespeed.web.dev, on mobile and desktop. Aim for 90 or higher.
- [ ] On an iPhone in Safari, the Reality Sports app banner appears at the top.

---

## 4. Google Search Console (about 15 min, results in 3–14 days)

This gets the site into Google and shows which searches bring visitors.

1. [ ] Go to https://search.google.com/search-console and sign in with the company Google account.
2. [ ] Click **Add property** → choose **Domain** (left box) → type `realitysport.net` (no `https://`, no `about.`). A Domain property covers the app and the landing together.
3. [ ] **Verify.** Google detects Cloudflare and offers **"Start verification"**. Log in to Cloudflare when asked and click **Authorize**; the TXT record is added for you.
   - If it doesn't offer that, copy the `google-site-verification=…` code, then in Cloudflare → DNS → **Add record**: Type `TXT`, Name `@`, Content = the code. Go back and click **Verify**.
4. [ ] **Submit the sitemap.** Left menu **Sitemaps** → enter `https://about.realitysport.net/sitemap.xml` → **Submit**. The status should become "Success", with 8 pages discovered.
5. [ ] **Request indexing.** In the top bar, **URL inspection**, paste each URL and click **Request indexing**. Start with the most important:
   - `https://about.realitysport.net/en`
   - `https://about.realitysport.net/fr`
   - `https://about.realitysport.net/ar`
   - `https://about.realitysport.net/es`
   - then the 4 `/players` pages
6. [ ] **After 3–14 days**, check:
   - **Indexing → Pages**: all 8 URLs are "Indexed".
   - **Performance → Search results**: which searches show you. Filter **Query contains "reality"** to track the brand.
   - **Experience / Enhancements**: fix anything in red.
7. [ ] Check Search Console **once a week** for the first month, then once a month.

---

## 5. Other search engines (about 10 min)

- [ ] **Bing Webmaster Tools**, at https://www.bing.com/webmasters. Click **Import from Google Search Console** (one click once step 4 is done). This covers Bing, DuckDuckGo, Yahoo and ChatGPT search, which uses Bing's index.
- [ ] **Yandex Webmaster** (optional), at https://webmaster.yandex.com. Only useful if you target Russian-speaking users.

---

## 6. Brand searches: being the result for "Reality Sports" (1–2 hours, the most important part)

Google can't tell which "Reality" you are from this site alone. It needs **other places** confirming that "Reality Sports" = `about.realitysport.net`. Do these in order:

1. [ ] **Link from the club app.** On `realitysport.net` (login page and footer), add a visible link "About Reality Sports" → `https://about.realitysport.net`. Do the same on `live.realitysport.net`. These are your own sites, so it's the fastest strong signal.
2. [ ] **Google Business Profile**, at https://business.google.com. Name: **Reality Sports**, category: *Software company*, website: `https://about.realitysport.net`, plus logo, photos, address and phone. This can produce the brand panel on the right side of Google results.
3. [ ] **App stores.** Set the website to `https://about.realitysport.net`:
   - App Store Connect → App Information → **Marketing URL** and **Support URL**
   - Play Console → Store settings → **Website**
4. [ ] **Social profiles.** Create or update Instagram, Facebook, LinkedIn (company page), TikTok and YouTube, all named **Reality Sports**, with the website link `https://about.realitysport.net` in the bio.
   - Then send the profile URLs to a developer to add to `sameAs` in `src/components/json-ld.tsx`. This tells Google these profiles belong to the same company.
5. [ ] **Partner clubs.** Ask every club using Reality to link to the site from their website, Instagram bio or booking page, for example "Bookings powered by Reality Sports". Each link from a real site helps ranking.
6. [ ] **Directories.** List Reality Sports on Capterra, G2, GetApp, Product Hunt and Crunchbase, plus local business directories in Tunisia, all linking to `https://about.realitysport.net`.

Being realistic: within 2–6 weeks you can expect to rank first for **"Reality Sports"**, **"realitysport"** and **"Reality padel"**. Ranking for just **"reality"** isn't realistic, because the word is too general (reality TV, music and so on). Users who search for the brand will type "Reality Sports".

---

## 7. Keep growing (ongoing, about 1 hour per week)

- **Content.** Add pages or articles that answer real searches, for example:
  - « logiciel gestion club padel »
  - « réservation terrain foot Tunisie »
  - « organiser un tournoi americano »
  - "how to find padel partners"

  Each new page needs its own title and description, and must be added to `src/app/sitemap.ts`.
- **Reviews.** More App Store and Google Play ratings help the app and the brand rank.
- **Freshness.** When you change the page, update `lastModified` in `src/app/sitemap.ts`.
- **Check every deploy.** The pre-push hook blocks pushes that would fail to build. After big changes, rerun the checks in section 3.
