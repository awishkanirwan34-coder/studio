# STUDIO DEDUNU — Website

**Your Vision, Our Creativity.**

A premium, fully responsive creative studio website for a graphic design & web
development company. Built with pure HTML5, CSS3 and Vanilla JavaScript —
no build step, no dependencies to install.

## Project Structure

```
studio-dedunu/
├── index.html          # All page markup (semantic sections)
├── css/
│   └── style.css       # Full design system, animations & responsive rules
├── js/
│   └── main.js         # All interactivity (see feature list below)
└── images/             # Add your own project images here
```

## Features

- Sticky glassmorphism navbar with scroll-spy + mobile hamburger menu
- Full-screen hero with animated gradient orbs, floating cards,
  typewriter headline and animated stat counters
- About, Services (17 cards across Graphic Design + Web Development),
  Portfolio, Why Choose Us, Work Process timeline, Testimonials
- Portfolio category filtering (Vanilla JS) + lightbox with keyboard
  navigation (arrows / Escape)
- Animated 4-step process timeline with scroll-driven progress line
- Auto-playing testimonial slider with dots and arrows
- Contact & newsletter forms with floating labels and validation
  (front-end demo — ready to connect to a Spring Boot REST endpoint)
- Scroll-reveal animations, scroll progress bar, back-to-top button
- Fully responsive: desktop / tablet / mobile breakpoints

## How to Run

Simply open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

## Customization

- **Images**: portfolio/about images use `https://picsum.photos/seed/...`
  placeholders. Replace the `img src` values in `index.html` and the
  `portfolioItems` array in `js/main.js` with your real project images.
- **Colors**: all brand colors are CSS variables at the top of `style.css`
  (`--navy`, `--blue`, `--purple`, etc.).
- **Backend**: the contact form handler in `js/main.js` (section 13) shows
  where to plug in your Spring Boot `/api/contact` endpoint.
