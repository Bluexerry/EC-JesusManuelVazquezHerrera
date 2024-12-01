import React from 'react';
import PartyItem from './PartyItem/PartyItem';
import './PartyList.css';

const PartyList = ({ parties }) => {
    return (
        <div className="party-list">
            <h2>Party List</h2>
            {parties.map((party) => (
                <PartyItem key={party.id} party={party} />
            ))}
        </div>
    );
};

export default PartyList;