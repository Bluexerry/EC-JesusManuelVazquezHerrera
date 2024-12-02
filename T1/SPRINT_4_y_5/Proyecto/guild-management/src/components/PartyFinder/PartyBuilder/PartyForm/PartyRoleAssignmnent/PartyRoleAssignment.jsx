import React from "react";
import "./PartyRoleAssignment.css";

const roles = ["TANK", "HEALER", "DAMAGE", "SUPPORT"];

const PartyRoleAssignment = ({
    partySize,
    roles,
    levelCaps,
    ilvlCaps,
    onRoleChange,
    onLevelCapChange,
    onIlvlCapChange
}) => {
    return (
        <div className="party-role-assignment">
            <h3>Roles</h3>
            {[...Array(partySize)].map((_, index) => (
                <div key={index} className="role-assignment">
                    <label>
                        Role {index + 1}:
                        <select
                            value={roles[index] || ""}
                            onChange={(e) => onRoleChange(index, e.target.value)}
                        >
                            <option value="">Select Role</option>
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Level Cap:
                        <input
                            type="number"
                            value={levelCaps[roles[index]] || ""}
                            onChange={(e) => onLevelCapChange(roles[index], e.target.value)}
                        />
                    </label>
                    <label>
                        Item Level Cap:
                        <input
                            type="number"
                            value={ilvlCaps[roles[index]] || ""}
                            onChange={(e) => onIlvlCapChange(roles[index], e.target.value)}
                        />
                    </label>
                </div>
            ))}
        </div>
    );
};

export default PartyRoleAssignment;