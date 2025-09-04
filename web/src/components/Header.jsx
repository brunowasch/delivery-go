import 'bootstrap/dist/css/bootstrap.min.css';
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

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-danger fixed-top shadow">
      <div className="container-fluid">
        <div className="d-flex w-100 align-items-center">
          {/* Logo */}
          <h1 className="navbar-brand text-white m-0">
            <Link className="nav-link text-white mx-3" to="/">
              <img src={logo} alt="Logo DeliveryGo" style={{ height: "40px", marginRight: "8px" }} />
              DeliveryGo
            </Link>
          </h1>

          {/* Links da esquerda */}
          <div className="d-flex">
            <Link className="nav-link text-white mx-3 nav-underline" to="/">Início</Link>
            <Link className="nav-link text-white mx-3 nav-underline" to="/restaurantes">Restaurantes</Link>
            <Link className="nav-link text-white mx-3 nav-underline" to="/comidas">Comidas</Link>
            <Link className="nav-link text-white mx-3 nav-underline" to="/usuarios">Meus amigos</Link>
          </div>

          {/* Links da direita */}
          <div className="d-flex ms-auto">
            <Link className="nav-link text-white mx-3 nav-underline" to="/criar-conta">Criar Conta</Link>
            <Link className="nav-link text-white mx-3 nav-underline" to="/entrar">Entrar</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
