export default function Skeleton({ rows = 1 }) {
  return (
    <div className="d-flex flex-column gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton p-3 rounded-3">
          <div className="skeleton-header mb-2" />
          <div className="skeleton-body" />
        </div>
      ))}
    </div>
  );
}
