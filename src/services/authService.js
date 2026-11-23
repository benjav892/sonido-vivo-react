import { api } from './api'

export async function loginApi(dto) {
  const respuesta = await api.post('/v1/auth/login', dto)
  return respuesta.data
}

export async function registrarApi(dto) {
  const respuesta = await api.post('/v1/auth/register', dto)
  return respuesta.data
}

export async function obtenerPerfilApi() {
  const respuesta = await api.get('/v1/auth/me')
  return respuesta.data
}