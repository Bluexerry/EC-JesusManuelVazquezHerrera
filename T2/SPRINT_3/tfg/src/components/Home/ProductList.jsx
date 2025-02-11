// Language: JavaScript (JSX)
import React from 'react';
import '../../styles/home.css';
import ProductCard from './ProductCard.jsx';

const ProductList = ({
  products,
  onAddToCart,
  onOpenChat,
  onOpenConfigurator,
  onOpenReviews,
  favorites,
  onToggleFavorite
}) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onOpenChat={onOpenChat}
          onOpenConfigurator={onOpenConfigurator}
          onOpenReviews={onOpenReviews}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default ProductList;