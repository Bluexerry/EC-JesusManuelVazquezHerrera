// Añadimos un "listener" (escuchador de eventos) al botón con id "calculateBtn".
// Este listener está a la espera de un clic para ejecutar la función de cálculo del área.
// La función anónima se ejecuta cada vez que el usuario hace clic en el botón.
document.getElementById("calculateBtn").addEventListener("click", function () {

    // Obtenemos el valor ingresado en el input con id "width" y lo convertimos en un número decimal usando parseFloat.
    // parseFloat convierte el valor de texto del input en un número de punto flotante.
    let width = parseFloat(document.getElementById("width").value);

    // De manera similar, obtenemos el valor ingresado en el input con id "height" y lo convertimos en un número decimal.
    let height = parseFloat(document.getElementById("height").value);

    // Verificamos si ambos valores (width y height) son números válidos usando isNaN (is Not a Number).
    // También verificamos que los valores sean mayores o iguales a 0, ya que no tendría sentido calcular áreas con valores negativos.
    if (!isNaN(width) && !isNaN(height) && width >= 0 && height >= 0) {

        // Si los valores son válidos, procedemos a calcular el área del rectángulo.
        // El área de un rectángulo es simplemente el producto del ancho (width) y la altura (height).
        let area = width * height;

        // Mostramos el resultado del cálculo en el elemento con id "result", reemplazando su contenido de texto.
        // Utilizamos textContent para cambiar el contenido del párrafo a un mensaje que incluya el valor del área calculada.
        document.getElementById("result").textContent = `Área: ${area}`;
    } else {
        // Si los valores ingresados no son válidos (por ejemplo, si son NaN o negativos),
        // mostramos un mensaje de error en el elemento con id "result" indicando que se deben ingresar valores válidos.
        document.getElementById("result").textContent = "Por favor, introduce valores válidos.";
    }
});
