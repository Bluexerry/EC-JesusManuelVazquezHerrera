import React from "react";
import "./MemberItem.css";

const MemberItem = ({ member, onEdit, onDelete, onToggleSelectMember, isSelected, onUsernameClick }) => {
    return (
        <tr className="member-item">
            <td>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelectMember(member.user_id)}
                />
            </td>
            <td>{member.user_id}</td>
            <td className="username" onClick={() => onUsernameClick(member)}>{member.username}</td>
            <td>{member.level}</td>
            <td>{member.ilvl}</td>
            <td>{member.character_role}</td>
            <td>{member.guild_role}</td>
            <td>{member.main_archetype}</td>
            <td>{member.secondary_archetype}</td>
            <td>{member.grandmaster_profession_one}</td>
            <td>{member.grandmaster_profession_two}</td>
            <td>{member.email}</td>
            <td>{member.notify_email ? "Yes" : "No"}</td>
            <td>
                <button className="edit" onClick={() => onEdit(member.user_id)}>Edit</button>
                <button className="delete" onClick={() => onDelete(member.user_id)}>Delete</button>
            </td>
        </tr>
    );
};

export default MemberItem;