## Hypefy Marketing Site

Hypefy Marketing Site is a **Next.js 16 (App Router)** project that powers the public landing page and blog for Hypefy, an AI‑native influencer marketing platform.  
The site is content‑driven via **Storyblok** and uses **static generation (SSG)** and **incremental static regeneration (ISR)** for performance.

---

## Tech stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Content**: Storyblok (JS + React SDK, generated TypeScript types)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Images**: Next.js `next/image` with remote images allowed from `a.storyblok.com`

---

## Project structure (high level)

- `app/layout.tsx` – Root layout, global fonts and `<body>` shell.
- `app/page.tsx` – Hypefy marketing **homepage** (SSG, `dynamic = "force-static"`).
- `app/blog/page.tsx` – **Blog index**, lists Storyblok articles as cards (ISR, `revalidate = 60`).
- `app/blog/[slug]/page.tsx` – **Article detail** pages, Storyblok‑backed (ISR, `revalidate = 60`).
- `app/_lib/storyblok.ts` – Storyblok SDK init (`storyblokInit`, `getStoryblokApi`, `StoryblokComponent`).
- `app/_providers/StoryblokProvider.tsx` – Simple provider that ensures Storyblok is initialised for RSC.
- `app/_storyblok/ArticlePageBlok.tsx` – React component mapped to the `article-page` Storyblok component.
- `app/_storyblok/types/**` – Generated Storyblok TypeScript types for this space.

---

## Content model & Storyblok

- Articles are stored under the **`articles/`** folder in your Storyblok space.
- Each article uses the **`article-page`** component with at least:
  - `headline` (string)
  - `image` (`StoryblokAsset`)
  - `text` (`StoryblokRichtext`)
- The React mapping for `article-page` lives in `app/_storyblok/ArticlePageBlok.tsx` and is registered in `app/_lib/storyblok.ts`.
- Rich text fields are rendered via the Storyblok React renderer so editors can use headings, lists, bold text, emojis, etc.

---

## Routing & rendering

- **Homepage** `/`

  - Pure SSG via `export const dynamic = "force-static"` in `app/page.tsx`.
  - Contains hero, “how it works”, client/results, and CTA sections with a dark, gradient UI.

- **Blog index** `/blog`

  - Fetches stories from Storyblok with `starts_with: "articles/"`.
  - Renders each article as a card linking to `/blog/[slug]`.
  - Uses ISR via `export const revalidate = 60`.

- **Article page** `/blog/[slug]`
  - Dynamic route that:
    - Uses `generateStaticParams` to prebuild known article slugs.
    - Uses `generateMetadata` to pull per‑article `<title>` and meta description.
    - Uses ISR (`revalidate = 60`) per article.
  - Renders the mapped `article-page` blok via `StoryblokComponent`.
  - Includes a “Back to articles” link to return to `/blog`.

---

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Set environment variables**

   Create a `.env.local` file in the project root:

   ```bash
   NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN=your_storyblok_preview_token
   ```

3. **Run the dev server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   Open `http://localhost:3000` in your browser.

---

## Storyblok tooling

This project includes Storyblok CLI helpers for keeping types in sync with your space:

- **Pull component definitions**

  ```bash
  npm run storyblok-pull-components
  ```

- **Generate TypeScript types**

  ```bash
  npm run storyblok-generate-types
  ```

These commands update the files under `app/_storyblok/types/**` (and `.storyblok/types/**`).

---

## Deployment notes

- The project uses **Next.js App Router** and is compatible with platforms like Vercel and any Node‑capable host.
- ISR relies on the build environment being able to **revalidate pages**; ensure your target platform supports Next.js ISR.
- Remote images from Storyblok are allowed via `next.config.ts`:

  ```ts
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
    ],
  }
  ```

Once deployed, editors can publish in Storyblok and see updated content on the blog index and article pages after the ISR revalidation window.
