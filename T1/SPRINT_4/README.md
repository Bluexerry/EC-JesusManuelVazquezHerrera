# Análisis

Este ejercicio se basa en ampliar y mejorar el sistema de gestión de miembros de la guild que ya han implementado previamente. El objetivo es crear un Panel de Gestión de Miembros más avanzado, que permita funcionalidades adicionales como filtrado, ordenamiento, selección múltiple y acciones en lote, proporcionando una interfaz más robusta y eficiente para administrar a los miembros del gremio.

## Ejercicio 1: Panel Avanzado de Gestión de Miembros del Gremio

## Requerimientos Funcionales del Ejercicio 1

## 1. Visualización Avanzada de Miembros

### Tabla de Miembros

- **Descripción**:  
  Mostrar todos los miembros del gremio en una tabla dinámica.
- **Columnas Incluidas**:
  - `user_id` (integer) (único)
  - `username` (string)
  - `level` (integer)
  - `ilvl` (integer)
  - `character_role` (enum: TANK, HEALER, DAMAGE, SUPPORT)
  - `guild_role` (enum: LIDER, GERENTE SENIOR, GERENTE, GERENTE A2, ALPHA 2, MEMBER)
  - `main_archetype` (enum: BARD, CLERIC, FIGHTER, MAGE, RANGER, ROGUE, SUMMONER, TANK)
  - `secondary_archetype` (enum: BARD, CLERIC, FIGHTER, MAGE, RANGER, ROGUE, SUMMONER, TANK)
  - `grandmaster_profession_one` y `grandmaster_profession_two` (enum: FISHING, HERBALISM, HUNTING, LUMBERJACKING, MINING, ALCHEMY, ANIMALHUSBANDRY, COOKING, FARMING, LUMBERMILLING, METALWORKING, STONECUTTING, TANNING, WEAVING, ARCANEENGINEERING, ARMORSMITHING, CARPENTRY, JEWELCUTTING, LEATHERWORKING, SCRIBE, TAILORING, WEAPONSMITHING)
- **Características Adicionales**:
  - Casilla de verificación en cada fila para seleccionar miembros.
  - Botones de **Editar** y **Eliminar** en cada fila.

---

## 2. Filtrado y Ordenamiento

### Barra de Filtros

- Permitir filtrar a los miembros por:
  - `Character Role`
  - `Guild Role`
  - `Main Archetype`
  - `Secondary Archetype`
  - `Grandmaster Profession` (tanto para la 1 como para la 2)
  - Nivel mínimo y máximo (`level`)
  - Item Level mínimo y máximo (`ilvl`)
- **Combinación de Filtros**:
  - Los filtros deben poder combinarse (e.g., filtrar por `Character Role` y nivel mínimo).

### Ordenamiento

- Permitir ordenar la tabla por cualquiera de las columnas.
- Opciones de orden:
  - Ascendente
  - Descendente

---

## 3. Selección Múltiple y Acciones en Lote

### Selección Múltiple

- Casillas de verificación en cada fila.
- Casilla de verificación en el encabezado para seleccionar/deseleccionar todos los miembros visibles.

### Acciones en Lote

- **Cambiar Guild Role**:
  - Permite cambiar el rol del gremio de todos los miembros seleccionados a un rol específico.
- **Eliminar Miembros**:
  - Permite eliminar a todos los miembros seleccionados.
  - **Nota**: Requiere confirmación en una alerta.

---

## 4. Optimización

### Renderización Eficiente

- Utilizar técnicas para evitar renderizaciones innecesarias, mejorando el rendimiento con grandes cantidades de datos.
- Implementar:
  - `React.memo`
  - `useMemo`
  - `useCallback`

### Paginación

- Implementar paginación para manejar listas extensas.
- **Opciones de Elementos por Página**:
  - 10, 20 o 50 miembros.

---

## 5. Detalles de Miembro y Edición

### Detalle de Miembro

- **Interacción**:  
  Al hacer clic en el `Username`, se abre un Modal con detalles completos del miembro.

### Edición Mejorada

