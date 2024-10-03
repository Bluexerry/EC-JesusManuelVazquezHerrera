// Función que genera el XPath de un elemento dado en el DOM
// El XPath es una expresión que identifica la posición exacta de un elemento en el árbol de nodos del documento.
function getXPath(element) {
    // Si el elemento tiene un atributo 'id', generamos un XPath simple basado en el id.
    // Los XPath que utilizan el id son muy específicos y únicos, por lo que si el elemento tiene id, devolvemos esa expresión.
    if (element.id !== "") {
        return "//*[@id='" + element.id + "']";
    }

    // Si el elemento es el cuerpo del documento (body), devolvemos el XPath básico que apunta al cuerpo.
    if (element === document.body) {
        return "/html/body";
    }

    // Inicializamos un contador 'ix' para llevar un control de los hermanos (siblings) del elemento actual.
    var ix = 0;

    // Obtenemos la lista de todos los nodos hijos del elemento padre.
    var siblings = element.parentNode.childNodes;

    // Recorremos todos los nodos hermanos del elemento actual.
    for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i];

        // Si encontramos el nodo actual (element) en la lista de hermanos, creamos su XPath.
        if (sibling === element) {
            // Llamamos recursivamente a la función para obtener el XPath del padre y añadimos el nombre de la etiqueta del elemento actual.
            // Además, agregamos el índice entre corchetes para que el XPath sea único dentro de su contexto.
            return getXPath(element.parentNode) + "/" + element.tagName.toLowerCase() + "[" + (ix + 1) + "]";
        }

        // Contamos solo aquellos hermanos que son nodos de tipo elemento (nodeType === 1) y que tienen la misma etiqueta.
        // Esto es importante para que el índice de los elementos hermanos con el mismo nombre se mantenga correctamente.
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
            ix++;
        }
    }
}

// Función que maneja los eventos de clic en el documento principal.
// Cada vez que el usuario hace clic en un elemento, obtenemos su XPath y lo mostramos.
function handleClick(event) {
    // 'event.target' contiene el elemento específico en el que se hizo clic.
    var clickedElement = event.target;

    // Llamamos a la función 'getXPath' para obtener el XPath del elemento clicado.
    var xpath = getXPath(clickedElement);

    // Actualizamos el contenido de la etiqueta con el XPath del elemento clicado.
    updateOutput(xpath);
}

// Función que actualiza el contenido de la etiqueta 'reconocimiento' en el HTML.
// Muestra el XPath del último elemento clicado.
function updateOutput(xpath) {
    // Seleccionamos el elemento del DOM que tiene el id 'reconocimiento'.
    var outputElement = document.getElementById('reconocimiento');

    // Actualizamos el contenido HTML del elemento 'reconocimiento' con el XPath generado.
    outputElement.innerHTML = xpath;
}

// Función que inicializa los eventos y la lógica de la página.
// Se encarga de añadir los eventos necesarios al documento cuando este se carga.
function initialize() {
    // Añadimos un listener de eventos para detectar cuando se hace clic en cualquier parte del documento.
    // Cada vez que ocurre un clic, se ejecuta la función 'handleClick' que manejará el evento.
    document.addEventListener('click', handleClick);
}

// Llamamos a la función 'initialize' para configurar todo cuando el documento ha terminado de cargar.
// Esta función añade el event listener necesario para detectar clics en el documento.
initialize();