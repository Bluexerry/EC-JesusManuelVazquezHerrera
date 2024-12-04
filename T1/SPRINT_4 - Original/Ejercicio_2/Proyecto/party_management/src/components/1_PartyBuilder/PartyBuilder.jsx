import React, { useState, useEffect } from 'react';
import { getGuildMembers } from '../../services/members/members_api';
import { getPartyGroups, createParty, addPartyMember, removePartyMember, getPartyDetails } from '../../services/partyFinder/partyFinder_api';
import MemberSelector from '../2_MemberSelector/MemberSelector';
import TeamRoster from '../3_TeamRoster/TeamRoster';
import OptimizationEngine from '../4_OptimizationEngine/OptimizationEngine';
import NotificationSystem from '../7_NotificationSystem/NotificationSystem';
import './PartyBuilder.css';

const archetypes = ["BARD", "CLERIC", "FIGHTER", "MAGE", "RANGER", "ROGUE", "SUMMONER", "TANK"];
const professions = ["FISHING", "HERBALISM", "HUNTING", "LUMBERJACKING", "MINING", "ALCHEMY", "ANIMALHUSBANDRY", "COOKING", "FARMING", "LUMBERMILLING", "METALWORKING", "STONECUTTING", "TANNING", "WEAVING", "ARCANEENGINEERING", "ARMORSMITHING", "CARPENTRY", "JEWELCUTTING", "LEATHERWORKING", "SCRIBE", "TAILORING", "WEAPONSMITHING"];

