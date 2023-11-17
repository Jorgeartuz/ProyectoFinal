
// Supongamos que cursosAsignados es un array que contiene los cursos asignados al instructor
const cursosAsignados = ["Curso 1", "Curso 2"];

// Referencia al elemento select
const selectCurso = document.getElementById('curso');

// Generar opciones del select
cursosAsignados.forEach(curso => {
    const option = document.createElement('option');
    option.value = curso;  // Puedes establecer valores únicos si es necesario
    option.textContent = curso;
    selectCurso.appendChild(option);
});
