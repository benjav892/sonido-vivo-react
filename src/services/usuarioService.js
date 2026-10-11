import usuarios from '../data/usuarios.json'

const CLAVE = 'usuarios'

function leer() {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado === null) {
        localStorage.setItem(CLAVE, JSON.stringify(usuarios))

        return [...usuarios]
    }
    return JSON.parse(guardado)
}

function guardar(lista) {
    localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function listarUsuarios() {
    return leer()
}

export function obtenerUsuario(id) {
    return leer().find((u) => u.id === id) ?? null
}

export function crearUsuario(datos) {
    const lista = leer()
    const nuevoId = Math.max(0, ...lista.map((u) => u.id)) + 1
    const nuevo = { ...datos, id: nuevoId }
    guardar([...lista, nuevo])
    return nuevo
}


export function actualizarUsuario(id, cambios) {
    const lista = leer().map((u) => (u.id === id ? { ...u, ...cambios } : u))
    guardar(lista)
    return lista.find((u) => u.id === id) ?? null
}


export function eliminarUsuario(id) {
    guardar(leer().filter((u) => u.id !== id))
}

export function autenticarUsuario(correo, contrasena) {
    const lista = leer()
    return lista.find((u) => u.correo == correo && u.contrasena === contrasena) ?? null
}