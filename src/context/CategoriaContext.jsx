import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as categoriaService from '../services/categoriaService'
import { obtenerMensajeError } from '../services/api'

const CategoriasContext = createContext(null)

export function CategoriasProvider(props) {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const recargar = useCallback(async () => {
    setCargando(true)
    setError('')
    try {
      const lista = await categoriaService.listarCategoriasApi()
      setCategorias(lista)
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
    const creada = await categoriaService.crearCategoriaApi(dto)
    setCategorias((actuales) => [...actuales, creada])
    return creada
  }

  async function actualizar(id, dto) {
    const actualizada = await categoriaService.actualizarCategoriaApi(id, dto)
    setCategorias((actuales) => actuales.map((c) => (c.id === id ? actualizada : c)))
    return actualizada
  }

  async function eliminar(id) {
    await categoriaService.eliminarCategoriaApi(id)
    setCategorias((actuales) => actuales.filter((c) => c.id !== id))
  }

  const obtenerPorId = useCallback(async (id) => {
    return categoriaService.obtenerCategoriaApi(id)
  }, [])

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
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
    </CategoriasContext.Provider>
  )
}

export function useCategorias() {
  const contexto = useContext(CategoriasContext)
  if (!contexto) {
    throw new Error('useCategorias debe usarse dentro de un CategoriasProvider')
  }
  return contexto
}