// Language: JavaScript (JSX)
import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import '../../styles/product.css';

const ProductCard = ({
  product,
  onAddToCart,
  onOpenChat,
  onOpenConfigurator,
  onOpenReviews,
  favorites,
  onToggleFavorite
}) => {
  const isFavorite = favorites && favorites.some((fav) => fav.id === product.id);

  return (
    <div className="product-card">
      <div
        className="favorite-icon"
        onClick={() => onToggleFavorite(product)}
        title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {isFavorite ? <FaStar style={{ color: 'gold' }} /> : <FaRegStar />}
      </div>
      <img src={product.cover} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.price} €</p>
      <div className="product-actions">
        <button onClick={() => onAddToCart(product)}>Agregar al Carrito</button>
        <button onClick={() => onOpenChat(product)}>Abrir Chat</button>
        <button onClick={() => onOpenConfigurator(product)}>Abrir Configurador</button>
        <button onClick={() => onOpenReviews(product)}>Valoraciones</button>
      </div>
    </div>
  );
};

export default ProductCard;