document.addEventListener('DOMContentLoaded', function () {
    cargarVideosPorCursos();
});

function cargarVideosPorCursos() {
    // Obtener el parámetro cursoCodigo de la URL
    const params = new URLSearchParams(window.location.search);
    const cursoCodigo = params.get('cursoCodigo');

    // Obtener la sección donde se mostrarán los videos
    const misVideosDiv = document.getElementById('misVideos');

    // Obtener la lista de cursos del localStorage o inicializar un array vacío
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    // Limpiar el contenido actual de la sección
    misVideosDiv.innerHTML = '';

    // Buscar el curso por su código
    const cursoSeleccionado = cursos.find(curso => curso.codigo === cursoCodigo);

    // Verificar si se encontró el curso
    if (cursoSeleccionado) {
        const videosAsociados = cursoSeleccionado.videosAsociados;

        // Obtener la lista de videos del localStorage o inicializar un array vacío
        const videos = JSON.parse(localStorage.getItem('videos')) || [];

        // Filtrar videos que estén asociados al curso seleccionado
        const videosCurso = videos.filter(video => videosAsociados.includes(video.codigo));

        // Mostrar los videos en la sección
        if (videosCurso.length > 0) {
            videosCurso.forEach(video => {
                const videoDiv = document.createElement('div');
                videoDiv.innerHTML = `<p>${video.nombre}</p>`;
                misVideosDiv.appendChild(videoDiv);
            });
        } else {
            misVideosDiv.innerHTML = `<p>No hay videos asociados al curso ${cursoCodigo}.</p>`;
        }
    } else {
        misVideosDiv.innerHTML = `<p>No se encontró el curso con código ${cursoCodigo}.</p>`;
    }
}


function obtenerVideos() {
    // Implementación para obtener los videos, por ejemplo:
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    return videos;
}


function obtenerCursos() {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    return cursos;
}

function obtenerMatriculas() {
    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    return matriculas;
}

