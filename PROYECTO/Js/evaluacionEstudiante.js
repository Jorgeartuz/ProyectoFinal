document.addEventListener('DOMContentLoaded', function () {
    cargarEvaluacionesPendientes();
});



function obtenerTemasMatriculadosEstudiante() {
    // Implementación para obtener los temas matriculados por el estudiante
    // Devuelve un array de códigos de temas.
    // Ejemplo:
    const temasMatriculados = ['TemaPrueba#1', 'TemaPrueba#2', 'TemaPrueba#3'];
    return temasMatriculados;
}

function cargarEvaluacionesPendientes() {
    const temasMatriculados = obtenerTemasMatriculadosEstudiante();
    const evaluaciones = obtenerEvaluaciones();

    // Filtrar evaluaciones por temas matriculados
    const evaluacionesPendientes = evaluaciones.filter(evaluacion => temasMatriculados.includes(evaluacion.temaAsociado));

    // Obtener la sección donde se mostrará la lista de evaluaciones pendientes
    const evaluacionesPendientesSection = document.getElementById('evaluacionesPendientes');

    // Limpiar el contenido actual de la sección
    evaluacionesPendientesSection.innerHTML = '';

    // Verificar si hay evaluaciones pendientes para mostrar
    if (evaluacionesPendientes.length > 0) {
        // Crear una lista para mostrar la lista de evaluaciones pendientes
        const lista = document.createElement('ul');

        // Agregar cada evaluación pendiente a la lista
        evaluacionesPendientes.forEach(evaluacion => {
            const item = document.createElement('li');
            item.innerHTML = `
                <strong>${evaluacion.nombre}</strong> - ${evaluacion.descripcion}<br>
                Tema: ${obtenerNombreTemaPorCodigo(evaluacion.temaAsociado)}<br>
                Enlace: <a href="${evaluacion.enlace}" target="_blank">${evaluacion.enlace}</a>
            `;
            lista.appendChild(item);
        });

        // Agregar la lista a la sección de evaluaciones pendientes
        evaluacionesPendientesSection.appendChild(lista);
    } else {
        // Mostrar un mensaje si no hay evaluaciones pendientes
        evaluacionesPendientesSection.innerHTML = '<p>No hay evaluaciones pendientes para este tema.</p>';
    }
}


function mostrarEvaluacionesPendientes(evaluaciones) {
    // Obtener la sección donde se mostrará la lista de evaluaciones pendientes
    const evaluacionesPendientesSection = document.getElementById('evaluacionesPendientes');

    // Limpiar el contenido actual de la sección
    evaluacionesPendientesSection.innerHTML = '';

    // Verificar si hay evaluaciones pendientes para mostrar
    if (evaluaciones.length > 0) {
        // Crear una lista para mostrar las evaluaciones pendientes
        const lista = document.createElement('ul');

        // Agregar cada evaluación pendiente a la lista
        evaluaciones.forEach(evaluacion => {
            const listItem = document.createElement('li');
            listItem.textContent = evaluacion.nombre;
            lista.appendChild(listItem);
        });

        // Agregar la lista a la sección de evaluaciones pendientes
        evaluacionesPendientesSection.appendChild(lista);
    } else {
        // Mostrar un mensaje si no hay evaluaciones pendientes
        evaluacionesPendientesSection.innerHTML = '<p>No hay evaluaciones pendientes para este tema.</p>';
    }
}

function obtenerEvaluaciones() {
    // Implementación para obtener las evaluaciones desde el localStorage u otra fuente de datos
    // Devuelve un array de evaluaciones.
    // Ejemplo:
    const evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];
    return evaluaciones;
}


function obtenerMatriculas() {
    // Lógica para obtener las matrículas desde el localStorage u otra fuente de datos
    // Devuelve un array de matrículas.
    // Ejemplo:
    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    return matriculas;
}

function obtenerNombreTemaPorCodigo(codigo) {
    // Lógica para obtener el nombre del tema a partir del código
    // Implementa según la estructura de tus datos
    const temas = JSON.parse(localStorage.getItem('temas')) || [];
    const tema = temas.find(t => t.codigo === codigo);
    return tema ? tema.nombre : 'Desconocido';
}

function obtenerIdEstudiante() {
    // Lógica para obtener el id del estudiante actual
    // Implementa según la estructura de tus datos
    // Por ejemplo, puedes obtener el id almacenado en el localStorage al iniciar sesión
    const idEstudiante = localStorage.getItem('logged_in_user_data')?.id_number;
    return idEstudiante;
}

function obtenerTemaEstudiante() {
    // Implementación para obtener el tema del estudiante, por ejemplo:
    // Aquí deberías tener tu lógica para obtener el tema del estudiante, por ejemplo, desde su perfil
    const temaEstudiante = 'TemaX';
    return temaEstudiante;
}

function obtenerCodigoEstudiante() {
    // Implementación para obtener el código del estudiante, por ejemplo:
    // Aquí deberías tener tu lógica para obtener el código del estudiante, por ejemplo, desde su perfil
    const codigoEstudiante = '12345';
    return codigoEstudiante;
}
