document.addEventListener('DOMContentLoaded', function () {
    cargarCursosEstudiante();

});

function cargarCursosEstudiante() {
    const misCursosDiv = document.getElementById('misCursos');

    const loggedInUser = JSON.parse(localStorage.getItem('logged_in_user_data')) || {};
    const matriculas = obtenerMatriculas();
    const temas = obtenerTemas();
    const cursos = obtenerCursos();
    const videos = obtenerVideos();

    const matriculasEstudiante = matriculas.filter(matricula => matricula.estudianteCodigo === loggedInUser.id_number);

    if (matriculasEstudiante.length > 0) {
        matriculasEstudiante.forEach(matricula => {
            const tema = temas.find(t => t.codigo === matricula.temaCodigo);

            if (tema && tema.cursosAsociados.length > 0) {
                tema.cursosAsociados.forEach(cursoCodigo => {
                    const curso = cursos.find(c => c.codigo === cursoCodigo);

                    if (curso) {
                        const cursoDiv = document.createElement('div');
                        cursoDiv.innerHTML = `<p>${curso.nombre}</p>`;
                        cursoDiv.addEventListener('click', () => redireccionarAMisCursos(cursoCodigo));
                        misCursosDiv.appendChild(cursoDiv);
                    }
                });
            }
        });
    } else {
        misCursosDiv.innerHTML = '<p>No hay cursos matriculados.</p>';
    }
}

function redireccionarAMisCursos(cursoCodigo) {
    // Aquí redirecciona a la página de misCursosEstudiante.html
    window.location.href = `../html/misCursosEstudiante.html?cursoCodigo=${cursoCodigo}`;
}

function obtenerMatriculas() {
    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    return matriculas;
}

function obtenerTemas() {
    const temas = JSON.parse(localStorage.getItem('temas')) || [];
    return temas;
}

function obtenerCursos() {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    return cursos;
}

function obtenerVideos() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    return videos;
}

function mostrarTemas(cursoCodigo) {
    // Guardar el código del curso seleccionado en el localStorage
    localStorage.setItem('curso_seleccionado', cursoCodigo);
}

function cargarTemasPorCurso(cursoCodigo) {
    const temasSection = document.getElementById('misTemas');
    const temasMatriculados = obtenerTemasMatriculadosPorCurso(cursoCodigo);

    temasSection.innerHTML = '';

    if (temasMatriculados.length > 0) {
        const ul = document.createElement('ul');

        temasMatriculados.forEach(tema => {
            const li = document.createElement('li');
            li.textContent = tema.nombre;
            ul.appendChild(li);
        });

        temasSection.appendChild(ul);
    } else {
        temasSection.innerHTML = '<p>No hay temas matriculados para este curso.</p>';
    }
}

function obtenerTemasMatriculadosPorCurso(cursoCodigo) {
    const matriculas = obtenerMatriculas();
    const temas = obtenerTemas();
    const temasMatriculados = [];

    matriculas.forEach(matricula => {
        if (matricula.cursoAsociado === cursoCodigo) {
            const tema = temas.find(t => t.codigo === matricula.temaCodigo);
            if (tema) {
                temasMatriculados.push(tema);
            }
        }
    });

    return temasMatriculados;
}