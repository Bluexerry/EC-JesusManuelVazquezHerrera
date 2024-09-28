// Obtener el campo de entrada (input) por su id 'input-item' y guardarlo en la variable inputItem.
// Esto permite acceder al valor que el usuario escriba.
const inputItem = document.getElementById('input-item');

// Obtener el botón de añadir (Add) por su id 'btn-add' y guardarlo en la variable btnAdd.
// Este botón será el que activará la adición de nuevos elementos a la lista.
const btnAdd = document.getElementById('btn-add');

// Obtener la lista <ul> donde se agregarán los nuevos elementos por su id 'item-list'.
// Esta lista inicialmente está vacía y se llenará dinámicamente.
const itemList = document.getElementById('item-list');

// Añadimos un listener (escuchador de eventos) al botón 'btn-add' que detectará cuando el botón sea clicado.
// Cada vez que el usuario haga clic en el botón, se ejecutará la función anónima.
btnAdd.addEventListener('click', function () {

    // Obtener el valor ingresado en el campo de texto 'inputItem' usando la propiedad 'value'.
    // Usamos el método 'trim()' para eliminar cualquier espacio en blanco al inicio o al final del texto.
    // Esto evita que se añadan elementos que consisten solo en espacios vacíos.
    const newItemText = inputItem.value.trim();

    // Verificar si el campo de texto no está vacío. Si newItemText es una cadena vacía (''), la condición será falsa.
    if (newItemText !== '') {

        // Crear un nuevo elemento <li> en el documento usando el método 'createElement'.
        // Este nuevo elemento representará un nuevo ítem en la lista.
        const newItem = document.createElement('li');

        // Asignar el texto que el usuario ingresó (almacenado en newItemText) al nuevo elemento <li>.
        // Usamos 'textContent' para establecer el contenido textual del nuevo <li>.
        newItem.textContent = newItemText;

        // Añadir el nuevo elemento <li> a la lista <ul> usando 'appendChild'.
        // Esto inserta el nuevo <li> al final de la lista de elementos.
        itemList.appendChild(newItem);

        // Limpiar el campo de entrada para que esté vacío después de añadir el elemento a la lista.
        // De esta manera, el usuario puede ingresar un nuevo valor sin necesidad de borrar manualmente.
        inputItem.value = '';
    } else {
        // Si el campo de entrada está vacío (es decir, si newItemText es una cadena vacía), mostramos una alerta.
        // Esto le pide al usuario que ingrese un texto válido antes de intentar añadirlo a la lista.
        alert('Por favor, ingresa un texto válido.');
    }
});
