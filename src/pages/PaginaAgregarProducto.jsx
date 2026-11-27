import { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductos } from '../context/ProductoContext'
import { obtenerMensajeError } from '../services/api'
import { useTituloPagina } from '../hooks/useTituloPagina'
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador'
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion'
import { FormularioProducto } from '../components/organisms/FormularioProducto'

export function PaginaAgregarProducto() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { crear, actualizar, obtenerPorId } = useProductos()

  const [productoAEditar, setProductoAEditar] = useState(null)
  const [cargandoDetalle, setCargandoDetalle] = useState(Boolean(id))
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  const titulo = id ? 'Editar Producto' : 'Añadir Nuevo Producto'
  useTituloPagina(titulo)

  useEffect(() => {
    if (!id) {
      setProductoAEditar(null)
      setCargandoDetalle(false)
      return
    }

    let activo = true
    async function cargarProducto() {
      setCargandoDetalle(true)
      setError('')
      try {
        const encontrado = await obtenerPorId(Number(id))
        if (activo) setProductoAEditar(encontrado)
      } catch (err) {
        if (activo) setError(obtenerMensajeError(err))
      } finally {
        if (activo) setCargandoDetalle(false)
      }
    }

    cargarProducto()
    return () => { activo = false }
  }, [id, obtenerPorId])

  async function manejarEnvioExitoso(dtoProducto) {
    setGuardando(true)
    setError('')
    try {
      if (id) {
        await actualizar(Number(id), dtoProducto)
      } else {
        await crear(dtoProducto)
      }
      navigate('/admin/inventario')
    } catch (err) {
      setError(obtenerMensajeError(err))
    } finally {
      setGuardando(false)
    }
  }

  function manejarCancelar() {
    navigate('/admin/inventario')
  }

  return (
    <PlantillaAdministrador>
      <EncabezadoSeccion
        titulo={titulo}
        textoBoton="← Volver al Inventario"
        varianteBoton="outline-secondary"
        onClickBoton={manejarCancelar}
      />

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <div className="bg-white p-4 shadow-sm rounded border">
        {cargandoDetalle ? (
          <p role="status" className="mb-0">
            Cargando información del producto...
          </p>
        ) : (
          <FormularioProducto
            datosIniciales={productoAEditar}
            onSubmit={manejarEnvioExitoso}
            onCancelar={manejarCancelar}
            cargando={guardando}
          />
        )}
      </div>
    </PlantillaAdministrador>
  )
}

export default PaginaAgregarProducto