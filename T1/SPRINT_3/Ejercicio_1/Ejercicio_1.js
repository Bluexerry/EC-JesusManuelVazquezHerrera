// Datos de ejemplo
const estudiantes = [
    { nombre: "Juan", ciudad: "Madrid", beca: false, edad: 21, calificaciones: { matematicas: 5, fisica: 7, historia: 6 } },
    { nombre: "Ana", ciudad: "Barcelona", beca: true, edad: 20, calificaciones: { matematicas: 9, fisica: 6, historia: 8 } },
    { nombre: "Pedro", ciudad: "Madrid", beca: false, edad: 23, calificaciones: { matematicas: 4, fisica: 5, historia: 7 } },
    { nombre: "Maria", ciudad: "Sevilla", beca: true, edad: 19, calificaciones: { matematicas: 8, fisica: 7, historia: 9 } },
    { nombre: "Jose", ciudad: "Madrid", beca: false, edad: 22, calificaciones: { matematicas: 6, fisica: 7, historia: 5 } },
    { nombre: "Isabel", ciudad: "Valencia", beca: true, edad: 20, calificaciones: { matematicas: 5, fisica: 8, historia: 7 } },
    { nombre: "David", ciudad: "Bilbao", beca: false, edad: 24, calificaciones: { matematicas: 7, fisica: 6, historia: 8 } },
    { nombre: "Laura", ciudad: "Barcelona", beca: true, edad: 19, calificaciones: { matematicas: 6, fisica: 8, historia: 7 } },
    { nombre: "Miguel", ciudad: "Sevilla", beca: false, edad: 21, calificaciones: { matematicas: 7, fisica: 7, historia: 8 } },
    { nombre: "Sara", ciudad: "Madrid", beca: true, edad: 20, calificaciones: { matematicas: 6, fisica: 5, historia: 9 } },
    { nombre: "Daniela", ciudad: "Valencia", beca: false, edad: 22, calificaciones: { matematicas: 8, fisica: 9, historia: 6 } },
    { nombre: "Alberto", ciudad: "Bilbao", beca: true, edad: 23, calificaciones: { matematicas: 5, fisica: 8, historia: 6 } },
    { nombre: "Gabriel", ciudad: "Sevilla", beca: false, edad: 19, calificaciones: { matematicas: 8, fisica: 5, historia: 7 } },
    { nombre: "Carmen", ciudad: "Barcelona", beca: true, edad: 24, calificaciones: { matematicas: 9, fisica: 9, historia: 9 } },
    { nombre: "Roberto", ciudad: "Madrid", beca: false, edad: 20, calificaciones: { matematicas: 4, fisica: 5, historia: 5 } },
    { nombre: "Carolina", ciudad: "Valencia", beca: true, edad: 22, calificaciones: { matematicas: 5, fisica: 7, historia: 6 } },
    { nombre: "Alejandro", ciudad: "Bilbao", beca: false, edad: 23, calificaciones: { matematicas: 9, fisica: 8, historia: 8 } },
    { nombre: "Lucia", ciudad: "Barcelona", beca: true, edad: 21, calificaciones: { matematicas: 7, fisica: 7, historia: 7 } },
    { nombre: "Ricardo", ciudad: "Sevilla", beca: false, edad: 19, calificaciones: { matematicas: 6, fisica: 5, historia: 6 } },
    { nombre: "Marina", ciudad: "Madrid", beca: true, edad: 20, calificaciones: { matematicas: 5, fisica: 9, historia: 8 } }
];

// Funciones a implementar:

// Parte 1: Estudiantes Destacados por Asignatura
function estudiantesDestacadosPorAsignatura(estudiantes, asignatura) {
    return estudiantes
        .sort((a, b) => b.calificaciones[asignatura] - a.calificaciones[asignatura])
        .slice(0, 3)
        .map(est => est.nombre);
}

// Parte 2: Asignatura con Menor Rendimiento
function asignaturaMenorRendimiento(estudiantes) {
    const asignaturas = Object.keys(estudiantes[0].calificaciones);
    let menorRendimiento = asignaturas[0];
    let menorPromedio = Infinity;

    asignaturas.forEach(asignatura => {
        const promedio = estudiantes.reduce((sum, est) => sum + est.calificaciones[asignatura], 0) / estudiantes.length;
        if (promedio < menorPromedio) {
            menorPromedio = promedio;
            menorRendimiento = asignatura;
        }
    });

    return menorRendimiento;
}

