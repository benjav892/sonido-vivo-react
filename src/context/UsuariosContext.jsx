import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as usuarioService from '../services/usuarioService'
import { useAuth } from './AuthContext'
import { obtenerMensajeError } from '../services/api'

const UsuariosContext = createContext(null)

export function UsuariosProvider(props) {
  const { usuario, estaAutenticado, cargandoSesion } = useAuth()
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const esAdmin = estaAutenticado && usuario?.rol === 'Administrador'

  const recargar = useCallback(async () => {
    if (!esAdmin) {
      setUsuarios([])
      setError('')
      return
    }
    setCargando(true)
    setError('')
    try {
      const lista = await usuarioService.listarUsuariosApi()
      setUsuarios(lista)
    } catch (err) {
      setError(obtenerMensajeError(err))
    } finally {
      setCargando(false)
    }
  }, [esAdmin])

  useEffect(() => {
    if (cargandoSesion) return
    if (esAdmin) {
      recargar()
    } else {
      setUsuarios([])
      setError('')
    }
  }, [cargandoSesion, esAdmin, recargar])

  async function crear(dto) {
    const creado = await usuarioService.crearUsuarioApi(dto)
    setUsuarios((actuales) => [...actuales, creado])
    return creado
  }

  async function actualizar(id, dto) {
    const actualizado = await usuarioService.actualizarUsuarioApi(id, dto)
    setUsuarios((actuales) => actuales.map((u) => (u.id === id ? actualizado : u)))
    return actualizado
  }

  async function eliminar(id) {
    await usuarioService.eliminarUsuarioApi(id)
    setUsuarios((actuales) => actuales.filter((u) => u.id !== id))
  }

  async function obtenerPorId(id) {
    return usuarioService.obtenerUsuarioApi(id)
  }

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        cargando,
        error,
        crear,
        actualizar,
        eliminar,
        obtenerPorId,
        recargar,
      }}
    >
      {props.children}
    </UsuariosContext.Provider>
  )
}

export function useUsuarios() {
  const contexto = useContext(UsuariosContext)
  if (!contexto) {
    throw new Error('useUsuarios debe usarse dentro de un UsuariosProvider')
  }
  return contexto
}