// Función para generar el XPath de un elemento dado
function getXPath(element) {
    if (element.id !== "") {
        return "//*[@id='" + element.id + "']";
    }
    if (element === document.body) {
        return "/html/body";
    }

    var ix = 0;
    var siblings = element.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i];
        if (sibling === element) {
            return getXPath(element.parentNode) + "/" + element.tagName.toLowerCase() + "[" + (ix + 1) + "]";
        }
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
            ix++;
        }
    }
}

// Función para manejar el clic en el documento principal
function handleClick(event) {
    var clickedElement = event.target;
    var xpath = getXPath(clickedElement);
    updateOutput(xpath);
}

// Función para actualizar el contenido de la etiqueta de reconocimiento
function updateOutput(xpath) {
    var outputElement = document.getElementById('reconocimiento');
    outputElement.innerHTML = xpath;
}

// Función para inicializar los eventos y la lógica
function initialize() {
    // Evento para manejar clics en el documento principal
    document.addEventListener('click', handleClick);
}

// Llamamos a la función de inicialización cuando cargue el documento
initialize();
