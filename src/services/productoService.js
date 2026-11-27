import { api } from './api'
import { normalizarProductoApi } from '../dto/producto.dto'

export async function listarProductosApi(filtros = {}) {
  const respuesta = await api.get('/v1/productos', { params: filtros })
  return respuesta.data.map(normalizarProductoApi)
}

export async function obtenerProductoApi(id) {
  const respuesta = await api.get(`/v1/productos/${id}`)
  return normalizarProductoApi(respuesta.data)
}

export async function obtenerProductoPorCodigoApi(codigo) {
  const respuesta = await api.get(`/v1/productos/codigo/${encodeURIComponent(codigo)}`)
  return normalizarProductoApi(respuesta.data)
}

export async function crearProductoApi(dto) {
  const respuesta = await api.post('/v1/productos', dto)
  return normalizarProductoApi(respuesta.data)
}

export async function actualizarProductoApi(id, dto) {
  const respuesta = await api.put(`/v1/productos/${id}`, dto)
  return normalizarProductoApi(respuesta.data)
}

export async function actualizarStockApi(id, dto) {
  const respuesta = await api.patch(`/v1/productos/${id}/stock`, dto)
  return normalizarProductoApi(respuesta.data)
}

export async function eliminarProductoApi(id) {
  await api.delete(`/v1/productos/${id}`)
}