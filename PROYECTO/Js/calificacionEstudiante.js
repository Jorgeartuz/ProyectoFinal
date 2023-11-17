
const calificaciones = [
    { curso: 'Matemáticas', primerCorte: 75, segundoCorte: 80, definitiva: 78 },
    { curso: 'Historia', primerCorte: 85, segundoCorte: 90, definitiva: 88 },

];

function mostrarCalificaciones() {
    const tablaCuerpo = document.getElementById('tablaCuerpo');


    if (!tablaCuerpo) {
        console.error('El elemento con id "tablaCuerpo" no fue encontrado en el DOM.');
        return;
    }


    tablaCuerpo.innerHTML = '';

    if (calificaciones.length === 0) {

        const filaMensaje = document.createElement('tr');
        filaMensaje.innerHTML = '<td colspan="4">No hay calificaciones disponibles.</td>';
        tablaCuerpo.appendChild(filaMensaje);
        return;
    }


    calificaciones.forEach(calificacion => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${calificacion.curso}</td>
            <td>${calificacion.primerCorte}</td>
            <td>${calificacion.segundoCorte}</td>
            <td>${calificacion.definitiva}</td>
        `;
        tablaCuerpo.appendChild(fila);
    });
}


document.addEventListener('DOMContentLoaded', mostrarCalificaciones);