- **Modal de Edición**:
  - Permitir actualizar todos los campos excepto el `user_id`.
  - Implementar validaciones avanzadas:
    - Niveles (`level` e `ilvl`) deben ser números enteros positivos.
    - Evitar duplicados en `user_id`.

---

## 6. Validaciones y Manejo de Errores

### Validaciones en Tiempo Real

- Mostrar mensajes de error mientras el usuario completa los formularios si los datos no son válidos.
- Deshabilitar el botón de enviar hasta que el formulario sea válido.

### Manejo de Errores de API

- Mostrar mensajes de error claros si ocurre algún problema al comunicarse con la API.
- Manejar errores comunes como:
  - Fallos de red.
  - Respuestas con códigos de error.

---

## Diseño

### Bibliografía General

- **Documentación de React:** Uso de hooks avanzados como `useMemo` y `useCallback`.  
- **Material Design:** Inspiración en patrones de diseño para tablas interactivas.  
- **Librería de Componentes:** Aplicación de `react-table` para manejo eficiente de datos tabulares.  
- **IA (ChatGPT y Copilot):** Generación de contenido y preguntas específicas para el proyecto.  

### Preguntas Generadas (todo el contenido ha sido generado por IA)

**Exceptuando los Copy/Paste que he realizado desde el ejercicio directamente las preguntas han sido las siguientes.**

1. **Diseño de Componentes:**  
   - ¿Cómo implementar una barra fija (`AppHeader`) que permanezca en su lugar al desplazarse hacia abajo en la página?  
   - ¿Qué técnicas usar para que el pie de página (`AppFooter`) se mantenga en la parte inferior de la ventana sin ser estático?  
   - ¿Cómo diseñar un diálogo de confirmación genérico (`ConfirmationDialog`) para operaciones destructivas o de edición?  
   - ¿Qué librerías son recomendadas para implementar un sistema de notificaciones emergentes (`NotificationSystem`) en React?  
   - ¿Cómo manejar errores de validación en tiempo real dentro del `ValidationSystem`?  

2. **Validación y Reglas del Negocio:**  
   - ¿Cómo asegurar que la validación de composición del equipo respete restricciones específicas y roles requeridos?  
   - ¿Cómo manejar la validación de datos antes de enviar un formulario de edición o creación de miembros?  
   - ¿Qué mecanismos utilizar para evitar duplicados en el `user_id` al crear un nuevo miembro?  

3. **Optimización del Rendimiento:**  
   - ¿Qué técnicas permiten optimizar tablas dinámicas con grandes cantidades de datos en React?  
   - ¿Cómo optimizar la renderización de componentes en React usando `React.memo` y `useMemo`?  

4. **Filtrado y Ordenamiento:**  
   - ¿Cómo implementar filtros combinados para roles, niveles y profesiones en la tabla de miembros?  
   - ¿Qué estrategias usar para permitir ordenamiento ascendente y descendente por cualquier columna de la tabla?  
   - ¿Cómo implementar un sistema de ordenamiento que persista entre cambios en los datos o paginación?  

5. **Interactividad Avanzada:**  
   - ¿Cómo implementar casillas de verificación para seleccionar múltiples filas en una tabla?  
   - ¿Qué técnicas usar para realizar acciones en lote en miembros seleccionados, como eliminar o cambiar roles?  

6. **Actualización en Tiempo Real:**  
   - ¿Cómo garantizar que los cambios realizados en un miembro (edición o eliminación) se reflejen en tiempo real en la interfaz?  

7. **Paginación:**  
   - ¿Qué librerías usar para manejar paginación eficiente en tablas grandes con React?  
   - ¿Cómo implementar un selector para elegir entre mostrar 10, 20 o 50 miembros por página?  
   - ¿Qué técnicas permiten redirigir a una página válida tras cambios en el número total de elementos en la tabla?  

8. **Modales y Formularios:**  
   - ¿Cómo implementar un modal detallado que muestre información completa del miembro seleccionado?  
   - ¿Qué técnicas usar para diseñar un modal de edición con validaciones avanzadas y manejo de errores de API?  

