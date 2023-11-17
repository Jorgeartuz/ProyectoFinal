function consultar() {
    var buscarInput = document.getElementById("buscar").value;
    var nombreInput = document.getElementById("nombre");
    var apellidosInput = document.getElementById("apellidos");
    var idTypeSelect = document.getElementById("id_type");
    var cedulaInput = document.getElementById("cedula");
    var direccionResidenciaInput = document.getElementById("direccionResidencia");
    var fechaNacimientoInput = document.getElementById("fechaNacimiento");
    var estudiosRealizadosInput = document.getElementById("estudiosRealizados");
    var userTypeSelect = document.getElementById("user_type");
    var emailInput = document.getElementById("email");
    var usuarioInput = document.getElementById("usuario");
    var contrasenaInput = document.getElementById("contrasena");
    var btnActualizar = document.getElementById("btnActualizar");

    var usuarios = JSON.parse(localStorage.getItem('users')) || [];

    var usuarioEncontrado = usuarios.find(function (usuario) {
        return usuario.id_number === buscarInput;
    });

    if (usuarioEncontrado) {
        nombreInput.value = usuarioEncontrado.first_name || '';
        apellidosInput.value = usuarioEncontrado.last_name || '';
        idTypeSelect.value = usuarioEncontrado.id_type || '';
        cedulaInput.value = usuarioEncontrado.id_number || '';
        direccionResidenciaInput.value = usuarioEncontrado.address || '';
        fechaNacimientoInput.value = usuarioEncontrado.birthdate || '';
        estudiosRealizadosInput.value = usuarioEncontrado.education || '';
        userTypeSelect.value = usuarioEncontrado.user_type || '';
        emailInput.value = usuarioEncontrado.email || '';
        usuarioInput.value = usuarioEncontrado.username || '';
        contrasenaInput.value = usuarioEncontrado.password || '';

    } else {
        alert("Usuario no encontrado");
    }
}





function actualizarDatos() {
    var nombreInput = document.getElementById("nombre");
    var apellidosInput = document.getElementById("apellidos");
    var idTypeSelect = document.getElementById("id_type");
    var cedulaInput = document.getElementById("cedula");
    var direccionResidenciaInput = document.getElementById("direccionResidencia");
    var fechaNacimientoInput = document.getElementById("fechaNacimiento");
    var estudiosRealizadosInput = document.getElementById("estudiosRealizados");
    var userTypeSelect = document.getElementById("user_type");
    var emailInput = document.getElementById("email");
    var usuarioInput = document.getElementById("usuario");
    var contrasenaInput = document.getElementById("contrasena");

    // Obtener usuarios del localStorage o inicializar un array vacío
    var usuarios = JSON.parse(localStorage.getItem('users')) || [];

    // Mostrar información en la consola para depuración
    console.log('Número de documento a actualizar:', cedulaInput.value);
    console.log('Usuarios en el localStorage:', usuarios);

    // Buscar el índice del usuario en el array
    var indiceUsuario = usuarios.findIndex(function (usuario) {
        return usuario.id_number === cedulaInput.value;
    });

    // Verificar si se encontró el usuario
    if (indiceUsuario !== -1) {
        // Actualizar los datos del usuario en el array
        usuarios[indiceUsuario].first_name = nombreInput.value;
        usuarios[indiceUsuario].last_name = apellidosInput.value;
        usuarios[indiceUsuario].id_type = idTypeSelect.value;
        usuarios[indiceUsuario].id_number = cedulaInput.value;
        usuarios[indiceUsuario].address = direccionResidenciaInput.value;
        usuarios[indiceUsuario].birthdate = fechaNacimientoInput.value;
        usuarios[indiceUsuario].education = estudiosRealizadosInput.value;
        usuarios[indiceUsuario].user_type = userTypeSelect.value;
        usuarios[indiceUsuario].email = emailInput.value;
        // Puedes agregar más campos según sea necesario

        // Guardar el array actualizado en el localStorage
        localStorage.setItem('users', JSON.stringify(usuarios));

        // Mostrar información en la consola para depuración
        console.log('Usuarios después de la actualización:', usuarios);

        alert('Datos actualizados correctamente.');
    } else {
        alert('Usuario no encontrado');
    }
}
