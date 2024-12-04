import React from "react";
import "./MemberDetailsModal.css";

const MemberDetailsModal = ({ member, onClose }) => {
    if (!member) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Member Details</h2>
                <div className="member-details">
                    <p><strong>User ID:</strong> {member.user_id}</p>
                    <p><strong>Username:</strong> {member.username}</p>
                    <p><strong>Level:</strong> {member.level}</p>
                    <p><strong>ILvl:</strong> {member.ilvl}</p>
                    <p><strong>Character Role:</strong> {member.character_role}</p>
                    <p><strong>Guild Role:</strong> {member.guild_role}</p>
                    <p><strong>Main Archetype:</strong> {member.main_archetype}</p>
                    <p><strong>Secondary Archetype:</strong> {member.secondary_archetype}</p>
                    <p><strong>Grandmaster Profession One:</strong> {member.grandmaster_profession_one}</p>
                    <p><strong>Grandmaster Profession Two:</strong> {member.grandmaster_profession_two}</p>
                    <p><strong>Email:</strong> {member.email}</p>
                    <p><strong>Notify Email:</strong> {member.notify_email ? "Yes" : "No"}</p>
                    <p><strong>Join Date:</strong> {member.joinDate}</p>
                    <p><strong>Last Activity:</strong> {member.lastActivity}</p>
                </div>
            </div>
        </div>
    );
};

export default MemberDetailsModal;