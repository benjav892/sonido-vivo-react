import { useEffect, useState } from 'react'
import { Alert, Modal } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductos } from '../context/ProductoContext'
import { obtenerMensajeError } from '../services/api'
import { useTituloPagina } from '../hooks/useTituloPagina'
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador'
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion'
import TarjetaProductoAdmin from '../components/molecules/TarjetaProductoAdmin'
import Title from '../components/atoms/Title'
import Boton from '../components/atoms/Boton'

function PaginaDetalleProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { obtenerPorId, eliminar } = useProductos()

  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false)
  const [eliminando, setEliminando] = useState(false)
  const [errorEliminacion, setErrorEliminacion] = useState('')

  useTituloPagina('Detalle de producto')

  useEffect(() => {
    let activo = true
    async function cargarProducto() {
      setCargando(true)
      setError('')
      try {
        const encontrado = await obtenerPorId(Number(id))
        if (activo) setProducto(encontrado)
      } catch (err) {
        if (activo) {
          setProducto(null)
          setError(obtenerMensajeError(err))
        }
      } finally {
        if (activo) setCargando(false)
      }
    }

    cargarProducto()
    return () => { activo = false }
  }, [id, obtenerPorId])

  function abrirModalEliminar() {
    setErrorEliminacion('')
    setMostrarModalEliminar(true)
  }

  function cerrarModalEliminar() {
    if (eliminando) return
    setMostrarModalEliminar(false)
    setErrorEliminacion('')
  }

  async function confirmarEliminacion() {
    if (!producto) return
    setEliminando(true)
    setErrorEliminacion('')
    try {
      await eliminar(producto.id)
      navigate('/admin/inventario')
    } catch (err) {
      setErrorEliminacion(obtenerMensajeError(err))
    } finally {
      setEliminando(false)
    }
  }

  if (cargando) {
    return (
      <PlantillaAdministrador>
        <EncabezadoSeccion titulo="Detalle del Producto" />
        <p role="status">Cargando información del producto...</p>
      </PlantillaAdministrador>
    )
  }

  if (!producto) {
    return (
      <PlantillaAdministrador>
        <div className="py-5 text-center">
          <Title nivel={2} texto="Producto no encontrado" className="fw-bold mb-3" />
          <p className="text-muted mb-4">
            {error || 'El producto consultado no existe o fue eliminado del inventario.'}
          </p>
          <Boton
            variante="primary"
            texto="Volver a Gestión de Inventario"
            onClick={() => navigate('/admin/inventario')}
          />
        </div>
      </PlantillaAdministrador>
    )
  }

  return (
    <PlantillaAdministrador>
      <EncabezadoSeccion
        titulo="Detalle del Producto"
        textoBoton="← Volver al Inventario"
        varianteBoton="outline-secondary"
        onClickBoton={() => navigate('/admin/inventario')}
      />

      <TarjetaProductoAdmin
        producto={producto}
        onEditar={() => navigate(`/admin/inventario/editar/${producto.id}`)}
        onEliminar={abrirModalEliminar}
      />

      <Modal
        show={mostrarModalEliminar}
        onHide={cerrarModalEliminar}
        centered
        backdrop={eliminando ? 'static' : true}
        keyboard={!eliminando}
      >
        <Modal.Header closeButton={!eliminando}>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            ¿Seguro que deseas eliminar el producto <strong>{producto.nombre}</strong> (
            {producto.codigo})? Esta acción no se puede deshacer.
          </p>
          {errorEliminacion && (
            <Alert variant="danger" className="mt-3 mb-0">
              {errorEliminacion}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Boton
            variante="secondary"
            texto="Cancelar"
            type="button"
            onClick={cerrarModalEliminar}
            disabled={eliminando}
          />
          <Boton
            variante="danger"
            texto={eliminando ? 'Eliminando...' : 'Eliminar'}
            type="button"
            onClick={confirmarEliminacion}
            disabled={eliminando}
          />
        </Modal.Footer>
      </Modal>
    </PlantillaAdministrador>
  )
}

export default PaginaDetalleProducto