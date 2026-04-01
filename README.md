# Raneesh MR — Personal Brand & FM Portfolio Site

Live site: **https://raneeshmr.github.io/**

A professional personal brand website for a Senior Facilities Manager based in Dubai, UAE.

## Tech Stack

- Pure HTML5 + CSS3 + Vanilla JS — **zero build step, zero dependencies**
- GitHub Pages hosting (free, automatic deploy on push)
- Formspree for contact form (free tier: 50 submissions/month)
- Google Fonts (Playfair Display + Outfit)

## Setup Checklist

### 1. Contact Form (Formspree)
1. Go to [formspree.io](https://formspree.io) → Sign up free
2. Create a new form → Name it "Portfolio Contact"
3. Copy your form endpoint (e.g. `https://formspree.io/f/xrgvkwzp`)
4. In `index.html`, find `YOUR_FORM_ID` and replace:
   ```html
   <form action="https://formspree.io/f/xrgvkwzp"
   ```

### 2. Google Analytics 4
1. Go to [analytics.google.com](https://analytics.google.com) → Create property
2. Get your Measurement ID (e.g. `G-ABCDEF1234`)
3. Uncomment and update the GA4 snippet in `index.html` `<head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-ABCDEF1234"></script>
   ```

### 3. Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → HTML tag verification
3. Uncomment and update in `index.html`:
   ```html
   <meta name="google-site-verification" content="YOUR_CODE" />
   ```
4. After deploy, submit `sitemap.xml`

### 4. Profile Photo
- Add your headshot as `headshot.jpg` (min 400×500px, WebP preferred)
- In `index.html`, replace the placeholder div:
  ```html
  <!-- Replace this: -->
  <div class="hero-avatar-placeholder">R</div>
  <!-- With this: -->
  <img src="headshot.webp" alt="Raneesh MR, Senior Facilities Manager Dubai" loading="eager" />
  ```

### 5. OG / Social Preview Image
- Create a 1200×630px image (Canva → Custom size)
- Save as `og-image.jpg`
- Place in root folder
- Update canonical URL in `index.html` meta tags

### 6. Update URLs
If using a custom domain, replace all instances of `raneeshmr.github.io` with your domain in:
- `index.html` (canonical, og:url, JSON-LD)
- `sitemap.xml`
- `robots.txt`

## Deploy to GitHub Pages

```bash
# First time
git init
git add .
git commit -m "feat: initial site deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# Subsequent updates
git add .
git commit -m "update: [description]"
git push
```

Then in your GitHub repo:
- Settings → Pages → Source: **GitHub Actions**
- Site deploys automatically on every push to `main`

## Custom Domain (Optional)

1. Buy domain at Namecheap (~$12/yr for `.com`)
2. Create file `CNAME` in repo root:
   ```
   www.raneesh-fm.com
   ```
3. In Namecheap DNS, add CNAME record:
   - Host: `www`
   - Value: `YOUR_USERNAME.github.io`
4. GitHub → Settings → Pages → Custom domain → enter domain
5. ✅ Enable "Enforce HTTPS"

## File Structure

```
├── index.html          ← Main site (all-in-one)
├── 404.html            ← Custom error page
├── sitemap.xml         ← For Google Search Console
├── robots.txt          ← Search engine instructions
├── CNAME               ← Custom domain (create if needed)
├── headshot.webp       ← Your photo (add this)
├── og-image.jpg        ← Social preview (add this)
└── .github/
    └── workflows/
        └── deploy.yml  ← Auto-deploy on push
```

## Performance

- Lighthouse Score targets: Performance 95+ | SEO 100 | Accessibility 95+
- No JavaScript frameworks, no build step
- Google Fonts preconnected
- Images lazy-loaded

## Lead Capture Automation

After setting up Formspree, connect it to Make.com (free tier) for:
- Email notification to yourself when form fires
- Auto-reply to the enquirer
- Google Sheets lead log

See the audit document for the Make.com scenario configuration.

---

**Contact:** raneesh.mr08@gmail.com | +971 55 646 9921 | Dubai, UAE
