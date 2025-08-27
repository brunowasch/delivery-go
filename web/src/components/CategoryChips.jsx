const DEFAULT = ['Promoções', 'Pizza', 'Lanches', 'Japonesa', 'Brasileira', 'Doces', 'Bebidas']

export default function CategoryChips({ value, onChange, categories=DEFAULT }){
  return (
    <div className="chips">
      {['Tudo', ...categories].map(cat => {
        const active = value === cat || (cat==='Tudo' && !value)
        return (
          <div key={cat} className={`chip ${active ? 'active':''}`} onClick={()=>onChange(cat==='Tudo'? '': cat)}>
            {cat}
          </div>
        )
      })}
    </div>
  )
}