9. **Manejo de Errores:**  
   - ¿Qué estrategias usar para manejar errores comunes de red al interactuar con la API desde el frontend?  
   - ¿Cómo aplicar notificaciones contextuales que informen al usuario sobre conflictos o acciones exitosas?  

10. **Diseño y UX:**  
    - ¿Qué patrones de diseño en Material Design pueden aplicarse para mejorar la experiencia de usuario en tablas dinámicas?  
    - ¿Qué herramientas son útiles para garantizar la accesibilidad de componentes como tablas y modales?  

11. **Estado Global:**  
    - ¿Cómo manejar estados globales relacionados con los miembros del gremio utilizando React Context o Redux?  

12. **Pruebas y Validaciones:**  
    - ¿Qué técnicas usar para realizar pruebas unitarias de validaciones y componentes como el `ValidationSystem`?  

13. **Integraciones:**  
    - ¿Cómo integrar un sistema de notificaciones (`NotificationSystem`) con otras funcionalidades del panel?  

14. **Persistencia de Filtros:**  
    - ¿Cómo implementar un sistema que permita guardar y restaurar filtros aplicados por el usuario?  

15. **Validaciones Complejas:**  
    - ¿Qué librerías o enfoques son recomendables para realizar validaciones complejas, como asegurar composiciones válidas de equipo?  

# Componentes Generales

## `AppHeader`

- **Descripción**:  
  Componente encargado de mostrar la cabecera de la aplicación.  
- **Características**:
  - Contiene los elementos principales del **router** para la navegación entre las páginas.
  - Es una barra **estática**, es decir, permanece fija en la parte superior de la pantalla al desplazarse hacia abajo.

---

## `AppFooter`

- **Descripción**:  
  Componente encargado de mostrar el pie de página.  
- **Características**:
  - Incluye el típico texto de copyright, indicando que la aplicación fue desarrollada con React.
  - Siempre se encuentra al final de la página, pero **no es estático**; se desplaza con el contenido.

---

## `ConfirmationDialog`

- **Descripción**:  
  Modal genérico utilizado para confirmar acciones destructivas o de modificación.  
- **Uso**:
  - Confirmar operaciones como eliminar o editar miembros o equipos.
- **Características**:
  - Incluye dos botones:
    - **Sí**: Confirma la acción.
    - **No**: Cancela la acción.

---

## `NotificationSystem`

- **Descripción**:  
  Sistema para manejar y mostrar notificaciones o mensajes al usuario.  
- **Uso**:
  - Mostrar mensajes emergentes sobre el éxito, error o estado de acciones realizadas.
  - Informar al usuario sobre conflictos, requisitos no cumplidos, errores de validación, etc.
- **Características**:
  - Diseñado para ser no intrusivo pero visible.
  - Compatible con mensajes de:
    - **Éxito**
    - **Error**
    - **Información**

---

## `ValidationSystem`

- **Descripción**:  
  Sistema encargado de validar datos antes de realizar acciones específicas.  
- **Funciones**:
  - **`validateMember`**:
    - Verifica si un miembro cumple con los requisitos y restricciones al ser añadido.
    - Proporciona mensajes claros sobre problemas encontrados (e.g., duplicados, valores inválidos, etc.).
  - **`validateTeamComposition`**:
    - Asegura que la composición del equipo cumple con las reglas de roles requeridos y limitaciones establecidas.
    - Informa sobre cualquier problema en la estructura del equipo.

## Componentes Involucrados

## `GuildMemberManagement` (Componente Principal)

- **Descripción**:  
  Administra el estado global relacionado con la gestión de miembros.  
  Maneja la comunicación con los componentes secundarios que tiene para que se integren adecuadamente.

---

## `FilterBar` (Componente Secundario de GuildMemberManagement)

- **Descripción**:  
  Contiene los controles para filtrar la lista de miembros con los filtros definidos en la definición funcional.  
  Incluye inputs, selectores y sliders para los diferentes criterios de filtrado indicados en la definición funcional.

---

## `SortControls` (Componente Secundario de GuildMemberManagement)

