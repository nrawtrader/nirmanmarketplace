

# Construction E-commerce Website — Phase 1 Plan

## What we'll build now

**1. Homepage** — A visually striking landing page with:
- Navigation bar with logo and menu links
- Full-screen hero section with headline, subtext, and two CTA buttons
- Animated construction-themed CSS elements (crane, cement bags, truck — built with CSS/SVG, no external assets)
- Features section with 4 icon cards (Calculator, AI Floor Plan, Guidance, Trusted Materials)
- Featured Products section with sample product cards (cement, steel, sanitary)
- Construction Knowledge section with educational blog-style cards
- Trust section (quality, pricing, delivery)
- Footer with contact, social links, FAQ, policies

**2. Material Calculator page** — The core differentiating feature:
- Step-by-step form: plot area, floors, house type (Simple/Standard/Premium), structure type, wall thickness
- Calculates estimated cement bags, steel tons, sand and aggregate cubic meters
- Displays results with approximate cost breakdown
- Clean, easy-to-understand UI for non-technical users

**3. Product Listing page** — Basic catalog with mock data:
- Category tabs (Cement, Steel, Sanitary)
- Product cards with image placeholder, brand, price, quantity, add-to-cart button
- Brand and price filters

**4. Routing and Navigation** — Links between all pages

## Design system

- **Colors**: Cement grey (`#6B7280`), Steel blue (`#1E3A5F`), Safety yellow (`#F59E0B`), white backgrounds
- **Fonts**: System sans-serif stack
- **Animations**: Scroll-reveal fade-ins, hover scale effects, smooth transitions using Tailwind + CSS keyframes
- **Construction-themed SVG illustrations** for hero section (no external images needed)

## Technical approach

- All frontend with React + TypeScript + Tailwind
- Mock product data in a constants file
- Calculator logic as pure functions
- Pages: `Index.tsx` (homepage), `Calculator.tsx`, `Products.tsx`
- Shared components: `Navbar.tsx`, `Footer.tsx`, `ProductCard.tsx`, `FeatureCard.tsx`
- Routes added to `App.tsx`
- Responsive design throughout

## File structure (new files)

```text
src/
  components/
    Navbar.tsx
    Footer.tsx
    ProductCard.tsx
    FeatureCard.tsx
    HeroSection.tsx
    FeaturesSection.tsx
    FeaturedProducts.tsx
    KnowledgeSection.tsx
    TrustSection.tsx
    CalculatorForm.tsx
    CalculatorResults.tsx
  pages/
    Index.tsx        (rewritten as homepage)
    Calculator.tsx
    Products.tsx
  data/
    products.ts      (mock product data)
    calculator.ts    (calculation logic + constants)
```

## What comes later (not in this phase)

- Individual product detail pages
- Cart and checkout
- User accounts and auth
- Floor plan generator (needs AI backend)
- Blog/knowledge hub with full articles
- Admin panel
- AI chatbot

