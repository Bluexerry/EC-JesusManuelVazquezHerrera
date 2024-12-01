import React, { useState, useEffect } from 'react';
import { searchPartyMembers } from '../../../../../services/partyFinder/partyFinder_api';
import './PartyAutoFinderModal.css';

const PartyAutoFinderModal = ({ party, onClose }) => {
    const [members, setMembers] = useState([]);
    const [filters, setFilters] = useState({
        role: '',
        levelCap: 0,
        itemLevelCap: 0,
        archetype: '',
        profession: ''
    });

    useEffect(() => {
        async function fetchMembers() {
            const data = await searchPartyMembers(filters);
            setMembers(data);
        }
        fetchMembers();
    }, [filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleAddMember = (member) => {
        // Add logic to add the member to the party using the API
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Auto Finder</h2>
                <form>
                    <label>
                        Role:
                        <select name="role" value={filters.role} onChange={handleChange}>
                            <option value="TANK">TANK</option>
                            <option value="HEALER">HEALER</option>
                            <option value="DAMAGE">DAMAGE</option>
                            <option value="SUPPORT">SUPPORT</option>
                        </select>
                    </label>
                    <label>
                        Level Cap:
                        <input type="number" name="levelCap" value={filters.levelCap} onChange={handleChange} />
                    </label>
                    <label>
                        Item Level Cap:
                        <input type="number" name="itemLevelCap" value={filters.itemLevelCap} onChange={handleChange} />
                    </label>
                    <label>
                        Archetype:
                        <input type="text" name="archetype" value={filters.archetype} onChange={handleChange} />
                    </label>
                    <label>
                        Profession:
                        <input type="text" name="profession" value={filters.profession} onChange={handleChange} />
                    </label>
                </form>
                <div className="member-list">
                    {members.map((member) => (
                        <div key={member.user_id} className="member-item">
                            <p>{member.username}</p>
                            <button onClick={() => handleAddMember(member)}>Add</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartyAutoFinderModal;