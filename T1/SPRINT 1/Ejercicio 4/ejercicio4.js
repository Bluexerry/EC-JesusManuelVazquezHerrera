// Seleccionamos todos los elementos del DOM que tienen la clase 'hover-box'.
// querySelectorAll devuelve una lista de nodos (NodeList) que contiene todos los elementos que coinciden con el selector '.hover-box'.
// Guardamos esta lista en la variable 'divs'.
const divs = document.querySelectorAll('.hover-box');

// Usamos el método forEach para iterar sobre cada uno de los elementos (divs) seleccionados.
// forEach nos permite aplicar la misma función a cada div individualmente.
divs.forEach(div => {

    // Añadimos un evento 'mouseover' a cada div. Este evento se dispara cuando el ratón pasa sobre el div.
    // Cada vez que esto ocurra, se ejecutará la función asociada.
    div.addEventListener('mouseover', function () {
        // Cambiamos el color de fondo del div a azul cuando el ratón esté sobre él.
        // Usamos la propiedad 'style.backgroundColor' para modificar el CSS del div directamente desde JavaScript.
        div.style.backgroundColor = 'blue';

        // Cambiamos el color del texto del div a blanco cuando el ratón esté sobre él.
        // Modificamos la propiedad 'style.color' para cambiar el color del texto al blanco.
        div.style.color = 'white';
    });

    // Añadimos un evento 'mouseout' a cada div. Este evento se dispara cuando el ratón sale del div.
    // Cada vez que esto ocurra, se ejecutará la función asociada.
    div.addEventListener('mouseout', function () {
        // Restauramos el color de fondo original cuando el ratón sale del div.
        // Dejamos la propiedad 'backgroundColor' en blanco, lo que hace que vuelva al estilo predeterminado (o al que esté definido en el CSS).
        div.style.backgroundColor = '';

        // Restauramos el color de texto original al salir del div.
        // Similar al color de fondo, dejamos 'color' vacío para que se restablezca el color predeterminado.
        div.style.color = '';
    });
});
