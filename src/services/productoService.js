import productosIniciales from '../data/inventario.json'

// CAMBIO DE CLAVE: Le ponemos 'productos_v2' para que el navegador borre 
// cualquier error que haya guardado en pruebas anteriores y cargue todo limpio.
const CLAVE = 'productos_v3' 

function leer() {
  const guardado = localStorage.getItem(CLAVE)

  if (guardado === null) {
    // TRANSFORMACIÓN: Traducimos tu JSON al formato de React y le damos un ID
    const productosFormateados = productosIniciales.map((prod, index) => ({
    id: index + 1,
    codigo: prod.codigo,
    nombre: prod.nombreDelProducto,
    categoria: prod.categoria,
    marca: prod.marca,
    modelo: prod.modelo,
    precio: prod.precioClp, 
    stock: prod.stock,
    stockMinimo: prod.stockMinimo,
    descripcion: prod.descripcionBreve,
    imagen: prod.imagen || "/img/placeholder.png"
    }));

    localStorage.setItem(CLAVE, JSON.stringify(productosFormateados))
    return productosFormateados
  }

  return JSON.parse(guardado)
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function listarProductos() {
  return leer()
}

export function obtenerProducto(id) {
  return leer().find((p) => p.id === id) ?? null
}

export function crearProducto(datos) {
  const lista = leer()
  const nuevoId = lista.length > 0 ? Math.max(...lista.map((p) => p.id)) + 1 : 1
  const nuevo = { ...datos, id: nuevoId }
  
  guardar([...lista, nuevo])
  return nuevo
}

export function actualizarProducto(id, cambios) {
  const lista = leer().map((p) => (p.id === id ? { ...p, ...cambios } : p))
  guardar(lista)
  return lista.find((p) => p.id === id) ?? null
}

export function eliminarProducto(id) {
  guardar(leer().filter((p) => p.id !== id))
}