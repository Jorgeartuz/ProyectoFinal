// GestionCursos.js

document.addEventListener("DOMContentLoaded", function () {
    // Simulación de datos de cursos (puedes obtener estos datos desde tu servidor)
    let cursos = [
        { codigo: "C001", nombre: "Curso 1", descripcion: "Descripción del Curso 1" },
        { codigo: "C002", nombre: "Curso 2", descripcion: "Descripción del Curso 2" },
        // Agrega más cursos según sea necesario
    ];

    // Función para cargar la lista de cursos
    function cargarListaCursos() {
        const listaCursos = document.getElementById("listaCursos");

        // Limpiar la lista antes de volver a cargar
        listaCursos.innerHTML = "";

        cursos.forEach((curso) => {
            const fila = document.createElement("tr");

            // Crear celdas para cada propiedad del curso
            const codigoCell = document.createElement("td");
            codigoCell.textContent = curso.codigo;

            const nombreCell = document.createElement("td");
            nombreCell.textContent = curso.nombre;

            const descripcionCell = document.createElement("td");
            descripcionCell.textContent = curso.descripcion;

            const accionesCell = document.createElement("td");
            accionesCell.innerHTML = `
                <button onclick="editarCurso('${curso.codigo}')">Editar</button>
                <button onclick="eliminarCurso('${curso.codigo}')">Eliminar</button>
            `;

            // Agregar celdas a la fila
            fila.appendChild(codigoCell);
            fila.appendChild(nombreCell);
            fila.appendChild(descripcionCell);
            fila.appendChild(accionesCell);

            // Agregar fila a la tabla
            listaCursos.appendChild(fila);
        });
    }

    // Llamada inicial para cargar la lista de cursos
    cargarListaCursos();

    // Función para agregar un nuevo curso
    document.getElementById("agregarCursoForm").addEventListener("submit", function (event) {
        event.preventDefault();
        // Lógica para agregar un nuevo curso
        const nuevoCurso = {
            codigo: document.getElementById("codigoCurso").value,
            nombre: document.getElementById("nombreCurso").value,
            descripcion: document.getElementById("descripcionCurso").value,
        };

        cursos.push(nuevoCurso);

        // Limpiar los campos del formulario después de agregar
        document.getElementById("codigoCurso").value = "";
        document.getElementById("nombreCurso").value = "";
        document.getElementById("descripcionCurso").value = "";

        // Después de agregar, recargar la lista de cursos
        cargarListaCursos();
    });

    // Función para editar un curso
    window.editarCurso = function (codigoCurso) {
        // Buscar el curso por su código
        const cursoAEditar = cursos.find(curso => curso.codigo === codigoCurso);

        if (cursoAEditar) {
            // Rellenar el formulario de edición con los datos del curso
            document.getElementById("editarCodigoCurso").value = cursoAEditar.codigo;
            document.getElementById("editarNombreCurso").value = cursoAEditar.nombre;
            document.getElementById("editarDescripcionCurso").value = cursoAEditar.descripcion;

            // Mostrar el formulario de edición
            document.getElementById("editarCursoForm").style.display = "block";
        }
    };

    // Función para aplicar la edición de un curso
    document.getElementById("editarCursoForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Lógica para aplicar la edición de un curso
        const codigoCurso = document.getElementById("editarCodigoCurso").value;
        const nombreCurso = document.getElementById("editarNombreCurso").value;
        const descripcionCurso = document.getElementById("editarDescripcionCurso").value;

        const cursoEditado = {
            codigo: codigoCurso,
            nombre: nombreCurso,
            descripcion: descripcionCurso,
        };

        const indiceCurso = cursos.findIndex(curso => curso.codigo === codigoCurso);
        cursos[indiceCurso] = cursoEditado;

        // Ocultar el formulario de edición después de editar
        document.getElementById("editarCursoForm").style.display = "none";

        // Después de editar, recargar la lista de cursos
        cargarListaCursos();
    });

    // Función para eliminar un curso
    window.eliminarCurso = function (codigoCurso) {
        // Lógica para eliminar un curso
        cursos = cursos.filter(curso => curso.codigo !== codigoCurso);

        // Después de eliminar, recargar la lista de cursos
        cargarListaCursos();
    };
});
