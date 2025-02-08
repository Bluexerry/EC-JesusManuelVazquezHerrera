import React from 'react';
import '../../styles/layout.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <p>© 2023 MiTienda. Todos los derechos reservados.</p>
      <ul className="footer-links">
        <li><a href="/terminos">Términos y condiciones</a></li>
        <li><a href="/politica">Política de privacidad</a></li>
      </ul>
      <div className="social-icons">
        <a href="https://twitter.com">Twitter</a>
        <a href="https://facebook.com">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;