import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  listarUsuariosApi,
  crearUsuarioApi,
  actualizarUsuarioApi,
  eliminarUsuarioApi,
} from './usuarioService'
import { api } from './api'
import { normalizarUsuarioApi } from '../dto/usuario.dto'

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

vi.mock('../dto/usuario.dto', () => ({
  normalizarUsuarioApi: vi.fn((u) => u),
}))

describe('usuarioService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('lista los usuarios desde la API y los normaliza', async () => {
    const usuariosMock = [
      { id: 1, nombre: 'Admin', apellido: 'SonidoVivo', email: 'admin@duoc.cl', rol: 'Administrador' },
    ]
    api.get.mockResolvedValueOnce({ data: usuariosMock })

    const resultado = await listarUsuariosApi()

    expect(api.get).toHaveBeenCalledWith('/v1/usuarios')
    expect(normalizarUsuarioApi).toHaveBeenCalledTimes(1)
    expect(resultado).toEqual(usuariosMock)
  })

  it('crea un usuario mediante POST y devuelve la respuesta normalizada', async () => {
    const dto = {
      nombre: 'Prueba',
      apellido: 'Usuario',
      email: 'prueba@duoc.cl',
      password: 'Password123',
      rol: 'Cliente',
    }
    const creadoMock = { id: 10, ...dto }
    api.post.mockResolvedValueOnce({ data: creadoMock })

    const creado = await crearUsuarioApi(dto)

    expect(api.post).toHaveBeenCalledWith('/v1/usuarios', dto)
    expect(normalizarUsuarioApi).toHaveBeenCalledWith(creadoMock)
    expect(creado).toEqual(creadoMock)
  })

  it('actualiza un usuario existente mediante PUT', async () => {
    const dto = { nombre: 'Prueba Editada', apellido: 'Usuario', rol: 'Vendedor' }
    const actualizadoMock = { id: 10, ...dto }
    api.put.mockResolvedValueOnce({ data: actualizadoMock })

    const actualizado = await actualizarUsuarioApi(10, dto)

    expect(api.put).toHaveBeenCalledWith('/v1/usuarios/10', dto)
    expect(actualizado).toEqual(actualizadoMock)
  })

  it('elimina un usuario mediante DELETE', async () => {
    api.delete.mockResolvedValueOnce({})

    await eliminarUsuarioApi(10)

    expect(api.delete).toHaveBeenCalledWith('/v1/usuarios/10')
  })
})