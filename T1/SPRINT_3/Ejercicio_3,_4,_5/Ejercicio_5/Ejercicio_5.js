const apiUrl = "http://localhost:3000"; // Base URL de la API
const partyListDiv = document.getElementById("partyList");
const messageDiv = document.getElementById("message");

// Función para buscar una party específica por party_id y partySize
async function searchParty(party_id, partySize) {
    try {
        const response = await fetch(`${apiUrl}/partyfinder/${partySize}/${party_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // Si la respuesta no es exitosa, lanzar un error para ser capturado
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const party = await response.json();

        if (!party || !party.party_id) {
            throw new Error("No se encontraron parties con los parámetros especificados");
        }

        // Limpiar el contenido actual y mostrar la party encontrada
        partyListDiv.innerHTML = "";
        const partyDiv = document.createElement("div");
        partyDiv.className = "party";

        // Mostrar la información de la party
        partyDiv.innerHTML = `
            <h3>Party ID: ${party.party_id}</h3>
            <p>Creator ID: ${party.creator_id}</p>
            <p>Planned Start: ${party.planned_start}</p>
            <p>Level Cap: ${party.level_cap}</p>
            <p>Item Level Cap: ${party.ilvl_cap}</p>
        `;

        // Verificar si existe la propiedad members y es un array
        if (Array.isArray(party.members)) {
            partyDiv.innerHTML += `<p>Número de miembros: ${party.members.length}</p>`;

            // Agregar cada miembro a la visualización
            party.members.forEach(member => {
                partyDiv.innerHTML += `
                    <div>
                        <p>Miembro: ${member.user_id} (${member.party_role})</p>
                        <button onclick="removeMember(${party.party_id}, '${member.user_id}', ${partySize}')">Remover</button>
                    </div>
                `;
            });
        } else {
            partyDiv.innerHTML += `<p>No hay miembros en esta party</p>`;
        }

        // Botón para añadir miembro
        partyDiv.innerHTML += `
            <button onclick="openAddMemberModal(${party.party_id}, ${partySize})">Añadir Miembro</button>
        `;

        partyListDiv.appendChild(partyDiv);
        showMessage("Party encontrada con éxito", "success");

    } catch (error) {
        console.error("Error al obtener la party:", error);
        showMessage(`Error: ${error.message}`, "error");
    }
}

// Función para mostrar mensajes de éxito o error
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.style.color = type === "error" ? "red" : "green";
}

// Abrir el modal para añadir miembro
function openAddMemberModal(party_id, partySize) {
    const modal = document.getElementById("addMemberModal");
    const form = document.getElementById("addMemberForm");

    form.onsubmit = async function (e) {
        e.preventDefault();
        const user_id = document.getElementById("user_id").value;
        const role = document.getElementById("role").value;

        try {
            // Llamar al endpoint para añadir miembro
            const response = await fetch(`${apiUrl}/partyfinder/${partySize}/${party_id}/addMember`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id, role })
            });

            if (response.ok) {
                // Si la solicitud es exitosa, actualizar la lista de parties
                searchParty(party_id, partySize);
                showMessage("Miembro añadido correctamente", "success");
                modal.style.display = "none"; // Cerrar modal
                form.reset();
            } else {
                // Manejar error devuelto por la API
                const errorData = await response.json();
                showMessage(`Error al añadir miembro: ${errorData.message}`, "error");
            }
        } catch (error) {
            console.error("Error al añadir miembro:", error);
            showMessage("Error de conexión al añadir miembro", "error");
        }
    };

    modal.style.display = "block";
}

// Cerrar el modal
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("addMemberModal").style.display = "none";
});

// Remover miembro de una party
async function removeMember(party_id, user_id, partySize) {
    try {
        const response = await fetch(`${apiUrl}/partyfinder/${partySize}/${party_id}/removeMember`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id })
        });

        if (response.ok) {
            searchParty(party_id, partySize); // Actualizar la lista
            showMessage("Miembro removido correctamente", "success");
        } else {
            const errorData = await response.json();
            showMessage(`Error al remover miembro: ${errorData.message}`, "error");
        }
    } catch (error) {
        console.error("Error al remover miembro:", error);
        showMessage("Error de conexión al remover miembro", "error");
    }
}

// Manejar la búsqueda de party
document.getElementById("searchPartyForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const party_id = document.getElementById("party_id").value;
    const partySize = document.getElementById("partySize").value;

    searchParty(party_id, partySize);
});
