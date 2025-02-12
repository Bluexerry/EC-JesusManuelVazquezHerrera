// Language: JavaScript (JSX)
// [src/App.jsx]
import React, { useState, useEffect } from 'react';
import './styles/product.css';
import Navbar from './components/Layout/Navbar.jsx';
import HeroSection from './components/Home/HeroSection.jsx';
import ProductFilter from './components/Home/ProductFilter.jsx';
import ProductList from './components/Home/ProductList.jsx';
import CartPreview from './components/Home/CartPreview.jsx';
import Footer from './components/Layout/Footer.jsx';
import FavoritesList from './components/HDU/FavouritesList.jsx';
import { fetchProducts } from './services/products_API.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm.jsx';
import RegisterForm from './components/Auth/RegisterForm.jsx';
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm.jsx';
import ProductComparator from './components/Home/ProductComparator.jsx';
import VotingSystem from './components/Home/VotingsSystem.jsx';
import ProductConfigurator from './components/Home/ProductConfigurator.jsx';
import WeatherSearch from './components/Weather/WeatherSearch.jsx';
import DetailedWeatherSearch from './components/Weather/DetailedWeatherSearch.jsx';
import ProductReviews from './components/HDU/ProductReview.jsx';
import { ThemeProvider } from './components/Theme/ThemeContext.jsx';
import NotificationProvider, { useNotification } from './components/Shared/NotificationSystem.jsx';
import ProductQA from './components/HDU/ProductQA.jsx'; // [`ProductQA`](src/components/HDU/ProductQA.jsx)
import DetailedWeatherMap from './components/Weather/DetailedWeatherMap.jsx';
const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeConfiguratorProduct, setActiveConfiguratorProduct] = useState(null);
  const [activeReviewProduct, setActiveReviewProduct] = useState(null);
  const [activeQAProduct, setActiveQAProduct] = useState(null);

  const showNotification = useNotification();

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
    setActiveQAProduct(product);
    showNotification('info', `Abriendo chat de preguntas para: ${product.name}`);
  };

  const handleOpenConfigurator = (product) => {
    setActiveConfiguratorProduct(product);
  };

  const handleOpenReviews = (product) => {
    setActiveReviewProduct(product);
  };

  const toggleFavorite = (product) => {
    const exists = favorites.find((p) => p.id === product.id);
    if (exists) {
      setFavorites(favorites.filter((p) => p.id !== product.id));
      showNotification('info', `${product.name} eliminado de favoritos.`);
    } else {
      setFavorites([...favorites, product]);
      showNotification('success', `${product.name} añadido a favoritos.`);
    }
  };

  return (
    <NotificationProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <div className="home-container">
                      <div className="sidebar">
                        <ProductFilter onFilter={handleFilter} />
                        <FavoritesList
                          favorites={favorites}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                      <div className="main">
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
                              onOpenReviews={handleOpenReviews}
                              favorites={favorites}
                              onToggleFavorite={toggleFavorite}
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
                      </div>
                    </div>
                  </>
                }
              />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              <Route path="/weather" element={<WeatherSearch />} />
              <Route path="/weather/detailed" element={<DetailedWeatherSearch />} />
              <Route path="/weather/detailed/map" element={<DetailedWeatherMap />} />
            </Routes>
            <Footer />

            {/* Modal de reseñas */}
            {activeReviewProduct && (
              <ProductReviews
                product={activeReviewProduct}
                onClose={() => setActiveReviewProduct(null)}
              />
            )}

            {/* Modal de Preguntas y Respuestas */}
            {activeQAProduct && (
              <ProductQA
                product={activeQAProduct}
                onClose={() => setActiveQAProduct(null)}
              />
            )}
          </div>
        </Router>
      </ThemeProvider>
    </NotificationProvider>
  );
};

export default App;