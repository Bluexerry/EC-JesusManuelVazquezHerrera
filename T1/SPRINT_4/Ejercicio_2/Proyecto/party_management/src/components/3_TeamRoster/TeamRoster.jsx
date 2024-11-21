import React from 'react';
import './TeamRoster.css';

const TeamRoster = ({ partyMembers, onRemoveMember, onReassignMember }) => {
    return (
        <div className="team-roster">
            <h2>Team Roster</h2>
            <ul>
                {partyMembers.map((member, index) => (
                    <li key={index} className="team-member">
                        {member.username ? (
                            <div>
                                <p><strong>{member.username}</strong> (Level: {member.level}, Item Level: {member.ilvl}, Archetype: {member.main_archetype}, Profession: {member.grandmaster_profession_one})</p>
                                <p>Nombre: {member.username}</p>
                                <p>Nivel: {member.level}</p>
                                <p>Item Level: {member.ilvl}</p>
                                <p>Arquetipo: {member.main_archetype}</p>
                                <p>Profesión: {member.grandmaster_profession_one} (Grandmaster)</p>
                                <button onClick={() => onRemoveMember(member)}>Remove</button>
                                <button onClick={() => onReassignMember(member)}>Reassign</button>
                            </div>
                        ) : 'Empty Slot'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamRoster;