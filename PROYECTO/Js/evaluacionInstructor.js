document.addEventListener('DOMContentLoaded', function () {
    cargarCursosEnSelect();
    cargarTemasEnSelect();
    cargarEvaluaciones();
});

function cargarCursosEnSelect() {
    // Obtener el select de cursos
    const selectCursos = document.getElementById('cursosAsociados');

    // Obtener la lista de cursos del localStorage o inicializar un array vacío
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    // Limpiar el contenido actual del select
    selectCursos.innerHTML = '';

    // Verificar si hay cursos para mostrar
    if (cursos.length > 0) {
        // Agregar opciones al select por cada curso
        cursos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.codigo;
            option.textContent = `${curso.nombre} (${curso.codigo})`;
            selectCursos.appendChild(option);
        });
    } else {
        // Mostrar un mensaje si no hay cursos
        selectCursos.innerHTML = '<option value="" disabled>No hay cursos disponibles.</option>';
    }
}

function cargarTemasEnSelect() {
    // Obtener el select de temas
    const selectTemas = document.getElementById('temasAsociado');

    // Obtener la lista de temas del localStorage o inicializar un array vacío
    const temas = JSON.parse(localStorage.getItem('temas')) || [];

    // Limpiar el contenido actual del select
    selectTemas.innerHTML = '';

    // Verificar si hay temas para mostrar
    if (temas.length > 0) {
        // Agregar opciones al select por cada tema
        temas.forEach(tema => {
            const option = document.createElement('option');
            option.value = tema.codigo;
            option.textContent = tema.nombre;
            selectTemas.appendChild(option);
        });
    } else {
        // Mostrar un mensaje si no hay temas
        selectTemas.innerHTML = '<option value="" disabled>No hay temas disponibles.</option>';
    }
}

function crearEvaluacion() {
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombreEvaluacion').value;
    const cursoAsociado = document.getElementById('cursosAsociados').value;
    const temaAsociado = document.getElementById('temasAsociado').value;
    const descripcion = document.getElementById('descripcionEvaluacion').value;
    const fecha = document.getElementById('fechaEvaluacion').value;
    const enlace = document.getElementById('enlaceEvaluacion').value;

    // Obtener la lista de evaluaciones del localStorage o inicializar un array vacío
    const evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];

    // Agregar la nueva evaluación a la lista
    evaluaciones.push({
        nombre,
        cursoAsociado,
        temaAsociado,
        descripcion,
        fecha,
        enlace
    });

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));

    // Limpiar los campos del formulario
    limpiarFormularioEvaluacion();

    // Puedes redirigir a otra página o realizar alguna acción adicional si es necesario
    // window.location.href = 'nuevaPagina.html';
}

function cargarEvaluaciones() {
    // Obtener la sección donde se mostrará la lista de evaluaciones
    const evaluacionesSection = document.getElementById('evaluaciones');

    // Obtener la lista de evaluaciones del localStorage o inicializar un array vacío
    const evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];

    // Limpiar el contenido actual de la sección
    evaluacionesSection.innerHTML = '';

    // Verificar si hay evaluaciones para mostrar
    if (evaluaciones.length > 0) {
        // Crear una tabla para mostrar la lista de evaluaciones
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Nombre</th>
                <th>Curso Asociado</th>
                <th>Tema Asociado</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Enlace</th>
                <th>Acciones</th>
            </tr>
        `;

        // Agregar cada evaluación a la tabla
        evaluaciones.forEach(evaluacion => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${evaluacion.nombre}</td>
                <td>${evaluacion.cursoAsociado}</td>
                <td>${evaluacion.temaAsociado}</td>
                <td>${evaluacion.descripcion}</td>
                <td>${evaluacion.fecha}</td>
                <td>${evaluacion.enlace}</td>
                <td>
                    <button onclick="eliminarEvaluacion('${evaluacion.nombre}')">Eliminar</button>
                </td>
            `;
            table.appendChild(row);
        });

        // Agregar la tabla a la sección de evaluaciones
        evaluacionesSection.appendChild(table);
    } else {
        // Mostrar un mensaje si no hay evaluaciones
        evaluacionesSection.innerHTML = '<p>No hay evaluaciones disponibles.</p>';
    }
}

function eliminarEvaluacion(nombreEvaluacion) {
    // Obtener la lista de evaluaciones del localStorage o inicializar un array vacío
    const evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];

    // Filtrar la lista para excluir la evaluación a eliminar
    const nuevaListaEvaluaciones = evaluaciones.filter(evaluacion => evaluacion.nombre !== nombreEvaluacion);

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('evaluaciones', JSON.stringify(nuevaListaEvaluaciones));

    // Recargar la lista de evaluaciones
    cargarEvaluaciones();
}

function limpiarFormularioEvaluacion() {
    // Limpiar los campos del formulario
    document.getElementById('nombreEvaluacion').value = '';
    document.getElementById('cursosAsociados').selectedIndex = -1;
    document.getElementById('temasAsociado').selectedIndex = -1;
    document.getElementById('descripcionEvaluacion').value = '';
    document.getElementById('fechaEvaluacion').value = '';
    document.getElementById('enlaceEvaluacion').value = '';
}