- **Descripción**:  
  Permite ordenar la lista de miembros por diferentes columnas según lo indicado en la definición funcional.  
  Incluye el evento para aplicar el orden (ascendente/descendente/sin orden).

---

## `CreateMember` (Componente Secundario de GuildMemberManagement)

- **Descripción**:  
  Botón que permite crear un miembro, teniendo en cuenta todas las validaciones especificadas en la definición funcional.  
  Incluye notificaciones y/o validaciones en tiempo real y manejo de errores tal y como se definen en la definición funcional.

---

## `MemberList` (Componente Secundario de GuildMemberManagement)

- **Descripción**:  
  Renderiza la tabla de miembros.  
  Recibe la lista de miembros filtrada y ordenada desde la API del método correspondiente del servicio en JavaScript.  
  Implementa el componente de paginación.

---

### `Pagination` (Componente Secundario de MemberList)

- **Descripción**:  
  Componente para moverse entre páginas de la tabla.

---

### `MemberItem` (Componente Secundario de MemberList)

- **Descripción**:  
  Representa una fila individual en la tabla de miembros.  
  Incluye la información del miembro y los botones de **Editar** y **Eliminar** definidos en la definición funcional.  
  Contiene la casilla de verificación para la selección múltiple.

---

## `BulkActions` (Componente Secundario de MemberItem)

- **Descripción**:  
  Aparece para poder seleccionar uno o más miembros.  
  Contiene los botones para las acciones en lote (**Cambiar Guild Role** o **Eliminar Miembros**).  
  Maneja la lógica para aplicar las acciones seleccionadas a los miembros seleccionados.  
  Incluye notificaciones y/o validaciones en tiempo real y manejo de errores tal y como se definen en la definición funcional.

---

## `MemberDetailsModal` (Componente Secundario de MemberItem)

- **Descripción**:  
  Muestra información detallada de un miembro.  
  Se abre al hacer clic en el **Username**.  
  Permite ver información adicional y cerrar el modal.

---

## `MemberEditModal` (Componente Secundario de MemberItem)

- **Descripción**:  
  Modal utilizado para editar la información de un miembro.  
  Llena previamente el formulario con los datos actuales del miembro.  
  Incluye notificaciones y/o validaciones en tiempo real y manejo de errores tal y como se definen en la definición funcional.

# Pruebas a Realizar

## Prueba 1: Filtrado Combinado con Ordenamiento y Acciones en Lote

- **Descripción**:  
  Aplicar múltiples filtros simultáneamente (e.g., `Character Role = 'DAMAGE'`, `Guild Role = 'MEMBER'`, `Level` entre 50 y 60, `Main Archetype = 'MAGE'`, `Grandmaster Profession One = 'ALCHEMY'`).  
  Ordenar los resultados por `ilvl` en orden descendente.  
  Seleccionar todos los miembros filtrados utilizando la casilla de verificación en el encabezado.  
  Realizar una acción en lote para cambiar su `Guild Role` a `'GERENTE'`.  
  Verificar que solo los miembros visibles y filtrados se actualizan correctamente y que la paginación refleja los cambios.

- **Formato del GIF**:  
  ![Prueba 1 - Filtrado Combinado](./Recursos/Ejercicio1.1.gif)

---

## Prueba 2: Edición de Miembro con Validación en Tiempo Real y Manejo de Errores de API

- **Descripción**:  
  Editar un miembro desde el `MemberEditModal` e introducir valores inválidos (e.g., `Level` negativo, `ilvl` no numérico).  
  Comprobar que las validaciones en tiempo real impiden la sumisión y muestran mensajes de error claros.  
  Simular un fallo en la API al guardar cambios válidos y verificar que el `NotificationSystem` informa adecuadamente sin afectar la usabilidad.

- **Formato del GIF**:  
  ![Prueba 2 - Edición de Miembro](./Recursos/Ejercicio1.2.gif)

---

## Prueba 3: Creación de Miembro con Duplicidad de `user_id` y Actualización en Tiempo Real

