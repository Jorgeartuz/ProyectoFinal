document.addEventListener('DOMContentLoaded', function () {
    // Verificar si el navegador soporta localStorage
    if (typeof Storage === 'undefined') {
        alert('Lo siento, tu navegador no admite el almacenamiento local.');
        return;
    }

    // Obtener elementos del formulario
    const formMatricula = document.getElementById('formMatricula');
    const temasDisponibles = document.getElementById('temasDisponibles');
    const estudiantesDisponibles = document.getElementById('estudiantesDisponibles');
    const listaMatriculas = document.getElementById('matriculas');

    // Cargar opciones de temas y estudiantes desde el localStorage (asume que ya los tienes almacenados)
    const temas = JSON.parse(localStorage.getItem('temas')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Obtener solo los usuarios de tipo 'Student' para cargar en el select de estudiantes
    const estudiantes = users.filter(user => user.user_type === 'Student') || [];

    // Función para cargar opciones en un elemento select
    function cargarOpciones(elementoSelect, opciones) {
        elementoSelect.innerHTML = '';
        opciones.forEach((opcion) => {
            const option = document.createElement('option');
            option.value = opcion.codigo || opcion.id; // Ajusta esto según la estructura de tus objetos
            option.textContent = opcion.nombre || opcion.username; // Usar el campo apropiado para temas
            elementoSelect.appendChild(option);
        });
    }

    // Cargar opciones de temas y estudiantes en los elementos select
    cargarOpciones(temasDisponibles, temas);
    cargarOpciones(estudiantesDisponibles, estudiantes);

    // Función para mostrar la lista de matrículas
    function mostrarListaMatriculas() {
        const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
        listaMatriculas.innerHTML = '';
        matriculas.forEach((matricula) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<p>Fecha: ${matricula.fecha}, Tema: ${matricula.temaId}, Estudiante: ${matricula.estudianteId}, Valor: ${matricula.valor}</p>`;
            listaMatriculas.appendChild(listItem);
        });
    }

    // Función para realizar una nueva matrícula
    function realizarMatricula() {
        // Obtener los datos necesarios del formulario de matrícula
        const fechaMatricula = document.getElementById('fechaMatricula').value;
        const temaSeleccionado = temas.find((tema) => tema.codigo == temasDisponibles.value);
        const estudianteSeleccionado = estudiantes.find((user) => user.codigo == estudiantesDisponibles.value);
        const valorMatricula = document.getElementById('valorMatricula').value;

        // Imprimir los valores seleccionados en la consola para depuración
        console.log('Tema Seleccionado:', temaSeleccionado);
        console.log('Estudiante Seleccionado:', estudianteSeleccionado);

        // Validar que se haya seleccionado un tema y un estudiante
        if (!temaSeleccionado || !estudianteSeleccionado) {
            alert('Por favor, selecciona un tema y un estudiante.');
            return;
        }

        // Realizar la matrícula (agregarla al objeto de matrículas)
        const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
        const nuevaMatricula = {
            id: matriculas.length + 1, // Generar un nuevo ID (ajusta esto según tu lógica)
            fecha: fechaMatricula,
            temaId: temaSeleccionado.codigo,
            estudianteId: estudianteSeleccionado.codigo,
            valor: parseFloat(valorMatricula),
        };

        matriculas.push(nuevaMatricula);

        // Guardar el objeto actualizado en el localStorage
        localStorage.setItem('matriculas', JSON.stringify(matriculas));

        // Mostrar la lista actualizada de matrículas
        mostrarListaMatriculas();

        // Limpiar el formulario después de realizar la matrícula
        formMatricula.reset();
    }

    // Asociar la función de realizarMatricula al evento de envío del formulario
    formMatricula.addEventListener('submit', function (event) {
        event.preventDefault();
        realizarMatricula();
    });

    // Mostrar la lista inicial de matrículas al cargar la página
    mostrarListaMatriculas();
});
