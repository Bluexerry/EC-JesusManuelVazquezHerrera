import React, { useState } from 'react';
import PartyEditModal from './PartyEditModal/PartyEditModal';
import PartyAutoFinderModal from './PartyAutoFinderModal/PartyAutoFinderModal';
import './PartyItem.css';

const PartyItem = ({ party }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAutoFinderModalOpen, setIsAutoFinderModalOpen] = useState(false);

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleAutoFinder = () => {
        setIsAutoFinderModalOpen(true);
    };

    const handleDelete = () => {
        // Add logic to delete the party using the API
    };

    return (
        <div className="party-item">
            <h3>Party ID: {party.id}</h3>
            <p>Creator ID: {party.creatorId}</p>
            <p>Status: {party.status}</p>
            <p>Planned Start: {party.plannedStart}</p>
            <p>Roles: {party.roles.map(role => role.role).join(', ')}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleAutoFinder}>AutoFinder</button>
            {isEditModalOpen && <PartyEditModal party={party} onClose={() => setIsEditModalOpen(false)} />}
            {isAutoFinderModalOpen && <PartyAutoFinderModal party={party} onClose={() => setIsAutoFinderModalOpen(false)} />}
        </div>
    );
};

export default PartyItem;