- **Descripción**:  
  Intentar crear un nuevo miembro con un `user_id` que ya existe.  
  Verificar que el `ValidationSystem` detecta la duplicidad antes de enviar y muestra un mensaje de error claro.  
  Corregir el `user_id` y completar la creación.  
  Confirmar que el nuevo miembro aparece inmediatamente en la `MemberList` sin necesidad de recargar.

- **Formato del GIF**:  
  ![Prueba 3 - Creación de Miembro](./Recursos/Ejercicio1.3.gif)

---

## Prueba 4: Persistencia y Consistencia al Filtrar, Ordenar y Editar

- **Descripción**:  
  Aplicar filtros y ordenamientos específicos.  
  Editar un miembro de manera que ya no cumpla con los filtros aplicados (e.g., cambiar su `Level` fuera del rango filtrado).  
  Comprobar que, tras guardar, el miembro desaparece de la lista filtrada y que la paginación se ajusta correctamente.

- **Formato del GIF**:  
  ![Prueba 4 - Persistencia y Consistencia](./Recursos/Ejercicio1.4.gif)

---

## Prueba 5: Paginación Dinámica y Manejo de Cambios en el Conjunto de Datos

- **Descripción**:  
  Cambiar el número de miembros mostrados por página (10, 20, 50).  
  Navegar a una página específica.  
  Aplicar un filtro que reduce el número total de páginas.  
  Verificar que la aplicación redirige a una página válida y no muestra contenido vacío o errores.

- **Formato del GIF**:  
  ![Prueba 5 - Paginación Dinámica](./Recursos/Ejercicio1.5.gif)

---

# Ejercicio 2: Constructor de Equipos de Party con Optimización Automática

## Contexto

Este ejercicio consiste en implementar un sistema de **Party Finder** utilizando React, enfocado en la creación y gestión eficiente de equipos.

---

## Requerimientos Funcionales

### 1. Creación de Party

- **Formulario de Creación de Party**:
  - **Campos requeridos**:
    - **Creador de la Party**:
      - Selección del creador mediante su identificador único (**user_id**).
      - El creador se asigna automáticamente como el primer integrante con su correspondiente rol.
    - **Número de Integrantes**:
      - Posibilidad de seleccionar entre 3, 5 u 8 miembros.
    - **Roles Requeridos**:
      - Especificar los roles necesarios para los integrantes (**TANK, HEALER, DAMAGE, SUPPORT**).
    - **Requisitos Específicos por Rol**:
      - Configuración de **Level Cap** e **Item Level Cap** por cada rol.
    - **Preferencias de Archetype y/o Profesiones**:
      - Establecer restricciones o preferencias para **Main/Secondary Archetype** o **Grandmaster Professions** (opcional).
  - **Validaciones**:
    - Verificar cada campo y notificar al usuario mediante el sistema de **Validación** y **Notificación**.

---

### 2. Visualización de Parties

- **Lista de Parties**:
  - Cada party debe mostrar los siguientes detalles:
    - **Party ID**: Identificador único, no modificable.
    - **Creator ID**: Identificador único del creador, no modificable.
    - **Estado de la Party**:
      - "BUSCANDO" si la party no está completa.
      - "COMPLETA" si todos los roles están ocupados.
    - **Planned Start**:
      - Fecha y hora planificada para el inicio de la party.
    - **Roles Requeridos y Ocupados**:
      - Visualización clara de los roles necesarios y cuáles están asignados.
    - **Nivel e Item Level Caps**:
      - Requisitos establecidos por rol.
    - **Preferencias de Archetype y/o Profesiones**:
      - Mostrar restricciones o preferencias si aplican.

---

### 3. Validaciones y Restricciones

- **Capacidad y Roles**:
  - No permitir añadir más miembros que el tamaño definido de la party (**Party Size**).
  - Respetar el límite de integrantes por rol establecido.
- **Requisitos de Nivel e Item Level**:
  - Verificar que los miembros cumplen con:
    - **Level Cap** e **Item Level Cap** generales.
    - Restricciones específicas por rol.
- **Preferencias de Archetype y Profesiones**:
  - Considerar estas preferencias al sugerir miembros, pero permitir flexibilidad si no hay suficientes candidatos.
