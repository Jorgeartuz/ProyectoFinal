document.addEventListener('DOMContentLoaded', function () {
    cargarVideosPorCursos();
});

function cargarVideosPorCursos() {
    const params = new URLSearchParams(window.location.search);
    const cursoCodigo = params.get('cursoCodigo');
    const misVideosDiv = document.getElementById('misVideos');
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    misVideosDiv.innerHTML = '';

    const cursoSeleccionado = cursos.find(curso => curso.codigo === cursoCodigo);

    if (cursoSeleccionado) {
        const videosAsociados = cursoSeleccionado.videosAsociados || [];
        const videos = JSON.parse(localStorage.getItem('videos')) || [];
        const videosCurso = videos.filter(video => videosAsociados.includes(video.codigo));

        if (videosCurso.length > 0) {
            videosCurso.forEach(video => {
                const videoDiv = document.createElement('div');
                videoDiv.classList.add("video-container"); // Clase para estilizar si es necesario
                videoDiv.innerHTML = `
                    <h3>${video.nombre}</h3>
                    <iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>
                `;
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

