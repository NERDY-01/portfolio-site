# VK Portfolio (starter)

Static site: plain HTML, CSS and JS. No build step.

## Run
Open `index.html` in a browser, or serve the folder: `python3 -m http.server` then visit http://localhost:8000

## Structure
- `index.html, about.html, projects.html, skills.html, experience.html, contact.html`
- `css/base.css`: shared tokens, buttons, heading animation
- `css/<page>.css`: layout for each page (includes some repeated shared rules; trim duplicates as you like)
- `js/main.js`: heading reveal, sliding nav underline, timeline reveal, project filters, contact form
- `assets/`: put your art here (see SPEC.md for the image treatment)

## To do
1. Replace placeholder text, names, links and email (`hello@example.com`, also in `js/main.js`).
2. Replace each `.art` / `.pic` placeholder with `<img>` (grayscale, high contrast, red rim light).
3. Fonts load from Google Fonts. Self-host them for production.
4. Add a mobile menu button: the nav is hidden under 900px.
