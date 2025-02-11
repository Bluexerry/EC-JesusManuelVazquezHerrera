// Language: JavaScript (JSX)
import React from 'react';
import '../../styles/listaDeFavs.css';
import { FaTrash } from 'react-icons/fa';

const FavoritesList = ({ favorites, onToggleFavorite }) => {
    return (
        <div className="favorites-list">
            <h3>Mis Favoritos</h3>
            {favorites.length === 0 ? (
                <p>No hay favoritos agregados.</p>
            ) : (
                <div className="favorites-cards">
                    {favorites.map((product) => (
                        <div key={product.id} className="favorite-card">
                            <img src={product.cover} alt={product.name} />
                            <div className="favorite-info">
                                <h4>{product.name}</h4>
                                <p>{product.price} €</p>
                                {product.stock && <p>Stock: {product.stock}</p>}
                            </div>
                            <button
                                className="remove-favorite"
                                onClick={() => onToggleFavorite(product)}
                                aria-label="Eliminar de favoritos"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesList;