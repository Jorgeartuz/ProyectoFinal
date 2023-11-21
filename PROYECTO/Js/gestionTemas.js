document.addEventListener('DOMContentLoaded', function () {
    cargarTemas();
    cargarCursosEnSelect();
});

function cargarTemas() {
    // Obtener la sección donde se mostrará la lista de temas
    const temasSection = document.getElementById('temas');

    // Obtener la lista de temas del localStorage o inicializar un array vacío
    const temas = JSON.parse(localStorage.getItem('temas')) || [];

    // Limpiar el contenido actual de la sección
    temasSection.innerHTML = '';

    // Verificar si hay temas para mostrar
    if (temas.length > 0) {
        // Crear una tabla para mostrar la lista de temas
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Cursos Asociados</th>
                <th>Costo</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>
        `;

        // Agregar cada tema a la tabla
        temas.forEach(tema => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tema.codigo}</td>
                <td>${tema.nombre}</td>
                <td>${tema.descripcion}</td>
                <td>${tema.cursosAsociados.join(', ')}</td>
                <td>${tema.costo}</td>
                <td>${tema.precio}</td>
                <td>
                    <button onclick="eliminarTema('${tema.codigo}')">Eliminar</button>
                </td>
            `;
            table.appendChild(row);
        });

        // Agregar la tabla a la sección de temas
        temasSection.appendChild(table);
    } else {
        // Mostrar un mensaje si no hay temas
        temasSection.innerHTML = '<p>No hay temas disponibles.</p>';
    }
}

function cargarCursosEnSelect() {
    // Obtener el select de cursos asociados
    const selectCursos = document.getElementById('cursosAsociados');

    // Obtener la lista de cursos del localStorage o inicializar un array vacío
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    // Limpiar el contenido actual del select
    selectCursos.innerHTML = '';

    // Verificar si hay cursos para mostrar
    if (cursos.length > 0) {
        // Agregar opciones al select por cada curso
        cursos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.codigo;
            option.textContent = `${curso.nombre} (${curso.codigo})`;
            selectCursos.appendChild(option);
        });
    } else {
        // Mostrar un mensaje si no hay cursos
        selectCursos.innerHTML = '<option value="" disabled>No hay cursos disponibles.</option>';
    }
}

function agregarTema() {
    // Obtener los valores del formulario
    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const cursosAsociados = obtenerCursosAsociados();
    const costo = document.getElementById('costo').value;
    const precio = document.getElementById('precio').value;

    // Obtener la lista de temas del localStorage o inicializar un array vacío
    const temas = JSON.parse(localStorage.getItem('temas')) || [];

    // Verificar si ya existe un tema con el mismo código
    const existeTema = temas.some(tema => tema.codigo === codigo);

    if (existeTema) {
        alert('Ya existe un tema con ese código.');
    } else {
        // Agregar el nuevo tema a la lista
        const cursosAsociados = obtenerCursosAsociados();
        temas.push({
            codigo,
            nombre,
            descripcion,
            cursosAsociados,
            costo,
            precio
        });

        // Guardar la lista actualizada en el localStorage
        localStorage.setItem('temas', JSON.stringify(temas));

        // Recargar la lista de temas
        cargarTemas();

        // Limpiar los campos del formulario
        limpiarFormularioTema();
    }
    
}

function obtenerCursosAsociados() {
    const selectCursos = document.getElementById('cursosAsociados');
    const cursosAsociados = Array.from(selectCursos.selectedOptions).map(option => option.value);
    return cursosAsociados;
}

function eliminarTema(codigo) {
    // Obtener la lista de temas del localStorage o inicializar un array vacío
    const temas = JSON.parse(localStorage.getItem('temas')) || [];

    // Filtrar la lista para excluir el tema a eliminar
    const nuevaListaTemas = temas.filter(tema => tema.codigo !== codigo);

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('temas', JSON.stringify(nuevaListaTemas));

    // Recargar la lista de temas
    cargarTemas();
}

function obtenerTemas() {
    const temas = JSON.parse(localStorage.getItem('temas')) || [];
    return temas;
}

function limpiarFormularioTema() {
    // Limpiar los campos del formulario
    document.getElementById('codigo').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('cursosAsociados').selectedIndex = -1;
    document.getElementById('costo').value = '';
    document.getElementById('precio').value = '';
}
