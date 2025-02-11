// Language: JavaScript (JSX)
// filepath: /c:/Users/jesus/Desktop/EC/T2/SPRINT_3/tfg/src/components/HDU/ProductReview.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/valoraciones.css';

const ProductReviews = ({ product, onClose }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Recuperamos las reseñas del sessionStorage según el producto
    useEffect(() => {
        const storedReviews = sessionStorage.getItem(`reviews_${product.id}`);
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        }
    }, [product.id]);

    const averageRating =
        reviews.length > 0
            ? (reviews.reduce((acc, r) => acc + Number(r.rating), 0) / reviews.length).toFixed(1)
            : 'N/A';

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!comment.trim()) {
            setError('El comentario es obligatorio.');
            return;
        }
        const numericRating = Number(rating);
        if (!numericRating || numericRating < 1 || numericRating > 5) {
            setError('La valoración debe ser un número entre 1 y 5.');
            return;
        }

        const newReview = {
            id: Date.now(),
            rating: numericRating,
            comment: comment.trim(),
        };

        const updatedReviews = [newReview, ...reviews];
        setReviews(updatedReviews);
        sessionStorage.setItem(`reviews_${product.id}`, JSON.stringify(updatedReviews));
        setSuccess('Reseña enviada con éxito.');
        setRating('');
        setComment('');
    };

    return (
        <div className="reviews-modal-overlay">
            <div className="reviews-modal">
                <button className="close-modal" onClick={onClose}>X</button>
                <h2>Reseñas y Valoraciones para {product.name}</h2>
                <p>Valoración media: {averageRating} {averageRating !== 'N/A' && '⭐'}</p>
                <form onSubmit={handleSubmit}>
                    <div className="review-field">
                        <label>Valoración (1-5):</label>
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            min="1"
                            max="5"
                        />
                    </div>
                    <div className="review-field">
                        <label>Comentario:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit">Enviar Reseña</button>
                </form>
                {error && <p className="review-error">{error}</p>}
                {success && <p className="review-success">{success}</p>}
                <div className="reviews-list">
                    <h3>Reseñas</h3>
                    {reviews.length === 0 ? (
                        <p>No hay reseñas aún.</p>
                    ) : (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review.id}>
                                    <strong>{review.rating} ⭐</strong> - {review.comment}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;