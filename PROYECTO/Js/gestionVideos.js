document.addEventListener('DOMContentLoaded', function () {
    cargarVideos();
});

function cargarVideos() {
    // Obtener la sección donde se mostrará la lista de videos
    const videosSection = document.getElementById('videos');

    // Obtener la lista de videos del localStorage o inicializar un array vacío
    const videos = JSON.parse(localStorage.getItem('videos')) || [];

    // Limpiar el contenido actual de la sección
    videosSection.innerHTML = '';

    // Verificar si hay videos para mostrar
    if (videos.length > 0) {
        // Crear una tabla para mostrar la lista de videos
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>URL</th>
                <th>Acciones</th>
            </tr>
        `;

        // Agregar cada video a la tabla
        videos.forEach(video => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${video.codigo}</td>
                <td>${video.nombre}</td>
                <td>${video.url}</td>
                <td>
                    <button onclick="eliminarVideo('${video.codigo}')">Eliminar</button>
                </td>
            `;
            table.appendChild(row);
        });

        // Agregar la tabla a la sección de videos
        videosSection.appendChild(table);
    } else {
        // Mostrar un mensaje si no hay videos
        videosSection.innerHTML = '<p>No hay videos disponibles.</p>';
    }
}

function agregarVideo() {
    // Obtener los valores del formulario
    const codigo = document.getElementById('codigoVideo').value;
    const nombre = document.getElementById('nombreVideo').value;
    const url = document.getElementById('urlVideo').value;
    const idiomaOriginal = document.getElementById('idiomaOriginal').value;
    const idiomasDisponibles = document.getElementById('idiomasDisponibles').value;
    const subtitulosDisponibles = document.getElementById('subtitulosDisponibles').value;
    const duracion = document.getElementById('duracionVideo').value;

    // Obtener la lista de videos del localStorage o inicializar un array vacío
    const videos = JSON.parse(localStorage.getItem('videos')) || [];

    // Verificar si ya existe un video con el mismo código
    const existeVideo = videos.some(video => video.codigo === codigo);

    if (existeVideo) {
        alert('Ya existe un video con ese código.');
    } else {
        // Agregar el nuevo video a la lista
        videos.push({
            codigo,
            nombre,
            url,
            idiomaOriginal,
            idiomasDisponibles,
            subtitulosDisponibles,
            duracion
        });

        // Guardar la lista actualizada en el localStorage
        localStorage.setItem('videos', JSON.stringify(videos));

        // Recargar la lista de videos
        cargarVideos();

        // Limpiar los campos del formulario
        limpiarFormulario();
    }
}

function eliminarVideo(codigo) {
    // Obtener la lista de videos del localStorage o inicializar un array vacío
    const videos = JSON.parse(localStorage.getItem('videos')) || [];

    // Filtrar la lista para excluir el video a eliminar
    const nuevaListaVideos = videos.filter(video => video.codigo !== codigo);

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('videos', JSON.stringify(nuevaListaVideos));

    // Recargar la lista de videos
    cargarVideos();
}

function limpiarFormulario() {
    // Limpiar los campos del formulario
    document.getElementById('codigoVideo').value = '';
    document.getElementById('nombreVideo').value = '';
    document.getElementById('urlVideo').value = '';
    document.getElementById('idiomaOriginal').value = '';
    document.getElementById('idiomasDisponibles').value = '';
    document.getElementById('subtitulosDisponibles').value = '';
    document.getElementById('duracionVideo').value = '';
}
