import React from 'react';
import '../../styles/home.css';

const ProductList = ({ products, onAddToCart, onOpenChat, onOpenConfigurator }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.cover} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <p>${product.price}</p>
          <button onClick={() => onAddToCart(product)}>Agregar al carrito</button>
          <button onClick={() => onOpenChat(product)}>Abrir Chat</button>
          {/* Se asegura de que se llame al prop recibido */}
          <button onClick={() => onOpenConfigurator(product)}>Abrir Configurador</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;