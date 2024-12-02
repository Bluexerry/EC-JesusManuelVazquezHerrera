import React, { useEffect, useState } from "react";
import { getPartyGroups, addPartyMember, removePartyMember, getPartyDetails, updateParty } from "../../services/partyFinder/partyFinder_api";
import { getGuildMembers } from "../../services/members/members_api";
import PartyForm from "../PartyFinder/PartyBuilder/PartyForm/PartyForm";
import PartyRoleAssignment from "../PartyFinder/PartyBuilder/PartyForm/PartyRoleAssignmnent/PartyRoleAssignment";
import PartyList from "./PartyList/PartyList";
import NotificationSystem from "../general/NotificationSystem/NotificationSystem";
import "./PartyFinder.css";

const PartyFinder = () => {
    const [parties, setParties] = useState([]);
    const [guildMembers, setGuildMembers] = useState([]);
    const [selectedParty, setSelectedParty] = useState(null);
    const [newMemberId, setNewMemberId] = useState("");
    const [newMemberRole, setNewMemberRole] = useState("");
    const [partySize, setPartySize] = useState(3);
    const [roles, setRoles] = useState([]);
    const [levelCaps, setLevelCaps] = useState({});
    const [ilvlCaps, setIlvlCaps] = useState({});
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchParties();
        fetchGuildMembers();
    }, []);

    const fetchParties = async () => {
        const data = await getPartyGroups();
        setParties(data.filter(party => party !== null)); // Filtrar elementos null
    };

    const fetchGuildMembers = async () => {
        const data = await getGuildMembers();
        setGuildMembers(data);
    };

    const handleAddMember = async () => {
        if (selectedParty && newMemberId && newMemberRole) {
            try {
                await addPartyMember(selectedParty.partySize, selectedParty.party_id, { user_id: newMemberId, role: newMemberRole });
                const updatedParty = await getPartyDetails(selectedParty.partySize, selectedParty.party_id);
                setParties(parties.map(party => party.party_id === updatedParty.party_id ? updatedParty : party));
                setNewMemberId("");
                setNewMemberRole("");
                setNotifications([{ type: "success", message: "Member added successfully" }]);
            } catch (error) {
                setNotifications([{ type: "error", message: "Failed to add member" }]);
            }
        }
    };

    const handleRemoveMember = async (memberId) => {
        if (selectedParty) {
            try {
                await removePartyMember(selectedParty.partySize, selectedParty.party_id, { user_id: memberId });
                const updatedParty = await getPartyDetails(selectedParty.partySize, selectedParty.party_id);
                setParties(parties.map(party => party.party_id === updatedParty.party_id ? updatedParty : party));
                setNotifications([{ type: "success", message: "Member removed successfully" }]);
            } catch (error) {
                setNotifications([{ type: "error", message: "Failed to remove member" }]);
            }
        }
    };

    const handleSelectParty = (party) => {
        setSelectedParty(party);
    };

    const handlePartyCreated = (newParty) => {
        setParties([...parties, newParty]);
        setNotifications([{ type: "success", message: "Party created successfully" }]);
    };

    const handleRoleChange = (index, role) => {
        const newRoles = [...roles];
        newRoles[index] = role;
        setRoles(newRoles);
    };

    const handleLevelCapChange = (role, value) => {
        setLevelCaps({ ...levelCaps, [role]: value });
    };

    const handleIlvlCapChange = (role, value) => {
        setIlvlCaps({ ...ilvlCaps, [role]: value });
    };

    const handleEditParty = async (partyId) => {
        const updatedParty = await getPartyDetails(partySize, partyId);
        setParties(parties.map(party => party.party_id === updatedParty.party_id ? updatedParty : party));
    };

    const handleDeleteParty = async (partyId) => {
        // Lógica para eliminar la party
    };

    const handleAutoFind = (partyId, role) => {
        // Lógica para buscar automáticamente miembros para la party
    };

    return (
        <div className="party-finder">
            <h1>Party Finder</h1>
            <PartyForm onPartyCreated={handlePartyCreated} />
            <PartyRoleAssignment
                partySize={partySize}
                roles={roles}
                levelCaps={levelCaps}
                ilvlCaps={ilvlCaps}
                onRoleChange={handleRoleChange}
                onLevelCapChange={handleLevelCapChange}
                onIlvlCapChange={handleIlvlCapChange}
            />
            <PartyList
                parties={parties}
                onSelectParty={handleSelectParty}
                onEditParty={handleEditParty}
                onDeleteParty={handleDeleteParty}
                onAutoFind={handleAutoFind}
            />
            <NotificationSystem notifications={notifications} />
            {selectedParty && (
                <div className="party-details">
                    <h2>Party Details</h2>
                    <p>Party ID: {selectedParty.party_id}</p>
                    <p>Creator ID: {selectedParty.creator_id}</p>
                    <p>Status: {selectedParty.isComplete ? "COMPLETA" : "BUSCANDO"}</p>
                    <p>Planned Start: {selectedParty.planned_start}</p>
                    <p>Roles:</p>
                    <ul>
                        {selectedParty.roles.map(role => (
                            <li key={role.role}>
                                {role.role}: {role.user_id ? role.user_id : "Vacante"}
                                {role.user_id && <button onClick={() => handleRemoveMember(role.user_id)}>Remove</button>}
                            </li>
                        ))}
                    </ul>
                    <div className="add-member">
                        <h3>Add Member</h3>
                        <select value={newMemberId} onChange={(e) => setNewMemberId(e.target.value)}>
                            <option value="">Select Member</option>
                            {guildMembers.map(member => (
                                <option key={member.user_id} value={member.user_id}>{member.username}</option>
                            ))}
                        </select>
                        <select value={newMemberRole} onChange={(e) => setNewMemberRole(e.target.value)}>
                            <option value="">Select Role</option>
                            {selectedParty.roles.filter(role => !role.user_id).map(role => (
                                <option key={role.role} value={role.role}>{role.role}</option>
                            ))}
                        </select>
                        <button onClick={handleAddMember}>Add Member</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartyFinder;