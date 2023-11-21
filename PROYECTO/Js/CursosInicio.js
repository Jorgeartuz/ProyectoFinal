document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.btn-show-topics').forEach(button => {
        button.addEventListener('click', function () {
            const course = this.getAttribute('data-course');
            const topicsDiv = document.getElementById('temas-' + course);
            if (topicsDiv.style.display === "block") {
                topicsDiv.style.display = "none";
            } else {
                // Oculta todos los divs de temas primero
                document.querySelectorAll('.course-topics').forEach(div => {
                    div.style.display = "none";
                });
                // Muestra solo el div de temas seleccionado
                topicsDiv.style.display = "block";
            }
        });
    });
});
