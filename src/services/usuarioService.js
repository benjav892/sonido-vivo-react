import { api } from './api'
import { normalizarUsuarioApi } from '../dto/usuario.dto'

export async function listarUsuariosApi() {
  const respuesta = await api.get('/v1/usuarios')
  return respuesta.data.map(normalizarUsuarioApi)
}

export async function obtenerUsuarioApi(id) {
  const respuesta = await api.get(`/v1/usuarios/${id}`)
  return normalizarUsuarioApi(respuesta.data)
}

export async function crearUsuarioApi(dto) {
  const respuesta = await api.post('/v1/usuarios', dto)
  return normalizarUsuarioApi(respuesta.data)
}

export async function actualizarUsuarioApi(id, dto) {
  const respuesta = await api.put(`/v1/usuarios/${id}`, dto)
  return normalizarUsuarioApi(respuesta.data)
}

export async function eliminarUsuarioApi(id) {
  await api.delete(`/v1/usuarios/${id}`)
}