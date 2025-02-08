import React, { useState, useEffect } from 'react';

const VotingSystem = ({ products }) => {
    const [votes, setVotes] = useState({});

    useEffect(() => {
        // Inicializa los votos para cada producto si no existen
        const initialVotes = {};
        products.forEach((product) => {
            initialVotes[product.id] = votes[product.id] || 0;
        });
        setVotes(initialVotes);
    }, [products]);

    const handleVote = (productId) => {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [productId]: prevVotes[productId] + 1,
        }));
    };
    const getTopThreeProducts = () => {
        const entries = Object.entries(votes);
        if (entries.length === 0) return [];
        const sortedEntries = entries.sort((a, b) => b[1] - a[1]).slice(0, 3);
        // Filtra si no se encuentra el producto (undefined)
        return sortedEntries
            .map(([id]) => products.find((product) => product.id === parseInt(id, 10)))
            .filter((product) => product !== undefined);
    };
    
    const topThreeProducts = getTopThreeProducts();

    return (
        <div className="survey-container">
            <h2>Sistema de Votaciones</h2>
            <div className="survey-products">
                {products.map((product) => (
                    <div key={product.id} className="survey-product-card">
                        <img src={product.cover} alt={product.name} />
                        <p>{product.name}</p>
                        <button onClick={() => handleVote(product.id)}>Me gusta</button>
                        <span>Votos: {votes[product.id] || 0}</span>
                    </div>
                ))}
            </div>
            {topThreeProducts.length > 0 && (
                <div className="top-products">
                    <h3>Top 3 Productos Más Votados</h3>
                    <div className="top-products-list">
                        {topThreeProducts.map((product, index) => (
                            <div key={product.id} className="top-product-card">
                                <img src={product.cover} alt={product.name} />
                                <p>
                                    {index + 1}. {product.name} - {votes[product.id] || 0} votos
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VotingSystem;