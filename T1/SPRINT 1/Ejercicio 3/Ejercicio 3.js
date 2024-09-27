// Obtener los elementos del DOM
const inputItem = document.getElementById('input-item');
const btnAdd = document.getElementById('btn-add');
const itemList = document.getElementById('item-list');

// Evento de click para el botón
btnAdd.addEventListener('click', function () {
    // Obtener el valor del input
    const newItemText = inputItem.value.trim(); // Elimina espacios en blanco

    // Verificar que el input no esté vacío
    if (newItemText !== '') {
        // Crear un nuevo elemento <li>
        const newItem = document.createElement('li');
        // Establecer el texto del nuevo elemento <li>
        newItem.textContent = newItemText;
        // Agregar el nuevo <li> a la lista
        itemList.appendChild(newItem);
        // Limpiar el campo de entrada después de agregar
        inputItem.value = '';
    } else {
        alert('Por favor, ingresa un texto válido.');
    }
});
