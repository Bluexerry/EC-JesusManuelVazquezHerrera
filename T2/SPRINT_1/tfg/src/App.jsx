// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar.jsx';
import HeroSection from './components/Home/HeroSection.jsx';
import ProductFilter from './components/Home/ProductFilter.jsx';
import ProductList from './components/Home/ProductList.jsx';
import CartPreview from './components/Home/CartPreview.jsx';
import Footer from './components/Layout/Footer.jsx';

// Datos simulados de productos
const mockProducts = [
  {
    id: 1,
    name: 'The Legend of Zelda: Breath of the Wild',
    price: 45,
    category: 'aventura',
    brand: 'nintendo',
    rating: 5,
    cover: '/assets/products/zelda.jpg',
  },
  {
    id: 2,
    name: 'God of War',
    price: 50,
    category: 'accion',
    brand: 'sony',
    rating: 4,
    cover: '/assets/products/godofwar.jpg',
  },
  {
    id: 3,
    name: 'FIFA 23',
    price: 60,
    category: 'deportes',
    brand: 'ea',
    rating: 4,
    cover: '/assets/products/fifa23.jpg',
  },
  // Agrega más productos según sea necesario
];

const App = () => {
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [cartItems, setCartItems] = useState([]);

  const handleFilter = (filters) => {
    let updatedProducts = [...products];

    if (filters.category) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.brand) {
      updatedProducts = updatedProducts.filter(
        (product) => product.brand === filters.brand
      );
    }

    if (filters.rating) {
      updatedProducts = updatedProducts.filter(
        (product) => product.rating >= filters.rating
      );
    }

    if (filters.priceRange) {
      updatedProducts = updatedProducts.filter(
        (product) => product.price <= filters.priceRange[1]
      );
    }

    setFilteredProducts(updatedProducts);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const handleOpenChat = (product) => {
    // Implementa la lógica para abrir el chat
    alert(`Abrir chat para ${product.name}`);
  };

  const handleOpenConfigurator = (product) => {
    // Implementa la lógica para abrir el configurador
    alert(`Abrir configurador para ${product.name}`);
  };

  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <ProductFilter onFilter={handleFilter} />
      <ProductList
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        onOpenChat={handleOpenChat}
        onOpenConfigurator={handleOpenConfigurator}
      />
      <CartPreview cartItems={cartItems} />
      <Footer />
    </div>
  );
};

export default App;