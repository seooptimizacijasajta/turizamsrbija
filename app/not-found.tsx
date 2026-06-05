import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container" style={{ padding: "120px 0", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem" }}>404</h1>
      <p style={{ color: "var(--slate)", margin: "12px 0 24px" }}>Stranica nije pronađena / Page not found.</p>
      <Link className="btn btn--primary" href="/">Početna / Home</Link>
    </div>
  );
}