const PartyBuilder = () => {
    const [partyMembers, setPartyMembers] = useState([]);
    const [availableMembers, setAvailableMembers] = useState([]);
    const [rolesRequired, setRolesRequired] = useState({
        TANK: 1,
        HEALER: 1,
        DAMAGE: 3,
        SUPPORT: 1
    });
    const [levelCap, setLevelCap] = useState(50);
    const [itemLevelCap, setItemLevelCap] = useState(100);
    const [preferences, setPreferences] = useState({
        archetype: '',
        profession: ''
    });
    const [parties, setParties] = useState([]);
    const [selectedParty, setSelectedParty] = useState(null);
    const [plannedStart, setPlannedStart] = useState('');
    const [partyRoleCreator, setPartyRoleCreator] = useState('TANK');
    const [partySize, setPartySize] = useState(3);
    const [creatorId, setCreatorId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function fetchMembers() {
            try {
                const members = await getGuildMembers();
                setAvailableMembers(members);
            } catch (error) {
                addNotification('Failed to fetch guild members.', 'error');
            }
        }
        async function fetchParties() {
            try {
                const partyData = await getPartyGroups();
                setParties(partyData);
            } catch (error) {
                addNotification('Failed to fetch party groups.', 'error');
            }
        }
        fetchMembers();
        fetchParties();
    }, []);

    const addNotification = (message, type) => {
        const id = Date.now();
        setNotifications([...notifications, { id, message, type }]);
        setTimeout(() => removeNotification(id), 3000);
    };

    const removeNotification = (id) => {
        setNotifications(notifications => notifications.filter(notification => notification.id !== id));
    };

    const handleAddMember = async (member) => {
        if (selectedParty && selectedParty.party_members) {
            const updatedPartyMembers = selectedParty.party_members.map((m, index) => {
                if (index < partySize && !m.user_id) {
                    return { ...m, ...member };
                }
                return m;
            });
            setPartyMembers(updatedPartyMembers);
            setAvailableMembers(availableMembers.filter(m => m.user_id !== member.user_id));
            await addPartyMember(selectedParty.party_size, selectedParty.party_id, member);
            const updatedParty = await getPartyDetails(selectedParty.party_size, selectedParty.party_id);
            setSelectedParty(updatedParty);
            addNotification('Member added successfully!', 'success');
        } else {
            addNotification('No party selected.', 'error');
        }
    };

    const handleRemoveMember = async (member) => {
        if (selectedParty && selectedParty.party_members) {
            const updatedPartyMembers = selectedParty.party_members.map(m => {
                if (m.user_id === member.user_id) {
                    return { role: null, user_id: null, username: null };
                }
                return m;
            });
            setPartyMembers(updatedPartyMembers);
            setAvailableMembers([...availableMembers, member]);
            await removePartyMember(selectedParty.party_size, selectedParty.party_id, member);
            const updatedParty = await getPartyDetails(selectedParty.party_size, selectedParty.party_id);
            setSelectedParty(updatedParty);
            addNotification('Member removed successfully!', 'success');
        }
    };

    const handleReassignMember = (member) => {
        // Implement reassignment logic here
        console.log("Reassigning member...", member);
    };

    const handleOptimizeTeam = (optimizedTeam) => {
        setPartyMembers(optimizedTeam);
        addNotification('Team optimized successfully!', 'success');
    };

    const handleCreateParty = async () => {
        if (!plannedStart || !partyRoleCreator || !rolesRequired || !levelCap || !itemLevelCap || !partySize || !creatorId) {
            setErrorMessage('All fields are required to create a party.');
            addNotification('All fields are required to create a party.', 'error');
            return;
        }

        const totalRoles = Object.values(rolesRequired).reduce((acc, val) => acc + val, 0);
        if (totalRoles > partySize) {
            setErrorMessage('The sum of roles required exceeds the party size.');
            addNotification('The sum of roles required exceeds the party size.', 'error');
            return;
        }

        const newPartyData = {
            creator_id: creatorId,
            planned_start: plannedStart,
            party_role_creator: partyRoleCreator,
            roles_required: rolesRequired,
            level_cap: levelCap,
            ilvl_cap: itemLevelCap,
            preferences: preferences,
            members: Array(partySize).fill({ role: null, user_id: null, username: null })
        };

        try {
            const newParty = await createParty(partySize, newPartyData);
            const updatedParty = await getPartyDetails(partySize, newParty.party_id);
            setParties([...parties, updatedParty]);
            setPartyMembers([]);
            setSelectedParty(updatedParty);
            setErrorMessage('');
            addNotification('Party created successfully!', 'success');
        } catch (error) {
            setErrorMessage('Failed to create party. Please try again.');
            addNotification('Failed to create party. Please try again.', 'error');
        }
    };

    const handleRoleChange = (role, value) => {
        setRolesRequired({
            ...rolesRequired,
            [role]: value
        });
    };

    const handlePreferenceChange = (field, value) => {
        setPreferences({
            ...preferences,
            [field]: value
        });
    };

    return (
        <div className="party-builder">
            <h1>Party Builder</h1>
            <div className="create-party-section">
                <h2>Create New Party</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <label>
                    Creator ID:
                    <input type="text" value={creatorId} onChange={(e) => setCreatorId(e.target.value)} />
                </label>
                <label>
                    Party Size:
                    <select value={partySize} onChange={(e) => setPartySize(parseInt(e.target.value))}>
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                        <option value={8}>8</option>
                    </select>
                </label>
                <label>
                    TANK:
                    <input type="number" value={rolesRequired.TANK} onChange={(e) => handleRoleChange('TANK', parseInt(e.target.value))} />
                </label>
                <label>
                    HEALER:
                    <input type="number" value={rolesRequired.HEALER} onChange={(e) => handleRoleChange('HEALER', parseInt(e.target.value))} />
                </label>
                <label>
                    DAMAGE:
                    <input type="number" value={rolesRequired.DAMAGE} onChange={(e) => handleRoleChange('DAMAGE', parseInt(e.target.value))} />
                </label>
                <label>
                    SUPPORT:
                    <input type="number" value={rolesRequired.SUPPORT} onChange={(e) => handleRoleChange('SUPPORT', parseInt(e.target.value))} />
                </label>
                <label>
                    Level Cap:
                    <input type="number" value={levelCap} onChange={(e) => setLevelCap(parseInt(e.target.value))} />
                </label>
                <label>
                    Item Level Cap:
                    <input type="number" value={itemLevelCap} onChange={(e) => setItemLevelCap(parseInt(e.target.value))} />
                </label>
                <label>
                    Archetype Preference:
                    <select value={preferences.archetype} onChange={(e) => handlePreferenceChange('archetype', e.target.value)}>
                        <option value="">Select Archetype</option>
                        {archetypes.map(archetype => (
                            <option key={archetype} value={archetype}>{archetype}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Profession Preference:
                    <select value={preferences.profession} onChange={(e) => handlePreferenceChange('profession', e.target.value)}>
                        <option value="">Select Profession</option>
                        {professions.map(profession => (
                            <option key={profession} value={profession}>{profession}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Planned Start:
                    <input type="text" value={plannedStart} onChange={(e) => setPlannedStart(e.target.value)} placeholder="DD/MM/YYYY_HH:mm" />
                </label>
                <label>
                    Party Role Creator:
                    <select value={partyRoleCreator} onChange={(e) => setPartyRoleCreator(e.target.value)}>
                        {["TANK", "HEALER", "DAMAGE", "SUPPORT"].map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </label>
                <button onClick={handleCreateParty}>Create Party</button>
            </div>
            <TeamRoster 
                partyMembers={partyMembers} 
                onRemoveMember={handleRemoveMember} 
                onReassignMember={handleReassignMember} 
            />
            <MemberSelector availableMembers={availableMembers} onAddMember={handleAddMember} />
            <OptimizationEngine 
                availableMembers={availableMembers} 
                rolesRequired={rolesRequired} 
                levelCap={levelCap} 
                itemLevelCap={itemLevelCap} 
                preferences={preferences} 
                plannedStart={plannedStart} 
                onOptimize={handleOptimizeTeam} 
            />
            <NotificationSystem 
                notifications={notifications} 
                removeNotification={removeNotification} 
            />
            <div className="parties-section">
                <h2>Parties</h2>
                <ul>
                    {parties.map(party => (
                        <li key={party.party_id} onClick={async () => {
                            try {
                                const partyDetails = await getPartyDetails(party.party_size, party.party_id);
                                setSelectedParty(partyDetails);
                                setPartyMembers(partyDetails.party_members || []); // Ensure party_members is an array
                                setPartySize(party.party_size); // Ensure partySize is set correctly
                            } catch (error) {
                                addNotification('Failed to fetch party details.', 'error');
                            }
                        }}>
                            <div className="party-details">
                                <p><strong>Party ID:</strong> {party.party_id}</p>
                                <p><strong>Creator ID:</strong> {party.creator_id}</p>
                                <p><strong>Planned Start:</strong> {party.planned_start}</p>
                                <p><strong>Roles Required:</strong> {party.roles_required ? JSON.stringify(party.roles_required) : 'N/A'}</p>
                                <p><strong>Level Cap:</strong> {party.level_cap}</p>
                                <p><strong>Item Level Cap:</strong> {party.ilvl_cap}</p>
                                <p><strong>Preferences:</strong> {party.preferences ? JSON.stringify(party.preferences) : 'N/A'}</p>
                                <p><strong>Members:</strong> {party.party_members ? party.party_members.length : 0} / {party.party_size}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PartyBuilder;