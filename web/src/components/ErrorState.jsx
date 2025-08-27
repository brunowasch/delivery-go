export default function ErrorState({ message="Ocorreu um erro ao carregar.", action=null }) {
  return (
    <div className="state" style={{borderColor:'rgba(255,107,107,.45)'}}>
      <h3 style={{margin:0, color:'var(--danger)'}}>Falha no carregamento</h3>
      <p>{message}</p>
      {action}
    </div>
  )
}