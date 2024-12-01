import React, { useState, useEffect } from "react";
import "./CreateMember.css";
import ValidationSystem from "../../general/ValidationSystem/ValidationSystem";

const CreateMember = ({ onSave, onClose, existingUserIds }) => {
    const [newMemberData, setNewMemberData] = useState({
        user_id: "",
        username: "",
        level: "",
        ilvl: "",
        character_role: "TANK",
        guild_role: "MEMBER",
        main_archetype: "BARD",
        secondary_archetype: "BARD",
        grandmaster_profession_one: "FISHING",
        grandmaster_profession_two: "FISHING",
        email: "",
        notify_email: false,
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const { newErrors, isFormValid } = ValidationSystem.validateForm(newMemberData, existingUserIds);
        setErrors(newErrors);
        setIsFormValid(isFormValid);
    }, [newMemberData, existingUserIds]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewMemberData({
            ...newMemberData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            onSave(newMemberData);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>New Member</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        User ID:
                        <input type="text" name="user_id" value={newMemberData.user_id} onChange={handleChange} required />
                        {errors.user_id && <span className="error">{errors.user_id}</span>}
                    </label>
                    <label>
                        Username:
                        <input type="text" name="username" value={newMemberData.username} onChange={handleChange} required />
                    </label>
                    <label>
                        Level:
                        <input type="number" name="level" value={newMemberData.level} onChange={handleChange} required />
                        {errors.level && <span className="error">{errors.level}</span>}
                    </label>
                    <label>
                        ILvl:
                        <input type="number" name="ilvl" value={newMemberData.ilvl} onChange={handleChange} required />
                        {errors.ilvl && <span className="error">{errors.ilvl}</span>}
                    </label>
                    <label>
                        Character Role:
                        <select name="character_role" value={newMemberData.character_role} onChange={handleChange}>
                            <option value="TANK">TANK</option>
                            <option value="HEALER">HEALER</option>
                            <option value="DAMAGE">DAMAGE</option>
                            <option value="SUPPORT">SUPPORT</option>
                        </select>
                    </label>
                    <label>
                        Guild Role:
                        <select name="guild_role" value={newMemberData.guild_role} onChange={handleChange}>
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
                        <select name="main_archetype" value={newMemberData.main_archetype} onChange={handleChange}>
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
                        <select name="secondary_archetype" value={newMemberData.secondary_archetype} onChange={handleChange}>
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
                        <select name="grandmaster_profession_one" value={newMemberData.grandmaster_profession_one} onChange={handleChange}>
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
                        <select name="grandmaster_profession_two" value={newMemberData.grandmaster_profession_two} onChange={handleChange}>
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
                        <input type="email" name="email" value={newMemberData.email} onChange={handleChange} required />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </label>
                    <label>
                        Notify by Email:
                        <input type="checkbox" name="notify_email" checked={newMemberData.notify_email} onChange={handleChange} />
                    </label>
                    <div className="modal-actions">
                        <button type="submit" disabled={!isFormValid}>Add Member</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMember;