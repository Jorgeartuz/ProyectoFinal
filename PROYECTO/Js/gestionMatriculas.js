document.addEventListener('DOMContentLoaded', function () {
    cargarTemasEnSelect();
    cargarEstudiantesEnSelect();
    cargarMatriculas();
});

function cargarTemasEnSelect() {
    // Obtener el select de temas disponibles
    const selectTemas = document.getElementById('temasDisponibles');

    // Obtener la lista de temas del localStorage o inicializar un array vacío
    const temas = JSON.parse(localStorage.getItem('temas')) || [];

    // Limpiar el contenido actual del select
    selectTemas.innerHTML = '';

    // Verificar si hay temas para mostrar
    if (temas.length > 0) {
        // Agregar opciones al select por cada tema
        temas.forEach(tema => {
            const option = document.createElement('option');
            option.value = tema.codigo;
            option.textContent = `${tema.nombre} (${tema.codigo})`;
            selectTemas.appendChild(option);
        });
    } else {
        // Mostrar un mensaje si no hay temas
        selectTemas.innerHTML = '<option value="" disabled>No hay temas disponibles.</option>';
    }
}

function cargarEstudiantesEnSelect() {
    // Obtener el select de estudiantes disponibles
    const selectEstudiantes = document.getElementById('estudiantesDisponibles');

    // Obtener la lista de estudiantes del localStorage o inicializar un array vacío
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Limpiar el contenido actual del select
    selectEstudiantes.innerHTML = '';

    // Verificar si hay estudiantes para mostrar
    if (users.length > 0) {
        // Agregar opciones al select por cada estudiante
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id_number; // Puedes cambiar a user.email u otra propiedad única
            option.textContent = `${user.first_name} ${user.last_name} (${user.id_number})`;
            selectEstudiantes.appendChild(option);
        });
    } else {
        // Mostrar un mensaje si no hay estudiantes
        selectEstudiantes.innerHTML = '<option value="" disabled>No hay estudiantes disponibles.</option>';
    }
}

function cargarMatriculas() {
    // Obtener la sección donde se mostrará la lista de matrículas
    const matriculasSection = document.getElementById('matriculas');

    // Obtener la lista de matrículas del localStorage o inicializar un array vacío
    const matriculas = obtenerMatriculas();

    // Limpiar el contenido actual de la sección
    matriculasSection.innerHTML = '';

    // Verificar si hay matrículas para mostrar
    if (matriculas.length > 0) {
        // Crear una tabla para mostrar la lista de matrículas
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Fecha de Matrícula</th>
                <th>Tema</th>
                <th>Estudiante</th>
                <th>Valor de Matrícula</th>
            </tr>
        `;

        // Agregar cada matrícula a la tabla
        matriculas.forEach(matricula => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${matricula.fechaMatricula}</td>
                <td>${obtenerNombreTemaPorCodigo(matricula.temaCodigo)}</td>
                <td>${obtenerNombreEstudiantePorCodigo(matricula.estudianteCodigo)}</td>
                <td>${matricula.valorMatricula}</td>
            `;
            table.appendChild(row);
        });

        // Agregar la tabla a la sección de matrículas
        matriculasSection.appendChild(table);
    } else {
        // Mostrar un mensaje si no hay matrículas
        matriculasSection.innerHTML = '<p>No hay matrículas registradas.</p>';
    }
}

function realizarMatricula() {
    // Obtener los valores del formulario
    const fechaMatricula = document.getElementById('fechaMatricula').value;
    const temaCodigo = document.getElementById('temasDisponibles').value;
    const estudianteCodigo = document.getElementById('estudiantesDisponibles').value;
    const valorMatricula = document.getElementById('valorMatricula').value;

    // Verificar si todos los campos obligatorios están llenos
    if (!fechaMatricula || !temaCodigo || !estudianteCodigo || !valorMatricula) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Obtener la lista de matrículas del localStorage o inicializar un array vacío
    const matriculas = obtenerMatriculas();
    const temas = obtenerTemas();

    const tema = temas.find(t => t.codigo === temaCodigo);

    if (!tema || !tema.cursosAsociados.length) {
        alert('No se pudo encontrar el tema o el tema no tiene cursos asociados.');
        return;
    }

    const cursoAsociado = tema.cursosAsociados[0];

    // Agregar la nueva matrícula a la lista
    matriculas.push({
        fechaMatricula,
        temaCodigo,
        estudianteCodigo,
        valorMatricula,
        cursoAsociado
    });

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('matriculas', JSON.stringify(matriculas));

    // Recargar la lista de matrículas
    cargarMatriculas();

    // Limpiar los campos del formulario
    limpiarFormularioMatricula();
}

function obtenerMatriculas() {
    const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
    return matriculas;
}

function obtenerEstudiantes() {
    // Implementación para obtener los estudiantes, por ejemplo:
    const estudiantes = JSON.parse(localStorage.getItem('users')) || [];
    return estudiantes;
}

function obtenerTemas() {
    // Implementación para obtener los temas, por ejemplo:
    const temas = JSON.parse(localStorage.getItem('temas')) || [];
    return temas;
}


function obtenerNombreTemaPorCodigo(codigo) {
    const temas = obtenerTemas();
    const tema = temas.find(t => t.codigo === codigo);
    return tema ? tema.nombre : 'Desconocido';
}

function obtenerNombreEstudiantePorCodigo(codigo) {
    const users = obtenerEstudiantes();
    const user = users.find(e => e.id_number === codigo);
    return user ? `${user.first_name} ${user.last_name}` : 'Desconocido';
}

function limpiarFormularioMatricula() {
    // Limpiar los campos del formulario
    document.getElementById('fechaMatricula').value = '';
    document.getElementById('temasDisponibles').selectedIndex = -1;
    document.getElementById('estudiantesDisponibles').selectedIndex = -1;
    document.getElementById('valorMatricula').value = '';
}

