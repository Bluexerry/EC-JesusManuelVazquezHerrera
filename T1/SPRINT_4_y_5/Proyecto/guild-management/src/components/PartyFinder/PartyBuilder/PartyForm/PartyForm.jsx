import React, { useState, useEffect } from "react";
import { getGuildMembers, getGuildMember } from "../../../../services/members/members_api";
import { validateForm } from "../../../general/ValidationSystem/ValidationSystem";
import NotificationSystem from "../../../general/NotificationSystem/NotificationSystem";
import "./PartyForm.css";

const professions = [
    "FISHING", "HERBALISM", "HUNTING", "LUMBERJACKING", "MINING", "ALCHEMY", "ANIMALHUSBANDRY", "COOKING", "FARMING",
    "LUMBERMILLING", "METALWORKING", "STONECUTTING", "TANNING", "WEAVING", "ARCANEENGINEERING", "ARMORSMITHING",
    "CARPENTRY", "JEWELCUTTING", "LEATHERWORKING", "SCRIBE", "TAILORING", "WEAPONSMITHING"
];

const archetypes = [
    "BARD", "CLERIC", "FIGHTER", "MAGE", "RANGER", "ROGUE", "SUMMONER", "TANK"
];

const PartyForm = ({ onPartyCreated }) => {
    const [guildMembers, setGuildMembers] = useState([]);
    const [creatorId, setCreatorId] = useState("");
    const [partySize, setPartySize] = useState(3);
    const [roles, setRoles] = useState([]);
    const [levelCaps, setLevelCaps] = useState({});
    const [ilvlCaps, setIlvlCaps] = useState({});
    const [archetypePreferences, setArchetypePreferences] = useState({});
    const [professionPreferences, setProfessionPreferences] = useState({});
    const [errors, setErrors] = useState({});
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchGuildMembers();
    }, []);

    const fetchGuildMembers = async () => {
        const data = await getGuildMembers();
        setGuildMembers(data);
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

    const handleArchetypePreferenceChange = (role, value) => {
        setArchetypePreferences({ ...archetypePreferences, [role]: value });
    };

    const handleProfessionPreferenceChange = (role, profession, value) => {
        setProfessionPreferences({
            ...professionPreferences,
            [role]: {
                ...professionPreferences[role],
                [profession]: value
            }
        });
    };

    const validateFormFields = () => {
        const { newErrors, isFormValid } = validateForm({
            creatorId,
            roles,
            levelCaps,
            ilvlCaps,
            archetypePreferences,
            professionPreferences
        }, guildMembers.map(member => member.user_id));
        setErrors(newErrors);
        return isFormValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFormFields()) {
            try {
                const creator = await getGuildMember(creatorId);
                const partyData = {
                    creator_id: creatorId,
                    party_role_creator: creator.character_role,
                    level_cap: levelCaps,
                    ilvl_cap: ilvlCaps,
                    roles,
                    archetype_preferences: archetypePreferences,
                    profession_preferences: professionPreferences,
                };
                onPartyCreated(partyData);
                setNotifications([{ type: "success", message: "Party created successfully" }]);
            } catch (error) {
                setNotifications([{ type: "error", message: "Failed to create party" }]);
            }
        } else {
            setNotifications([{ type: "error", message: "Please fix the errors in the form" }]);
        }
    };

    return (
        <div className="party-form">
            <h2>Create a New Party</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Creator ID:
                    <select value={creatorId} onChange={(e) => setCreatorId(e.target.value)}>
                        <option value="">Select Creator</option>
                        {guildMembers.map(member => (
                            <option key={member.user_id} value={member.user_id}>
                                {member.username} (Level: {member.level}, iLvl: {member.ilvl}, Role: {member.character_role})
                            </option>
                        ))}
                    </select>
                    {errors.creatorId && <span className="error">{errors.creatorId}</span>}
                </label>
                <label>
                    Party Size:
                    <select value={partySize} onChange={(e) => setPartySize(Number(e.target.value))}>
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                        <option value={8}>8</option>
                    </select>
                </label>
                <div className="roles">
                    <h3>Roles</h3>
                    {[...Array(partySize)].map((_, index) => (
                        <div key={index}>
                            <label>
                                Role {index + 1}:
                                <select value={roles[index] || ""} onChange={(e) => handleRoleChange(index, e.target.value)}>
                                    <option value="">Select Role</option>
                                    <option value="TANK">TANK</option>
                                    <option value="HEALER">HEALER</option>
                                    <option value="DAMAGE">DAMAGE</option>
                                    <option value="SUPPORT">SUPPORT</option>
                                </select>
                            </label>
                            <label>
                                Level Cap:
                                <input type="number" value={levelCaps[roles[index]] || ""} onChange={(e) => handleLevelCapChange(roles[index], e.target.value)} />
                            </label>
                            <label>
                                Item Level Cap:
                                <input type="number" value={ilvlCaps[roles[index]] || ""} onChange={(e) => handleIlvlCapChange(roles[index], e.target.value)} />
                            </label>
                            <label>
                                Archetype Preference:
                                <select value={archetypePreferences[roles[index]] || ""} onChange={(e) => handleArchetypePreferenceChange(roles[index], e.target.value)}>
                                    <option value="">Select Archetype</option>
                                    {archetypes.map(archetype => (
                                        <option key={archetype} value={archetype}>{archetype}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Profession Preference 1:
                                <select value={professionPreferences[roles[index]]?.grandmaster_profession_one || ""} onChange={(e) => handleProfessionPreferenceChange(roles[index], "grandmaster_profession_one", e.target.value)}>
                                    <option value="">Select Profession</option>
                                    {professions.map(profession => (
                                        <option key={profession} value={profession}>{profession}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Profession Preference 2:
                                <select value={professionPreferences[roles[index]]?.grandmaster_profession_two || ""} onChange={(e) => handleProfessionPreferenceChange(roles[index], "grandmaster_profession_two", e.target.value)}>
                                    <option value="">Select Profession</option>
                                    {professions.map(profession => (
                                        <option key={profession} value={profession}>{profession}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    ))}
                    {errors.roles && <span className="error">{errors.roles}</span>}
                </div>
                <button type="submit">Create Party</button>
            </form>
            <NotificationSystem notifications={notifications} />
        </div>
    );
};

export default PartyForm;