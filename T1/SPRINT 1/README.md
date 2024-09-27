# Ejercicio 1: Cambio de Color con Botón

## Análisis

**Descripción del ejercicio:**  
El ejercicio consiste en crear una página web que contenga un botón etiquetado como "Cambiar color". Al hacer clic en este botón, el color de fondo de la página debe cambiar de manera aleatoria utilizando valores RGB generados por `Math.random()`. El código debe estar dividido en un archivo HTML y otro JS.

## Diseño

**HTML (Ejercicio1.html):**  
El archivo HTML contiene la estructura básica de la página web. Dentro del cuerpo de la página (`<body>`), se define un botón con el texto "Cambiar color". Se enlaza un archivo externo JavaScript (`Ejercicio1.js`) que contiene la lógica para cambiar el color de fondo.

**JavaScript (Ejercicio1.js):**  

- Se selecciona el botón utilizando su `id` (`colorButton`).
- Se define una función `generateRandomColor()` que genera un color RGB aleatorio, utilizando `Math.random()` para generar valores entre 0 y 255 para los componentes de color rojo (R), verde (G) y azul (B).
- La función `changeBackgroundColor()` llama a `generateRandomColor()` y aplica el color generado como el color de fondo de la página utilizando `document.body.style.backgroundColor`.
- Se añade un event listener al botón que ejecuta `changeBackgroundColor()` cada vez que se hace clic en el botón.

**Bibliografía general usada para hacer el ejercicio:**  

- Generación de colores aleatorios con JavaScript: Se investigaron ejemplos sobre cómo generar valores RGB aleatorios utilizando `Math.random()`.
- Uso de `addEventListener` para agregar interactividad a elementos HTML en eventos de clic.

Si fue realizada con IA, las preguntas concretas fueron:

- ¿Cómo puedo generar un color RGB aleatorio en JavaScript?
- ¿Cómo puedo cambiar el color de fondo de una página web mediante JavaScript?
- ¿Cómo se puede añadir un evento de clic a un botón en JavaScript?

## Prueba

**Descripción de la demostración:**  
En el GIF de demostración se verá cómo, al hacer clic repetidamente en el botón "Cambiar color", el color de fondo de la página cambia a diferentes colores aleatorios cada vez. Solo el color de fondo cambia, y el contenido de la página (el botón) permanece igual.

### Demostración

![Cambio de color](/T1/SPRINT%201/Ejercicio%201/Ejercicio1.gif)

---

# Ejercicio 2: Calculadora de Área

## Análisis

**Descripción del ejercicio:**  
El ejercicio consiste en crear una página web que permita calcular el área de un rectángulo. La página debe tener dos campos de entrada para introducir el ancho y el alto del rectángulo, y un botón etiquetado "Calcular Área". Al hacer clic en el botón, se debe calcular el área del rectángulo (ancho x alto) y mostrar el resultado en un elemento `<p>` en la página. Si los valores no son válidos, se debe mostrar un mensaje de error.

## Diseño

**HTML (Ejercicio2.html):**  
La página tiene dos campos de entrada de tipo `number` para el ancho (`width`) y el alto (`height`), ambos con un valor mínimo de 0. También incluye un botón para realizar el cálculo y un párrafo donde se mostrará el resultado del área. La interfaz está estilizada con CSS para mejorar la presentación, usando un contenedor centralizado con bordes redondeados y sombras suaves.

**JavaScript (Ejercicio2.js):**  

- Se captura el evento de clic en el botón mediante `addEventListener`.
- Se obtienen los valores del ancho y del alto desde los campos de entrada.
- Se verifica que los valores sean números y que sean mayores o iguales a 0.
- Si los valores son válidos, se calcula el área multiplicando el ancho por el alto y se muestra el resultado en el párrafo con `id="result"`.
- Si los valores no son válidos, se muestra un mensaje de error en el mismo párrafo.

**Bibliografía general usada para hacer el ejercicio:**  

- Cálculos matemáticos y operaciones en JavaScript.
- Uso de eventos `click` en JavaScript para interactividad.
- Validación de valores de entradas numéricas en JavaScript.

Si fue realizada con IA, las preguntas concretas fueron:

