"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import type { Post } from "@/lib/blog";

export default function BlogList({ posts }: { posts: Post[] }) {
  const { lang, t } = useLang();
  const base = lang === "en" ? "/en/blog/" : "/blog/";
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{t("blog_h")}</h1><p>{t("blog_lead")}</p></div>
      </section>
      <section className="section"><div className="container">
        {posts.length === 0 ? <div className="empty">{t("blog_none")}</div> : (
          <div className="card-grid">
            {posts.map((p) => {
              const title = (lang === "en" ? p.title_en : p.title_sr) || p.title_sr;
              const ex = (lang === "en" ? p.excerpt_en : p.excerpt_sr) || p.excerpt_sr || "";
              return (
                <Link key={p.id} className="card" href={base + p.slug}>
                  {p.cover_image && <div className="card-media">{/* eslint-disable-next-line @next/next/no-img-element */}<img loading="lazy" src={p.cover_image} alt={title} /></div>}
                  <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-desc">{ex}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div></section>
    </>
  );
}
