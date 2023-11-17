const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Validar si el usuario existe
    const validUser = users.find((user) => user.email === email && user.password === password);
    localStorage.removeItem("prueba");
    localStorage.setItem("prueba", JSON.stringify(validUser));

    if (!validUser) {
        return alert('Usuario y/o contraseña incorrectos.');
    }

    localStorage.setItem('login_success', JSON.stringify(validUser));

    // Resto de la lógica de inicio de sesión
    switch (validUser.user_type) {
        case 'Admin':
            window.location.href = 'PanelAdministrador.html';
            break;
        case 'Student':
            window.location.href = 'PanelEstudiante.html';
            break;
        case 'Instructor':
            window.location.href = 'PanelInstructor.html';
            break;
        default:
            window.location.href = 'index.html';
    }

    // Guardar los datos del usuario actualmente autenticado en el localStorage
    localStorage.setItem('logged_in_user_data', JSON.stringify({
        id: validUser.id,
        id_number: validUser.id_number,
        first_name: validUser.first_name,
        last_name: validUser.last_name,
        username: validUser.username,
        address: validUser.address,
        birthdate: validUser.birthdate,
        education: validUser.education,
        user_type: validUser.user_type,
        // Agregar otros campos según sea necesario
    }));

    // Actualizar el nombre del usuario al iniciar sesión
    localStorage.setItem('logged_in_user_name', `${validUser.first_name} ${validUser.last_name}`);
    // Guardar el tipo de usuario al iniciar sesión
    localStorage.setItem('logged_in_user_type', validUser.user_type);
});
