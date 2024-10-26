document.addEventListener("DOMContentLoaded", function () {
    const createPartyForm = document.getElementById("createPartyForm");
    const partyList = document.getElementById("partyList");

    createPartyForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Obtener valores de los campos
        const partySize = document.getElementById("partySize").value;
        const creatorId = document.getElementById("creatorId").value;
        const levelCap = parseInt(document.getElementById("levelCap").value);
        const ilvlCap = parseInt(document.getElementById("ilvlCap").value);
        const partyRole = document.getElementById("partyRole").value;
        const plannedStart = document.getElementById("plannedStart").value;

        // Validar que los campos están completos
        if (!partySize || !creatorId || !levelCap || !ilvlCap || !partyRole || !plannedStart) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Validar formato de fecha y hora
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}_\d{2}:\d{2}$/;
        if (!dateRegex.test(plannedStart)) {
            alert("La fecha debe estar en formato DD/MM/YYYY_HH:mm.");
            return;
        }

        // Validar si la fecha es futura
        const [date, time] = plannedStart.split("_");
        const [day, month, year] = date.split("/").map(Number);
        const [hours, minutes] = time.split(":").map(Number);
        const plannedDate = new Date(year, month - 1, day, hours, minutes);
        if (plannedDate <= new Date()) {
            alert("La fecha y hora deben ser futuras.");
            return;
        }

        // Validar valores positivos
        if (levelCap <= 0 || ilvlCap <= 0) {
            alert("Level Cap y ILevel Cap deben ser valores positivos.");
            return;
        }

        // Crear objeto de datos para la API
        const partyData = {
            party_size: parseInt(partySize),
            creator_id: creatorId,
            level_cap: levelCap,
            ilvl_cap: ilvlCap,
            party_role: partyRole,
            planned_start: plannedStart
        };

        try {
            const response = await fetch("http://localhost:3000/partyfinder/:partySize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(partyData),
            });

            if (response.ok) {
                const createdParty = await response.json();
                addPartyToList(createdParty);
                createPartyForm.reset(); // Limpiar formulario después de enviar
            } else {
                alert("Error al crear la party. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error en la solicitud.");
        }
    });

    // Función para añadir la Party a la lista en la interfaz
    function addPartyToList(party) {
        const listItem = document.createElement("li");
        listItem.textContent = `Party de ${party.creator_id} - Tamaño: ${party.party_size} - Rol: ${party.party_role} - Start: ${party.planned_start}`;
        partyList.appendChild(listItem);
    }
});
