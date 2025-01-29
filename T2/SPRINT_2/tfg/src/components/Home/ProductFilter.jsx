import React, { useState } from 'react';
import '../../styles/home.css';

const ProductFilter = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState('');

  const handleFilterChange = () => {
    onFilter({ category, priceRange, brand, rating });
  };

  return (
    <div className="product-filter">
      <h3>Filtros Avanzados</h3>
      <div className="filter-group">
        <label>Categoría</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Todas</option>
          <option value="accion">Acción</option>
          <option value="aventura">Aventura</option>
          <option value="deportes">Deportes</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Precio</label>
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, e.target.value])}
        />
        <span>Hasta {priceRange[1]} €</span>
      </div>

      <div className="filter-group">
        <label>Marca</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Todas</option>
          <option value="nintendo">Nintendo</option>
          <option value="sony">Sony</option>
          <option value="microsoft">Microsoft</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
      </div>

      <div className="filter-group">
        <label>Valoración</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Todas</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
      </div>

      <button onClick={handleFilterChange}>Aplicar Filtros</button>
    </div>
  );
};

export default ProductFilter;