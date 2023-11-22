document.addEventListener('DOMContentLoaded', function () {
    cargarEstudiantesEnSelect();
    cargarTemasEnSelect();
    cargarCalificacionesTabla();
});

function cargarEstudiantesEnSelect() {
    const selectEstudiantes = document.getElementById('estudiantesDisponibles');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    selectEstudiantes.innerHTML = '';

    if (users.length > 0) {
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id_number;
            option.textContent = `${user.first_name} ${user.last_name} (${user.id_number})`;
            selectEstudiantes.appendChild(option);
        });
    } else {
        selectEstudiantes.innerHTML = '<option value="" disabled>No hay estudiantes disponibles.</option>';
    }
}

function cargarTemasEnSelect() {
    const selectTemas = document.getElementById('temasDisponibles');
    const temas = JSON.parse(localStorage.getItem('temas')) || [];
    selectTemas.innerHTML = '';

    if (temas.length > 0) {
        temas.forEach(tema => {
            const option = document.createElement('option');
            option.value = tema.codigo;
            option.textContent = `${tema.nombre} (${tema.codigo})`;
            selectTemas.appendChild(option);
        });
    } else {
        selectTemas.innerHTML = '<option value="" disabled>No hay temas disponibles.</option>';
    }
}

function enviarCalificacion() {
    const estudianteId = document.getElementById('estudiantesDisponibles').value;
    const temaCodigo = document.getElementById('temasDisponibles').value;

    const nota1 = document.getElementById('nota1').value;
    const nota2 = document.getElementById('nota2').value;
    const nota3 = document.getElementById('nota3').value;
    const nota4 = document.getElementById('nota4').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const estudiante = users.find(user => user.id_number === estudianteId);
    
    if (estudiante) {
        estudiante.calificaciones = { tema: temaCodigo, nota1: nota1, nota2: nota2, nota3: nota3, nota4: nota4 };
        localStorage.setItem('users', JSON.stringify(users));
        alert('Calificaciones enviadas correctamente.');
        cargarCalificacionesTabla(); // Actualizar la tabla después de enviar calificaciones
    } else {
        alert('Estudiante no encontrado.');
    }
}

function cargarCalificacionesTabla() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tabla = document.getElementById('tablaCalificaciones').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';

    users.forEach((user, index) => {
        if (user.calificaciones) {
            const fila = tabla.insertRow();
            fila.insertCell(0).textContent = user.calificaciones.tema || '';
            fila.insertCell(1).textContent = user.id_number;
            fila.insertCell(2).textContent = user.calificaciones.nota1 || '';
            fila.insertCell(3).textContent = user.calificaciones.nota2 || '';
            fila.insertCell(4).textContent = user.calificaciones.nota3 || '';
            fila.insertCell(5).textContent = user.calificaciones.nota4 || '';
            const btnEliminar = fila.insertCell(6);
            btnEliminar.innerHTML = `<button onclick="eliminarCalificacion(${index})">Eliminar</button>`;
        }
    });
}

function eliminarCalificacion(indiceUsuario) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users[indiceUsuario] && users[indiceUsuario].calificaciones) {
        delete users[indiceUsuario].calificaciones;
        localStorage.setItem('users', JSON.stringify(users));
        cargarCalificacionesTabla();
    }
}
