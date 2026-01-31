# Robot Shop — Design Style Guide

## Brand Identity

### Colors (60-30-10 Rule)
```css
/* 60% - Dominant (backgrounds) */
--bg-primary: #0f172a;      /* Deep navy - trust, tech */
--bg-secondary: #1e293b;    /* Slate - cards, sections */

/* 30% - Secondary (content areas) */
--surface: #334155;         /* Card backgrounds, borders */
--text-primary: #f1f5f9;    /* Main text - high contrast */
--text-secondary: #94a3b8;  /* Supporting text */

/* 10% - Accent (CTAs, highlights) */
--accent: #3b82f6;          /* Blue - primary actions */
--accent-hover: #2563eb;    /* Darker blue on hover */
--success: #22c55e;         /* Green - free items, success */
--premium: #f59e0b;         /* Amber - featured/bundle items */
```

### Typography
- **Headings:** Inter, 700 weight
- **Body:** Inter, 400 weight
- **Scale:** 1.25 ratio (Major Third)

```css
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */
--text-3xl: 2rem;     /* 32px */
--text-4xl: 2.5rem;   /* 40px */
```

### Spacing
Base unit: 4px
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

---

## Psychology Triggers

### Social Proof
- "Used by engineers at BMW, Volkswagen, Renault plants"
- "Created by a programmer with 8+ years on the factory floor"
- Number of downloads/customers when available

### Authority
- Emphasize real-world experience
- Technical accuracy in descriptions
- Professional design = professional product

### Reciprocity
- FREE KUKA reference (lead magnet)
- Valuable content before asking for purchase

### Scarcity (Honest)
- "Launch pricing" for bundles
- "New" badges on recent products

### Risk Reduction
- Clear product descriptions
- Preview content where possible
- Contact email prominently displayed

---

## SEO Requirements

### Meta Tags (per page)
```html
<title>Robot Programming Resources | KUKA, ABB, Fanuc Templates | Prime Robotics</title>
<meta name="description" content="Quick reference guides and production-ready code templates for industrial robots. KUKA KRL, ABB RAPID, Fanuc Karel, UR, Comau, Yaskawa. Created by engineers, for engineers.">
```

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "KUKA Pick & Place Template",
  "description": "Production-ready KRL code template...",
  "brand": { "@type": "Brand", "name": "Prime Robotics" },
  "offers": {
    "@type": "Offer",
    "price": "29.00",
    "priceCurrency": "EUR"
  }
}
```

### Heading Hierarchy
- H1: One per page (main title)
- H2: Section headers
- H3: Product names in cards

---

## UX Patterns

### Hero Section
1. Clear value proposition (what + who)
2. Social proof line
3. Primary CTA + Free offer

### Product Cards
1. Brand badge (top)
2. Product name (H3)
3. Benefit-focused description
4. Price (prominent)
5. CTA button

### Trust Footer
- About the creator
- Contact info
- Main site link

---

## Conversion Flow

1. **Land** → See value proposition + free offer
2. **Browse** → Scan products by category
3. **Compare** → Clear pricing, benefits visible
4. **Decide** → Low friction checkout
5. **Receive** → Instant download + email confirmation
