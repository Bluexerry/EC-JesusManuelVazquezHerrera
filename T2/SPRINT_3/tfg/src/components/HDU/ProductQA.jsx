// src/components/HDU/ProductQA.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/QA.css';
import { useNotification } from '../Shared/NotificationSystem.jsx'; // [`useNotification`](../Shared/NotificationSystem.jsx)

const ProductQA = ({ product, onClose }) => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [replyData, setReplyData] = useState({});
    const showNotification = useNotification();

    useEffect(() => {
        const stored = sessionStorage.getItem(`qa_${product.id}`);
        if (stored) {
            setQuestions(JSON.parse(stored));
        }
    }, [product.id]);

    const saveQuestions = (updated) => {
        setQuestions(updated);
        sessionStorage.setItem(`qa_${product.id}`, JSON.stringify(updated));
    };

    const handleSubmitQuestion = (e) => {
        e.preventDefault();
        if (!newQuestion.trim()) {
            showNotification('error', 'Escribe algo antes de enviar.');
            return;
        }
        const questionObj = {
            id: Date.now(),
            user: 'Invitado',
            text: newQuestion.trim(),
            responses: [],
        };
        const updated = [questionObj, ...questions];
        saveQuestions(updated);
        setNewQuestion('');
        showNotification('success', 'Pregunta publicada.');
    };

    const toggleReplyForm = (qid) => {
        setReplyData((prev) => ({
            ...prev,
            [qid]: {
                show: !prev[qid]?.show,
                name: prev[qid]?.name || '',
                text: prev[qid]?.text || '',
            },
        }));
    };

    const handleReplyChange = (qid, field, value) => {
        setReplyData((prev) => ({
            ...prev,
            [qid]: { ...prev[qid], [field]: value },
        }));
    };

    const handleSubmitReply = (e, qid) => {
        e.preventDefault();
        const reply = replyData[qid];
        if (!reply?.text.trim() || !reply?.name.trim()) {
            showNotification('error', 'Completa nombre y respuesta.');
            return;
        }
        const updated = questions.map((q) =>
            q.id === qid
                ? {
                    ...q,
                    responses: [
                        ...q.responses,
                        { id: Date.now(), responder: reply.name.trim(), response: reply.text.trim() },
                    ],
                }
                : q
        );
        saveQuestions(updated);
        setReplyData((prev) => ({ ...prev, [qid]: { show: false, name: '', text: '' } }));
        showNotification('success', 'Respuesta enviada.');
    };

    return (
        <div className="qa-modal-overlay">
            <div className="qa-modal">
                <button className="close-modal" onClick={onClose}>X</button>
                <h2>Preguntas y Respuestas: {product.name}</h2>

                {/* Formulario de nueva pregunta (sin autenticación) */}
                <form onSubmit={handleSubmitQuestion} className="qa-question-form">
                    <h3>Nueva Pregunta</h3>
                    <textarea
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Enviar</button>
                </form>

                <div className="qa-list">
                    <h3>Preguntas</h3>
                    {questions.length === 0 ? (
                        <p>No hay preguntas aún.</p>
                    ) : (
                        <ul>
                            {questions.map((q) => (
                                <li key={q.id} className="qa-question">
                                    <p><strong>{q.user}</strong>: {q.text}</p>
                                    <button onClick={() => toggleReplyForm(q.id)}>
                                        {replyData[q.id]?.show ? 'Cancelar Respuesta' : 'Responder'}
                                    </button>
                                    {q.responses.length > 0 && (
                                        <ul className="qa-responses">
                                            {q.responses.map((r) => (
                                                <li key={r.id}>
                                                    <strong>{r.responder}</strong>: {r.response}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {replyData[q.id]?.show && (
                                        <form onSubmit={(e) => handleSubmitReply(e, q.id)} className="qa-reply-form">
                                            <div className="qa-field">
                                                <label>Tu Nombre:</label>
                                                <input
                                                    type="text"
                                                    value={replyData[q.id]?.name || ''}
                                                    onChange={(e) => handleReplyChange(q.id, 'name', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="qa-field">
                                                <label>Respuesta:</label>
                                                <textarea
                                                    value={replyData[q.id]?.text || ''}
                                                    onChange={(e) => handleReplyChange(q.id, 'text', e.target.value)}
                                                    required
                                                ></textarea>
                                            </div>
                                            <button type="submit">Enviar Respuesta</button>
                                        </form>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductQA;