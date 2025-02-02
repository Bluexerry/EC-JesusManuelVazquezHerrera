import React, { useState, useEffect } from 'react';
import './styles/product.css';
import Navbar from './components/Layout/Navbar.jsx';
import HeroSection from './components/Home/HeroSection.jsx';
import ProductFilter from './components/Home/ProductFilter.jsx';
import ProductList from './components/Home/ProductList.jsx';
import CartPreview from './components/Home/CartPreview.jsx';
import Footer from './components/Layout/Footer.jsx';
import NotificationSystem from './components/Shared/NotificationSystem.jsx';
import { fetchProducts } from './services/products_API.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm.jsx';
import RegisterForm from './components/Auth/RegisterForm.jsx';
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm.jsx';
import ProductComparator from './components/Home/ProductComparator.jsx';
import VotingSystem from './components/Home/VotingsSystem.jsx';
import ProductConfigurator from './components/Home/ProductConfigurator.jsx';
import WeatherSearch from './components/Weather/WeatherSearch.jsx';


const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Estado para almacenar el producto activo a configurar
  const [activeConfiguratorProduct, setActiveConfiguratorProduct] = useState(null);

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

  const handleConfigure = (configuredProducts) => {
    setFilteredProducts(configuredProducts);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleOpenChat = (product) => {
    alert(`Abrir chat para ${product.name}`);
  };

  // Al hacer clic en "Abrir Configurador" se asigna el producto activo para configurar
  const handleOpenConfigurator = (product) => {
    setActiveConfiguratorProduct(product);
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
                    <>
                      <ProductList
                        products={filteredProducts}
                        onAddToCart={handleAddToCart}
                        onOpenChat={handleOpenChat}
                        onOpenConfigurator={handleOpenConfigurator}
                      />
                      <div className="interactive-container">
                        <div className="interactive-item">
                          <ProductComparator products={filteredProducts} />
                        </div>
                        <div className="interactive-item">
                          <VotingSystem products={filteredProducts} />
                        </div>
                        <div className="interactive-item">
                          <ProductConfigurator
                            products={products}
                            activeProduct={activeConfiguratorProduct}
                            setActiveProduct={setActiveConfiguratorProduct}
                            onConfigure={handleConfigure}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <CartPreview
                    cartItems={cartItems}
                    onRemoveFromCart={handleRemoveFromCart}
                  />
                </>
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/weather" element={<WeatherSearch />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </NotificationSystem>
  );
};

export default App;