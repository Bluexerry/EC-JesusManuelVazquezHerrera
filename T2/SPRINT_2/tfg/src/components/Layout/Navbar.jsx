import React from 'react';
import '../../styles/layout.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand-logo">MiTienda</div>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/catalogo">Catálogo</Link></li>
        <li><Link to="/ofertas">Ofertas</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/weather">Tiempo</Link></li>
        <li><Link to="/login">Iniciar Sesión</Link></li>
        <li><Link to="/register">Registrarse</Link></li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Buscar videojuegos..." />
        <button>Buscar</button>
      </div>
    </nav>
  );
};

export default Navbar;