# VK Portfolio: Design Spec

Dark, cinematic, editorial developer portfolio. Black and red, condensed display type, thin outlines, handwritten notes, asymmetric layouts. Red is a controlled accent, never a flood.

## 1. Fonts
| Role | Font | Used for |
|---|---|---|
| Display | Anton | Headings, name, numbers, logo (always uppercase) |
| Body | Inter 400/500/600 | Paragraphs, nav, buttons |
| Handwritten | Caveat 600 | Annotations only, 1-2 per page, rotated -4 to -6 deg |
| Technical | JetBrains Mono 400 | Labels, tags, years, counters |

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap">

Type scale (display line-height 0.9-1):
- Hero name: clamp(110px, 19vw, 240px), red
- Page title h1: clamp(60px, 10vw, 140px)
- Section title h2: clamp(38px, 5.5vw, 72px)
- Item title h3: 28-44px
- Body: 16px / 1.65. Mono labels: 12-13px. Handwriting: 24-28px

The reference "VANSH" looks wider than Anton. For a closer match use Archivo Black or Inter 900 for that word only.

## 2. Colors
    --bg:#0a0a0b  page          --surf:#111113 panels
    --red:#ff2d2d accent        --crim:#7a1414 dark red (frames, glow, timeline fade)
    --txt:#ecebe8 text          --dim:#9a9aa0  labels
    --line:#2a2a2f thin borders
Paragraph text #c4c3bf, descriptions #b9b8b4. Background glow: fixed `radial-gradient(ellipse at 60% 20%, rgba(122,20,20,.35), transparent 55%)`, moved per page.
Red is for: active nav, primary buttons, one emphasised word per heading, arrows, timeline markers, hover states, art frames.

## 3. Style rules
- Use rows and 1px dividers rather than cards. Radius 2-3px. No pills.
- Content width 1160px, side padding 32px (20px mobile), section padding 80-90px.
- Art frame: `border:1px solid var(--red); box-shadow:0 0 0 6px var(--bg),0 0 0 7px var(--crim); transform:rotate(1.5deg)`.
- Art placeholder:
  `linear-gradient(115deg,transparent 58%,rgba(255,45,45,.22) 59%,transparent 60.5%), radial-gradient(circle at 65% 30%,#2a1414,transparent 55%), repeating-linear-gradient(-55deg,#131315 0 10px,#0e0e10 10px 20px)`
- Real art: desaturated, high contrast, red rim light (`filter:grayscale(1) contrast(1.1)`).
- Buttons: primary solid red, secondary 1px red outline, padding 12px 22px, arrow slides 4px on hover.
- Tags: mono 11-12px, 1px #37373d border, padding 3px 8px, red on hover or active.
- Asymmetry: tilt images 1-2 deg, indent second heading lines, overlap one element per page.

## 4. Animation (subtle only)
- Heading reveal: split into words then letters, stagger 30ms, 0.6s, translateY(24px) to 0. Splitting letters only breaks words mid-word.
- Nav underline: one absolute bar; left/width transition .35s cubic-bezier(.6,0,.2,1); follows hover, returns to active.
- Line drawing: SVG path with stroke-dasharray = stroke-dashoffset, animate offset to 0 (1.2s).
- Timeline nodes: IntersectionObserver (threshold .5) adds `.lit`: filled red + `0 0 0 6px rgba(255,45,45,.16)`.
- Hovers: button arrow +4px; list row padding-left +12-16px with faint red gradient; cards lift 10px; skill underline grows 0 to 100%; form field border and label turn red.
- Easing cubic-bezier(.2,.7,.2,1), 0.3-0.6s. Respect prefers-reduced-motion. No parallax, pulsing glow or flashing.

## 5. Pages
- Header (all): red VK logo left; Home / About / Projects / Skills / Experience; outlined "Let's Talk" right.
- Home: role list, giant red name over art, handwritten quote, intro, buttons, tilted card strip; then about teaser, work list, "Right now", CTA.
- About: title, intro, facts, philosophy, what I do, timeline.
- Projects: big title, filters, tilted featured project with overlapping panel, four uneven supporting projects.
- Skills: six category rows; big main skills, small tag skills, dot legend (full = daily, half = comfortable, empty = learning).
- Experience: vertical timeline; year left, marker on line, entry right; diamond = education.
- Contact: huge headline, underline-only form, links list, art slot.

## 6. Responsive
Breakpoint 900px: nav hides (add a menu button), grids go single column, Home hero stacks (art first, name overlapping its bottom edge), timeline line moves to the left edge. Use clamp() for fluid type.

## 7. Build options
- Simple: plain HTML/CSS/JS (see vk-portfolio/).
- Scalable: Astro or Next.js with a shared layout for header and footer.
- Extras: GSAP or Lenis for scroll; Formspree or EmailJS for the contact form.
