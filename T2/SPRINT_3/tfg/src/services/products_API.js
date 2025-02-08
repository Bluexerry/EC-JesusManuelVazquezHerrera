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
    cover: '/assets/products/gow.jpg',
  },
  {
    id: 3,
    name: 'FIFA 23',
    price: 60,
    category: 'deportes',
    brand: 'ea',
    rating: 4,
    cover: '/assets/products/fifa.jpg',
  },
  {
    id: 4,
    name: 'Super Mario Odyssey',
    price: 55,
    category: 'aventura',
    brand: 'nintendo',
    rating: 5,
    cover: '/assets/products/mario.jpg',
  },
  {
    id: 5,
    name: 'Gran Turismo 7',
    price: 70,
    category: 'simulacion',
    brand: 'sony',
    rating: 4,
    cover: '/assets/products/gt.jpg',
  },
  {
    id: 6,
    name: 'Red Dead Redemption 2',
    price: 65,
    category: 'accion',
    brand: 'rockstar',
    rating: 5,
    cover: '/assets/products/rdr2.jpg',
  },
  {
    id: 7,
    name: 'Forza Horizon 5',
    price: 75,
    category: 'simulacion',
    brand: 'microsoft',
    rating: 5,
    cover: '/assets/products/forza.jpg',
  },
  {
    id: 8,
    name: "Assassin's Creed Valhalla",
    price: 50,
    category: 'accion',
    brand: 'ubisoft',
    rating: 4,
    cover: '/assets/products/ac.jpg',
  },
  {
    id: 9,
    name: 'Mario Kart 8 Deluxe',
    price: 60,
    category: 'carreras',
    brand: 'nintendo',
    rating: 5,
    cover: '/assets/products/mkart.jpg',
  },
  {
    id: 10,
    name: 'The Witcher 3: Wild Hunt',
    price: 40,
    category: 'accion',
    brand: 'cd projekt',
    rating: 5,
    cover: '/assets/products/tw3.jpg',
  },
];

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 1000);
  });
};