// SortControls.jsx

import React, { useState, useCallback } from "react";
import "./SortControls.css";

const SortControls = React.memo(function SortControls({ onSortChange }) {
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

    const handleSortChange = useCallback((key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
        onSortChange({ key, direction });
    }, [sortConfig, onSortChange]);

    return (
        <div className="sort-controls">
            <h3>Ordenar por</h3>
            <div className="sort-buttons">
                <button onClick={() => handleSortChange("user_id")}>User ID</button>
                <button onClick={() => handleSortChange("username")}>Username</button>
                <button onClick={() => handleSortChange("level")}>Level</button>
                <button onClick={() => handleSortChange("ilvl")}>ILvl</button>
                <button onClick={() => handleSortChange("character_role")}>Character Role</button>
                <button onClick={() => handleSortChange("guild_role")}>Guild Role</button>
                <button onClick={() => handleSortChange("main_archetype")}>Main Archetype</button>
                <button onClick={() => handleSortChange("secondary_archetype")}>Secondary Archetype</button>
                <button onClick={() => handleSortChange("grandmaster_profession_one")}>Grandmaster Profession One</button>
                <button onClick={() => handleSortChange("grandmaster_profession_two")}>Grandmaster Profession Two</button>
                <button onClick={() => handleSortChange("email")}>Email</button>
                <button onClick={() => handleSortChange("notify_email")}>Notify Email</button>
            </div>
        </div>
    );
});

export default SortControls;