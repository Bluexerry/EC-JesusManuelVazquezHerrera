// Seleccionamos el botón usando su ID 'colorButton' y lo asignamos a la variable colorButton.
// Esto permite que podamos interactuar con este elemento desde el código JavaScript.
const colorButton = document.getElementById('colorButton');

// Definimos una función llamada generateRandomColor que genera un color RGB aleatorio.
// Esta función no toma ningún parámetro y devuelve una cadena que representa un color en formato RGB.
function generateRandomColor() {
    // Generamos un número aleatorio para el canal rojo (r), usando Math.random() * 256.
    // Math.random() devuelve un número decimal entre 0 y 1, lo multiplicamos por 256 para obtener un número entre 0 y 255.
    // Luego usamos Math.floor() para redondear hacia abajo y asegurarnos de que sea un número entero.
    const r = Math.floor(Math.random() * 256);

    // Repetimos el mismo proceso para el canal verde (g).
    const g = Math.floor(Math.random() * 256);

    // Y también para el canal azul (b).
    const b = Math.floor(Math.random() * 256);

    // Retornamos una cadena en formato RGB utilizando los valores de r, g y b.
    // La cadena que se devuelve será algo como 'rgb(123, 45, 67)', que es un formato CSS válido para colores.
    return `rgb(${r}, ${g}, ${b})`;
}

// Definimos otra función llamada changeBackgroundColor que se encarga de cambiar el color de fondo de la página web.
function changeBackgroundColor() {
    // Llamamos a la función generateRandomColor para obtener un color aleatorio.
    const randomColor = generateRandomColor();

    // Cambiamos el estilo de fondo (backgroundColor) del elemento <body> del documento HTML.
    // Asignamos el valor devuelto por generateRandomColor a la propiedad backgroundColor del cuerpo (body) del documento.
    // Esto modifica el color de fondo del sitio web dinámicamente.
    document.body.style.backgroundColor = randomColor;
}

// Agregamos un listener (escuchador de eventos) al botón 'colorButton' para que reaccione cuando se haga clic en él.
// El evento 'click' se activa cuando el usuario presiona el botón.
// Cuando el botón es presionado, se ejecutará la función changeBackgroundColor, que cambiará el color de fondo.
colorButton.addEventListener('click', changeBackgroundColor);
