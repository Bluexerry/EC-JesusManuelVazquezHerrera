export const validateForm = (newMemberData, existingUserIds) => {
    const newErrors = {};
    if (!newMemberData.email || !newMemberData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.email = "Invalid email format";
    }
    if (newMemberData.level <= 0 || !Number.isInteger(Number(newMemberData.level))) {
        newErrors.level = "Level must be a positive integer";
    }
    if (newMemberData.ilvl <= 0 || !Number.isInteger(Number(newMemberData.ilvl))) {
        newErrors.ilvl = "ILvl must be a positive integer";
    }
    if (existingUserIds.includes(newMemberData.user_id)) {
        newErrors.user_id = "User ID already exists";
    }
    return {
        newErrors,
        isFormValid: Object.keys(newErrors).length === 0
    };
};

export const validateMemberData = (data, members, editingMemberId) => {
    const newErrors = {};
    console.log("Validating member data:", data);

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

    console.log("Validation errors:", newErrors);
    return {
        newErrors,
        isValid: Object.keys(newErrors).length === 0
    };
};

export default {
    validateForm,
    validateMemberData
};