// Parte 3: Mejora de Notas para Estudiantes con Beca
function mejoraNotasBeca(estudiantes) {
    // Creamos un nuevo array para almacenar los resultados
    const estudiantesConMejoras = estudiantes.map(est => {
        if (est.beca) {
            // Creamos una copia del objeto estudiante para no mutar el original
            const estMejorado = { nombre: est.nombre }; // Solo conservamos el nombre
            // Mejoramos las calificaciones
            estMejorado.calificaciones = {};
            Object.keys(est.calificaciones).forEach(asignatura => {
                // Mejoramos la nota y limitamos a 2 decimales
                estMejorado.calificaciones[asignatura] = Math.min((est.calificaciones[asignatura] * 1.1).toFixed(2), 10);
            });
            return estMejorado; // Retornamos el estudiante con las notas mejoradas
        }
        return null; // Retornamos null si no tiene beca
    }).filter(est => est !== null); // Filtramos los nulls

    return estudiantesConMejoras; // Retornamos el nuevo array
}

// Parte 4: Filtrado por Ciudad y Asignatura
function filtrarPorCiudadYAsignatura(estudiantes, ciudad, asignatura) {
    return estudiantes
        .filter(est => est.ciudad === ciudad && est.calificaciones[asignatura] !== undefined)
        .sort((a, b) => {
            if (b.calificaciones[asignatura] === a.calificaciones[asignatura]) {
                return a.nombre.localeCompare(b.nombre); // Ordenamos alfabéticamente por nombre si las calificaciones son iguales
            }
            return b.calificaciones[asignatura] - a.calificaciones[asignatura]; // Ordenamos de mayor a menor
        })
        .map(est => ({
            nombre: est.nombre,
            ciudad: est.ciudad, // Incluimos la ciudad
            [asignatura]: est.calificaciones[asignatura] // Solo mostramos la calificación de la asignatura seleccionada
        }));
}

// Parte 5: Estudiantes Sin Beca por Ciudad
function estudiantesSinBecaPorCiudad(estudiantes, ciudad) {
    // Filtrar estudiantes sin beca en la ciudad especificada
    const sinBeca = estudiantes.filter(est => est.ciudad === ciudad && !est.beca);
    // Crear un mensaje con la cantidad y los nombres
    return `${sinBeca.length} (${sinBeca.map(est => est.nombre).join(', ')} no tienen beca en ${ciudad}).`;
}

// Parte 6: Promedio de Edad de Estudiantes con Beca
function promedioEdadEstudiantesConBeca(estudiantes) {
    const estudiantesConBeca = estudiantes.filter(est => est.beca);
    const totalEdad = estudiantesConBeca.reduce((sum, est) => sum + est.edad, 0);
    return Math.round(totalEdad / estudiantesConBeca.length); // Redondea al entero más cercano
}


// Parte 7: Mejores Estudiantes en Total
function mejoresEstudiantes(estudiantes) {
    return estudiantes
        .map(est => ({
            nombre: est.nombre,
            promedio: Object.values(est.calificaciones).reduce((sum, nota) => sum + nota, 0) / Object.keys(est.calificaciones).length
        }))
        .sort((a, b) => b.promedio - a.promedio)
        .slice(0, 5) // Cambiado para tomar los cinco mejores
        .map(est => est.nombre)
        .join('\n'); // Une los nombres con un salto de línea
}


// Parte 8: Estudiantes con Todas las Materias Aprobadas
function estudiantesAprobados(estudiantes) {
    return estudiantes
        .filter(est => Object.values(est.calificaciones).every(nota => nota >= 5)) // Filtra estudiantes con todas las materias aprobadas
        .map(est => est.nombre) // Mapea a solo los nombres
        .sort() // Ordena alfabéticamente
        .join('\n'); // Une los nombres con un salto de línea
}

// Pruebas
console.log('Estudiantes destacados por asignatura:\n' + estudiantesDestacadosPorAsignatura(estudiantes, 'matematicas'));
console.log('Asignatura de menos rendimiento:\n' + asignaturaMenorRendimiento(estudiantes));
console.log("Mejoras de notas para estudiantes con beca:\n", JSON.stringify(mejoraNotasBeca(estudiantes), null, 2));
console.log("Filtro por ciudad y asignatura:\n", JSON.stringify(filtrarPorCiudadYAsignatura(estudiantes, 'Madrid', 'fisica'), null, 2));
console.log('Estudiantes sin beca por ciudad:\n' + estudiantesSinBecaPorCiudad(estudiantes, 'Madrid'));
console.log('Promedio de edad de estudiantes con beca:\n' + promedioEdadEstudiantesConBeca(estudiantes));
console.log('Mejores estudiantes:\n' + mejoresEstudiantes(estudiantes));
console.log('Estudiantes aprobados:\n' + estudiantesAprobados(estudiantes));