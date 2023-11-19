document.addEventListener('DOMContentLoaded', function () {
    const formMatricula = document.getElementById('formMatricula');
    const temasDisponibles = document.getElementById('temasDisponibles');
    const estudiantesDisponibles = document.getElementById('estudiantesDisponibles');
    const listaMatriculas = document.getElementById('matriculas');
    const mensajeError = document.getElementById('mensajeError'); // Nuevo elemento para mensajes de error

    const temas = JSON.parse(localStorage.getItem('temas')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const estudiantes = users.filter(user => user.user_type === 'Student') || [];

    function cargarOpciones(elementoSelect, opciones) {
        elementoSelect.innerHTML = '';
        opciones.forEach((opcion) => {
            const option = document.createElement('option');
            option.value = opcion.codigo || opcion.id; 
            option.textContent = opcion.nombre || opcion.username; 
            elementoSelect.appendChild(option);
        });
    }

    cargarOpciones(temasDisponibles, temas);
    cargarOpciones(estudiantesDisponibles, estudiantes);

    function mostrarListaMatriculas() {
        const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
        
        // Selecciona o crea la tabla
        let tabla = document.getElementById('tablaMatriculas');
        if (!tabla) {
            tabla = document.createElement('table');
            tabla.id = 'tablaMatriculas';
            listaMatriculas.appendChild(tabla);
        }
    
        // Limpia el contenido anterior de la tabla
        tabla.innerHTML = '';
    
        // Crea encabezados de tabla
        const encabezados = ['Fecha', 'Tema', 'Estudiante', 'Valor'];
        const encabezadosRow = document.createElement('tr');
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            encabezadosRow.appendChild(th);
        });
        tabla.appendChild(encabezadosRow);
    
        // Agrega filas de datos a la tabla
        matriculas.forEach((matricula) => {
            const fila = document.createElement('tr');
            const temaNombre = temas.find(tema => tema.codigo === matricula.temaId)?.nombre || 'Tema no encontrado';
            const estudianteNombre = estudiantes.find(estudiante => estudiante.codigo === matricula.estudianteId)?.nombre || 'Estudiante no encontrado';
    
            // Crea celdas de datos
            const celdaFecha = document.createElement('td');
            celdaFecha.textContent = matricula.fecha;
            fila.appendChild(celdaFecha);
    
            const celdaTema = document.createElement('td');
            celdaTema.textContent = temaNombre;
            fila.appendChild(celdaTema);
    
            const celdaEstudiante = document.createElement('td');
            celdaEstudiante.textContent = estudianteNombre;
            fila.appendChild(celdaEstudiante);
    
            const celdaValor = document.createElement('td');
            celdaValor.textContent = matricula.valor;
            fila.appendChild(celdaValor);
    
            // Agrega la fila a la tabla
            tabla.appendChild(fila);
        });
    }
    

    function realizarMatricula() {
        const fechaMatricula = document.getElementById('fechaMatricula').value;
        const temaSeleccionadoCodigo = temasDisponibles.options[temasDisponibles.selectedIndex].value;
    
        const temaSeleccionado = temas.find((tema) => tema.codigo == temaSeleccionadoCodigo);
    
        // Mueve esta línea hacia arriba para declarar estudianteSeleccionadoCodigo antes de usarla
        const estudianteSeleccionadoCodigo = estudiantesDisponibles.options[estudiantesDisponibles.selectedIndex].value;
    
        console.log('Iniciando función realizarMatricula');
        console.log('Fecha de Matrícula:', fechaMatricula);
        console.log('Tema seleccionado:', temaSeleccionado);
        console.log('Estudiante seleccionado:', estudiantes);

        const estudianteSeleccionado = users.find((user) => user.codigo == estudianteSeleccionadoCodigo);

        // Mostrar mensaje de error en lugar de alert
        if (!temaSeleccionado || !estudianteSeleccionado) {
            mensajeError.textContent = 'Por favor, selecciona un tema y un estudiante.';
            return;
        } else {
            mensajeError.textContent = ''; // Limpiar el mensaje de error si no hay errores
        }

        const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
        const nuevaMatricula = {
            id: matriculas.length + 1, 
            fecha: fechaMatricula,
            temaId: temaSeleccionado.codigo,
            estudianteId: estudianteSeleccionado.codigo,
            valor: parseFloat(document.getElementById('valorMatricula').value),
        };

        matriculas.push(nuevaMatricula);

        localStorage.setItem('matriculas', JSON.stringify(matriculas));

        mostrarListaMatriculas();

        formMatricula.reset();
    }

    formMatricula.addEventListener('submit', function (event) {
        event.preventDefault();
        realizarMatricula();
    });

    mostrarListaMatriculas();
});
