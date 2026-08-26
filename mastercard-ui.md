# Exact card code

This is the featured sidebar card from `src/components/pages/ArticlePage.tsx`, copied as implemented.

Fonts (load these):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

---

## Component (exact)

```tsx
import Link from "next/link";

function CategoryTag({ name }: { name: string }) {
  return (
    <span className="bg-primary px-2 py-1 text-primary-foreground kicker">
      {name}
    </span>
  );
}

<Link
  href={`/article/${a.slug}`}
  className="group flex flex-col rounded-[1.75rem] bg-card p-2 text-left shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
>
  <div className="relative min-h-[360px] overflow-hidden rounded-[1.35rem] p-5 md:min-h-[400px]">
    <img
      src={a.image}
      alt=""
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
    <div className="relative flex min-h-[340px] flex-col justify-end md:min-h-[380px]">
      <CategoryTag name={a.category} />
      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-white">
        {a.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/75">
        {a.excerpt}
      </p>
      <span className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-ink">
        Read story
      </span>
    </div>
  </div>
</Link>
```

`a` is:

```ts
{
  slug: string;
  image: string;
  category: string; // e.g. "Food & Health"
  title: string;
  excerpt: string;
}
```

---

## CSS the classes need (exact)

```css
:root {
  --font-display: "Archivo Black", "Arial Black", sans-serif;
  --font-sans: "Barlow", system-ui, sans-serif;
  --card: oklch(1 0 0);
  --primary: oklch(0.53 0.223 28.5);
  --primary-foreground: oklch(0.99 0.005 85);
  --ink: oklch(0.16 0.012 60);
  --shadow-lift: 0 18px 40px -24px oklch(0.2 0.02 40 / 0.45);
}

h3 {
  font-family: var(--font-display);
  letter-spacing: -0.015em;
  line-height: 1.05;
}

.bg-card { background-color: var(--card); }
.bg-primary { background-color: var(--primary); }
.text-primary-foreground { color: var(--primary-foreground); }
.text-ink { color: var(--ink); }
.shadow-lift { box-shadow: var(--shadow-lift); }

.kicker {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
```

Body/UI text uses Barlow. Headlines use Archivo Black.
