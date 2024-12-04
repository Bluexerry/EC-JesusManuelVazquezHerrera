import React, { useState, useEffect } from "react";
import { getPartyDetails, updateParty } from "../../../../../services/partyFinder/partyFinder_api";
import { validateForm } from "../../../../general/ValidationSystem/ValidationSystem";
import NotificationSystem from "../../../../general/NotificationSystem/NotificationSystem";
import "./PartyEditModal.css";

const PartyEditModal = ({ isOpen, partyId, onClose, onUpdate }) => {
    const [partyData, setPartyData] = useState(null);
    const [errors, setErrors] = useState({});
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (isOpen && partyId) {
            fetchPartyDetails();
        }
    }, [isOpen, partyId]);

    const fetchPartyDetails = async () => {
        const data = await getPartyDetails(partyId);
        setPartyData(data);
    };

    const handleChange = (field, value) => {
        setPartyData({ ...partyData, [field]: value });
    };

    const validateFormFields = () => {
        const { newErrors, isFormValid } = validateForm(partyData);
        setErrors(newErrors);
        return isFormValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFormFields()) {
            try {
                await updateParty(partyId, partyData);
                setNotifications([{ type: "success", message: "Party updated successfully" }]);
                onUpdate();
                onClose();
            } catch (error) {
                setNotifications([{ type: "error", message: "Failed to update party" }]);
            }
        } else {
            setNotifications([{ type: "error", message: "Please fix the errors in the form" }]);
        }
    };

    if (!isOpen || !partyData) {
        return null;
    }

    return (
        <div className="party-edit-modal">
            <div className="modal-content">
                <h2>Edit Party</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Party ID:
                        <input type="text" value={partyData.party_id} readOnly />
                    </label>
                    <label>
                        Creator ID:
                        <input type="text" value={partyData.creator_id} readOnly />
                    </label>
                    <label>
                        Status:
                        <select value={partyData.isComplete ? "COMPLETA" : "BUSCANDO"} onChange={(e) => handleChange("isComplete", e.target.value === "COMPLETA")}>
                            <option value="BUSCANDO">BUSCANDO</option>
                            <option value="COMPLETA">COMPLETA</option>
                        </select>
                    </label>
                    <label>
                        Planned Start:
                        <input type="datetime-local" value={partyData.planned_start} onChange={(e) => handleChange("planned_start", e.target.value)} />
                    </label>
                    <label>
                        Level Cap:
                        <input type="number" value={partyData.level_cap} onChange={(e) => handleChange("level_cap", e.target.value)} />
                    </label>
                    <label>
                        Item Level Cap:
                        <input type="number" value={partyData.ilvl_cap} onChange={(e) => handleChange("ilvl_cap", e.target.value)} />
                    </label>
                    <div className="modal-buttons">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
                <NotificationSystem notifications={notifications} />
            </div>
        </div>
    );
};

export default PartyEditModal;