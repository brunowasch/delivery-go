import Badge from './Badge'

const PHOTOS = [
  'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800&auto=format&fit=crop',
]

export default function FoodCard({ f, onAdd }){
  const img = f.image || PHOTOS[f.id % PHOTOS.length]
  const desc = f.description || 'Delicioso e preparado na hora.'
  const available = f.available ?? true

  return (
    <div className="card food-card">
      <div>
        <h4 className="food-title">{f.name}</h4>
        <p className="food-desc">{desc}</p>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <span className="food-price">R$ {Number(f.price ?? 0).toFixed(2)}</span>
          <Badge tone={available ? 'ok':'danger'}>{available ? 'Disponível':'Indisponível'}</Badge>
        </div>
      </div>
      <img className="food-thumb" src={img} alt={f.name} />
      <div style={{gridColumn:'1 / -1', display:'flex', justifyContent:'flex-end'}}>
        <button className="btn brand" disabled={!available} onClick={onAdd}>Adicionar</button>
      </div>
    </div>
  )
}
