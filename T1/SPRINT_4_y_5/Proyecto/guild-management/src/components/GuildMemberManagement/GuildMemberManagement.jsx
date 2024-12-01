import React, { useEffect, useState } from "react";
import { getGuildMembers, deleteGuildMember, updateGuildMember, addGuildMember } from "../../services/members/members_api";
import FilterBar from "./FilterBar/FilterBar";
import SortControls from "./SortControls/SortControls";
import MemberList from "./MemberList/MemberList";
import BulkActions from "./MemberList/MemberItem/BulkActions/BulkActions";
import MemberDetailsModal from "./MemberList/MemberItem/MemberDetailsModal/MemberDetailsModal";
import MemberEditModal from "./MemberList/MemberItem/MemberEditModal/MemberEditModal";
import ConfirmationDialog from "../general/ConfirmationDialog/ConfirmationDialog";
import NotificationSystem from "../general/NotificationSystem/NotificationSystem";
import CreateMember from "./CreateMember/CreateMember"; // Import the new modal
import { validateForm, validateMemberData } from "../general/ValidationSystem/ValidationSystem";
import "./GuildMemberManagement.css";

function GuildMemberManagement() {
    const [errors, setErrors] = useState({});
    const [editingMemberId, setEditingMemberId] = useState(null);
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [editedMemberData, setEditedMemberData] = useState({});
    const [selectedMember, setSelectedMember] = useState(null);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [isCreateMemberOpen, setIsCreateMemberOpen] = useState(false); // State for new member modal
    const [newMemberData, setNewMemberData] = useState({}); // State for new member data
    const [filters, setFilters] = useState({}); // State for filters
    const [isEditing, setIsEditing] = useState(false); // State to track if editing

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

    useEffect(() => {
        if (isEditing) {
            handleFilterChange(filters);
            setIsEditing(false);
        }
    }, [members]);

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
        const { isValid, newErrors } = validateMemberData(updatedMemberData, members, editingMemberId);
        setErrors(newErrors);
        if (isValid) {
            try {
                const { email, ...dataToUpdate } = updatedMemberData; // Exclude email field
                await updateGuildMember(editingMemberId, dataToUpdate);
                setMembers(members.map(member => (member.user_id === editingMemberId ? { ...member, ...dataToUpdate } : member)));
                setNotifications([{ type: "success", message: "Member updated successfully" }]);
                setEditingMemberId(null); // Close the modal
                setEditedMemberData({});
                setIsEditing(true); // Set editing state to true
            } catch (error) {
                handleApiError(error);
            }
        }
    };

    const handleFilterChange = (filters) => {
        setFilters(filters); // Save the current filters
        let filtered = members.filter(member => {
            return (
                (filters.characterRole === "" || member.character_role === filters.characterRole) &&
                (filters.guildRole === "" || member.guild_role === filters.guildRole) &&
                (filters.mainArchetype === "" || member.main_archetype === filters.mainArchetype) &&
                (filters.secondaryArchetype === "" || member.secondary_archetype === filters.secondaryArchetype) &&
                (filters.grandmasterProfessionOne === "" || member.grandmaster_profession_one === filters.grandmasterProfessionOne) &&
                (filters.grandmasterProfessionTwo === "" || member.grandmaster_profession_two === filters.grandmasterProfessionTwo) &&
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
        setMembers(members.map(member => (
            selectedMembers.includes(member.user_id) ? { ...member, guild_role: newGuildRole } : member
        )));
        setSelectedMembers([]);
        setNotifications([{ type: "success", message: "Guild role changed successfully" }]);
    };

    const handleDeleteMembers = (deletedMemberIds) => {
        setMembers(members.filter(member => !deletedMemberIds.includes(member.user_id)));
        setSelectedMembers([]);
        setNotifications([{ type: "success", message: "Members deleted successfully" }]);
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
        setIsCreateMemberOpen(true);
    };

    const handleSaveNewMember = async (newMemberData) => {
        try {
            const { email, ...dataToSave } = newMemberData; // Exclude email field
            const savedMember = await addGuildMember(dataToSave);
            const updatedMembers = [...members, savedMember].sort((a, b) => a.user_id.localeCompare(b.user_id));
            setMembers(updatedMembers);
            setNotifications([{ type: "success", message: "New member added successfully" }]);
            setIsCreateMemberOpen(false);
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
                    onDeleteMembers={handleDeleteMembers}
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
            {isCreateMemberOpen && (
                <CreateMember
                    onSave={handleSaveNewMember}
                    onClose={() => setIsCreateMemberOpen(false)}
                    existingUserIds={existingUserIds}
                />
            )}
        </div>
    );
}

export default GuildMemberManagement;