// Comprueba si un nombre de categoría ya existe en la lista
export function esCategoriaDuplicada(nombre, listaCategorias = [], idActual = null) {
    if (!nombre) return false;
    const nombreNormalizado = nombre.trim().toLowerCase();
    
    // Si editamos, filtramos el ID actual para no comparar la categoría consigo misma
    const listaAFiltrar = idActual 
        ? listaCategorias.filter((cat) => cat.id !== idActual) 
        : listaCategorias;

    return listaAFiltrar.some(
        (cat) => cat.texto && cat.texto.trim().toLowerCase() === nombreNormalizado
    );
}

// Validación completa de nombre de categoría
export function validarNombreCategoria(nombre, listaCategorias = [], idActual = null) {
    if (!nombre || nombre.trim() === '') {
        return 'El nombre de la categoría es obligatorio';
    }
    if (nombre.trim().length < 3) {
        return 'El nombre debe tener al menos 3 caracteres';
    }
    if (esCategoriaDuplicada(nombre, listaCategorias, idActual)) {
        return 'Ya existe una categoría con este nombre';
    }
    return '';
}