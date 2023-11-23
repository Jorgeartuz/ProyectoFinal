document.addEventListener('DOMContentLoaded', function () {
    cargarTemasEstudiante();
    actualizarProgresoTemas();

});

function cargarTemasEstudiante() {
    // Obtener el parámetro cursoCodigo de la URL
    const params = new URLSearchParams(window.location.search);
    const cursoCodigo = params.get('cursoCodigo');

    // Obtener la sección donde se mostrarán los temas
    const misTemasDiv = document.getElementById('misTemas');

    // Obtener la lista de temas del localStorage o inicializar un array vacío
    const temas = obtenerTemas();
    const calificaciones = obtenerCalificacionesEstudiante(); // Asegúrate de tener esta función implementada


    // Limpiar el contenido actual de la sección
    misTemasDiv.innerHTML = '';

    // Verificar si hay temas para mostrar
    if (temas.length > 0) {
        // Filtrar temas que estén asociados al curso seleccionado
        const temasCurso = temas.filter(tema => tema.cursosAsociados.includes(cursoCodigo));

        // Mostrar los temas en la sección
        if (temasCurso.length > 0) {
            temasCurso.forEach(tema => {
                const temaDiv = document.createElement('div');
                temaDiv.innerHTML = `<p>${tema.nombre}</p>`;
                const progreso = calcularProgreso(tema.id, calificaciones);
                agregarProgreso(temaDiv, progreso);
                misTemasDiv.appendChild(temaDiv);
            });
        } else {
            misTemasDiv.innerHTML = '<p>No hay temas asociados a este curso.</p>';
        }
    } else {
        misTemasDiv.innerHTML = '<p>No hay temas disponibles.</p>';
    }
}



function calcularProgreso(temaId, calificaciones) {
    // Obtener las calificaciones asociadas al tema
    const calificacionesTema = calificaciones.filter(calificacion => calificacion.temaId === temaId);

    // Verificar si hay calificaciones para el tema
    if (calificacionesTema.length > 0) {
        // Calcular el progreso basándose en las calificaciones existentes
        const notasCalificadas = calificacionesTema.reduce((acumulador, calificacion) => {
            if (calificacion.nota) {
                return acumulador + 1;
            }
            return acumulador;
        }, 0);

        const progreso = (notasCalificadas / 4) * 100; // Suponiendo 4 notas por tema
        return progreso.toFixed(2); // Redondear a 2 decimales
    }

    return 0; // Si no hay calificaciones, el progreso es 0
}

function agregarProgreso(temaDiv, progreso) {
    // Agregar la barra de progreso al div del tema
    const progresoDiv = document.createElement('div');
    progresoDiv.innerHTML = `<progress value="${progreso}" max="100"></progress>`;
    temaDiv.appendChild(progresoDiv);
}

function obtenerCalificacionesEstudiante() {
    // Implementación para obtener las calificaciones del estudiante, por ejemplo:
    const loggedInUser = JSON.parse(localStorage.getItem('logged_in_user_data')) || {};
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const estudiante = users.find(user => user.id_number === loggedInUser.id_number);

    if (estudiante && estudiante.calificaciones && Array.isArray(estudiante.calificaciones)) {
        return estudiante.calificaciones;
    }

    return [];
}




function actualizarProgresoTemas() {
    const loggedInUser = JSON.parse(localStorage.getItem('logged_in_user_data')) || {};

    if (!loggedInUser.id_number) {
        alert('No se encontró información del estudiante.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const estudiante = users.find(user => user.id_number === loggedInUser.id_number);

    if (estudiante && estudiante.calificaciones) {
        const temasConProgreso = document.querySelectorAll('.tema-con-progreso');

        temasConProgreso.forEach(temaDiv => {
            const nombreTema = temaDiv.getAttribute('data-tema');
            const progresoElement = temaDiv.querySelector('.progreso-tema');

            // Verifica si hay calificación para este tema
            if (estudiante.calificaciones.hasOwnProperty(nombreTema) && estudiante.calificaciones[nombreTema] !== '') {
                progresoElement.value = 100; // Si hay calificación, el progreso es 100%
            } else {
                progresoElement.value = 0; // Si no hay calificación, el progreso es 0%
            }
        });
    } else {
        alert('No se encontraron calificaciones para el estudiante.');
    }
}


function obtenerTemas() {
    // Implementación para obtener los temas, por ejemplo:
    const temas = JSON.parse(localStorage.getItem('temas')) || [];
    return temas;
}


function obtenerMatriculas() {
    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    return matriculas;
}

