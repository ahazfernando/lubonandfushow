import type { ReactNode } from "react";

function inline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith("*") && p.endsWith("*") && p.length > 2)
      return <em key={i}>{p.slice(1, -1)}</em>;
    return p;
  });
}


/** Minimal Markdown renderer for the editor preview and article body. */
export function Markdown({ source }: { source: string }) {
  const blocks = source.split(/\n{2,}/);
  return (
    <div className="prose-press">
      {blocks.map((block, i) => {
        const b = block.trim();
        if (!b) return null;
        if (b.startsWith("### ")) return <h3 key={i}>{inline(b.slice(4))}</h3>;
        if (b.startsWith("## ")) return <h2 key={i}>{inline(b.slice(3))}</h2>;
        if (b.startsWith("# ")) return <h2 key={i}>{inline(b.slice(2))}</h2>;
        if (b.startsWith("> ")) return <blockquote key={i}>{inline(b.slice(2))}</blockquote>;
        if (b.startsWith("- ") || b.startsWith("* "))
          return (
            <ul key={i}>
              {b.split("\n").map((li, j) => (
                <li key={j}>{inline(li.replace(/^[-*]\s*/, ""))}</li>
              ))}
            </ul>
          );
        if (/^\d+\.\s/.test(b))
          return (
            <ol key={i}>
              {b.split("\n").map((li, j) => (
                <li key={j}>{inline(li.replace(/^\d+\.\s*/, ""))}</li>
              ))}
            </ol>
          );

        return <p key={i}>{inline(b)}</p>;
      })}
    </div>
  );
}