- ¿Cómo puedo capturar el valor de un campo de entrada de tipo `number` en JavaScript?
- ¿Cómo puedo verificar si un valor es un número válido en JavaScript?
- ¿Cómo se puede mostrar un resultado dinámicamente en la página web utilizando JavaScript?

## Prueba

**Descripción de la demostración:**  
En el GIF de demostración se mostrará cómo, al rellenar ambos campos de entrada con los valores `2` para el ancho y `2` para el alto, se mostrará un área de `4`. Luego, al cambiar los valores a `2` para el ancho y `9` para el alto, se mostrará un área de `18`.

### Demostración

![Cálculo de área](/T1/SPRINT%201/Ejercicio%202/Ejercicio%202.gif)

---

# Ejercicio 3: Listado Dinámico

## Análisis

**Descripción del ejercicio:**  
El ejercicio consiste en crear una página web con un campo de entrada de texto y un botón etiquetado "Añadir a la lista". Al escribir algo en el campo de entrada y hacer clic en el botón, el contenido del campo debe agregarse a una lista vacía como un nuevo ítem (`<li>`). Se debe utilizar `createElement()` para crear los nuevos elementos y `appendChild()` para añadirlos a la lista.

## Diseño

**HTML (Ejercicio3.html):**  
La página web tiene un campo de entrada de texto y un botón para agregar ítems a la lista. Al inicio, la lista (`<ul>`) está vacía y se llenará dinámicamente conforme el usuario agregue elementos. La estructura es sencilla, incluyendo solo un título, el campo de entrada, el botón, y la lista vacía.

**JavaScript (Ejercicio3.js):**  

- Se capturan los elementos del DOM correspondientes al campo de entrada, el botón y la lista vacía.
- Se añade un event listener al botón para que al hacer clic, se obtenga el valor del campo de entrada.
- Si el valor no está vacío, se crea un nuevo elemento `<li>`, se le asigna el valor ingresado como su contenido de texto, y se añade este nuevo ítem a la lista utilizando `appendChild()`.
- Si el campo de entrada está vacío, se muestra una alerta pidiendo que se ingrese un texto válido.
- Después de añadir un ítem a la lista, el campo de entrada se limpia para permitir ingresar nuevos valores.

**Bibliografía general usada para hacer el ejercicio:**  

- Uso de `createElement()` y `appendChild()` para manipular el DOM en JavaScript.
- Eventos de clic (`click`) en JavaScript.
- Validación de entradas de texto en JavaScript.

Si fue realizada con IA, las preguntas concretas fueron:

- ¿Cómo crear y agregar un nuevo elemento a una lista usando JavaScript?
- ¿Cómo capturar el valor de un campo de entrada de texto en JavaScript?
- ¿Cómo limpiar el campo de entrada después de agregar un valor a la lista?

## Prueba

**Descripción de la demostración:**  
En el GIF de demostración, se verá cómo se añaden tres elementos a la lista. Primero, el usuario escribe el texto "Elemento 1" en el campo de entrada, hace clic en el botón, y el ítem aparece en la lista. Luego, repite el proceso con "Elemento 2" y "Elemento 3", mostrando cómo se van agregando nuevos ítems a la lista.

### Demostración

![Listado dinámico](/T1/SPRINT%201/Ejercicio%203/Ejercicio%203.gif)

---

# Ejercicio 4: Hover y Estilo Dinámico

## Análisis

**Descripción del ejercicio:**  
El ejercicio consiste en diseñar una página web con varios elementos `div`, cada uno con un texto diferente. Al pasar el ratón sobre uno de los `divs`, el color de fondo debe cambiar a azul y el color del texto a blanco. Al mover el ratón fuera del `div`, los estilos originales deben restaurarse. Se recomienda el uso de los eventos `mouseover` y `mouseout`.

## Diseño

**HTML (Ejercicio4.html):**  
La página contiene tres elementos `div`, cada uno con una clase llamada `hover-box` y un texto diferente. La funcionalidad de cambiar el color al pasar el ratón se implementa mediante JavaScript. El archivo HTML es simple, con un título y los `divs` que cambiarán de estilo al interactuar con el ratón.

