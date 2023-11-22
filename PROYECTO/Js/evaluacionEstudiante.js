document.addEventListener('DOMContentLoaded', function() {
    mostrarEvaluacionesDelEstudiante();
});

function mostrarEvaluacionesDelEstudiante() {
    const loggedInUser = JSON.parse(localStorage.getItem('logged_in_user_data')) || {};
    const evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];
    const tabla = document.getElementById('tablaEvaluaciones').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';

    evaluaciones.forEach(evaluacion => {
        // Verificar si el estudiante actual está matriculado en el tema de la evaluación
        if (evaluacion.usuariosMatriculados && evaluacion.usuariosMatriculados.includes(loggedInUser.id_number)) {
            const fila = tabla.insertRow();
            fila.insertCell(0).textContent = evaluacion.nombre;
            fila.insertCell(1).textContent = evaluacion.fecha;
            fila.insertCell(2).innerHTML = `<a href="${evaluacion.enlace}">Acceder</a>`;
        }
    });
}
