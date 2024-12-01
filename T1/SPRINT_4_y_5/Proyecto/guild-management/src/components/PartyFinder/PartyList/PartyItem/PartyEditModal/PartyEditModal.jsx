import React, { useState } from 'react';
import './PartyEditModal.css';

const PartyEditModal = ({ party, onClose }) => {
    const [formData, setFormData] = useState(party);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to update the party using the API
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Edit Party</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Creator ID:
                        <input type="text" name="creatorId" value={formData.creatorId} onChange={handleChange} required />
                    </label>
                    <label>
                        Party Size:
                        <select name="partySize" value={formData.partySize} onChange={handleChange}>
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                            <option value={8}>8</option>
                        </select>
                    </label>
                    {/* Add other fields as necessary */}
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default PartyEditModal;