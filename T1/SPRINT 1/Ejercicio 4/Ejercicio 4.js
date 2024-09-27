// Seleccionar todos los divs con la clase 'hover-box'
const divs = document.querySelectorAll('.hover-box');

// Añadir eventos a cada div
divs.forEach(div => {
    // Evento para cuando el ratón pasa sobre el div
    div.addEventListener('mouseover', function () {
        div.style.backgroundColor = 'blue';  // Cambia el color de fondo a azul
        div.style.color = 'white';           // Cambia el color del texto a blanco
    });

    // Evento para cuando el ratón sale del div
    div.addEventListener('mouseout', function () {
        div.style.backgroundColor = '';  // Restaura el color de fondo original
        div.style.color = '';            // Restaura el color de texto original
    });
});
