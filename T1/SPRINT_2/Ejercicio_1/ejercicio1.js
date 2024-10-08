// Obtener los elementos del DOM
const timeInput = document.getElementById('timeInput'); // Obtiene el campo de entrada donde se introducen los segundos
const startBtn = document.getElementById('startBtn'); // Obtiene el botón que inicia el temporizador
const timeDisplay = document.getElementById('timeDisplay'); // Obtiene el div que muestra el tiempo restante

let timer; // Variable para guardar la referencia al temporizador

// Función para iniciar la cuenta regresiva
function startTimer() {
    let seconds = parseInt(timeInput.value); // Convierte el valor del input a un número entero
    if (isNaN(seconds) || seconds <= 0) { // Verifica si el valor introducido no es un número o es menor o igual a 0
        alert("Por favor, introduce un número válido de segundos."); // Muestra una alerta si el valor es inválido
        return; // Sale de la función si el valor no es válido
    }

    // Mostrar el tiempo inicial
    timeDisplay.textContent = `Tiempo restante: ${seconds}`; // Muestra el tiempo restante inicial en el div

    // Limpiar cualquier temporizador previo
    clearInterval(timer); // Detiene cualquier temporizador anterior que pueda estar activo

    // Iniciar el temporizador usando setInterval
    timer = setInterval(() => {
        seconds--; // Decrementa el contador de segundos
        if (seconds >= 0) { // Verifica si el contador todavía es mayor o igual a 0
            timeDisplay.textContent = `Tiempo restante: ${seconds}`; // Actualiza el div con el nuevo tiempo restante
        }

        // Si el tiempo llega a 0, mostrar el mensaje y detener el temporizador
        if (seconds === 0) { // Verifica si el contador ha llegado a 0
            clearInterval(timer); // Detiene el temporizador
            alert("¡Tiempo finalizado!"); // Muestra una alerta indicando que el tiempo ha finalizado
        }
    }, 1000); // Establece el intervalo en 1000 milisegundos (1 segundo)
}

// Detectar el click en el botón "Iniciar" y comenzar la cuenta regresiva
startBtn.addEventListener('click', startTimer); // Añade un evento al botón para que llame a la función startTimer al hacer clic
