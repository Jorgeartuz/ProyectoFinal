document.addEventListener('DOMContentLoaded', function () {
    cargarTemasEnSelect();
    cargarEvaluaciones();
});

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
    const temaAsociado = document.getElementById('temasAsociado').value;
    const descripcion = document.getElementById('descripcionEvaluacion').value;
    const fecha = document.getElementById('fechaEvaluacion').value;
    const enlace = document.getElementById('enlaceEvaluacion').value;

    // Obtener la lista de estudiantes matriculados en el tema del localStorage o inicializar un array vacío
    const estudiantesMatriculados = obtenerEstudiantesMatriculadosEnTema(temaAsociado);


    // Obtener la lista de evaluaciones del localStorage o inicializar un array vacío
    const evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];

    // Agregar la nueva evaluación a la lista
    evaluaciones.push({
        nombre,
        temaAsociado,
        descripcion,
        fecha,
        enlace,
        usuariosMatriculados: estudiantesMatriculados // Incluir la lista de estudiantes matriculados
    });

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));

    // Limpiar los campos del formulario
    limpiarFormularioEvaluacion();

    // Puedes redirigir a otra página o realizar alguna acción adicional si es necesario
    // window.location.href = 'nuevaPagina.html';
}

function obtenerEstudiantesMatriculadosEnTema(temaCodigo) {
    // Lógica para obtener estudiantes matriculados en el tema especificado
    // Puedes obtener esta información desde el localStorage u otra fuente de datos
    // y devolver un array de códigos de estudiantes matriculados.
    // Ejemplo:
    const matriculas = obtenerMatriculas();
    const estudiantesMatriculados = matriculas
        .filter(matricula => matricula.temaCodigo === temaCodigo)
        .map(matricula => matricula.estudianteCodigo);
    return estudiantesMatriculados;
}

function obtenerMatriculas() {
    // Lógica para obtener las matrículas desde el localStorage u otra fuente de datos
    // Devuelve un array de matrículas.
    // Ejemplo:
    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    return matriculas;
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
    document.getElementById('temasAsociado').selectedIndex = -1;
    document.getElementById('descripcionEvaluacion').value = '';
    document.getElementById('fechaEvaluacion').value = '';
    document.getElementById('enlaceEvaluacion').value = '';
}
