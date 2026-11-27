import { api } from './api'
import { normalizarCategoriaApi } from '../dto/categoria.dto'

export async function listarCategoriasApi() {
  const respuesta = await api.get('/v1/categorias')
  return respuesta.data.map(normalizarCategoriaApi)
}

export async function obtenerCategoriaApi(id) {
  const respuesta = await api.get(`/v1/categorias/${id}`)
  return normalizarCategoriaApi(respuesta.data)
}

export async function crearCategoriaApi(dto) {
  const respuesta = await api.post('/v1/categorias', dto)
  return normalizarCategoriaApi(respuesta.data)
}

export async function actualizarCategoriaApi(id, dto) {
  const respuesta = await api.put(`/v1/categorias/${id}`, dto)
  return normalizarCategoriaApi(respuesta.data)
}

export async function eliminarCategoriaApi(id) {
  await api.delete(`/v1/categorias/${id}`)
}