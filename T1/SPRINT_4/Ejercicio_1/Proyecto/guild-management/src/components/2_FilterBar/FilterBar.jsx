// FilterBar.jsx

import React, { useState } from "react";
import "./FilterBar.css";

function FilterBar({ onFilterChange }) {
    const [filters, setFilters] = useState({
        characterRole: "",
        guildRole: "",
        mainArchetype: "",
        secondaryArchetype: "",
        grandmasterProfession: "",
        minLevel: "",
        maxLevel: "",
        minIlvl: "",
        maxIlvl: ""
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
        onFilterChange({ ...filters, [name]: value });
    };

/*     const dddd = [
        {
            code: "characterRole", label: "Character Role", options: [
                { label: "All", value: "" }, { label: "TANK", value: "TANK" },
                { label: "HEALER", value: "HEALER" },  { label: "DAMAGE", value: "DAMAGE" }, { label: "SUPPORT", value: "SUPPORT" }
            ]
        }
    ] */

    return (
        <div className="filter-container">
            <h3>Filtrar Miembros</h3>
{/*             {dddd.map(({ code, label, options }) => <div className="filter-group">
                <label>{label}</label>
                <select name={code} onChange={handleFilterChange}>
                    {options.map(({ label, value }) => <option value={value}>{label}</option>)}
                </select>
            </div>)} */}
            <div className="filter-group">
                <label>Character Role:</label>
                <select name="characterRole" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="TANK">TANK</option>
                    <option value="HEALER">HEALER</option>
                    <option value="DAMAGE">DAMAGE</option>
                    <option value="SUPPORT">SUPPORT</option>
                </select>
            </div>
            <div className="filter-group">
                <label>Guild Role:</label>
                <select name="guildRole" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="LIDER">LIDER</option>
                    <option value="GERENTE SENIOR">GERENTE SENIOR</option>
                    <option value="GERENTE">GERENTE</option>
                    <option value="GERENTE A2">GERENTE A2</option>
                    <option value="ALPHA 2">ALPHA 2</option>
                    <option value="MEMBER">MEMBER</option>
                </select>
            </div>
            <div className="filter-group">
                <label>Main Archetype:</label>
                <select name="mainArchetype" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="BARD">BARD</option>
                    <option value="CLERIC">CLERIC</option>
                    <option value="FIGHTER">FIGHTER</option>
                    <option value="MAGE">MAGE</option>
                    <option value="RANGER">RANGER</option>
                    <option value="ROGUE">ROGUE</option>
                    <option value="SUMMONER">SUMMONER</option>
                    <option value="TANK">TANK</option>
                </select>
            </div>
            <div className="filter-group">
                <label>Secondary Archetype:</label>
                <select name="secondaryArchetype" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="BARD">BARD</option>
                    <option value="CLERIC">CLERIC</option>
                    <option value="FIGHTER">FIGHTER</option>
                    <option value="MAGE">MAGE</option>
                    <option value="RANGER">RANGER</option>
                    <option value="ROGUE">ROGUE</option>
                    <option value="SUMMONER">SUMMONER</option>
                    <option value="TANK">TANK</option>
                </select>
            </div>
            <div className="filter-group">
                <label>Grandmaster Profession:</label>
                <select name="grandmasterProfession" onChange={handleFilterChange}>
                    <option value="">All</option>
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
            </div>
            <div className="filter-group">
                <label>Min Level:</label>
                <input type="number" name="minLevel" onChange={handleFilterChange} />
            </div>
            <div className="filter-group">
                <label>Max Level:</label>
                <input type="number" name="maxLevel" onChange={handleFilterChange} />
            </div>
            <div className="filter-group">
                <label>Min ILvl:</label>
                <input type="number" name="minIlvl" onChange={handleFilterChange} />
            </div>
            <div className="filter-group">
                <label>Max ILvl:</label>
                <input type="number" name="maxIlvl" onChange={handleFilterChange} />
            </div>
        </div>
    );
}

export default FilterBar;