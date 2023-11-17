
let cursosAsignados = [];  // Inicialmente vacío

function mostrarCursos() {
    const misCursosSection = document.getElementById('misCursos');

    if (!misCursosSection) {
        console.error('El elemento con id "misCursos" no fue encontrado en el DOM.');
        return;
    }

    misCursosSection.innerHTML = '';

    const idInstructor = obtenerIdInstructor();


    if (!cursosAsignados[idInstructor] || cursosAsignados[idInstructor].length === 0) {
        misCursosSection.innerHTML = '<p>No tienes cursos asignados actualmente.</p>';
        return;
    }

    const listaCursos = document.createElement('ul');

    cursosAsignados[idInstructor].forEach(curso => {
        const itemCurso = document.createElement('li');
        itemCurso.innerHTML = `
            <h3>${curso.nombre}</h3>
            <!-- Puedes agregar más información del curso si es necesario -->
        `;
        listaCursos.appendChild(itemCurso);
    });

    misCursosSection.appendChild(listaCursos);
}

function obtenerIdInstructor() {
    // Puedes obtener esta información de alguna manera en tu aplicación
    // Por ejemplo, podrías obtener el ID del instructor desde el sistema de inicio de sesión
    // Aquí solo se simula retornando un valor fijo, deberás ajustarlo según tu lógica real
    return 'idInstructor1';  // Reemplaza esto con tu lógica real
}


function actualizarCursos(nuevosCursos) {
    const idInstructor = obtenerIdInstructor();
    cursosAsignados[idInstructor] = nuevosCursos;
    mostrarCursos();  // Vuelve a mostrar los cursos con la información actualizada
}

function obtenerCursosDesdePanelAdmin() {
    const nuevosCursos = [
        { nombre: 'Nuevo Curso 1', id: 'nuevo-curso-1' },
        { nombre: 'Nuevo Curso 2', id: 'nuevo-curso-2' },
        // Agrega más cursos según sea necesario
    ];

    // Luego puedes llamar a esta función cuando sea necesario, por ejemplo, al cargar la página
    actualizarCursos(nuevosCursos);
}
obtenerCursosDesdePanelAdmin();