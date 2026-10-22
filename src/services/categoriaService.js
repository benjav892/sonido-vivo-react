import categoriasIniciales from '../data/categorias.json';

const CLAVE = 'categorias';

function leer() {
    const guardado = localStorage.getItem(CLAVE);
    if (guardado === null) {
        localStorage.setItem(CLAVE, JSON.stringify(categoriasIniciales));
        return [...categoriasIniciales];
    }
    return JSON.parse(guardado);
}

function guardar(lista) {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function listarCategorias() {
    return leer();
}

export function obtenerCategoria(id) {
    return leer().find((c) => c.id === id) ?? null;
}

export function crearCategoria(datos) {
    const lista = leer();
    const nuevoId = Math.max(0, ...lista.map((c) => c.id)) + 1;
    const nuevaCategoria = { ...datos, id: nuevoId };
    guardar([...lista, nuevaCategoria]);
    return nuevaCategoria;
}

export function actualizarCategoria(id, cambios) {
    const lista = leer().map((c) => (c.id === id ? { ...c, ...cambios } : c));
    guardar(lista);
    return lista.find((c) => c.id === id) ?? null;
}