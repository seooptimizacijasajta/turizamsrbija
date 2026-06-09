"use client";
import { useLang } from "@/lib/i18n";
import type { Post } from "@/lib/blog";

export default function BlogPost({ post }: { post: Post }) {
  const { lang } = useLang();
  const title = (lang === "en" ? post.title_en : post.title_sr) || post.title_sr;
  const body = (lang === "en" ? post.body_en : post.body_sr) || post.body_sr || "";
  return (
    <article>
      {post.cover_image && <div className="detail-hero" style={{ backgroundImage: `url(${post.cover_image})` }} />}
      <div className="container" style={{ maxWidth: 760, paddingTop: 36 }}>
        <h1 style={{ marginBottom: 18 }}>{title}</h1>
        {body.split(/\n+/).filter(Boolean).map((para, i) => (
          <p key={i} style={{ marginBottom: 14, lineHeight: 1.85, color: "var(--ink)" }}>{para}</p>
        ))}
      </div>
    </article>
  );
}
