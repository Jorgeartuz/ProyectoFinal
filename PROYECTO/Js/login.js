const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const adminUserExists = users.some(user => user.user_type === 'Admin' && user.isAdminPrincipal);

    if (!adminUserExists) {
        const adminUser = {
            id_number: 'admin@example.com', // Correo electrónico del administrador
            first_name: 'Admin',
            last_name: 'Principal',
            email: 'admin@example.com',
            password: 'admin', // Reemplaza con la contraseña deseada
            user_type: 'Admin',
            isAdminPrincipal: true
            // Agrega otros campos según sea necesario
        };
    
        // Agrega el usuario administrador a la lista de usuarios
        users.push(adminUser);
    
        // Guarda la lista actualizada en el localStorage
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    const validUser = users.find((user) => user.email === email && user.password === password);

    if (!validUser) {
        return alert('Usuario y/o contraseña incorrectos.');
    }

    
    localStorage.setItem('login_success', JSON.stringify(validUser));

    
    // Resto de la lógica de inicio de sesión
switch (validUser.user_type) {
    case 'Admin':
        validUser.isAdminPrincipal = true;
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



localStorage.setItem('logged_in_user_data', JSON.stringify({
        id_number: validUser.id_number,
        first_name: validUser.first_name,
        last_name: validUser.last_name,
        username: validUser.username,
        address: validUser.address,
        birthdate: validUser.birthdate,
        education: validUser.education,
        password: validUser.password
    }));

    // Obtener los datos del usuario actualmente autenticado desde el localStorage
const loggedInUser = JSON.parse(localStorage.getItem('logged_in_user_data')) || {};

// Supongamos que validUser contiene los nuevos datos del usuario después de la autenticación

// Comparar cada campo con los datos existentes
if (validUser.id_number !== loggedInUser.id_number) {
    loggedInUser.id_number = validUser.id_number;
}

if (validUser.first_name !== loggedInUser.first_name) {
    loggedInUser.first_name = validUser.first_name;
}

if (validUser.last_name !== loggedInUser.last_name) {
    loggedInUser.last_name = validUser.last_name;
}

if (validUser.username !== loggedInUser.username) {
    loggedInUser.username = validUser.username;
}

if (validUser.address !== loggedInUser.address) {
    loggedInUser.address = validUser.address;
}

if (validUser.birthdate !== loggedInUser.birthdate) {
    loggedInUser.birthdate = validUser.birthdate;
}

if (validUser.education !== loggedInUser.education) {
    loggedInUser.education = validUser.education;
}

// Verifica otros campos según sea necesario

// Guardar los datos actualizados en el localStorage
localStorage.setItem('logged_in_user_data', JSON.stringify(loggedInUser));


    
    
// Actualizar el nombre del usuario al iniciar sesión
localStorage.setItem('logged_in_user_name', `${validUser.first_name} ${validUser.last_name}`);
// Guardar el tipo de usuario al iniciar sesión
localStorage.setItem('logged_in_user_type', validUser.user_type);

});
