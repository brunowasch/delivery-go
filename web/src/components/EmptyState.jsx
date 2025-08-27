export default function EmptyState({ title="Nada por aqui", subtitle="Tente outra busca ou volte mais tarde.", action=null }) {
  return (
    <div className="state">
      <h3 style={{margin:0}}>{title}</h3>
      <p>{subtitle}</p>
      {action}
    </div>
  )
}