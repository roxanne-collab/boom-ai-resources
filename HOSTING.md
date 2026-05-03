# Hosting your landing page on GitHub Pages

GitHub Pages is a good fit for learning GitHub because every site update is tied to a file change and a commit.

## Quick path: GitHub Pages

1. Create a GitHub account or sign in.
2. Create a new repository. A good name would be `boom-ai-resources`.
3. Upload these files and folders into the repository root:
   - `index.html`
   - `register.html`
   - `app.jsx`
   - `tweaks-panel.jsx`
   - `brand/`
   - `uploads/`
4. In the repository, go to **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose your main branch and `/ (root)`, then click **Save**.
7. Wait a few minutes. Your site will publish at a URL like `https://yourusername.github.io/boom-ai-resources/`.

GitHub's docs confirm that Pages hosts static HTML/CSS/JavaScript straight from a repository, and that you can publish from a branch/root folder. This version is fully static and does not need any API keys or backend setup.

## Other hosting options

- **Cloudflare Pages** — free, fast, dead simple if you already use Cloudflare for DNS
- **Vercel** — same drag-and-drop story as Netlify
- **GitHub Pages** — free, but you need a GitHub account and a tiny bit of setup
- **Your registrar** — GoDaddy, Namecheap, Bluehost etc. all include basic file hosting in most plans (look for "File Manager" or "cPanel" → upload all three files into `public_html`)

## On Wix specifically

Wix runs your design inside a sandboxed iframe via its **Embed Code / Custom Element** widget, which limits styling and breaks some interactive features. **Recommended approach:** host the landing page separately (Netlify Drop) and link to it from your Wix site as a button or menu item — your visitors won't notice the handoff, and you keep the design intact.

If you really want it inside Wix, I can prepare a single-file standalone version that fits in their HTML embed widget — just ask.

## Pointing a domain you already own

Whichever host you pick, the basic flow is the same:

1. Upload the page → host gives you a temporary URL
2. In the host's dashboard, "Add custom domain" → enter `yourdomain.com`
3. Host gives you 1–2 DNS records (usually an `A` record or `CNAME`)
4. Log in to wherever you bought your domain → DNS settings → paste the records
5. Wait 10 min – a few hours for it to propagate

Free SSL/HTTPS comes automatically with Netlify, Vercel, and Cloudflare.

## Files you need

For GitHub Pages, grab:
- `index.html`
- `register.html`
- `app.jsx`
- `tweaks-panel.jsx`
- `brand/`
- `uploads/`

They need to live together in the same folder.
