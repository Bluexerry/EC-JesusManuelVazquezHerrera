// src/components/Comparador/ComparadorProductos.jsc
import React, { useState } from 'react';

const ProductComparator = ({ products }) => {
    const [selected, setSelected] = useState([]);

    const toggleSelect = (product) => {
        if (selected.find((item) => item.id === product.id)) {
            setSelected(selected.filter((item) => item.id !== product.id));
        } else {
            setSelected([...selected, product]);
        }
    };

    return (
        <div className="comparador-container">
            <h2>Comparador de Productos</h2>
            <div className="comparador-products-list">
                {products.map((product) => (
                    <div key={product.id} className="comparador-product-card">
                        <img src={product.cover} alt={product.name} />
                        <p>{product.name}</p>
                        <input
                            type="checkbox"
                            checked={!!selected.find((item) => item.id === product.id)}
                            onChange={() => toggleSelect(product)}
                        />
                    </div>
                ))}
            </div>

            {selected.length >= 2 ? (
                <div className="comparador-table">
                    <h3>Comparación</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Característica</th>
                                {selected.map((product) => (
                                    <th key={product.id}>{product.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Precio</td>
                                {selected.map((product) => (
                                    <td key={product.id}>{product.price} €</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Valoración</td>
                                {selected.map((product) => (
                                    <td key={product.id}>{product.rating} ⭐</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Categoría</td>
                                {selected.map((product) => (
                                    <td key={product.id}>{product.category}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Marca</td>
                                {selected.map((product) => (
                                    <td key={product.id}>{product.brand}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Selecciona al menos 2 productos para comparar.</p>
            )}
        </div>
    );
};

export default ProductComparator;