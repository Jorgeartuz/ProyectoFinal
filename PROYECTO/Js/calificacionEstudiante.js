document.addEventListener('DOMContentLoaded', function() {
    mostrarCalificacionesDelEstudiante();
});

function mostrarCalificacionesDelEstudiante() {
    const loggedInUser = JSON.parse(localStorage.getItem('logged_in_user_data')) || {};

    if (!loggedInUser.id_number) {
        alert('No se encontró información del estudiante.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const estudiante = users.find(user => user.id_number === loggedInUser.id_number);

    if (estudiante && estudiante.calificaciones) {
        const tabla = document.getElementById('tablaCuerpo');
        tabla.innerHTML = '';

        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = estudiante.calificaciones.tema || '';
        fila.insertCell(1).textContent = estudiante.calificaciones.nota1 || '';
        fila.insertCell(2).textContent = estudiante.calificaciones.nota2 || '';
        fila.insertCell(3).textContent = estudiante.calificaciones.nota3 || '';
        fila.insertCell(4).textContent = estudiante.calificaciones.nota4 || '';
        
        actualizarProgreso(estudiante.calificaciones);

    } else {
        alert('No se encontraron calificaciones para el estudiante.');
    }
}

function actualizarProgreso(calificaciones) {
    const progressElement = document.getElementById('progresoEstudiante');

    // Verifica si todas las notas están calificadas
    const notasCalificadas = Object.values(calificaciones).filter(nota => nota !== '').length;

    // Calcula el porcentaje de notas calificadas
    const porcentajeProgreso = (notasCalificadas / 4) * 100;

    // Actualiza el valor del atributo "value" de la etiqueta <progress>
    progressElement.value = porcentajeProgreso;
}
