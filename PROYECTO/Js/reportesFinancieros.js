
let reporteIngresos = 10000;
let reporteGastos = 5000;
let transaccionesFinancieras = [
    { tipo: 'Ingreso', monto: 2000 },
    { tipo: 'Gasto', monto: 1000 },
    
];
let pagosEstudiantes = 8000;
let costosOperativos = 3000;
let ingresosVentaCursos = 6000;


function mostrarReportes() {
    const reportesSection = document.getElementById('reportes');

    
    if (!reportesSection) {
        console.error('El elemento con id "reportes" no fue encontrado en el DOM.');
        return;
    }

    reportesSection.innerHTML = ''; 

    
    const cursos = obtenerDatosCursos(); 

    if (cursos.length === 0) {
        
        reportesSection.innerHTML = '<p>No hay cursos registrados.</p>';
        return;
    }

    
    const tabla = document.createElement('table');
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>Nombre del Curso</th>
                <th>Valor del Curso</th>
                <th>Cursos Vendidos</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody id="tablaCuerpo"></tbody>
    `;
    reportesSection.appendChild(tabla);

    const cuerpoTabla = document.getElementById('tablaCuerpo');

    
    let totalValorCursos = 0;
    let totalCursosVendidos = 0;

    
    cursos.forEach(curso => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${curso.nombre}</td>
            <td>${curso.valor}</td>
            <td>${curso.vendidos}</td>
            <td>${curso.valor * curso.vendidos}</td>
        `;
        cuerpoTabla.appendChild(fila);

        
        totalValorCursos += curso.valor * curso.vendidos;
        totalCursosVendidos += curso.vendidos;
    });

    
    const filaTotales = document.createElement('tr');
    filaTotales.innerHTML = `
        <td><strong>Totales</strong></td>
        <td></td>
        <td>${totalCursosVendidos}</td>
        <td>${totalValorCursos}</td>
    `;
    cuerpoTabla.appendChild(filaTotales);
}


function obtenerDatosCursos() {
    
    return [
        { nombre: 'Curso A', valor: 100, vendidos: 20 },
        { nombre: 'Curso B', valor: 150, vendidos: 15 },
        
    ];
}


document.addEventListener('DOMContentLoaded', mostrarReportes);