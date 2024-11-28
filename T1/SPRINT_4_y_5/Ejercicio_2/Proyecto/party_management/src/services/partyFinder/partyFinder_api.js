// src/services/party/partyFinder_api.js

const PARTY_FINDER_URL = "http://localhost:3000/partyfinder";

/**
 * Fetches all groups in the Party Finder.
 * @returns {Promise} List of groups.
 */
export async function getPartyGroups() {
    const response = await fetch(`${PARTY_FINDER_URL}`);
    return await response.json();
}

/**
 * Creates a new party with the specified size.
 * @param {number} partySize - The size of the party (3, 5, or 8).
 * @param {Object} partyData - Data for the new party.
 * @returns {Promise} The newly created party data.
 */
export async function createParty(partySize, partyData) {
    const response = await fetch(`${PARTY_FINDER_URL}/${partySize}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partyData)
    });
    return await response.json();
}

/**
 * Adds a new member to a party.
 * @param {number} partySize - The size of the party (3, 5, or 8).
 * @param {number} partyId - The ID of the party.
 * @param {Object} memberData - Data of the member to add.
 * @returns {Promise} Confirmation message.
 */
export async function addPartyMember(partySize, partyId, memberData) {
    const response = await fetch(`${PARTY_FINDER_URL}/${partySize}/${partyId}/addMember`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
    });
    return await response.json();
}

/**
 * Removes a member from a party.
 * @param {number} partySize - The size of the party (3, 5, or 8).
 * @param {number} partyId - The ID of the party.
 * @param {Object} memberData - Data of the member to remove.
 * @returns {Promise} Confirmation message.
 */
export async function removePartyMember(partySize, partyId, memberData) {
    const response = await fetch(`${PARTY_FINDER_URL}/${partySize}/${partyId}/removeMember`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
    });
    return await response.json();
}

/**
 * Fetches details of a specific party.
 * @param {number} partySize - The size of the party (3, 5, or 8).
 * @param {number} partyId - The ID of the party.
 * @returns {Promise} Details of the party.
 */
export async function getPartyDetails(partySize, partyId) {
    const response = await fetch(`${PARTY_FINDER_URL}/${partySize}/${partyId}`);
    return await response.json();
}

/**
 * Deletes a specific party.
 * @param {number} partySize - The size of the party (3, 5, or 8).
 * @param {number} partyId - The ID of the party.
 * @param {Object} partyData - Data of the party to delete.
 * @returns {Promise} Confirmation message.
 */
export async function deleteParty(partySize, partyId, partyData) {
    const response = await fetch(`${PARTY_FINDER_URL}/${partySize}/${partyId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partyData)
    });
    return await response.json();
}

/**
 * Updates the role of a member in a party.
 * @param {number} partySize - The size of the party (3, 5, or 8).
 * @param {number} partyId - The ID of the party.
 * @param {Object} roleData - Data for updating the member's role.
 * @returns {Promise} Confirmation message.
 */
export async function updatePartyMemberRole(partySize, partyId, roleData) {
    const response = await fetch(`${PARTY_FINDER_URL}/update-role/${partySize}/${partyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roleData)
    });
    return await response.json();
}