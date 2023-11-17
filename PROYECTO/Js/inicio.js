const noticiasPequenas = document.querySelector('.noticias-pequenas');
        const btnPrev = document.querySelector('.slider-btn.prev');
        const btnNext = document.querySelector('.slider-btn.next');
        const noticiasContainerWidth = noticiasPequenas.offsetWidth;
        const noticiasPequenasWidth = noticiasPequenas.scrollWidth;

        let scrollPosition = 0;

        btnNext.addEventListener('click', () => {
            if (scrollPosition < noticiasPequenasWidth - noticiasContainerWidth) {
                scrollPosition += noticiasContainerWidth;
            } else {
                scrollPosition = 0;
            }
            noticiasPequenas.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });

        btnPrev.addEventListener('click', () => {
            if (scrollPosition > 0) {
                scrollPosition -= noticiasContainerWidth;
            } else {
                scrollPosition = noticiasPequenasWidth - noticiasContainerWidth;
            }
            noticiasPequenas.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });

        document.addEventListener('DOMContentLoaded', function () {
            var eventos = [  // Aquí puedes agregar tus eventos
                {
                    title: 'Evento 1',
                    start: '2023-11-15', // Fecha del evento en formato 'YYYY-MM-DD'
                },
                {
                    title: 'Evento 2',
                    start: '2023-11-20',
                }
                // Agrega más eventos según sea necesario
            ];

            $('#calendario').fullCalendar({
                events: eventos,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultView: 'month', // Vista predeterminada del calendario
                eventLimit: true, // Habilita el botón de "más" para eventos cuando hay muchos en un día
                eventClick: function (event) {
                    // Acciones cuando se hace clic en un evento
                }
            });
        });
