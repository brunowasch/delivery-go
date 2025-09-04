import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png';

function Header() {
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const loc = useLocation();

  function onSearch(e) {
    e.preventDefault();
    if (loc.pathname !== '/') nav('/');
    const usp = new URLSearchParams(location.search);
    usp.set('q', q);
    history.replaceState(null, '', `/?${usp.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  }

  const collapseId = 'navbarSupportedContent';

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-danger fixed-top shadow">
      <div className="container-fluid">

        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center text-white text-decoration-none">
          <img
            src={logo}
            alt="Logo DeliveryGo"
            style={{ height: 40, marginRight: 8 }}
          />
          <span className="fw-semibold">DeliveryGo</span>
        </Link>

        {/* Toggler para mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-controls={collapseId}
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Área colapsável */}
        <div className="collapse navbar-collapse" id={collapseId}>
          {/* Navegação */}
          <ul className="navbar-nav gap-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white nav-underline" to="/">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white nav-underline" to="/restaurantes">Restaurantes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white nav-underline" to="/comidas">Comidas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white nav-underline" to="/usuarios">Meus amigos</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
