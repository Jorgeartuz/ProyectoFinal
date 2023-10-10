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
