import React, { useState } from 'react';
import '../../styles/product.css';

const CartPreview = ({ cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-preview">
      <button className="cart-icon" onClick={toggleCart}>
        🛒 {cartItems.length}
      </button>
      {isOpen && (
        <div className="cart-details">
          <h3>Carrito de Compras</h3>
          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.price} €
                </li>
              ))}
            </ul>
          )}
          <p>Total: {totalPrice} €</p>
          <button>Proceder al Pago</button>
        </div>
      )}
    </div>
  );
};

export default CartPreview;