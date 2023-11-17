document.addEventListener('DOMContentLoaded', function () {
    mostrarNombreEstudiante(); // Llama a la función para mostrar el nombre al cargar la página

    // Puedes suscribir la función mostrarNombreEstudiante a eventos adicionales si es necesario.
    // Ejemplo: document.addEventListener('nombreActualizado', mostrarNombreEstudiante);
});

function mostrarNombreEstudiante() {
    // Recuperar el nombre del estudiante desde localStorage
    const loggedInUserData = JSON.parse(localStorage.getItem('logged_in_user_data'));
    const loggedInUserName = loggedInUserData ? `${loggedInUserData.first_name} ${loggedInUserData.last_name}` : null;

    // Mostrar el nombre en el panel de control
    const welcomeMessage = document.querySelector('.content h2');
    if (welcomeMessage && loggedInUserName) {
        welcomeMessage.textContent = `Bienvenido, ${loggedInUserName}`;
    }
}