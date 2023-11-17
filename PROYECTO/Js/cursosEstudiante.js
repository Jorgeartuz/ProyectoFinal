
const cursosAsignados = [
    { nombre: 'Curso de Matemáticas', progreso: 30 },
    { nombre: 'Curso de Historia', progreso: 50 },
    
];


function mostrarCursos() {
    const misCursosSection = document.getElementById('misCursos');

  
    if (!misCursosSection) {
        console.error('El elemento con id "misCursos" no fue encontrado en el DOM.');
        return;
    }

    misCursosSection.innerHTML = ''; 

    if (cursosAsignados.length === 0) {
       
        misCursosSection.innerHTML = '<p>No tienes cursos asignados actualmente.</p>';
        return;
    }

   
    const listaCursos = document.createElement('ul');


    cursosAsignados.forEach(curso => {
        const itemCurso = document.createElement('li');
        itemCurso.innerHTML = `
            <h3>${curso.nombre}</h3>
            <p><strong>Progreso:</strong> ${curso.progreso}%</p>
            <progress value="${curso.progreso}" max="100"></progress>
        `;
        listaCursos.appendChild(itemCurso);
    });

    misCursosSection.appendChild(listaCursos);
}


document.addEventListener('DOMContentLoaded', mostrarCursos);
