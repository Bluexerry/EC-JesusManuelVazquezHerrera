import React, { useEffect, useState } from "react";
import { getGuildMembers, deleteGuildMember, updateGuildMember, addGuildMember } from "../../services/members/members_api";
import FilterBar from "../2_FilterBar/FilterBar";
import SortControls from "../3_SortControls/SortControls";
import MemberList from "../4_MemberList/MemberList";
import BulkActions from "../6_BulkActions/BulkActions";
import MemberDetailsModal from "../7_MemberDetailsModal/MemberDetailsModal";
import MemberEditModal from "../8_MemberEditModal/MemberEditModal";
import ConfirmationDialog from "../10_ConfirmationDialog/ConfirmationDialog";
import NotificationSystem from "../11_NotificationSystem/NotificationSystem";
import NewMemberModal from "../12_NewMemberModal/NewMemberModal"; // Import the new modal
import "./GuildMemberManagement.css";

function GuildMemberManagement() {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [editingMemberId, setEditingMemberId] = useState(null);
    const [editedMemberData, setEditedMemberData] = useState({});
    const [errors, setErrors] = useState({});
    const [selectedMember, setSelectedMember] = useState(null);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [isNewMemberModalOpen, setIsNewMemberModalOpen] = useState(false); // State for new member modal
    const [newMemberData, setNewMemberData] = useState({}); // State for new member data

    useEffect(() => {
        async function fetchMembers() {
            try {
                const data = await getGuildMembers();
                setMembers(data);
                setFilteredMembers(data);
            } catch (error) {
                handleApiError(error);
            }
        }

        fetchMembers();
    }, []);

    useEffect(() => {
        if (editingMemberId) {
            const member = members.find(member => member.user_id === editingMemberId);
            setEditedMemberData(member || {});
        }
    }, [editingMemberId, members]);

    const toggleSelectMember = (userId) => {
        setSelectedMembers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter(id => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleDelete = async (userId) => {
        setIsConfirmationDialogOpen(true);
        setMemberToDelete(userId);
    };

    const confirmDelete = async () => {
        if (memberToDelete) {
            try {
                await deleteGuildMember(memberToDelete);
                setMembers(members.filter(member => member.user_id !== memberToDelete));
                setFilteredMembers(filteredMembers.filter(member => member.user_id !== memberToDelete));
                setNotifications([{ type: "success", message: "Member deleted successfully" }]);
            } catch (error) {
                handleApiError(error);
            } finally {
                setIsConfirmationDialogOpen(false);
                setMemberToDelete(null);
            }
        }
    };

    const cancelDelete = () => {
        setIsConfirmationDialogOpen(false);
        setMemberToDelete(null);
    };

    const handleEdit = (userId) => {
        setEditingMemberId(userId);
    };

    const handleSave = async (updatedMemberData) => {
        if (validateMemberData(updatedMemberData)) {
            try {
                const { email, ...dataToUpdate } = updatedMemberData; // Exclude email field
                await updateGuildMember(editingMemberId, dataToUpdate);
                setMembers(members.map(member => (member.user_id === editingMemberId ? { ...member, ...dataToUpdate } : member)));
                setFilteredMembers(filteredMembers.map(member => (member.user_id === editingMemberId ? { ...member, ...dataToUpdate } : member)));
                setNotifications([{ type: "success", message: "Member updated successfully" }]);
                setEditingMemberId(null); // Close the modal
                setEditedMemberData({});
            } catch (error) {
                handleApiError(error);
            }
        }
    };

    const validateMemberData = (data) => {
        const newErrors = {};
        if (!data.email || !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = "Invalid email format";
        }
        if (data.level <= 0 || !Number.isInteger(Number(data.level))) {
            newErrors.level = "Level must be a positive integer";
        }
        if (data.ilvl <= 0 || !Number.isInteger(Number(data.ilvl))) {
            newErrors.ilvl = "ILvl must be a positive integer";
        }
        if (members.some(member => member.user_id !== editingMemberId && member.email === data.email)) {
            newErrors.email = "Email must be unique";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFilterChange = (filters) => {
        let filtered = members.filter(member => {
            return (
                (filters.characterRole === "" || member.character_role === filters.characterRole) &&
                (filters.guildRole === "" || member.guild_role === filters.guildRole) &&
                (filters.mainArchetype === "" || member.main_archetype === filters.mainArchetype) &&
                (filters.secondaryArchetype === "" || member.secondary_archetype === filters.secondaryArchetype) &&
                (filters.grandmasterProfession === "" || member.grandmaster_profession_one === filters.grandmasterProfession || member.grandmaster_profession_two === filters.grandmasterProfession) &&
                (filters.minLevel === "" || member.level >= parseInt(filters.minLevel)) &&
                (filters.maxLevel === "" || member.level <= parseInt(filters.maxLevel)) &&
                (filters.minIlvl === "" || member.ilvl >= parseInt(filters.minIlvl)) &&
                (filters.maxIlvl === "" || member.ilvl <= parseInt(filters.maxIlvl))
            );
        });
        setFilteredMembers(filtered);
    };

    const handleSortChange = ({ key, direction }) => {
        setFilteredMembers((prevFilteredMembers) =>
            [...prevFilteredMembers].sort((a, b) => {
                if (a[key] < b[key]) {
                    return direction === "asc" ? -1 : 1;
                }
                if (a[key] > b[key]) {
                    return direction === "asc" ? 1 : -1;
                }
                return 0;
            })
        );
    };

    const handleSendMessage = (message) => {
        // Logic to send message to selected members
        console.log("Sending message to selected members:", message);
    };

    const handleChangeGuildRole = (newGuildRole) => {
        // Logic to change guild role of selected members
        console.log("Changing guild role of selected members to:", newGuildRole);
        setMembers(members.map(member => (
            selectedMembers.includes(member.user_id) ? { ...member, guild_role: newGuildRole } : member
        )));
        setFilteredMembers(filteredMembers.map(member => (
            selectedMembers.includes(member.user_id) ? { ...member, guild_role: newGuildRole } : member
        )));
        setSelectedMembers([]);
        setNotifications([{ type: "success", message: "Guild role changed successfully" }]);
    };

    const handleUsernameClick = (member) => {
        setSelectedMember(member);
    };

    const handleCloseModal = () => {
        setSelectedMember(null);
    };

    const handleApiError = (error) => {
        let message = "An error occurred";
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            message = `Error: ${error.response.status} ${error.response.statusText}`;
        } else if (error.request) {
            // The request was made but no response was received
            message = "Network error: No response received";
        } else {
            // Something happened in setting up the request that triggered an Error
            message = `Error: ${error.message}`;
        }
        setNotifications([{ type: "error", message }]);
    };

    const handleNewMember = () => {
        setIsNewMemberModalOpen(true);
    };

    const handleSaveNewMember = async (newMemberData) => {
        try {
            const { email, ...dataToSave } = newMemberData; // Exclude email field
            const savedMember = await addGuildMember(dataToSave);
            const updatedMembers = [...members, savedMember].sort((a, b) => a.user_id.localeCompare(b.user_id));
            setMembers(updatedMembers);
            setFilteredMembers(updatedMembers);
            setNotifications([{ type: "success", message: "New member added successfully" }]);
            setIsNewMemberModalOpen(false);
            setNewMemberData({});
        } catch (error) {
            handleApiError(error);
        }
    };

    const existingUserIds = members.map(member => member.user_id);

    return (
        <div className="members-table-container">
            <h2>Guild Members Management</h2>
            <button onClick={handleNewMember}>New member</button>
            <FilterBar onFilterChange={handleFilterChange} />
            <SortControls onSortChange={handleSortChange} />
            <MemberList
                members={filteredMembers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleSelectMember={toggleSelectMember}
                selectedMembers={selectedMembers}
                onUsernameClick={handleUsernameClick}
            />
            {selectedMembers.length > 0 && (
                <BulkActions
                    selectedMembers={selectedMembers.map(userId => members.find(member => member.user_id === userId))}
                    onSendMessage={handleSendMessage}
                    onChangeGuildRole={handleChangeGuildRole}
                />
            )}
            {editingMemberId && (
                <MemberEditModal
                    member={editedMemberData}
                    onSave={handleSave}
                    onClose={() => setEditingMemberId(null)}
                    errors={errors}
                    validateMemberData={validateMemberData}
                />
            )}
            {selectedMember && (
                <MemberDetailsModal
                    member={selectedMember}
                    onClose={handleCloseModal}
                />
            )}
            <ConfirmationDialog
                isOpen={isConfirmationDialogOpen}
                message="Are you sure you want to delete this member?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
            <NotificationSystem notifications={notifications} />
            {isNewMemberModalOpen && (
                <NewMemberModal
                    onSave={handleSaveNewMember}
                    onClose={() => setIsNewMemberModalOpen(false)}
                    existingUserIds={existingUserIds}
                />
            )}
        </div>
    );
}

export default GuildMemberManagement;