import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand-logo">MiTienda</div>
      <ul className="nav-links">
        <li><a href="/">Inicio</a></li>
        <li><a href="/catalogo">Catálogo</a></li>
        <li><a href="/ofertas">Ofertas</a></li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Buscar videojuegos..." />
        <button>Buscar</button>
      </div>
    </nav>
  );
};

export default Navbar;