**JavaScript (Ejercicio4.js):**  

- Se seleccionan todos los elementos `div` con la clase `hover-box` usando `querySelectorAll`.
- Se añade un evento `mouseover` a cada `div` para que cuando el ratón pase sobre el elemento, el color de fondo cambie a azul y el color del texto a blanco.
- Se añade un evento `mouseout` para restaurar los estilos originales cuando el ratón sale del `div`, dejando los estilos en blanco para que vuelvan a sus valores por defecto.
  
**Bibliografía general usada para hacer el ejercicio:**  

- Manipulación de estilos dinámicamente usando JavaScript.
- Eventos `mouseover` y `mouseout` en JavaScript para interactuar con el ratón sobre elementos de la página.
  
Si fue realizada con IA, las preguntas concretas fueron:

- ¿Cómo puedo cambiar el color de fondo de un elemento con JavaScript al pasar el ratón sobre él?
- ¿Cómo restaurar el estilo original de un elemento con JavaScript cuando el ratón deja de estar sobre él?

## Prueba

**Descripción de la demostración:**  
En el GIF de demostración, se verá cómo al pasar el ratón sobre cada uno de los `divs`, el color de fondo cambia a azul y el texto a blanco. Al retirar el ratón, los estilos de los `divs` vuelven a sus valores originales.

### Demostración

![Hover y estilo dinámico](/T1/SPRINT%201/Ejercicio%204/Ejercicio%204.gif)

---

# Ejercicio 5: Detección de Clics y Generación de XPath

## Análisis

**Descripción del ejercicio:**  
El objetivo de este ejercicio es crear una página web que detecte clics en cualquier elemento del documento y en un `iframe`, generando y mostrando el XPath único de ese elemento en un cuadro de alerta o en una sección específica de la página.  
Se deben seguir los siguientes pasos:

1. Añadir un evento de escucha que detecte clics en cualquier elemento del documento principal y en un iframe.
2. Al hacer clic en un elemento, generar su XPath.
3. Mostrar el XPath generado en un cuadro de alerta.

## Diseño

**HTML (Ejercicio5.html):**  
El HTML incluye un botón principal y un `iframe` con su propio botón. La estructura está diseñada para que los clics se detecten tanto en el documento principal como dentro del `iframe`. El `iframe` contiene un documento HTML embebido con otro botón.  
Se incluye un script que añade los eventos de clic para capturar los eventos en ambos contextos (documento principal y `iframe`).

**JavaScript (Ejercicio5.js):**  

- **Función `getXPath(element)`:**  
  Esta función se encarga de generar el XPath único de un elemento dado. Si el elemento tiene un ID, se utiliza directamente en el XPath. Si no, se recorre el DOM para construir el XPath según la jerarquía de elementos.
  
- **Detección de clics en el documento principal:**  
  Se añade un `eventListener` para escuchar clics en cualquier parte del documento. Cuando se detecta un clic, se llama a la función `getXPath` y se muestra el resultado en un cuadro de alerta.

- **Detección de clics en el `iframe`:**  
  Después de cargar el `iframe`, se añade un `eventListener` al documento del `iframe` para detectar clics dentro de él. Esto asegura que los clics en el botón del `iframe` también generen el XPath correspondiente.

**Bibliografía general usada para hacer el ejercicio:**  

- Uso de `event.target` para capturar elementos en eventos de clic.
- Cómo generar XPath dinámicamente.
- Eventos dentro de `iframes`.
  
Si fue realizada con IA, las preguntas concretas fueron:

- ¿Cómo puedo generar el XPath de un elemento en JavaScript?
- ¿Cómo puedo detectar clics dentro de un iframe y obtener su XPath?
  
## Prueba

**Descripción de la demostración:**  
En el GIF de demostración, se verá cómo se hacen clics sobre diferentes elementos, tanto en el botón principal como en el botón dentro del `iframe`, y cómo cada clic genera un cuadro de alerta que muestra el XPath relativo del elemento clicado.

### Demostración

![Detección de clics y XPath](/T1/SPRINT%201/Ejercicio%205/Ejercicio5.gif)
