import React, { useState } from "react";
import PartyEditModal from "./PartyEditModal/PartyEditModal";
import PartyAutoFinderModal from "./PartyAutoFinderModal/PartyAutoFinderModal";
import "./PartyItem.css";

const PartyItem = ({ party, onEdit, onDelete, onAutoFind }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAutoFinderModalOpen, setIsAutoFinderModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleUpdate = () => {
        onEdit(party.party_id);
    };

    const handleAutoFindClick = (role) => {
        setSelectedRole(role);
        setIsAutoFinderModalOpen(true);
    };

    const handleCloseAutoFinderModal = () => {
        setIsAutoFinderModalOpen(false);
    };

    const handleMemberAdded = () => {
        onAutoFind(party.party_id, selectedRole);
    };

    return (
        <li className="party-item">
            <p>Party ID: {party.party_id}</p>
            <p>Creator ID: {party.creator_id}</p>
            <p>Status: {party.isComplete ? "COMPLETA" : "BUSCANDO"}</p>
            <p>Planned Start: {party.planned_start}</p>
            <p>Roles:</p>
            <ul>
                {party.roles.map(role => (
                    <li key={role.role}>
                        {role.role}: {role.user_id ? role.user_id : "Vacante"}
                        {!role.user_id && (
                            <button onClick={() => handleAutoFindClick(role.role)}>
                                <i className="fas fa-search"></i>
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <p>Level Cap: {party.level_cap}</p>
            <p>Item Level Cap: {party.ilvl_cap}</p>
            <div className="party-item-buttons">
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={() => onDelete(party.party_id)}>Delete</button>
            </div>
            <PartyEditModal
                isOpen={isEditModalOpen}
                partyId={party.party_id}
                onClose={handleCloseEditModal}
                onUpdate={handleUpdate}
            />
            <PartyAutoFinderModal
                isOpen={isAutoFinderModalOpen}
                partyId={party.party_id}
                role={selectedRole}
                onClose={handleCloseAutoFinderModal}
                onMemberAdded={handleMemberAdded}
            />
        </li>
    );
};

export default PartyItem;