// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/product.css'; // Importa el CSS correcto
import Navbar from './components/Layout/Navbar.jsx';
import HeroSection from './components/Home/HeroSection.jsx';
import ProductFilter from './components/Home/ProductFilter.jsx';
import ProductList from './components/Home/ProductList.jsx';
import CartPreview from './components/Home/CartPreview.jsx';
import Footer from './components/Layout/Footer.jsx';
import NotificationSystem from './components/Shared/NotificationSystem.jsx';
import { fetchProducts } from './services/products_API.js'; // Importa la función fetchProducts
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm.jsx';
import RegisterForm from './components/Auth/RegisterForm.jsx';
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm.jsx';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar la carga

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

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

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
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
    <NotificationSystem>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <ProductFilter onFilter={handleFilter} />
                  {isLoading ? (
                    <div className="loader" aria-label="Cargando productos...">
                      {/* Spinner de carga */}
                    </div>
                  ) : (
                    <ProductList
                      products={filteredProducts}
                      onAddToCart={handleAddToCart}
                      onOpenChat={handleOpenChat}
                      onOpenConfigurator={handleOpenConfigurator}
                    />
                  )}
                  <CartPreview cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
                </>
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            {/* Agrega más rutas según sea necesario */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </NotificationSystem>
  );
};

export default App;