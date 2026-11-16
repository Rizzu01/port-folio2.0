# CreativeRizz — Portfolio 2.0

A completely redesigned, independent **Next.js** design portfolio for Rizwan Khan.

## Experience
- Dark editorial design language with electric-lime accents, expressive typography, animated ticker and reveal animations
- Responsive homepage, project gallery, service pages and privacy policy
- Original professional background, service descriptions, experience, contact information and social profiles
- Real portfolio projects loaded through a server-side proxy from the existing CreativeRizz Pinterest feed (no fake case studies)
- Full-screen project preview and Web3Forms enquiry form
- Accessibility basics: keyboard focus, dialogs, escape-to-close and reduced-motion styles

## Run locally
```bash
npm install
npm run dev
```
Then visit http://localhost:3000.

## Notes
- **The original `Rizzu01/port-folio` repository is not modified.**
- The image assets (`portrait.png` and `About.png`), CV, and public Pinterest feed are currently sourced from `www.creativerizz.in`. To make version 2 fully standalone, copy owned assets into `public/` and configure an independent Pinterest integration.
- Contact form uses the same client-side Web3Forms public access key as the original portfolio; confirm submissions before public launch.
- Metadata is intentionally `noindex` while this is a version 2 concept, to avoid competing with the existing production website. Update this before replacing the canonical live site.
- The project is not automatically deployed; connect this repository to Vercel to preview the UI.

## Pages
- `/`
- `/graphic-design`
- `/ui-ux-design`
- `/web-design`
- `/branding`
- `/fintech-crypto-design`
- `/privacy-policy`
