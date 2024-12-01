import React, { useState } from 'react';
import PartyRoleAssignment from './PartyRoleAssignmnent/PartyRoleAssignment';
import './PartyForm.css';

const PartyForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        creatorId: '',
        partySize: 3,
        roles: [],
        levelCap: 0,
        itemLevelCap: 0,
        archetypePreferences: '',
        professionPreferences: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to save the party using the API
        onClose();
    };

    return (
        <div className="party-form">
            <h2>Create New Party</h2>
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
                <PartyRoleAssignment formData={formData} setFormData={setFormData} />
                <button type="submit">Create Party</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default PartyForm;