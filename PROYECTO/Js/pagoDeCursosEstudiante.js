function actualizarPrecio() {
    var selectElement = document.getElementById("curso");
    var selectedOptionText = selectElement.options[selectElement.selectedIndex].text;
    var precio = selectedOptionText.split('|')[1].trim(); // Extraer el precio del texto de la opción

    document.getElementById("total").value = precio;
}

// Actualizar precio inicial al cargar la página
window.onload = actualizarPrecio;