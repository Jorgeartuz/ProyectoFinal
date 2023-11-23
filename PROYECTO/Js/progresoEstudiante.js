document.addEventListener('DOMContentLoaded', function () {
    cargarDatosEstudiante();
});

function cargarDatosEstudiante() {
    const loggedInUser = JSON.parse(localStorage.getItem('logged_in_user_data')) || {};
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const estudiante = users.find(user => user.id_number === loggedInUser.id_number);

    if (estudiante) {
        // Llenar los campos con la información del estudiante
        document.getElementById('cedula').value = estudiante.id_number || '';
        document.getElementById('nombre').value = `${estudiante.first_name} ${estudiante.last_name}` || '';
        document.getElementById('email').value = estudiante.email || '';
  
        // Llenar la tabla de progreso académico con la información del estudiante
        const tablaProgreso = document.getElementById('generarTabla');
        if (estudiante.temasMatriculados && estudiante.temasMatriculados.length > 0) {
            estudiante.temasMatriculados.forEach(temaMatriculado => {
                const fila = document.createElement('tr');
                fila.innerHTML = `<td>${temaMatriculado.nombre || ''}</td><td>${temaMatriculado.profesor || ''}</td><td>${temaMatriculado.nota || ''}</td>`;
                tablaProgreso.appendChild(fila);
            });
        } else {
            // Mostrar un mensaje si no hay temas matriculados
            const fila = document.createElement('tr');
            fila.innerHTML = '<td colspan="3">No hay temas matriculados.</td>';
            tablaProgreso.appendChild(fila);
        }
    } else {
        console.error('Estudiante no encontrado.');
    }
}
