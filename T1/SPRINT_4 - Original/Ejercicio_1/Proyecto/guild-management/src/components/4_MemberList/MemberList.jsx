// MemberList.jsx

import React, { useMemo, useState, useCallback } from "react";
import MemberItem from "../5_MemberItem/MemberItem";
import Pagination from "../9_Pagination/Pagination";
import "./MemberList.css";

const MemberList = React.memo(function MemberList({
    members,
    onEdit,
    onDelete,
    onToggleSelectMember,
    selectedMembers,
    onUsernameClick
}) {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedMembers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return members.slice(startIndex, endIndex);
    }, [members, currentPage, itemsPerPage]);

    const totalPages = useMemo(() => {
        return Math.ceil(members.length / itemsPerPage);
    }, [members.length, itemsPerPage]);

    const handleSelectAll = () => {
        if (paginatedMembers.every(member => selectedMembers.includes(member.user_id))) {
            paginatedMembers.forEach(member => onToggleSelectMember(member.user_id));
        } else {
            paginatedMembers.forEach(member => {
                if (!selectedMembers.includes(member.user_id)) {
                    onToggleSelectMember(member.user_id);
                }
            });
        }
    };

    return (
        <div>
            <div className="pagination-controls">
                <label>
                    Show
                    <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    members per page
                </label>
            </div>
            <table className="member-list">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={paginatedMembers.every(member => selectedMembers.includes(member.user_id))}
                            />
                        </th>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Level</th>
                        <th>ILvl</th>
                        <th>Character Role</th>
                        <th>Guild Role</th>
                        <th>Main Archetype</th>
                        <th>Secondary Archetype</th>
                        <th>Grandmaster Profession One</th>
                        <th>Grandmaster Profession Two</th>
                        <th>Email</th>
                        <th>Notify Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedMembers.map((member) => (
                        <MemberItem
                            key={member.user_id}
                            member={member}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleSelectMember={onToggleSelectMember}
                            isSelected={selectedMembers.includes(member.user_id)}
                            onUsernameClick={onUsernameClick}
                        />
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
});

export default MemberList;