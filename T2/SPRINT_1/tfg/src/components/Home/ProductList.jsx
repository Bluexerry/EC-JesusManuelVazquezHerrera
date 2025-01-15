import React from 'react';
import ProductCard from './ProductCard';
import '../../styles/home.css';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products && products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;