- **Unicidad de Miembros**:
  - Evitar que un miembro sea añadido más de una vez a la misma party.
- **Feedback y Notificaciones**:
  - Proporcionar mensajes claros al usuario sobre:
    - Éxito de las acciones realizadas.
    - Errores o restricciones incumplidas.
  - Resaltar visualmente a los miembros que no cumplen con los requisitos o preferencias.

---

### 4. Integración con la API

- **Obtener Miembros y Parties**:
  - Consumir los endpoints correspondientes para:
    - Obtener la lista de **guildmembers**.
    - Obtener la lista de **parties** existentes.
- **Añadir y Remover Miembros**:
  - Utilizar los endpoints especificados en el archivo YML para:
    - Actualizar la composición de la party.
- **Persistencia de Datos**:
  - Asegurar que los cambios realizados se reflejen correctamente en la API.
  - Garantizar que la interfaz esté siempre sincronizada con los datos almacenados.

---

## Diseño

## Bibliografía General

- **Documentación de React:** Uso de componentes controlados, contextos, y hooks avanzados como `useContext`, `useReducer`, y `useEffect` para manejar estados globales y asincronía.  
- **React Hook Form:** Implementación de validaciones de formularios dinámicos y manejo eficiente de errores.  
- **Material Design:** Inspiración en patrones de diseño para interfaces interactivas y responsivas como formularios, listas, y modales.  
- **React Table:** Manejo eficiente de listas tabulares con capacidades de filtrado, ordenamiento y paginación.  
- **Axios:** Consumo de APIs para integración con el sistema de guildmembers y parties, manejando peticiones y respuestas de manera eficiente.  
- **Librería `yup`:** Validaciones complejas en tiempo real, como restricciones de nivel e item level en los formularios de roles y miembros.  
- **React Modal:** Implementación de modales personalizados para edición, búsqueda automática de miembros y confirmaciones.  
- **Redux Toolkit:** Manejo de estado global para gestionar el constructor de parties y sincronización de datos con la API.  
- **React Testing Library:** Pruebas unitarias y de integración para componentes como `PartyForm`, `PartyList`, y `PartyAutoFinderModal`.  
- **Documentación REST API:** Referencia para endpoints relacionados con guildmembers y parties, asegurando persistencia y consistencia en la interfaz.  
- **React Context:** Alternativa ligera para manejar estados relacionados con validaciones y notificaciones en tiempo real.  

### Preguntas Generadas (todo el contenido ha sido generado por IA)

**Exceptuando los Copy/Paste que he realizado desde el ejercicio directamente, las preguntas han sido las siguientes:**

### Creación y Validación de Party

1. **¿Cómo implementar un formulario dinámico que permita seleccionar roles, niveles y restricciones en tiempo real para crear una party?**
2. **¿Qué técnicas se pueden usar para validar que un miembro cumple con los requisitos de nivel e item level antes de ser añadido a una party?**
3. **¿Cómo reutilizar validaciones entre el formulario de creación de party y el modal de búsqueda automática de miembros?**
4. **¿Qué patrones de diseño se pueden aplicar para asegurar la usabilidad en formularios con múltiples restricciones y validaciones?**
5. **¿Cómo garantizar que las validaciones de nivel y preferencias de profesión sean flexibles pero coherentes con los requisitos de la party?**

### Gestión de Estado y API

6. **¿Cómo manejar la comunicación con la API para actualizar el estado de los miembros y las parties en tiempo real?**
7. **¿Qué estrategias usar para manejar errores comunes en la API al añadir o editar miembros de una party?**
8. **¿Cómo implementar un sistema de estados globales para sincronizar cambios entre el constructor de parties y la lista de parties existentes?**
9. **¿Qué técnicas usar para implementar notificaciones que informen al usuario sobre errores o acciones exitosas al interactuar con la API?**
10. **¿Qué estrategias permiten optimizar la carga y visualización de listas grandes de miembros o parties?**

### Modales y Componentes Interactivos

