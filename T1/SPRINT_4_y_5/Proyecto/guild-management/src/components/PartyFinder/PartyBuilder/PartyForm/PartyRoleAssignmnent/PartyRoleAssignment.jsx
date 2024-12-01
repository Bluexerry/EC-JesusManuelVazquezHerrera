import React from 'react';
import './PartyRoleAssignment.css';

const PartyRoleAssignment = ({ formData, setFormData }) => {
    const handleRoleChange = (e, index) => {
        const { name, value } = e.target;
        const roles = [...formData.roles];
        roles[index] = { ...roles[index], [name]: value };
        setFormData({ ...formData, roles });
    };

    const addRole = () => {
        setFormData({ ...formData, roles: [...formData.roles, { role: '', levelCap: 0, itemLevelCap: 0 }] });
    };

    const removeRole = (index) => {
        const roles = formData.roles.filter((_, i) => i !== index);
        setFormData({ ...formData, roles });
    };

    return (
        <div className="party-role-assignment">
            <h3>Roles Assignment</h3>
            {formData.roles.map((role, index) => (
                <div key={index} className="role">
                    <label>
                        Role:
                        <select name="role" value={role.role} onChange={(e) => handleRoleChange(e, index)}>
                            <option value="TANK">TANK</option>
                            <option value="HEALER">HEALER</option>
                            <option value="DAMAGE">DAMAGE</option>
                            <option value="SUPPORT">SUPPORT</option>
                        </select>
                    </label>
                    <label>
                        Level Cap:
                        <input type="number" name="levelCap" value={role.levelCap} onChange={(e) => handleRoleChange(e, index)} />
                    </label>
                    <label>
                        Item Level Cap:
                        <input type="number" name="itemLevelCap" value={role.itemLevelCap} onChange={(e) => handleRoleChange(e, index)} />
                    </label>
                    <button type="button" onClick={() => removeRole(index)}>Remove Role</button>
                </div>
            ))}
            <button type="button" onClick={addRole}>Add Role</button>
        </div>
    );
};

export default PartyRoleAssignment;