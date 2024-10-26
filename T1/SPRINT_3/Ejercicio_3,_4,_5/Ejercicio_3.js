const apiUrl = "http://localhost:3000/guildmembers";
let isEditing = false;
let editingUserId = null;
let existingUserIds = []; // Array para almacenar los user_id existentes

// Evento para abrir el modal de añadir miembro
document.getElementById("addMemberBtn").addEventListener("click", () => {
    openModal();
});

// Función para abrir el modal y resetear formulario
function openModal(editing = false, memberData = {}) {
    isEditing = editing;
    const modal = document.getElementById("memberModal");
    document.getElementById("memberForm").reset();

    if (editing) {
        document.getElementById("modalTitle").textContent = "Edit Member";
        Object.keys(memberData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.type === "checkbox" ? element.checked = memberData[key] : element.value = memberData[key];
            }
        });
    } else {
        document.getElementById("modalTitle").textContent = "Add New Member";
    }
    modal.style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("memberModal").style.display = "none";
    isEditing = false;
    editingUserId = null;
}

// EventListener para cerrar el modal
document.querySelector(".close").addEventListener("click", closeModal);

// Función para añadir o editar miembro
document.getElementById("memberForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const memberData = {
        user_id: document.getElementById("user_id").value,
        username: document.getElementById("username").value,
        level: parseInt(document.getElementById("level").value),
        ilvl: parseInt(document.getElementById("ilvl").value),
        character_role: document.getElementById("character_role").value,
        guild_role: document.getElementById("guild_role").value
    };

    try {
        // Verificar si el user_id ya existe al intentar agregar un nuevo miembro
        if (!isEditing && existingUserIds.includes(memberData.user_id)) {
            throw new Error("El user ID ya está en uso. Debe ser único.");
        }

        if (isEditing) {
            const response = await fetch(`${apiUrl}/${editingUserId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(memberData)
            });
            if (!response.ok) throw new Error("Failed to update member.");
        } else {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(memberData)
            });
            if (!response.ok) throw new Error("Failed to add new member.");
        }

        closeModal();
        fetchMembers(); // Actualizar lista de miembros
    } catch (error) {
        console.error("Error saving member:", error);
        alert("Error al guardar el miembro: " + error.message);
    }
});

// Función para obtener miembros y actualizar la tabla
async function fetchMembers() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch members.");
        const members = await response.json();
        existingUserIds = members.map(member => member.user_id); // Actualizar lista de user_id existentes
        renderTable(members);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

// Función para renderizar la tabla
function renderTable(members) {
    const tableBody = document.getElementById("membersTableBody");
    tableBody.innerHTML = "";

    members.forEach(member => {
        const row = document.createElement("tr");

        row.innerHTML = `
      <td>${member.user_id}</td>
      <td>${member.username}</td>
      <td>${member.level}</td>
      <td>${member.ilvl}</td>
      <td>${member.character_role}</td>
      <td>${member.guild_role}</td>
      <td>
        <button onclick="openEditModal('${member.user_id}', '${member.username}', '${member.level}', '${member.ilvl}', '${member.character_role}', '${member.guild_role}')">Edit</button>
        <button onclick="deleteMember('${member.user_id}')">Delete</button>
      </td>
    `;

        tableBody.appendChild(row);
    });
}

// Función para abrir el modal en modo edición
function openEditModal(userId, username, level, ilvl, characterRole, guildRole) {
    openModal();
    document.getElementById("user_id").value = userId;
    document.getElementById("username").value = username;
    document.getElementById("level").value = level;
    document.getElementById("ilvl").value = ilvl;
    document.getElementById("character_role").value = characterRole;
    document.getElementById("guild_role").value = guildRole;

    isEditing = true;
    editingUserId = userId;
}

// Función para eliminar miembro
async function deleteMember(userId) {
    if (confirm("Are you sure you want to delete this member?")) {
        try {
            const response = await fetch(`${apiUrl}/${userId}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete member.");
            fetchMembers(); // Actualizar lista de miembros
        } catch (error) {
            console.error("Error deleting member:", error);
            alert("Error al eliminar el miembro: " + error.message);
        }
    }
}

// Cargar miembros al inicio
fetchMembers();
