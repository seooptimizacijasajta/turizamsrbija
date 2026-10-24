// Univerzalni video embed: prepoznaje YouTube, Facebook, Instagram i TikTok
// iz zalepljenog linka i vraca iframe src + aspect. Bez API kljuceva.

export type VideoEmbed = { src: string; aspect: number; vertical: boolean };

export function videoEmbed(url: string | null | undefined): VideoEmbed | null {
  if (!url) return null;
  const u = url.trim();
  if (!u) return null;

  // YouTube (watch, youtu.be, embed, shorts)
  const yt = u.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  if (yt && /youtube\.com|youtu\.be/.test(u)) {
    return { src: `https://www.youtube.com/embed/${yt[1]}`, aspect: 56.25, vertical: false };
  }

  // TikTok (puni link sa numerickim ID-jem)
  if (/tiktok\.com/.test(u)) {
    const tk = u.match(/video\/(\d{6,})/) || u.match(/\/(\d{8,})/);
    if (tk) return { src: `https://www.tiktok.com/embed/v2/${tk[1]}`, aspect: 165, vertical: true };
  }

  // Instagram (post, reel, tv)
  const ig = u.match(/instagram\.com\/(p|reel|tv)\/([\w-]+)/);
  if (ig) {
    return { src: `https://www.instagram.com/${ig[1]}/${ig[2]}/embed`, aspect: 128, vertical: true };
  }

  // Facebook (video, watch, reel, fb.watch) -> plugin iframe
  if (/facebook\.com|fb\.watch/.test(u)) {
    return {
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(u)}&show_text=false`,
      aspect: 56.25,
      vertical: false,
    };
  }

  return null;
}
