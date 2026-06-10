"use client";
import { useLang } from "@/lib/i18n";
import type { Post } from "@/lib/blog";
import Breadcrumbs from "./Breadcrumbs";
import ShareButtons from "./ShareButtons";
import JsonLd from "./JsonLd";
import Link from "next/link";
import { homePath, sectionPath } from "@/lib/slug";
import { guideBySlug, relatedGuides, blogHref } from "@/lib/guides";
import ExternalLinks from "./ExternalLinks";

export default function BlogPost({ post }: { post: Post }) {
  const { lang, t } = useLang();
  const title = (lang === "en" ? post.title_en : post.title_sr) || post.title_sr;
  const body = (lang === "en" ? post.body_en : post.body_sr) || post.body_sr || "";
  const desc = (lang === "en" ? post.excerpt_en : post.excerpt_sr) || post.excerpt_sr || title;
  const g = guideBySlug(post.slug);
  const rel = relatedGuides(post.slug, 4);
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: desc,
    image: post.cover_image || undefined,
    datePublished: post.created_at,
    dateModified: post.created_at,
    inLanguage: lang === "en" ? "en" : "sr-Latn-RS",
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://turizamsrbija.com${lang === "en" ? "/en" : ""}/blog/${post.slug}` },
    author: { "@type": "Organization", name: "Turizam Srbija" },
    publisher: { "@type": "Organization", name: "Turizam Srbija", logo: { "@type": "ImageObject", url: "https://turizamsrbija.com/icon.png" } },
  };
  return (
    <article>
      <JsonLd data={ld} />
      {post.cover_image && <div className="detail-hero" style={{ backgroundImage: `url(${post.cover_image})` }} />}
      <div className="container" style={{ maxWidth: 760, paddingTop: 36 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t("nav_blog"), href: lang === "en" ? "/en/blog" : "/blog" }, { name: title }]} />
        <h1 style={{ marginBottom: 12 }}>{title}</h1>
        <ShareButtons title={title} />
        {body.split(/\n+/).filter(Boolean).map((para, i) => (
          <p key={i} style={{ marginBottom: 14, lineHeight: 1.85, color: "var(--ink)" }}>{para}</p>
        ))}
        {(g || rel.length > 0) && (
          <div className="blog-links" style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
            {g && (
              <p style={{ marginBottom: 14 }}>
                <Link className="btn btn--primary" href={sectionPath(g.kind, lang)}>
                  {lang === "en" ? `Browse accommodation in this category` : `Pogledajte smeštaj u ovoj kategoriji`}
                </Link>
              </p>
            )}
            {rel.length > 0 && (
              <>
                <h3 style={{ margin: "10px 0 10px" }}>{lang === "en" ? "Related guides" : "Slični vodiči"}</h3>
                <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", listStyle: "none", padding: 0 }}>
                  {rel.map((r) => (
                    <li key={r.slug}><Link href={blogHref(r.slug, lang)} style={{ color: "var(--green-600)", fontWeight: 600 }}>→ {lang === "en" ? r.en : r.sr}</Link></li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
        <ExternalLinks place={g?.place} />
      </div>
    </article>
  );
}
