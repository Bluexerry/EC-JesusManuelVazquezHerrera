// Obtener los elementos del DOM
const num1Input = document.getElementById('num1'); // Obtiene el campo de entrada para el primer número
const num2Input = document.getElementById('num2'); // Obtiene el campo de entrada para el segundo número
const operationSelect = document.getElementById('operation'); // Obtiene el menú desplegable de operaciones
const calculateBtn = document.getElementById('calculateBtn'); // Obtiene el botón que calculará el resultado
const resultDisplay = document.getElementById('result'); // Obtiene el div que mostrará el resultado

// Función para realizar la operación seleccionada
function calculate() {
    // Obtener los valores de los campos de entrada
    const num1 = parseFloat(num1Input.value); // Convierte el valor del primer input a un número de punto flotante
    const num2 = parseFloat(num2Input.value); // Convierte el valor del segundo input a un número de punto flotante
    const operation = operationSelect.value; // Obtiene el valor de la operación seleccionada

    // Validar que los campos no estén vacíos
    if (isNaN(num1) || isNaN(num2)) { // Verifica si los números introducidos son válidos
        alert("Por favor, introduce números válidos en ambos campos."); // Muestra una alerta si alguno no es válido
        return; // Sale de la función si hay un error
    }

    let result; // Variable para almacenar el resultado

    // Realizar la operación en base a la selección del usuario
    switch (operation) { // Comienza un bloque switch para determinar la operación a realizar
        case "sum": // Si la operación es suma
            result = num1 + num2; // Realiza la suma
            break; // Sale del switch
        case "subtract": // Si la operación es resta
            result = num1 - num2; // Realiza la resta
            break; // Sale del switch
        case "multiply": // Si la operación es multiplicación
            result = num1 * num2; // Realiza la multiplicación
            break; // Sale del switch
        case "divide": // Si la operación es división
            // Verificar si la división es por 0
            if (num2 === 0) { // Comprueba si el segundo número es cero
                result = "INDEFINIDO"; // Si es cero, establece el resultado como "INDEFINIDO"
            } else {
                result = num1 / num2; // Realiza la división si el segundo número no es cero
            }
            break; // Sale del switch
        default: // En caso de que no coincida con ninguna opción válida
            result = "Operación no válida."; // Establece el resultado como "Operación no válida."
    }

    // Mostrar el resultado en la página
    resultDisplay.textContent = `Resultado: ${result}`; // Actualiza el div de resultado con el valor calculado
}

// Detectar el click en el botón "Calcular" y ejecutar la función de cálculo
calculateBtn.addEventListener('click', calculate); // Añade un evento al botón para que llame a la función calculate al hacer clic
