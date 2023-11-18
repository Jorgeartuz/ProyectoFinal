const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener los valores de los campos
    const first_name = document.querySelector('#first_name').value;
    const last_name = document.querySelector('#last_name').value;
    const id_type = document.querySelector('#id_type').value;
    const id_number = document.querySelector('#id_number').value;
    const address = document.querySelector('#address').value;
    const birthdate = document.querySelector('#birthdate').value;
    const education = document.querySelector('#education').value;
    const email = document.querySelector('#email').value;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    // Validar campos no vacíos
    if (!first_name || !last_name || !id_type || !id_number || !address || !birthdate || !education || !email || !username || !password) {
        return alert('Por favor, completa todos los campos.');
    }

    // Obtener usuarios del localStorage o inicializar un array vacío
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el usuario ya está registrado
    const isUserRegistered = users.find((user) => user.email === email);

    if (isUserRegistered) {
        return alert('El usuario ya está registrado.');
    }

    const user_type = 'Student';


    // Agregar nuevo usuario al array y guardar en localStorage
    users.push({
        first_name,
        last_name,
        id_type,
        id_number,
        address,
        birthdate,
        education,
        user_type,
        email,
        username,
        password
    });
    localStorage.setItem('users', JSON.stringify(users));

    // Mensaje de registro exitoso y redirección
    alert('¡Registro exitoso!');
    // Considera utilizar una forma más avanzada de navegación, especialmente si es una aplicación de una sola página.
    window.location.href = 'Iniciodesesion.html';
});
