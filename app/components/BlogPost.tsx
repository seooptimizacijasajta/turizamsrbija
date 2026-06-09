"use client";
import { useLang } from "@/lib/i18n";
import type { Post } from "@/lib/blog";
import Breadcrumbs from "./Breadcrumbs";
import ShareButtons from "./ShareButtons";
import { homePath } from "@/lib/slug";

export default function BlogPost({ post }: { post: Post }) {
  const { lang, t } = useLang();
  const title = (lang === "en" ? post.title_en : post.title_sr) || post.title_sr;
  const body = (lang === "en" ? post.body_en : post.body_sr) || post.body_sr || "";
  return (
    <article>
      {post.cover_image && <div className="detail-hero" style={{ backgroundImage: `url(${post.cover_image})` }} />}
      <div className="container" style={{ maxWidth: 760, paddingTop: 36 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t("nav_blog"), href: lang === "en" ? "/en/blog" : "/blog" }, { name: title }]} />
        <h1 style={{ marginBottom: 12 }}>{title}</h1>
        <ShareButtons title={title} />
        {body.split(/\n+/).filter(Boolean).map((para, i) => (
          <p key={i} style={{ marginBottom: 14, lineHeight: 1.85, color: "var(--ink)" }}>{para}</p>
        ))}
      </div>
    </article>
  );
}
