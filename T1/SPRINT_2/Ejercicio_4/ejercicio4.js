// Variables para el cronómetro
let startTime; // Almacena el tiempo de inicio
let updatedTime; // Almacena el tiempo actualizado
let difference; // Diferencia de tiempo
let tInterval; // Intervalo para actualizar el cronómetro
let running = false; // Estado del cronómetro

// Elemento del DOM para mostrar el tiempo
const timerDisplay = document.getElementById('timerDisplay');

// Función para iniciar el cronómetro
function startTimer() {
    if (!running) { // Solo iniciar si no está corriendo
        startTime = new Date().getTime(); // Obtener el tiempo actual
        tInterval = setInterval(getShowTime, 1000); // Actualizar cada segundo
        running = true; // Cambiar estado a corriendo
    }
}

// Función para actualizar y mostrar el tiempo
function getShowTime() {
    updatedTime = new Date().getTime(); // Obtener el tiempo actualizado
    difference = updatedTime - startTime; // Calcular la diferencia

    // Convertir la diferencia a minutos y segundos
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)); // Calcular minutos
    const seconds = Math.floor((difference % (1000 * 60)) / 1000); // Calcular segundos

    // Mostrar el tiempo en formato MM:SS
    timerDisplay.innerHTML = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds; // Formatear la visualización
}

// Función para pausar el cronómetro
function pauseTimer() {
    if (running) { // Solo pausar si está corriendo
        clearInterval(tInterval); // Detener el intervalo
        running = false; // Cambiar estado a no corriendo
    }
}

// Función para reiniciar el cronómetro
function resetTimer() {
    clearInterval(tInterval); // Detener el intervalo
    timerDisplay.innerHTML = "00:00"; // Reiniciar el tiempo mostrado
    difference = 0; // Reiniciar la diferencia
    running = false; // Cambiar estado a no corriendo
}

// Detectar los clics en los botones
document.getElementById('startBtn').addEventListener('click', startTimer); // Asocia el evento de clic al botón "Iniciar"
document.getElementById('pauseBtn').addEventListener('click', pauseTimer); // Asocia el evento de clic al botón "Pausar"
document.getElementById('resetBtn').addEventListener('click', resetTimer); // Asocia el evento de clic al botón "Reiniciar"