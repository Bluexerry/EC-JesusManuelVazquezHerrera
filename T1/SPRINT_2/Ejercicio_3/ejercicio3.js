// Variables para almacenar los votos
let votes = { // Objeto que almacena el conteo de votos para cada empresa
    Nintendo: 0,
    Sony: 0,
    Microsoft: 0,
    Ubisoft: 0,
    EA: 0
};

let lastChecked = null; // Para guardar la última opción seleccionada

// Función para actualizar el gráfico de barras
function updateResults() {
    // Obtener el total de votos
    let totalVotes = votes.Nintendo + votes.Sony + votes.Microsoft + votes.Ubisoft + votes.EA; // Suma el total de votos

    // Actualizar las barras y los contadores de votos
    for (const company in votes) { // Itera a través de cada empresa en el objeto de votos
        const bar = document.getElementById(`bar${company}`); // Obtiene la barra de progreso correspondiente
        const count = document.getElementById(`count${company}`); // Obtiene el contador de votos correspondiente

        count.textContent = votes[company]; // Actualiza el texto del contador de votos

        // Ajustar el ancho de la barra en función de los votos
        if (totalVotes > 0) { // Si hay al menos un voto
            bar.style.width = `${(votes[company] / totalVotes) * 100}%`; // Ajusta el ancho de la barra proporcionalmente a los votos
        } else {
            bar.style.width = "0"; // Si no hay votos, la barra se queda vacía
        }
    }
}

// Detectar cuando un radio button ha sido clicado
document.querySelectorAll('input[name="company"]').forEach((radio) => { // Selecciona todos los radio buttons de la encuesta
    radio.addEventListener('click', function () { // Agrega un evento de clic a cada radio button
        // Si el radio button ya estaba seleccionado, deseleccionarlo
        if (this === lastChecked) { // Comprueba si el radio button clicado es el mismo que el último seleccionado
            this.checked = false; // Deselecciona el radio button
            lastChecked = null; // Ya no hay una opción seleccionada
        } else {
            lastChecked = this; // Guarda la opción seleccionada
        }
    });
});

// Detectar el clic en el botón "Enviar" y procesar la votación
document.getElementById('submitBtn').addEventListener('click', () => { // Agrega un evento de clic al botón "Enviar"
    const selectedOption = document.querySelector('input[name="company"]:checked'); // Obtiene la opción seleccionada

    // Validar si el usuario ha seleccionado una opción
    if (!selectedOption) { // Si no hay opción seleccionada
        alert("Por favor, selecciona una opción antes de enviar."); // Muestra una alerta
        return; // Sale de la función
    }

    const selectedCompany = selectedOption.value; // Guarda el valor de la opción seleccionada

    // Incrementar los votos para la opción seleccionada
    votes[selectedCompany]++; // Incrementa el conteo de votos para la empresa seleccionada

    // Actualizar los resultados
    updateResults(); // Llama a la función para actualizar el gráfico y los contadores

    // Deseleccionar la opción después de enviar el voto
    lastChecked = null; // Resetear la última opción seleccionada
    selectedOption.checked = false; // Deselecciona el radio button
});
