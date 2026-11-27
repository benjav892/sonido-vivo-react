import { api } from './api'
import { normalizarPedidoApi } from '../dto/pedido.dto'

export async function listarPedidosApi() {
  const respuesta = await api.get('/v1/pedidos')
  return respuesta.data.map(normalizarPedidoApi)
}

export async function obtenerPedidoApi(id) {
  const respuesta = await api.get(`/v1/pedidos/${id}`)
  return normalizarPedidoApi(respuesta.data)
}

export async function crearPedidoApi(dto) {
  const respuesta = await api.post('/v1/pedidos', dto)
  return normalizarPedidoApi(respuesta.data)
}

export async function actualizarEstadoPedidoApi(id, dto) {
  const respuesta = await api.patch(`/v1/pedidos/${id}/estado`, dto)
  return normalizarPedidoApi(respuesta.data)
}