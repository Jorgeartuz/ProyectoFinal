
let temas = [];

function agregarTema() {
    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const cursos = document.getElementById('cursos').value;
    const costo = parseFloat(document.getElementById('costo').value);
    const precio = parseFloat(document.getElementById('precio').value);

    
    if (temas.some(tema => tema.codigo === codigo)) {
        alert('El código ya existe. Por favor, elige otro.');
        return;
    }

    
    const nuevoTema = {
        codigo,
        nombre,
        descripcion,
        cursos,
        costo,
        precio
    };

    
    temas.push(nuevoTema);

    
    document.getElementById('formularioTema').reset();

    mostrarTemas();
}

function mostrarTemas() {
    const temasSection = document.getElementById('temas');
    temasSection.innerHTML = ''; 

    temas.forEach(tema => {
        const temaDiv = document.createElement('div');
        temaDiv.innerHTML = `<h3>${tema.nombre}</h3>
                             <p><strong>Código:</strong> ${tema.codigo}</p>
                             <p><strong>Descripción:</strong> ${tema.descripcion}</p>
                             <p><strong>Cursos asociados:</strong> ${tema.cursos}</p>
                             <p><strong>Costo:</strong> ${tema.costo}</p>
                             <p><strong>Precio:</strong> ${tema.precio}</p>
                             <hr>`;
        temasSection.appendChild(temaDiv);
    });
}


mostrarTemas();



let tematicas = [
    { codigo: "T1", nombre: "Matemáticas" },
    { codigo: "T2", nombre: "Ciencias" },
    // ... más temáticas ...
];

// Función para mostrar las temáticas en el formulario de cursos
function mostrarTematicasEnFormulario() {
    const selectTematicas = document.getElementById('tematicasAsociadas');
    selectTematicas.innerHTML = ''; // Limpiar opciones antes de volver a cargarlas

    tematicas.forEach(tematica => {
        const option = document.createElement('option');
        option.value = tematica.codigo;
        option.text = tematica.nombre;
        selectTematicas.appendChild(option);
    });
}

// Función para agregar un nuevo curso
function agregarCurso() {
    const codigoCurso = document.getElementById('codigoCurso').value;
    const nombreCurso = document.getElementById('nombreCurso').value;
    const videosCurso = document.getElementById('videosCurso').value;
    const tematicasAsociadas = Array.from(document.getElementById('tematicasAsociadas').selectedOptions)
        .map(option => option.value);

    // Validar que el código sea único
    if (temas.some(curso => curso.codigo === codigoCurso)) {
        alert('El código ya existe. Por favor, elige otro.');
        return;
    }

    // Crear objeto curso
    const nuevoCurso = {
        codigo: codigoCurso,
        nombre: nombreCurso,
        videos: videosCurso,
        tematicas: tematicasAsociadas
    };

    // Agregar curso al array de cursos
    cursos.push(nuevoCurso);

    // Limpiar el formulario
    document.getElementById('formularioCurso').reset();

    // Actualizar la visualización de cursos
    mostrarCursos();
}

// Función para mostrar los cursos en la página
function mostrarCursos() {
    const cursosSection = document.getElementById('cursos');
    cursosSection.innerHTML = ''; // Limpiar la sección antes de volver a mostrar los cursos

    cursos.forEach(curso => {
        const cursoDiv = document.createElement('div');
        cursoDiv.innerHTML = `<h3>${curso.nombre}</h3>
                             <p><strong>Código:</strong> ${curso.codigo}</p>
                             <p><strong>Videos asociados:</strong> ${curso.videos}</p>
                             <p><strong>Temáticas asociadas:</strong> ${curso.tematicas.join(', ')}</p>
                             <hr>`;
        cursosSection.appendChild(cursoDiv);
    });
}

// Mostrar temáticas en el formulario de cursos al cargar la página
mostrarTematicasEnFormulario(); 


let videos = [];

// Función para agregar un nuevo video
function agregarVideo() {
    const codigoVideo = document.getElementById('codigoVideo').value;
    const nombreVideo = document.getElementById('nombreVideo').value;
    const urlVideo = document.getElementById('urlVideo').value;
    const idiomaOriginal = document.getElementById('idiomaOriginal').value;
    const idiomasDisponibles = document.getElementById('idiomasDisponibles').value.split(',').map(idioma => idioma.trim());
    const subtitulosDisponibles = document.getElementById('subtitulosDisponibles').value.split(',').map(subtitulo => subtitulo.trim());
    const duracionVideo = document.getElementById('duracionVideo').value;

    // Validar que el código sea único
    if (videos.some(video => video.codigo === codigoVideo)) {
        alert('El código ya existe. Por favor, elige otro.');
        return;
    }

    // Crear objeto video
    const nuevoVideo = {
        codigo: codigoVideo,
        nombre: nombreVideo,
        url: urlVideo,
        idiomaOriginal: idiomaOriginal,
        idiomasDisponibles: idiomasDisponibles,
        subtitulosDisponibles: subtitulosDisponibles,
        duracion: duracionVideo
    };

    // Agregar video al array de videos
    videos.push(nuevoVideo);

    // Limpiar el formulario
    document.getElementById('formularioVideo').reset();

    // Actualizar la visualización de videos
    mostrarVideos();
}

// Función para mostrar los videos en la página
function mostrarVideos() {
    const videosSection = document.getElementById('videos');
    videosSection.innerHTML = ''; // Limpiar la sección antes de volver a mostrar los videos

    videos.forEach(video => {
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `<h3>${video.nombre}</h3>
                             <p><strong>Código:</strong> ${video.codigo}</p>
                             <p><strong>URL:</strong> <a href="${video.url}" target="_blank">${video.url}</a></p>
                             <p><strong>Idioma original:</strong> ${video.idiomaOriginal}</p>
                             <p><strong>Idiomas disponibles:</strong> ${video.idiomasDisponibles.join(', ')}</p>
                             <p><strong>Subtítulos disponibles:</strong> ${video.subtitulosDisponibles.join(', ')}</p>
                             <p><strong>Duración:</strong> ${video.duracion}</p>
                             <hr>`;
        videosSection.appendChild(videoDiv);
    });
}

// Mostrar videos al cargar la página
mostrarVideos();