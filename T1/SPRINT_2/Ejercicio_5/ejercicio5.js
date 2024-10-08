const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Valores de las cartas
let cards = []; // Arreglo para almacenar las cartas
let firstCard = null; // Almacena la primera carta seleccionada
let secondCard = null; // Almacena la segunda carta seleccionada
let lockBoard = false; // Evitar múltiples clics
let matchesFound = 0; // Contador de coincidencias encontradas

// Referencias al DOM
const gameBoard = document.getElementById('gameBoard'); // Referencia al tablero de juego
const message = document.getElementById('message'); // Referencia al área de mensajes
const restartBtn = document.getElementById('restartBtn'); // Referencia al botón de reinicio

// Inicializa el juego
function initGame() {
    matchesFound = 0; // Reiniciar el contador de coincidencias
    cards = shuffle(cardValues); // Barajar las cartas
    gameBoard.innerHTML = ''; // Limpiar el tablero
    message.textContent = ''; // Limpiar el mensaje

    // Crear y agregar cartas al tablero
    cards.forEach((value) => {
        const card = document.createElement('div'); // Crear un elemento div para cada carta
        card.classList.add('card'); // Añadir la clase 'card'
        card.dataset.value = value; // Almacenar el valor de la carta
        card.style.width = '100px'; // Ancho de la carta
        card.style.height = '100px'; // Alto de la carta
        card.style.backgroundColor = '#007BFF'; // Color de fondo inicial
        card.style.color = 'white'; // Color del texto inicial
        card.style.fontSize = '24px'; // Tamaño de la fuente
        card.style.display = 'flex'; // Usar flexbox para centrar contenido
        card.style.alignItems = 'center'; // Centrar verticalmente
        card.style.justifyContent = 'center'; // Centrar horizontalmente
        card.style.cursor = 'pointer'; // Cambiar el cursor al pasar por encima
        card.textContent = '?'; // Muestra un símbolo de interrogación inicialmente
        card.addEventListener('click', flipCard); // Detectar el clic en la carta
        gameBoard.appendChild(card); // Agregar la carta al tablero
    });

    // Configurar el diseño del tablero de juego
    gameBoard.style.display = 'grid'; // Usar grid para el diseño del tablero
    gameBoard.style.gridTemplateColumns = 'repeat(4, 100px)'; // Definir columnas
    gameBoard.style.gridGap = '10px'; // Espacio entre las cartas
}

// Barajar las cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generar índice aleatorio
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return array; // Devolver el arreglo barajado
}

// Voltear la carta
function flipCard() {
    if (lockBoard || this.classList.contains('matched')) return; // Ignorar si está bloqueado o si la carta ya está emparejada
    if (this === firstCard) return; // No se puede volver a hacer clic en la misma carta

    this.style.backgroundColor = '#28A745'; // Cambia el color al voltear
    this.textContent = this.dataset.value; // Muestra el valor de la carta
    this.classList.add('flipped'); // Agregar clase para mostrar la carta

    if (!firstCard) {
        firstCard = this; // Guardar la primera carta
        return; // Termina la función
    }
    secondCard = this; // Guardar la segunda carta
    lockBoard = true; // Bloquear el tablero para evitar múltiples clics

    checkForMatch(); // Comprobar si hay una coincidencia
}

// Comprobar si las cartas coinciden
function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value; // Verificar si las cartas coinciden

    if (isMatch) {
        matchesFound++; // Incrementar el contador de coincidencias
        firstCard.classList.add('matched'); // Agregar clase para indicar que está emparejada
        secondCard.classList.add('matched'); // Agregar clase para indicar que está emparejada
        resetCards(); // Reiniciar las cartas si hay coincidencia
        if (matchesFound === cardValues.length / 2) { // Verificar si se han encontrado todas las coincidencias
            message.textContent = '¡Felicidades! Has encontrado todas las parejas.'; // Mostrar mensaje de victoria
        }
    } else {
        // Si no coinciden, voltear las cartas de nuevo después de un breve intervalo
        setTimeout(() => {
            firstCard.style.backgroundColor = '#007BFF'; // Cambiar el color al volver a voltear
            firstCard.textContent = '?'; // Volver a mostrar el símbolo de interrogación
            secondCard.style.backgroundColor = '#007BFF'; // Cambiar el color al volver a voltear
            secondCard.textContent = '?'; // Volver a mostrar el símbolo de interrogación
            resetCards(); // Reiniciar cartas
        }, 1000); // Esperar 1 segundo antes de voltear
    }
}

// Reiniciar las cartas seleccionadas
function resetCards() {
    [firstCard, secondCard] = [null, null]; // Reiniciar las cartas
    lockBoard = false; // Desbloquear el tablero
}

// Reiniciar el juego al hacer clic en el botón
restartBtn.addEventListener('click', initGame);

// Iniciar el juego al cargar la página
initGame();
