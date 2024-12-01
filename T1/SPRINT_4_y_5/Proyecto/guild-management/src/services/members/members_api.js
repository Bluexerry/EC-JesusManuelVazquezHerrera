const BASE_URL = "http://localhost:3000/guildmembers";

/**
 * Fetches all guild members from the API.
 * @returns {Promise} List of guild members.
 */
export async function getGuildMembers() {
    const response = await fetch(`${BASE_URL}`);
    return await response.json();
}
/**
 * Fetches all guild members from the API.
 * @returns {Promise} List of guild members.
 */
export async function getGuildMember(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await response.json();
}

/**
 * Adds a new member to the guild.
 * @param {Object} memberData - Data of the new member.
 * @returns {Promise} The newly added member data.
 */
export async function addGuildMember(memberData) {
    const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
    });
    const json = await response.json();
    return await getGuildMember(json.user_id)
}

/**
 * Updates a guild member's information.
 * @param {string} memberId - The ID of the member to update.
 * @param {Object} memberData - Updated member data.
 * @returns {Promise} The updated member data.
 */

export async function updateGuildMember(memberId, memberData) {
    const response = await fetch(`${BASE_URL}/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
    });
    return await response.json();
}

/**
 * Deletes a guild member from the guild.
 * @param {string} memberId - The ID of the member to delete.
 * @returns {Promise} Confirmation message.
 */
export async function deleteGuildMember(memberId) {
    const response = await fetch(`${BASE_URL}/${memberId}`, {
        method: 'DELETE'
    });
    return await response.json();
}