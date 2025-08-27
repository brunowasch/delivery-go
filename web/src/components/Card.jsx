export default function Card({ title, subtitle, right, children, footer }) {
  return (
    <div className="card">
      {(title || right) && (
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
          {title ? <div className="card-title">{title}</div> : <div />}
          {right || null}
        </div>
      )}
      {subtitle && <p className="card-sub">{subtitle}</p>}
      {children}
      {footer && <div style={{marginTop:12}}>{footer}</div>}
    </div>
  )
}
