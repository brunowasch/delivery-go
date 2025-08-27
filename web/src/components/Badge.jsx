export default function Badge({ children, tone='brand', dot=false }) {
  return (
    <span className={`badge ${tone} ${dot ? 'dot' : ''}`}>
      {children}
    </span>
  )
}
