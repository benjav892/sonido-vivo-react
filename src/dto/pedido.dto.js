export function crearPedidoRequestDto({ tipoDespacho, direccionDespacho, carrito, productos = [] }) {
  const items = carrito.map((item) => {
    const productoEnCatalogo = productos.find((p) => p.codigo === item.codigo)
    const productoId = item.id ?? productoEnCatalogo?.id
    return {
      productoId: Number(productoId),
      cantidad: Number(item.cantidad),
    }
  })

  return {
    tipoDespacho: String(tipoDespacho || 'despacho').trim().toLowerCase(),
    direccionDespacho:
      tipoDespacho === 'despacho' ? String(direccionDespacho || '').trim() : '',
    items,
  }
}

export function crearPedidoEstadoDto(estado) {
  return {
    estado: String(estado || '').trim(),
  }
}

export function normalizarPedidoApi(p) {
  if (!p) return null
  const fechaFormateada = p.fechaCreacion
    ? new Date(p.fechaCreacion).toLocaleString('es-CL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''

  const itemsNormalizados = Array.isArray(p.items)
    ? p.items.map((i) => ({
        ...i,
        codigo: i.productoCodigo ?? '',
        nombre: i.productoNombre ?? '',
        precio: i.precioUnitario ?? 0,
      }))
    : []

  return {
    ...p,
    fecha: fechaFormateada,
    items: itemsNormalizados,
  }
}