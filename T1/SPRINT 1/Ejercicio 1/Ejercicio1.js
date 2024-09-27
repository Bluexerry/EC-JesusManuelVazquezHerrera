// Seleccionamos el botón usando su ID
const colorButton = document.getElementById('colorButton');

// Función que genera un color RGB aleatorio
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Función que cambia el color de fondo de la página
function changeBackgroundColor() {
    const randomColor = generateRandomColor();
    document.body.style.backgroundColor = randomColor;
}

// Agregamos un evento de clic al botón para cambiar el color de fondo
colorButton.addEventListener('click', changeBackgroundColor);