"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import type { Post } from "@/lib/blog";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";

export default function BlogList({ posts }: { posts: Post[] }) {
  const { lang, t } = useLang();
  const visible = lang === "sr" ? posts : posts.filter((p) => lang === "de" ? p.title_de : p.title_en);
  const [shown, setShown] = useState(24);
  useEffect(() => { setShown(24); }, [lang]);
  const base = lang === "sr" ? "/blog/" : `/${lang}/blog/`;
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{t("blog_h")}</h1><p>{t("blog_lead")}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t("nav_blog") }]} /></div>
      <section className="section"><div className="container">
        {visible.length === 0 ? <div className="empty">{t("blog_none")}</div> : (<>
          <div className="card-grid">
            {visible.slice(0, shown).map((p) => {
              const title = (lang !== "sr" ? p.title_en : p.title_sr) || p.title_sr;
              const ex = (lang !== "sr" ? p.excerpt_en : p.excerpt_sr) || p.excerpt_sr || "";
              return (
                <Link key={p.id} className="card" href={base + p.slug}>
                  {p.cover_image && <div className="card-media"><Image fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px" src={p.cover_image} alt={title} style={{ objectFit: "cover" }} /></div>}
                  <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-desc">{ex}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          {visible.length > shown && <div style={{ textAlign: "center", marginTop: 24 }}><button className="btn btn--outline" onClick={() => setShown((x) => x + 24)}>{lang === "sr" ? "Prikaži još" : lang === "de" ? "Mehr anzeigen" : "Show more"}</button></div>}
        </>)}
      </div></section>
    </>
  );
}
