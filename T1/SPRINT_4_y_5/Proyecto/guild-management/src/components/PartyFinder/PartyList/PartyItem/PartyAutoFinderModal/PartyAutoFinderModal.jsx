import React, { useState, useEffect } from "react";
import { getGuildMembers } from "../../../../../services/members/members_api";
import { addPartyMember } from "../../../../../services/partyFinder/partyFinder_api";
import NotificationSystem from "../../../../general/NotificationSystem/NotificationSystem";
import "./PartyAutoFinderModal.css";

const PartyAutoFinderModal = ({ isOpen, partyId, role, onClose, onMemberAdded }) => {
    const [guildMembers, setGuildMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [filters, setFilters] = useState({
        level: "",
        ilvl: "",
        archetype: "",
        profession: ""
    });

    useEffect(() => {
        if (isOpen) {
            fetchGuildMembers();
        }
    }, [isOpen]);

    const fetchGuildMembers = async () => {
        const data = await getGuildMembers();
        setGuildMembers(data);
        setFilteredMembers(data);
    };

    const handleFilterChange = (field, value) => {
        setFilters({ ...filters, [field]: value });
        applyFilters({ ...filters, [field]: value });
    };

    const applyFilters = (filters) => {
        let filtered = guildMembers;
        if (filters.level) {
            filtered = filtered.filter(member => member.level >= filters.level);
        }
        if (filters.ilvl) {
            filtered = filtered.filter(member => member.ilvl >= filters.ilvl);
        }
        if (filters.archetype) {
            filtered = filtered.filter(member => member.main_archetype === filters.archetype || member.secondary_archetype === filters.archetype);
        }
        if (filters.profession) {
            filtered = filtered.filter(member => member.grandmaster_profession_one === filters.profession || member.grandmaster_profession_two === filters.profession);
        }
        setFilteredMembers(filtered);
    };

    const handleAddMember = async (memberId) => {
        try {
            await addPartyMember(partyId, { user_id: memberId, role });
            setNotifications([{ type: "success", message: "Member added successfully" }]);
            onMemberAdded();
            onClose();
        } catch (error) {
            setNotifications([{ type: "error", message: "Failed to add member" }]);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="party-auto-finder-modal">
            <div className="modal-content">
                <h2>Auto Finder</h2>
                <div className="filters">
                    <label>
                        Level:
                        <input type="number" value={filters.level} onChange={(e) => handleFilterChange("level", e.target.value)} />
                    </label>
                    <label>
                        Item Level:
                        <input type="number" value={filters.ilvl} onChange={(e) => handleFilterChange("ilvl", e.target.value)} />
                    </label>
                    <label>
                        Archetype:
                        <input type="text" value={filters.archetype} onChange={(e) => handleFilterChange("archetype", e.target.value)} />
                    </label>
                    <label>
                        Profession:
                        <input type="text" value={filters.profession} onChange={(e) => handleFilterChange("profession", e.target.value)} />
                    </label>
                </div>
                <ul className="member-list">
                    {filteredMembers.map(member => (
                        <li key={member.user_id}>
                            <p>{member.username} (Level: {member.level}, iLvl: {member.ilvl}, Role: {member.character_role})</p>
                            <button onClick={() => handleAddMember(member.user_id)}>Add</button>
                        </li>
                    ))}
                </ul>
                <div className="modal-buttons">
                    <button onClick={onClose}>Close</button>
                </div>
                <NotificationSystem notifications={notifications} />
            </div>
        </div>
    );
};

export default PartyAutoFinderModal;