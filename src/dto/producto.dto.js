export function crearProductoRequestDto(formulario) {
  return {
    codigo: String(formulario.codigo ?? '').trim().toUpperCase(),
    nombre: String(formulario.nombre ?? formulario.nombreDelProducto ?? '').trim(),
    marca: String(formulario.marca ?? '').trim(),
    modelo: String(formulario.modelo ?? '').trim(),
    descripcionBreve: String(formulario.descripcionBreve ?? formulario.descripcion ?? '').trim(),
    precioClp: Number(formulario.precioClp ?? formulario.precio ?? 0),
    stock: Number(formulario.stock ?? 0),
    stockMinimo: Number(formulario.stockMinimo ?? 0),
    imagen: String(formulario.imagen ?? '').trim() || '/img/placeholder.png',
    categoriaId: Number(formulario.categoriaId),
  }
}

export function crearStockUpdateDto(stock) {
  return {
    stock: Number(stock),
  }
}

export function normalizarProductoApi(p) {
  if (!p) return null
  return {
    ...p,
    nombreDelProducto: p.nombre ?? '',
    precio: p.precioClp ?? 0,
    descripcion: p.descripcionBreve ?? '',
    categoria: p.categoriaNombre ?? '',
    imagen: p.imagen || '/img/placeholder.png',
  }
}