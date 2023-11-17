document.addEventListener('DOMContentLoaded', function () {
    cargarDatosUsuario();

    var btnActualizar = document.getElementById('btnActualizar');
    if (btnActualizar) {
        btnActualizar.addEventListener('click', function () {
            if (actualizarDatos()) {
                cargarDatosUsuario();
            }
        });
    }
});

function cargarDatosUsuario() {
    const loggedInUserData = JSON.parse(localStorage.getItem('logged_in_user_data'));

    console.log('Datos del usuario al cargar la página:', loggedInUserData);

    if (loggedInUserData) {
        document.getElementById('cedula').value = loggedInUserData.id_number || '';
        document.getElementById('nombre').value = `${loggedInUserData.first_name} ${loggedInUserData.last_name}` || '';
        document.getElementById('usuario').value = loggedInUserData.username || '';
        document.getElementById('direccionResidencia').value = loggedInUserData.address || '';
        document.getElementById('fechaNacimiento').value = loggedInUserData.birthdate || '';
        document.getElementById('estudiosRealizados').value = loggedInUserData.education || '';
        document.getElementById('contrasena').value = loggedInUserData.password || '';

        // Mostrar campos adicionales según el tipo de usuario
        switch (localStorage.getItem('logged_in_user_type')) {
            case 'Admin':
                // Lógica para campos específicos de administrador, si es necesario
                break;
            case 'Student':
                // Lógica para campos específicos de estudiante, si es necesario
                break;
            case 'Instructor':
                // Lógica para campos específicos de instructor, si es necesario
                break;
            default:
                // Lógica predeterminada o manejo de casos no previstos
        }
    }
}

function habilitarEdicion() {
    console.log('Habilitando la edición...');
    var elementos = ['cedula', 'nombre', 'usuario', 'direccionResidencia', 'fechaNacimiento', 'estudiosRealizados', 'contrasena'];

    elementos.forEach(function (elementoId) {
        var elemento = document.getElementById(elementoId);
        if (elemento) {
            elemento.removeAttribute('readonly');
        }
    });

    // Habilitar el botón de actualizar
    document.getElementById('btnActualizar').disabled = false;
}

function actualizarDatos() {
    var cedula = document.getElementById('cedula').value;
    var nombreCompleto = document.getElementById('nombre').value;
    var usuario = document.getElementById('usuario').value;
    var direccionResidencia = document.getElementById('direccionResidencia').value;
    var fechaNacimiento = document.getElementById('fechaNacimiento').value;
    var estudiosRealizados = document.getElementById('estudiosRealizados').value;
    var contrasena = document.getElementById('contrasena').value;

    // Verificar que se proporcionó un nombre
    if (!nombreCompleto.trim()) {
        alert('Por favor, ingrese un nombre válido.');
        return false;
    }

    // Separar el nombre y el apellido si el formato es "Nombre Apellido"
    var nombres = nombreCompleto.split(' ');
    var first_name = nombres[0];
    var last_name = nombres.slice(1).join(' ');

    var userData = JSON.parse(localStorage.getItem('logged_in_user_data')) || {};

    userData.id_number = cedula;
    userData.first_name = first_name;
    userData.last_name = last_name;
    userData.username = usuario;
    userData.address = direccionResidencia;
    userData.birthdate = fechaNacimiento;
    userData.education = estudiosRealizados;
    userData.password = contrasena;

    localStorage.setItem('logged_in_user_data', JSON.stringify(userData));

    // Actualizar también el nombre en el localStorage para que se refleje al iniciar sesión
    localStorage.setItem('logged_in_user_name', `${first_name} ${last_name}`);

    // Agregar un mensaje para indicar que la actualización fue exitosa
    alert('Datos actualizados con éxito.');

    return true; // Indicar que la actualización fue exitosa
}

function deshabilitarEdicion() {
    console.log('Deshabilitando la edición...');
    var elementos = ['cedula', 'nombre', 'usuario', 'direccionResidencia', 'fechaNacimiento', 'estudiosRealizados', 'contrasena'];

    elementos.forEach(function (elementoId) {
        var elemento = document.getElementById(elementoId);
        if (elemento) {
            elemento.setAttribute('readonly', 'readonly');
        }
    });

    var btnActualizar = document.getElementById('btnActualizar');
    if (btnActualizar) {
        btnActualizar.innerHTML = 'Modificar';
        btnActualizar.disabled = false;
        btnActualizar.removeEventListener('click', deshabilitarEdicion);
        btnActualizar.addEventListener('click', habilitarEdicion);
    }
}

function mostrarContraseña() {
    console.log('Mostrando/ocultando la contraseña...');
    var contrasenaInput = document.getElementById("contrasena");
    var eyeIcon = document.getElementById("eyeIcon");

    if (contrasenaInput.type === "password") {
        contrasenaInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        contrasenaInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

function eliminarCuenta() {
    console.log('Eliminando la cuenta...');
    // Lógica para eliminar la cuenta
    alert("Cuenta eliminada con éxito");
}