11. **¿Qué librerías son recomendables para implementar un modal de búsqueda automática de miembros (`PartyAutoFinderModal`)?**
12. **¿Cómo diseñar un componente que permita definir de forma visual los roles requeridos y sus restricciones, como caps de nivel e item level?**
13. **¿Qué técnicas usar para implementar filtros avanzados en el modal de búsqueda automática, como ordenar por nivel o filtrar por profesión?**
14. **¿Cómo implementar la edición de una party en un modal (`PartyEditModal`) respetando los datos existentes y las validaciones activas?**
15. **¿Qué herramientas o enfoques usar para realizar pruebas unitarias de componentes como `PartyForm` y `PartyAutoFinderModal`?**

### Gestión de Miembros

16. **¿Qué estrategias usar para evitar añadir un miembro duplicado a la misma party?**
17. **¿Cómo manejar la eliminación de un miembro de una party y actualizar la interfaz en tiempo real?**
18. **¿Cómo garantizar que los roles no ocupados se destaquen visualmente en una party incompleta?**
19. **¿Cómo manejar la edición de requisitos de roles en una party ya completa y reasignar miembros si es necesario?**
20. **¿Qué técnicas se pueden usar para destacar visualmente los roles que aún no están ocupados en una party incompleta?**

# Componentes Involucrados

## 1. `PartyFinder` (Componente Principal)

- **Responsabilidades**:
  - Gestiona el estado de la party.
  - Controla los miembros seleccionados, roles requeridos y preferencias.
  - Maneja la lógica para:
    - Añadir miembros.
    - Remover miembros.
    - Actualizar miembros en la party.

---

## 2. `PartyBuilder` (Componente Secundario de PartyFinder)

- **Responsabilidades**:
  - Administra el estado global del constructor de parties.
  - Maneja la comunicación con la API mediante servicios:
    - Obtener miembros.
    - Guardar parties.

---

## 3. `PartyForm` (Componente Secundario de PartyBuilder)

- **Formulario para Crear una Party**:
  - **Campos**:
    - Dropdown para seleccionar el creador (**user_id**).
    - Selección del tamaño de la party (3, 5, 8 integrantes).
    - Especificación de roles requeridos y sus requisitos:
      - Level Cap e Item Level Cap.
      - Preferencias de Archetype y Profesiones (opcional).
  - **Características**:
    - Validación de campos con `ValidationSystem`.
    - Notificaciones en tiempo real mediante `NotificationSystem`.

---

## 4. `PartyRoleAssignment` (Componente Secundario de PartyForm)

- **Responsabilidades**:
  - Manejo de roles y restricciones de la party.
  - **Elementos Incluidos**:
    - Dropdowns para seleccionar roles requeridos.
    - Sliders para definir Level Cap e Item Level Cap.

---

## 5. `PartyList` (Componente Secundario de PartyFinder)

- **Responsabilidades**:
  - Muestra una lista de parties creadas con detalles relevantes.

---

## 6. `PartyItem` (Componente Secundario de PartyList)

- **Responsabilidades**:
  - Representa una party individual.
  - **Detalles Mostrados**:
    - Roles requeridos y ocupados.
    - Estado de la party ("BUSCANDO" o "COMPLETA").
    - Nivel e Item Level Caps.
  - **Botones Incluidos**:
    - **Editar**: Abre un modal (`PartyEditModal`).
    - **Eliminar**: Solicita confirmación antes de eliminar.
    - **AutoFinder**:
      - Icono de búsqueda que abre un modal (`PartyAutoFinderModal`).

---

## 7. `PartyEditModal` (Componente Secundario de PartyItem)

- **Responsabilidades**:
  - Modal para editar detalles de una party existente.
  - **Características**:
    - Campos pre-llenados con datos actuales.
    - Validación y actualización de datos a la API mediante servicios.

---

## 8. `PartyAutoFinderModal` (Componente Secundario de PartyItem)

