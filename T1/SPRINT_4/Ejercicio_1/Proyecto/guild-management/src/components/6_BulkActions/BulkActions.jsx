import React, { useState } from "react";
import "./BulkActions.css";
import { updateGuildMember } from "../../services/members/members_api";

const BulkActions = ({ selectedMembers, onSendMessage, onChangeGuildRole }) => {
    const [message, setMessage] = useState("");
    const [newGuildRole, setNewGuildRole] = useState("");

    const handleSendMessage = () => {
        onSendMessage(message);
        setMessage("");
    };

    const handleChangeGuildRole = async () => {
        for (const member of selectedMembers) {
            await updateGuildMember(member.user_id, { ...member, guild_role: newGuildRole });
        }
        onChangeGuildRole(newGuildRole);
        setNewGuildRole("");
    };

    return (
        <div className="bulk-actions">
            <h3>Bulk Actions</h3>
            <div className="bulk-info">
                <p>Selected Members: {selectedMembers.length}</p>
                <p>Join Date: {selectedMembers.map(member => member.joinDate).join(", ")}</p>
                <p>Last Activity: {selectedMembers.map(member => member.lastActivity).join(", ")}</p>
            </div>
            <div className="bulk-actions-buttons">
                <div className="bulk-action">
                    <textarea
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>Send Message</button>
                </div>
                <div className="bulk-action">
                    <select
                        value={newGuildRole}
                        onChange={(e) => setNewGuildRole(e.target.value)}
                    >
                        <option value="">Select Guild Role</option>
                        <option value="LIDER">LIDER</option>
                        <option value="GERENTE SENIOR">GERENTE SENIOR</option>
                        <option value="GERENTE">GERENTE</option>
                        <option value="GERENTE A2">GERENTE A2</option>
                        <option value="ALPHA 2">ALPHA 2</option>
                        <option value="MEMBER">MEMBER</option>
                    </select>
                    <button onClick={handleChangeGuildRole}>Change Guild Role</button>
                </div>
            </div>
        </div>
    );
};

export default BulkActions;