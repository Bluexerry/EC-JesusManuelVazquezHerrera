import React from "react";
import PartyItem from "./PartyItem/PartyItem";
import "./PartyList.css";

const PartyList = ({ parties, onSelectParty, onEditParty, onDeleteParty, onAutoFind }) => {
    return (
        <div className="party-list">
            <h2>Parties</h2>
            <ul>
                {parties.map(party => (
                    party && (
                        <PartyItem
                            key={party.party_id}
                            party={party}
                            onEdit={onEditParty}
                            onDelete={onDeleteParty}
                            onAutoFind={onAutoFind}
                        />
                    )
                ))}
            </ul>
        </div>
    );
};

export default PartyList;