# Casa Labs Online

> **Deployment status (May 30, 2026):** `main` currently serves the **"Coming Soon" splash** (`src/app/page.tsx`, `src/components/coming-soon/`, `public/casa-labs/`). The full store/blog site is preserved on the **`full-site`** branch.
>
> **To restore the full site:** repoint Vercel's production branch to `full-site`, **or** merge/restore it into `main` (e.g. `git checkout full-site -- . && git commit`) and redeploy. The launch countdown targets **July 1, 2026** — edit `LAUNCH` in `src/components/coming-soon/Countdown.tsx` to change it. Everything below describes the full store, not the current splash.

A modern, responsive product catalog for Casa Labs — rebuilt from the ground up with Next.js and the App Router. Browse 127 research peptide products across 22+ categories with instant search, advanced filtering, side-by-side comparison, and full light/dark theme support.

**Live site:** [casa-peptides-catalogue.vercel.app](https://casa-peptides-catalogue.vercel.app)

---

## Features

- **127-Product Catalog** — Comprehensive peptide listing with category tabs, keyword search, price-range filtering, and multiple sort options.
- **Product Detail Pages** — Individual pages for every product with size-variant selectors, structured specifications, and related-product recommendations.
- **Side-by-Side Comparison** — Select up to 4 products and compare them in a detailed table with a "Highlight Differences" toggle.
- **Category Browsing** — Dedicated pages for each of the 22+ categories with scoped filters and breadcrumb navigation.
- **Blog with MDX Support** — Category-filtered blog section powered by MDX and `next-mdx-remote` for rich content authoring.
- **Light & Dark Theme** — OS-aware theme detection with manual toggle; cream/tan/gold palette for light mode.
- **Responsive Design** — Optimized layouts from desktop to mobile, including frosted-glass header, full-width compare bar on small screens, and adaptive grid columns.
- **Deployed on Vercel** — Continuous deployment from the `main` branch with preview environments for every push.

---

## Tech Stack

| Layer         | Technology                                      |
| ------------- | ----------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org/) (App Router)  |
| Language      | TypeScript                                      |
| UI            | React 19, CSS Modules                           |
| Blog / MDX    | `next-mdx-remote`, `gray-matter`                |
| Hosting       | [Vercel](https://vercel.com/)                   |
| Analytics     | Contentsquare / Hotjar                          |

---

## Project Structure

```
casa-peptides-online/
├── Images/Casa-logos/        # Brand logos and bottle imagery
├── public/images/            # Static product and hero images
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── blog/             # Blog listing and [slug] pages
│   │   ├── catalog/          # Catalog listing, [category], product/[slug]
│   │   ├── compare/          # Side-by-side comparison page
│   │   ├── globals.css       # Global styles and theme variables
│   │   ├── layout.tsx        # Root layout (fonts, metadata, analytics)
│   │   └── page.tsx          # Homepage with hero and category cards
│   ├── components/
│   │   ├── blog/             # Blog list, post cards, category filter
│   │   ├── catalog/          # Catalog client, product grid, filters
│   │   ├── compare/          # Comparison table and controls
│   │   ├── home/             # Homepage hero and category cards
│   │   ├── layout/           # Header, footer, navigation
│   │   ├── product/          # Product detail, size variants, tabs
│   │   ├── providers/        # Theme and context providers
│   │   └── HashRedirect.tsx  # Legacy hash-route redirect handler
│   ├── content/blog/         # MDX blog posts
│   ├── data/
│   │   ├── peptides.json     # Full 127-product dataset
│   │   └── consolidated-categories.ts  # Category definitions
│   ├── hooks/
│   │   ├── useCompare.ts     # Compare selection state (max 4)
│   │   └── useProductFilter.ts  # Search, filter, and sort logic
│   └── lib/
│       ├── blog.ts / blog-types.ts  # Blog data loading and types
│       ├── categories.ts     # Category helpers
│       ├── products.ts       # Product data access layer
│       ├── types.ts          # Shared TypeScript interfaces
│       └── utils.ts          # General utilities
├── Peptide_Catalog.html      # Original single-file SPA (legacy)
├── CATALOG_PLAN.md           # Detailed redesign specification
├── REDESIGN_PLAN.md          # UI/UX redesign planning doc
├── UPGRADE_PLAN.md           # Migration and upgrade notes
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── vercel.json               # Vercel deployment settings
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/TomsTools11/casa-peptides-online.git
cd casa-peptides-online

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

---

## Usage

### Browsing the Catalog

Navigate to `/catalog` to view all 127 products. Use the category tabs to filter by category, the search bar for keyword lookup, or the price-range inputs to narrow results. Toggle between card and table views, and sort by name, price, or category.

### Product Details

Click any product card to view its detail page at `/catalog/product/[slug]`. Each page shows specifications, available size variants (with pill selectors that link between sizes), and related products from the same category.

### Comparing Products

Check the compare box on up to 4 product cards. A floating compare bar appears at the bottom of the screen — click "Compare Now" to open the side-by-side comparison view at `/compare`. Use the "Highlight Differences" toggle to visually spot variations across products.

### Blog

Visit `/blog` to read research articles. Posts are authored in MDX under `src/content/blog/` and support category-based filtering.

---

## Adding Content

### New Product

Add a new entry to `src/data/peptides.json` following the existing object schema (name, category, catalog number, sizes, prices, description).

### New Blog Post

Create a new `.mdx` file in `src/content/blog/` with frontmatter for title, date, category, and excerpt. The blog system will pick it up automatically.

---

## Deployment

The project is configured for [Vercel](https://vercel.com/) with `vercel.json`. Pushing to the `main` branch triggers a production deployment. Pull requests and other branches generate preview deployments automatically.

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure your code follows the existing TypeScript and CSS Module conventions used throughout the project.

---

## License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

Built by [TomsTools11](https://github.com/TomsTools11) with development assistance from [Claude](https://github.com/claude).
