import React, { useState } from 'react';
import PartyForm from './PartyForm/PartyForm';
import './PartyBuilder.css';

const PartyBuilder = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    return (
        <div className="party-builder">
            <button onClick={handleOpenForm}>Create New Party</button>
            {isFormOpen && <PartyForm onClose={handleCloseForm} />}
        </div>
    );
};

export default PartyBuilder;