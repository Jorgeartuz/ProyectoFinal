let matriculas = [];
let temasDisponibles = []; 
let estudiantesDisponibles = []; 



function realizarMatricula() {
    
    var fechaMatricula = document.getElementById('fechaMatricula').value;
    var temaSeleccionado = document.getElementById('temasDisponibles').value;
    var estudianteSeleccionado = document.getElementById('estudiantesDisponibles').value;
    var valorMatricula = document.getElementById('valorMatricula').value;

    var tablaMatriculas = document.getElementById('tablaMatriculas');
    var newRow = tablaMatriculas.insertRow();

    
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);


    cell2.innerHTML = fechaMatricula;
    cell3.innerHTML = temaSeleccionado;
    cell4.innerHTML = estudianteSeleccionado;
    cell5.innerHTML = valorMatricula;

    document.getElementById('formMatricula').reset();
}



function mostrarMatriculas() {
    const matriculasSection = document.getElementById('matriculas');
    matriculasSection.innerHTML = ''; 

    matriculas.forEach(matricula => {
        const matriculaDiv = document.createElement('div');
        matriculaDiv.innerHTML = `<h3>Matrícula realizada por ${matricula.estudiante} en el tema ${matricula.tema}</h3>
                             <p><strong>Fecha de Matrícula:</strong> ${matricula.fecha}</p>
                             <p><strong>Valor de Matrícula:</strong> ${matricula.valor}</p>
                             <hr>`;
        matriculasSection.appendChild(matriculaDiv);
    });
}


function llenarOpcionesFormulario() {
    const selectTemas = document.getElementById('temasDisponibles');js
    const selectEstudiantes = document.getElementById('estudiantesDisponibles');

   
    selectTemas.innerHTML = '';
    selectEstudiantes.innerHTML = '';

    
    temasDisponibles.forEach(tema => {
        const option = document.createElement('option');
        option.value = tema.codigo;
        option.text = tema.nombre;
        selectTemas.appendChild(option);
    });

    
    estudiantesDisponibles.forEach(estudiante => {
        if (estudiante.tipoUsuario === 'Estudiante') {
            const option = document.createElement('option');
            option.value = estudiante.usuario;
            option.text = `${estudiante.nombres} ${estudiante.apellidos}`;
            selectEstudiantes.appendChild(option);
        }
    });
}


llenarOpcionesFormulario();


mostrarMatriculas();


