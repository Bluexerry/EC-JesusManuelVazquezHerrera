// src/services/products_API.js

// Datos mock de productos
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
  
  // Función mock para simular la llamada a una API
  export const fetchProducts = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 1000); // Simula un retardo de 1 segundo
    });
  };