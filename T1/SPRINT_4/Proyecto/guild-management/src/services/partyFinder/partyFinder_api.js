const BASE_URL = "http://localhost:3000/partyfinder";

/**
 * Fetches all groups in the Party Finder.
 * @returns {Promise} List of groups.
 */
export async function getPartyGroups() {
    try {
        const response = await fetch(`${BASE_URL}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch party groups:", error);
        return [];
    }
}

/**
 * Adds a new member to a party.
 * @param {number} partySize - The size of the party (3, 5, or 8).
 * @param {number} partyId - The ID of the party.
 * @param {Object} memberData - Data of the member to add.
 * @returns {Promise} Confirmation message.
 */
export async function addPartyMember(partySize, partyId, memberData) {
    try {
        const response = await fetch(`${BASE_URL}/${partySize}/${partyId}/addMember`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(memberData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to add party member:", error);
        return null;
    }
}

/**
 * Removes a member from a party.
 * @param {number} partySize - The size of the party (3, 5, or 8).
 * @param {number} partyId - The ID of the party.
 * @param {Object} memberData - Data of the member to remove.
 * @returns {Promise} Confirmation message.
 */
export async function removePartyMember(partySize, partyId, memberData) {
    try {
        const response = await fetch(`${BASE_URL}/${partySize}/${partyId}/removeMember`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(memberData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to remove party member:", error);
        return null;
    }
}

/**
 * Fetches details of a specific party.
 * @param {number} partySize - The size of the party (3, 5, or 8).
 * @param {number} partyId - The ID of the party.
 * @returns {Promise} Details of the party.
 */
export async function getPartyDetails(partySize, partyId) {
    try {
        const response = await fetch(`${BASE_URL}/${partySize}/${partyId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch party details:", error);
        return null;
    }
}

/**
 * Creates a new party.
 * @param {Object} partyData - Data of the party to create.
 * @returns {Promise} Confirmation message.
 */
export async function createParty(partyData) {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(partyData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to create party:", error);
        return null;
    }
}

/**
 * Updates an existing party.
 * @param {number} partyId - The ID of the party.
 * @param {Object} partyData - Updated data of the party.
 * @returns {Promise} Confirmation message.
 */
export async function updateParty(partyId, partyData) {
    try {
        const response = await fetch(`${BASE_URL}/${partyId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(partyData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to update party:", error);
        return null;
    }
}