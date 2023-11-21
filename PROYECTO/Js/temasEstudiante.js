document.addEventListener('DOMContentLoaded', function () {
    cargarTemasEstudiante();
});

function cargarTemasEstudiante() {
    // Obtener el parámetro cursoCodigo de la URL
    const params = new URLSearchParams(window.location.search);
    const cursoCodigo = params.get('cursoCodigo');

    // Obtener la sección donde se mostrarán los temas
    const misTemasDiv = document.getElementById('misTemas');

    // Obtener la lista de temas del localStorage o inicializar un array vacío
    const temas = obtenerTemas();

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
                misTemasDiv.appendChild(temaDiv);
            });
        } else {
            misTemasDiv.innerHTML = '<p>No hay temas asociados a este curso.</p>';
        }
    } else {
        misTemasDiv.innerHTML = '<p>No hay temas disponibles.</p>';
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

