import React from 'react';

const ProductCard = ({ product, onAddToCart, onOpenChat, onOpenConfigurator }) => {
  return (
    <div className="product-card">
      <img src={product.cover} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.price} €</p>
      <div className="product-actions">
        <button onClick={() => onAddToCart(product)}>Agregar al Carrito</button>
        <button onClick={() => onOpenChat(product)}>Abrir Chat</button>
        <button onClick={() => onOpenConfigurator(product)}>Abrir Configurador</button>
      </div>
    </div>
  );
};

export default ProductCard;