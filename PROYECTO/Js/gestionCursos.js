document.addEventListener('DOMContentLoaded', function () {
    cargarCursos();
    cargarVideosEnSelect();
});

function cargarCursos() {
    // Obtener la sección donde se mostrará la lista de cursos
    const cursosSection = document.getElementById('cursos');

    // Obtener la lista de cursos del localStorage o inicializar un array vacío
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    // Limpiar el contenido actual de la sección
    cursosSection.innerHTML = '';

    // Verificar si hay cursos para mostrar
    if (cursos.length > 0) {
        // Crear una tabla para mostrar la lista de cursos
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Videos Asociados</th>
                <th>Acciones</th>
            </tr>
        `;

        // Agregar cada curso a la tabla
        cursos.forEach(curso => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${curso.codigo}</td>
                <td>${curso.nombre}</td>
                <td>${curso.videosAsociados.join(', ')}</td>
                <td>
                    <button onclick="eliminarCurso('${curso.codigo}')">Eliminar</button>
                </td>
            `;
            table.appendChild(row);
        });

        // Agregar la tabla a la sección de cursos
        cursosSection.appendChild(table);
    } else {
        // Mostrar un mensaje si no hay cursos
        cursosSection.innerHTML = '<p>No hay cursos disponibles.</p>';
    }
}

function cargarVideosEnSelect() {
    // Obtener el select de videos
    const selectVideos = document.getElementById('videosCurso');

    // Obtener la lista de videos del localStorage o inicializar un array vacío
    const videos = JSON.parse(localStorage.getItem('videos')) || [];

    // Limpiar el contenido actual del select
    selectVideos.innerHTML = '';

    // Verificar si hay videos para mostrar
    if (videos.length > 0) {
        // Agregar opciones al select por cada video
        videos.forEach(video => {
            const option = document.createElement('option');
            option.value = video.codigo;
            option.textContent = `${video.nombre} (${video.codigo})`;
            selectVideos.appendChild(option);
        });
    } else {
        // Mostrar un mensaje si no hay videos
        selectVideos.innerHTML = '<option value="" disabled>No hay videos disponibles.</option>';
    }
}

function agregarCurso() {
    // Obtener los valores del formulario
    const codigo = document.getElementById('codigoCurso').value;
    const nombre = document.getElementById('nombreCurso').value;
    const videosAsociados = obtenerVideosAsociados();

    // Obtener la lista de cursos del localStorage o inicializar un array vacío
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    // Verificar si ya existe un curso con el mismo código
    const existeCurso = cursos.some(curso => curso.codigo === codigo);

    if (existeCurso) {
        alert('Ya existe un curso con ese código.');
    } else {
        // Agregar el nuevo curso a la lista
        cursos.push({
            codigo,
            nombre,
            videosAsociados
        });

        // Guardar la lista actualizada en el localStorage
        localStorage.setItem('cursos', JSON.stringify(cursos));

        // Recargar la lista de cursos
        cargarCursos();

        // Limpiar los campos del formulario
        limpiarFormularioCurso();
    }
}

function obtenerVideosAsociados() {
    // Obtener el select de videos
    const selectVideos = document.getElementById('videosCurso');

    // Obtener los códigos de videos seleccionados
    const selectedOptions = Array.from(selectVideos.selectedOptions);
    const videosAsociados = selectedOptions.map(option => option.value);

    return videosAsociados;
}

function eliminarCurso(codigo) {
    // Obtener la lista de cursos del localStorage o inicializar un array vacío
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    // Filtrar la lista para excluir el curso a eliminar
    const nuevaListaCursos = cursos.filter(curso => curso.codigo !== codigo);

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('cursos', JSON.stringify(nuevaListaCursos));

    // Recargar la lista de cursos
    cargarCursos();
}

function limpiarFormularioCurso() {
    // Limpiar los campos del formulario
    document.getElementById('codigoCurso').value = '';
    document.getElementById('nombreCurso').value = '';
    document.getElementById('videosCurso').selectedIndex = -1;
}
