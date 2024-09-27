document.getElementById("calculateBtn").addEventListener("click", function () {
    // Obtener los valores de ancho y alto de los inputs
    let width = parseFloat(document.getElementById("width").value);
    let height = parseFloat(document.getElementById("height").value);

    // Verificar si los valores son números y mayores o iguales a 0
    if (!isNaN(width) && !isNaN(height) && width >= 0 && height >= 0) {
        // Calcular el área
        let area = width * height;

        // Mostrar el resultado en el elemento con id "result"
        document.getElementById("result").textContent = `Área: ${area}`;
    } else {
        // Mostrar un mensaje de error si los valores no son válidos
        document.getElementById("result").textContent = "Por favor, introduce valores válidos.";
    }
});
