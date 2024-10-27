document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("partyForm");
    const formContainer = document.getElementById("formContainer");
    const toggleFormButton = document.getElementById("toggleFormButton");
    const closeFormButton = document.getElementById("closeFormButton");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");

    // Mostrar/ocultar el formulario al hacer clic en el botón
    toggleFormButton.addEventListener("click", () => {
        formContainer.style.display = formContainer.style.display === "none" ? "block" : "none";
        if (formContainer.style.display === "none") {
            form.reset();
            errorMessage.textContent = "";
            successMessage.textContent = "";
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const partySize = document.getElementById("partySize").value;
        const creator_id = document.getElementById("creator_id").value.trim();
        const level_cap = parseInt(document.getElementById("level_cap").value);
        const ilvl_cap = parseInt(document.getElementById("ilvl_cap").value);
        const party_role_creator = document.getElementById("party_role_creator").value;
        const planned_start = document.getElementById("planned_start").value.trim();

        const dateRegex = /^\d{2}\/\d{2}\/\d{4}_\d{2}:\d{2}$/;
        if (!creator_id || !party_role_creator || !planned_start) {
            errorMessage.textContent = "Error: Todos los campos son obligatorios.";
            successMessage.textContent = "";
            return;
        }
        if (!dateRegex.test(planned_start)) {
            errorMessage.textContent = "Error: Formato de fecha debe ser DD/MM/YYYY_HH:mm.";
            successMessage.textContent = "";
            return;
        }

        const [day, month, year, hour, minute] = planned_start.split(/\/|_|:/);
        const plannedDate = new Date(`${year}-${month}-${day}T${hour}:${minute}`);
        if (plannedDate < new Date()) {
            errorMessage.textContent = "Error: La fecha y hora deben ser futuras.";
            successMessage.textContent = "";
            return;
        }
        if (level_cap <= 0 || ilvl_cap <= 0) {
            errorMessage.textContent = "Error: Level Cap e Item Level Cap deben ser positivos.";
            successMessage.textContent = "";
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/partyfinder/${partySize}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    creator_id,
                    level_cap,
                    ilvl_cap,
                    party_role_creator,
                    planned_start
                })
            });

            if (response.ok) {
                const data = await response.json();
                successMessage.textContent = `Party creada correctamente`;
                errorMessage.textContent = "";
                form.reset();
            } else {
                errorMessage.textContent = "Error al crear la party. Intenta nuevamente.";
                successMessage.textContent = "";
            }
        } catch (error) {
            errorMessage.textContent = "Error de conexión con el servidor.";
            successMessage.textContent = "";
        }
    });

    closeFormButton.addEventListener("click", () => {
        formContainer.style.display = "none";
        form.reset();
        errorMessage.textContent = "";
        successMessage.textContent = "";
    });
});
