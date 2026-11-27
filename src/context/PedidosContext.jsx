import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as pedidoService from '../services/pedidoService'
import { useAuth } from './AuthContext'
import { obtenerMensajeError } from '../services/api'

const PedidosContext = createContext(null)

export function PedidosProvider(props) {
  const { estaAutenticado, cargandoSesion } = useAuth()
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const recargar = useCallback(async () => {
    if (!estaAutenticado) {
      setPedidos([])
      setError('')
      return
    }
    setCargando(true)
    setError('')
    try {
      const lista = await pedidoService.listarPedidosApi()
      setPedidos(lista)
    } catch (err) {
      setError(obtenerMensajeError(err))
    } finally {
      setCargando(false)
    }
  }, [estaAutenticado])

  useEffect(() => {
    if (cargandoSesion) return
    if (estaAutenticado) {
      recargar()
    } else {
      setPedidos([])
      setError('')
    }
  }, [cargandoSesion, estaAutenticado, recargar])

  async function crearPedido(dto) {
    const creado = await pedidoService.crearPedidoApi(dto)
    setPedidos((actuales) => [creado, ...actuales])
    return creado
  }

  async function cambiarEstado(id, dto) {
    const actualizado = await pedidoService.actualizarEstadoPedidoApi(id, dto)
    setPedidos((actuales) => actuales.map((p) => (p.id === id ? actualizado : p)))
    return actualizado
  }

  const obtenerPorId = useCallback(async (id) => {
    return pedidoService.obtenerPedidoApi(id)
  }, [])

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        cargando,
        error,
        crearPedido,
        cambiarEstado,
        obtenerPorId,
        recargar,
      }}
    >
      {props.children}
    </PedidosContext.Provider>
  )
}

export function usePedidos() {
  const contexto = useContext(PedidosContext)
  if (!contexto) {
    throw new Error('usePedidos debe usarse dentro de un PedidosProvider')
  }
  return contexto
}