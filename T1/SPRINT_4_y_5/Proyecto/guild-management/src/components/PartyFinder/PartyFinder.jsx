import React, { useState, useEffect } from 'react';
import { getPartyGroups } from '../../services/partyFinder/partyFinder_api';
import PartyBuilder from './PartyBuilder/PartyBuilder';
import PartyList from './PartyList/PartyList';
import './PartyFinder.css';

const PartyFinder = () => {
    const [parties, setParties] = useState([]);

    useEffect(() => {
        async function fetchParties() {
            const data = await getPartyGroups();
            setParties(data);
        }
        fetchParties();
    }, []);

    return (
        <div className="party-finder">
            <h1>Party Finder</h1>
            <PartyBuilder />
            <PartyList parties={parties} />
        </div>
    );
};

export default PartyFinder;