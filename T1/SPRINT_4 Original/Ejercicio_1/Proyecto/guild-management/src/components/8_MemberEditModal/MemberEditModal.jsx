import React, { useState, useEffect } from "react";
import "./MemberEditModal.css";

const MemberEditModal = ({ member, onSave, onClose, errors, validateMemberData }) => {
    const [formData, setFormData] = useState({
        username: "",
        level: 0,
        ilvl: 0,
        character_role: "",
        guild_role: "",
        main_archetype: "",
        secondary_archetype: "",
        grandmaster_profession_one: "",
        grandmaster_profession_two: "",
        email: "",
        notify_email: false,
    });
    const [localErrors, setLocalErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (member) {
            setFormData({
                username: member.username || "",
                level: member.level || 0,
                ilvl: member.ilvl || 0,
                character_role: member.character_role || "",
                guild_role: member.guild_role || "",
                main_archetype: member.main_archetype || "",
                secondary_archetype: member.secondary_archetype || "",
                grandmaster_profession_one: member.grandmaster_profession_one || "",
                grandmaster_profession_two: member.grandmaster_profession_two || "",
                email: member.email || "",
                notify_email: member.notify_email || false,
            });
        }
    }, [member]);

    useEffect(() => {
        validateForm();
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = "Invalid email format";
        }
        if (formData.level <= 0 || !Number.isInteger(Number(formData.level))) {
            newErrors.level = "Level must be a positive integer";
        }
        if (formData.ilvl <= 0 || !Number.isInteger(Number(formData.ilvl))) {
            newErrors.ilvl = "ILvl must be a positive integer";
        }
        setLocalErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            onSave(formData);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Edit Member</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Level:
                        <input
                            type="number"
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                        />
                        {localErrors.level && <span className="error">{localErrors.level}</span>}
                    </label>
                    <label>
                        ILvl:
                        <input
                            type="number"
                            name="ilvl"
                            value={formData.ilvl}
                            onChange={handleChange}
                        />
                        {localErrors.ilvl && <span className="error">{localErrors.ilvl}</span>}
                    </label>
                    <label>
                        Character Role:
                        <select
                            name="character_role"
                            value={formData.character_role}
                            onChange={handleChange}
                        >
                            <option value="TANK">TANK</option>
                            <option value="HEALER">HEALER</option>
                            <option value="DAMAGE">DAMAGE</option>
                            <option value="SUPPORT">SUPPORT</option>
                        </select>
                    </label>
                    <label>
                        Guild Role:
                        <select
                            name="guild_role"
                            value={formData.guild_role}
                            onChange={handleChange}
                        >
                            <option value="LIDER">LIDER</option>
                            <option value="GERENTE SENIOR">GERENTE SENIOR</option>
                            <option value="GERENTE">GERENTE</option>
                            <option value="GERENTE A2">GERENTE A2</option>
                            <option value="ALPHA 2">ALPHA 2</option>
                            <option value="MEMBER">MEMBER</option>
                        </select>
                    </label>
                    <label>
                        Main Archetype:
                        <select
                            name="main_archetype"
                            value={formData.main_archetype}
                            onChange={handleChange}
                        >
                            <option value="BARD">BARD</option>
                            <option value="CLERIC">CLERIC</option>
                            <option value="FIGHTER">FIGHTER</option>
                            <option value="MAGE">MAGE</option>
                            <option value="RANGER">RANGER</option>
                            <option value="ROGUE">ROGUE</option>
                            <option value="SUMMONER">SUMMONER</option>
                            <option value="TANK">TANK</option>
                        </select>
                    </label>
                    <label>
                        Secondary Archetype:
                        <select
                            name="secondary_archetype"
                            value={formData.secondary_archetype}
                            onChange={handleChange}
                        >
                            <option value="BARD">BARD</option>
                            <option value="CLERIC">CLERIC</option>
                            <option value="FIGHTER">FIGHTER</option>
                            <option value="MAGE">MAGE</option>
                            <option value="RANGER">RANGER</option>
                            <option value="ROGUE">ROGUE</option>
                            <option value="SUMMONER">SUMMONER</option>
                            <option value="TANK">TANK</option>
                        </select>
                    </label>
                    <label>
                        Grandmaster Profession One:
                        <select
                            name="grandmaster_profession_one"
                            value={formData.grandmaster_profession_one}
                            onChange={handleChange}
                        >
                            <option value="FISHING">FISHING</option>
                            <option value="HERBALISM">HERBALISM</option>
                            <option value="HUNTING">HUNTING</option>
                            <option value="LUMBERJACKING">LUMBERJACKING</option>
                            <option value="MINING">MINING</option>
                            <option value="ALCHEMY">ALCHEMY</option>
                            <option value="ANIMALHUSBANDRY">ANIMALHUSBANDRY</option>
                            <option value="COOKING">COOKING</option>
                            <option value="FARMING">FARMING</option>
                            <option value="LUMBERMILLING">LUMBERMILLING</option>
                            <option value="METALWORKING">METALWORKING</option>
                            <option value="STONECUTTING">STONECUTTING</option>
                            <option value="TANNING">TANNING</option>
                            <option value="WEAVING">WEAVING</option>
                            <option value="ARCANEENGINEERING">ARCANEENGINEERING</option>
                            <option value="ARMORSMITHING">ARMORSMITHING</option>
                            <option value="CARPENTRY">CARPENTRY</option>
                            <option value="JEWELCUTTING">JEWELCUTTING</option>
                            <option value="LEATHERWORKING">LEATHERWORKING</option>
                            <option value="SCRIBE">SCRIBE</option>
                            <option value="TAILORING">TAILORING</option>
                            <option value="WEAPONSMITHING">WEAPONSMITHING</option>
                        </select>
                    </label>
                    <label>
                        Grandmaster Profession Two:
                        <select
                            name="grandmaster_profession_two"
                            value={formData.grandmaster_profession_two}
                            onChange={handleChange}
                        >
                            <option value="FISHING">FISHING</option>
                            <option value="HERBALISM">HERBALISM</option>
                            <option value="HUNTING">HUNTING</option>
                            <option value="LUMBERJACKING">LUMBERJACKING</option>
                            <option value="MINING">MINING</option>
                            <option value="ALCHEMY">ALCHEMY</option>
                            <option value="ANIMALHUSBANDRY">ANIMALHUSBANDRY</option>
                            <option value="COOKING">COOKING</option>
                            <option value="FARMING">FARMING</option>
                            <option value="LUMBERMILLING">LUMBERMILLING</option>
                            <option value="METALWORKING">METALWORKING</option>
                            <option value="STONECUTTING">STONECUTTING</option>
                            <option value="TANNING">TANNING</option>
                            <option value="WEAVING">WEAVING</option>
                            <option value="ARCANEENGINEERING">ARCANEENGINEERING</option>
                            <option value="ARMORSMITHING">ARMORSMITHING</option>
                            <option value="CARPENTRY">CARPENTRY</option>
                            <option value="JEWELCUTTING">JEWELCUTTING</option>
                            <option value="LEATHERWORKING">LEATHERWORKING</option>
                            <option value="SCRIBE">SCRIBE</option>
                            <option value="TAILORING">TAILORING</option>
                            <option value="WEAPONSMITHING">WEAPONSMITHING</option>
                        </select>
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {localErrors.email && <span className="error">{localErrors.email}</span>}
                    </label>
                    <label>
                        Notify Email:
                        <input
                            type="checkbox"
                            name="notify_email"
                            checked={formData.notify_email}
                            onChange={handleChange}
                        />
                    </label>
                    {localErrors && (
                        <div className="errors">
                            {Object.values(localErrors).map((error, index) => (
                                <div key={index} className="error">
                                    {error}
                                </div>
                            ))}
                        </div>
                    )}
                    <button type="submit" disabled={!isFormValid}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default MemberEditModal;