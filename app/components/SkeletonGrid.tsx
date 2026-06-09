export default function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="container">
      <div className="sk-toolbar">
        <span className="sk sk-pill" style={{ flex: 1, minWidth: 160 }} />
        <span className="sk sk-pill" style={{ width: 150 }} />
        <span className="sk sk-pill" style={{ width: 150 }} />
      </div>
      <div className="card-grid" style={{ marginTop: 18, marginBottom: 40 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div className="card sk-card" key={i}>
            <div className="sk sk-media" />
            <div className="card-body">
              <span className="sk sk-line" style={{ width: "40%", height: 12 }} />
              <span className="sk sk-line" style={{ width: "80%", height: 18 }} />
              <span className="sk sk-line" style={{ width: "60%" }} />
              <span className="sk sk-line" style={{ width: "90%" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
