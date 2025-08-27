export default function Skeleton({ rows=1 }) {
  return (
    <div style={{display:'grid', gap:12}}>
      {Array.from({length: rows}).map((_,i) => <div key={i} className="skeleton"/>)}
    </div>
  )
}