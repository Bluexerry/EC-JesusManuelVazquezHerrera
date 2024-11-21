import React, { useState, useEffect } from 'react';
import './MemberSelector.css';
import { getGuildMembers } from '../../services/members/members_api';

const archetypes = ["BARD", "CLERIC", "FIGHTER", "MAGE", "RANGER", "ROGUE", "SUMMONER", "TANK"];
const professions = ["FISHING", "HERBALISM", "HUNTING", "LUMBERJACKING", "MINING", "ALCHEMY", "ANIMALHUSBANDRY", "COOKING", "FARMING", "LUMBERMILLING", "METALWORKING", "STONECUTTING", "TANNING", "WEAVING", "ARCANEENGINEERING", "ARMORSMITHING", "CARPENTRY", "JEWELCUTTING", "LEATHERWORKING", "SCRIBE", "TAILORING", "WEAPONSMITHING"];

const MemberSelector = ({ onAddMember }) => {
    const [availableMembers, setAvailableMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [filters, setFilters] = useState({
        level: '',
        itemLevel: '',
        archetype: '',
        profession: ''
    });

    useEffect(() => {
        async function fetchMembers() {
            const members = await getGuildMembers();
            setAvailableMembers(members);
            setFilteredMembers(members);
        }
        fetchMembers();
    }, []);

    const handleFilterChange = (field, value) => {
        setFilters({
            ...filters,
            [field]: value
        });
    };

    const applyFilters = () => {
        let members = availableMembers;
        if (filters.level) {
            members = members.filter(member => member.level >= filters.level);
        }
        if (filters.itemLevel) {
            members = members.filter(member => member.ilvl >= filters.itemLevel);
        }
        if (filters.archetype) {
            members = members.filter(member => member.main_archetype === filters.archetype || member.secondary_archetype === filters.archetype);
        }
        if (filters.profession) {
            members = members.filter(member => member.grandmaster_profession_one === filters.profession || member.grandmaster_profession_two === filters.profession);
        }
        setFilteredMembers(members);
    };

    return (
        <div className="member-selector">
            <h2>Select Members</h2>
            <div className="filters">
                <label>
                    Level:
                    <input type="number" value={filters.level} onChange={(e) => handleFilterChange('level', e.target.value)} />
                </label>
                <label>
                    Item Level:
                    <input type="number" value={filters.itemLevel} onChange={(e) => handleFilterChange('itemLevel', e.target.value)} />
                </label>
                <label>
                    Archetype:
                    <select value={filters.archetype} onChange={(e) => handleFilterChange('archetype', e.target.value)}>
                        <option value="">Select Archetype</option>
                        {archetypes.map(archetype => (
                            <option key={archetype} value={archetype}>{archetype}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Profession:
                    <select value={filters.profession} onChange={(e) => handleFilterChange('profession', e.target.value)}>
                        <option value="">Select Profession</option>
                        {professions.map(profession => (
                            <option key={profession} value={profession}>{profession}</option>
                        ))}
                    </select>
                </label>
                <button onClick={applyFilters}>Apply Filters</button>
            </div>
            <div className="members-list">
                <ul>
                    {filteredMembers.map(member => (
                        <li key={member.user_id}>
                            {member.username} (Level: {member.level}, Item Level: {member.ilvl}, Archetype: {member.main_archetype}, Profession: {member.grandmaster_profession_one})
                            <button onClick={() => onAddMember(member)}>Add</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MemberSelector;