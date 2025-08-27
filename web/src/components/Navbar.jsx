import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const isActive = ({ isActive }) => `link ${isActive ? 'active' : ''}`

  return (
    <div className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="dot" />
          Delivery Proto
        </Link>
        <div className="navlinks">
          <NavLink to="/users" className={isActive}>Users</NavLink>
          <NavLink to="/restaurants" className={isActive}>Restaurants</NavLink>
          <NavLink to="/foods" className={isActive}>Foods</NavLink>
        </div>
      </div>
    </div>
  )
}