- **Responsabilidades**:
  - Busca miembros que cumplan con los requisitos del hueco seleccionado.
  - **Características**:
    - Lista de miembros con detalles relevantes.
    - Botón "Añadir" para asignar un miembro a la party.
    - Permite:
      - Cambiar un integrante actual por otro (requiere confirmación).
      - Eliminar un integrante con confirmación.
      - Filtrar y ordenar resultados por atributos como nivel o Guild Role.
    - Valida restricciones y muestra notificaciones claras sobre los resultados.

---

# Pruebas a Realizar

## Prueba 1: Creación y Llenado Completo de una Party con AutoFinder

1. Crear una party de 8 integrantes con requisitos específicos:
   - **Roles requeridos**: 2 TANK, 2 HEALER, 3 DAMAGE, 1 SUPPORT.
   - **Requisitos**:
     - Nivel mínimo y máximo por rol (e.g., TANK: 50-60).
     - Preferencias de Archetype y Profesiones.
2. Utilizar `PartyAutoFinderModal` para llenar cada hueco:
   - Abrir el modal desde el icono de búsqueda junto a un rol vacío.
   - Seleccionar un miembro que cumpla los requisitos.
   - Repetir el proceso para todos los roles.
3. **Verificar**:
   - Los miembros añadidos se reflejan en la party.
   - El estado de la party cambia a "COMPLETA".
   - Las validaciones y notificaciones funcionan correctamente.

- **Formato del GIF**:  
  ![Prueba 1 - Creacion y llenado completo de una Party](INSERTAR_LINK_DEL_GIF_AQUÍ)

---

## Prueba 2: Edición de una Party y Reasignación de Miembros con AutoFinder

1. Editar una party "COMPLETA".
   - Cambiar requisitos de un rol (e.g., aumentar nivel mínimo).
2. Usar `PartyAutoFinderModal` para reemplazar al miembro actual.
3. **Verificar**:
   - El miembro anterior es removido.
   - El nuevo miembro se añade correctamente.
   - Las notificaciones muestran los cambios realizados.

- **Formato del GIF**:  
  ![Prueba 2 - Edicion de una Party y Reasignacion de Miembros](INSERTAR_LINK_DEL_GIF_AQUÍ)

---

## Prueba 3: Manejo de Errores de API al Añadir Miembros con AutoFinder

1. Simular un fallo en la API al intentar añadir un miembro.
2. **Verificar**:
   - El sistema informa del error en el modal.
   - Permite reintentar sin perder la selección.

- **Formato del GIF**:  
  ![Prueba 3 - Manjeo de errores](INSERTAR_LINK_DEL_GIF_AQUÍ)

---

## Prueba 4: Integración de Validaciones entre PartyForm y AutoFinder

1. Crear una party con requisitos específicos en `PartyForm`.
2. Intentar añadir miembros que no cumplen los requisitos usando `PartyAutoFinderModal`.
3. **Verificar**:
   - Las validaciones del `PartyForm` se respetan.
   - No se permite añadir miembros que incumplan las restricciones.

- **Formato del GIF**:  
  ![Prueba 4 - Integracion de validaciones](INSERTAR_LINK_DEL_GIF_AQUÍ)

---

## Prueba 5: Personalización de la Búsqueda en AutoFinder

1. Aplicar filtros adicionales en `PartyAutoFinderModal`:
   - Ordenar por nivel o ilvl.
   - Filtrar por Guild Role.
2. **Verificar**:
   - Los resultados se actualizan según los filtros.
   - La funcionalidad es consistente.

- **Formato del GIF**:  
  ![Prueba 5 - Personalización de búsqueda](INSERTAR_LINK_DEL_GIF_AQUÍ)

---

## Prueba 6: Eliminación de Miembros de una Party y Reasignación con AutoFinder

1. Desde `PartyItem`, eliminar un miembro asignado a un rol.
2. Usar `PartyAutoFinderModal` para llenar el hueco vacío.
3. **Verificar**:
   - El miembro eliminado aparece disponible en AutoFinder.
   - La party se actualiza correctamente.

- **Formato del GIF**:  
  ![Prueba 6 - Eliminacion de miembros de una Party y Reasignacion](INSERTAR_LINK_DEL_GIF_AQUÍ)

  ---
