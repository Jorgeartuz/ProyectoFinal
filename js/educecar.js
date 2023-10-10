// Ejemplo de código JavaScript para la gestión de usuarios

// Definir una lista de usuarios
let usuarios = [];

// Función para agregar un nuevo usuario
function agregarUsuario(nombre, apellido, tipo, correo, usuario, contraseña) {
    let nuevoUsuario = {
        nombre: nombre,
        apellido: apellido,
        tipo: tipo,
        correo: correo,
        usuario: usuario,
        contraseña: contraseña
    };
    usuarios.push(nuevoUsuario);
}

// Ejemplo de uso de la función para agregar un usuario
agregarUsuario("Juan", "Pérez", "Estudiante", "juan@example.com", "juan123", "contraseña123");

// Función para iniciar sesión
function iniciarSesion(usuario, contraseña) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario === usuario && usuarios[i].contraseña === contraseña) {
            return "Sesión iniciada como " + usuarios[i].nombre;
        }
    }
    return "Usuario o contraseña incorrectos";
}

// Ejemplo de inicio de sesión
let mensajeInicioSesion = iniciarSesion("juan123", "contraseña123");
console.log(mensajeInicioSesion);



// Obtener todos los botones de matrícula
const botonesMatricular = document.querySelectorAll(".matricular");

// Función para manejar la matrícula en un curso
function matricularEnCurso() {
    // Aquí puedes agregar la lógica de matrícula, como agregar el usuario al curso, registrar la fecha, etc.
    alert("¡Te has matriculado en este curso!");
}

// Agregar un evento de clic a cada botón de matrícula
botonesMatricular.forEach((boton) => {
    boton.addEventListener("click", matricularEnCurso);
});






// Obtener todas las secciones de matrícula
const seccionesMatricula = document.querySelectorAll(".matricula");

// Función para mostrar detalles de matrícula
function mostrarDetallesMatricula(event) {
    const seccion = event.currentTarget;
    // Aquí puedes agregar la lógica para mostrar detalles de matrícula, como obtener datos de matrícula desde tu base de datos y mostrarlos en la página.
    // Por ejemplo, puedes usar alertas, modales o actualizar el contenido de la sección.
}

// Agregar un evento de clic a cada sección de matrícula
seccionesMatricula.forEach((seccion) => {
    seccion.addEventListener("click", mostrarDetallesMatricula);
});