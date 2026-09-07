# CyberXatria Website

Static-first company profile and customer portal prototype for CyberXatria, built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run lint
npm run build
```

The build is exported as a static site to `out/`.

## Implemented routes

- `/` — landing page
- `/company` — company profile
- `/solutions/soc` — SOC as a Service
- `/solutions/cyber-drill` — Cyber Drill Exercise
- `/solutions/tabletop` — Cyber Security Tabletop Exercise
- `/signup`, `/verify-account`, `/account-created`, `/login` — onboarding flow
- `/dashboard`, `/request-demo`, `/pricing`, `/billing` — customer portal flow

## Integration notes

The forms and dashboard currently use presentation data and client-side transitions so every required page can be reviewed end-to-end. Authentication, OTP delivery, payment, CRM, and backend APIs can be connected later without changing the page structure.

Set `NEXT_PUBLIC_SITE_URL` to the production origin when building so canonical Open Graph URLs point to the deployed domain.
