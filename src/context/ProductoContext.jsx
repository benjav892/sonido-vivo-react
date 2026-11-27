import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as productoService from '../services/productoService'
import { obtenerMensajeError } from '../services/api'

const ProductosContext = createContext(null)

export function ProductosProvider(props) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const recargar = useCallback(async () => {
    setCargando(true)
    setError('')
    try {
      const lista = await productoService.listarProductosApi()
      setProductos(lista)
    } catch (err) {
      setError(obtenerMensajeError(err))
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    recargar()
  }, [recargar])

  async function crear(dto) {
    const creado = await productoService.crearProductoApi(dto)
    setProductos((actuales) => [...actuales, creado])
    return creado
  }

  async function actualizar(id, dto) {
    const actualizado = await productoService.actualizarProductoApi(id, dto)
    setProductos((actuales) => actuales.map((p) => (p.id === id ? actualizado : p)))
    return actualizado
  }

  async function actualizarStock(id, dto) {
    const actualizado = await productoService.actualizarStockApi(id, dto)
    setProductos((actuales) => actuales.map((p) => (p.id === id ? actualizado : p)))
    return actualizado
  }

  async function eliminar(id) {
    await productoService.eliminarProductoApi(id)
    setProductos((actuales) => actuales.filter((p) => p.id !== id))
  }

  const obtenerPorId = useCallback(async (id) => {
    return productoService.obtenerProductoApi(id)
  }, [])

  const obtenerPorCodigo = useCallback(async (codigo) => {
    return productoService.obtenerProductoPorCodigoApi(codigo)
  }, [])

  return (
    <ProductosContext.Provider
      value={{
        productos,
        cargando,
        error,
        crear,
        actualizar,
        actualizarStock,
        eliminar,
        obtenerPorId,
        obtenerPorCodigo,
        recargar,
      }}
    >
      {props.children}
    </ProductosContext.Provider>
  )
}

export function useProductos() {
  const contexto = useContext(ProductosContext)
  if (!contexto) {
    throw new Error('useProductos debe usarse dentro de un ProductosProvider')
  }
  return contexto
}