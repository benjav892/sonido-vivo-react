import { useState } from 'react'
import { Alert, Form, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useProductos } from '../context/ProductoContext'
import { crearStockUpdateDto } from '../dto/producto.dto'
import { obtenerMensajeError } from '../services/api'
import { useTituloPagina } from '../hooks/useTituloPagina'
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador'
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion'
import BarraBusqueda from '../components/molecules/BarraBusqueda'
import TablaDinamica from '../components/organisms/TablaDinamica'
import Boton from '../components/atoms/Boton'

export function PaginaGestionInventario() {
  const [busqueda, setBusqueda] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')

  // Modal de ajuste rápido de stock (PATCH /v1/productos/{id}/stock)
  const [productoStock, setProductoStock] = useState(null)
  const [nuevoStock, setNuevoStock] = useState('')
  const [actualizandoStock, setActualizandoStock] = useState(false)
  const [errorStock, setErrorStock] = useState('')

  // Modal de confirmación de eliminación
  const [productoAEliminar, setProductoAEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const [errorEliminacion, setErrorEliminacion] = useState('')

  const { productos, cargando, error, actualizarStock, eliminar, recargar } = useProductos()
  const navigate = useNavigate()

  useTituloPagina('Gestión de inventario')

  function irAAgregarProducto() {
    navigate('/admin/inventario/nuevo')
  }

  function irAEditarProducto(id) {
    navigate(`/admin/inventario/editar/${id}`)
  }

  function abrirModalStock(producto) {
    setErrorStock('')
    setMensajeExito('')
    setProductoStock(producto)
    setNuevoStock(String(producto.stock))
  }

  function cerrarModalStock() {
    if (actualizandoStock) return
    setProductoStock(null)
    setNuevoStock('')
    setErrorStock('')
  }

  async function guardarStock(evento) {
    evento.preventDefault()
    if (!productoStock) return

    const valorNumerico = Number(nuevoStock)
    if (nuevoStock === '' || Number.isNaN(valorNumerico) || !Number.isInteger(valorNumerico) || valorNumerico < 0) {
      setErrorStock('Ingresa una cantidad entera mayor o igual a 0.')
      return
    }

    setActualizandoStock(true)
    setErrorStock('')
    try {
      const dto = crearStockUpdateDto(valorNumerico)
      await actualizarStock(productoStock.id, dto)
      setMensajeExito(`Stock de "${productoStock.nombre}" actualizado a ${valorNumerico} unidades.`)
      setProductoStock(null)
    } catch (err) {
      setErrorStock(obtenerMensajeError(err))
    } finally {
      setActualizandoStock(false)
    }
  }

  function solicitarEliminacion(producto) {
    setErrorEliminacion('')
    setMensajeExito('')
    setProductoAEliminar(producto)
  }

  function cancelarEliminacion() {
    if (eliminando) return
    setProductoAEliminar(null)
    setErrorEliminacion('')
  }

  async function confirmarEliminacion() {
    if (!productoAEliminar) return
    setEliminando(true)
    setErrorEliminacion('')
    try {
      await eliminar(productoAEliminar.id)
      setMensajeExito(`Producto "${productoAEliminar.nombre}" eliminado correctamente.`)
      setProductoAEliminar(null)
    } catch (err) {
      setErrorEliminacion(obtenerMensajeError(err))
    } finally {
      setEliminando(false)
    }
  }

  const productosFiltrados = productos.filter((producto) => {
    const textoBusqueda = busqueda.toLowerCase()
    const nombre = (producto.nombre || '').toLowerCase()
    const codigo = (producto.codigo || '').toLowerCase()
    const categoria = (producto.categoria || '').toLowerCase()

    return (
      nombre.includes(textoBusqueda) ||
      codigo.includes(textoBusqueda) ||
      categoria.includes(textoBusqueda)
    )
  })

  const columnasInventario = [
    { titulo: 'Nombre', llave: 'nombre' },
    { titulo: 'Cod. Producto', llave: 'codigo' },
    { titulo: 'Categoría', llave: 'categoria' },
    {
      titulo: 'Precio',
      llave: 'precio',
      render: (producto) => `$${Number(producto.precio ?? producto.precioClp ?? 0).toLocaleString('es-CL')}`,
    },
    {
      titulo: 'Stock',
      llave: 'stock',
      render: (producto) => (
        <span className={producto.stock <= producto.stockMinimo ? 'text-danger fw-bold' : 'text-success fw-bold'}>
          {producto.stock}
        </span>
      ),
    },
    {
      titulo: 'Stock Mínimo',
      llave: 'stockMinimo',
      claseCelda: 'text-warning fw-bold',
    },
    {
      titulo: 'Acciones',
      llave: 'acciones',
      claseEncabezado: 'text-center',
      claseCelda: 'text-center',
      render: (producto) => (
        <div className="d-flex justify-content-center gap-1 flex-wrap">
          <Boton
            variante="primary"
            texto="Detalle"
            className="btn-sm border"
            onClick={() => navigate(`/admin/inventario/detalle/${producto.id}`)}
          />
          <Boton
            variante="success"
            texto="Stock"
            className="btn-sm border"
            onClick={() => abrirModalStock(producto)}
          />
          <Boton
            variante="warning"
            texto="Editar"
            className="btn-sm border"
            onClick={() => irAEditarProducto(producto.id)}
          />
          <Boton
            variante="danger"
            texto="Eliminar"
            className="btn-sm border"
            onClick={() => solicitarEliminacion(producto)}
          />
        </div>
      ),
    },
  ]

  return (
    <PlantillaAdministrador>
      <EncabezadoSeccion
        titulo="Gestión de Inventario"
        textoBoton="AGREGAR PRODUCTO"
        onClickBoton={irAAgregarProducto}
      />

      {mensajeExito && (
        <Alert variant="success" dismissible onClose={() => setMensajeExito('')}>
          {mensajeExito}
        </Alert>
      )}

      {error && (
        <Alert variant="danger">
          {error}
          <div className="mt-2">
            <Boton variante="outline-danger" texto="Reintentar" onClick={recargar} />
          </div>
        </Alert>
      )}

      <BarraBusqueda
        placeholder="Buscar por nombre, código o categoría"
        textoBoton="LIMPIAR"
        valor={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onBuscar={() => setBusqueda('')}
      />

      {cargando ? (
        <div className="text-center py-4" role="status">
          Cargando inventario desde el servidor...
        </div>
      ) : (
        <TablaDinamica columnas={columnasInventario} datos={productosFiltrados} />
      )}

      {/* Modal de ajuste rápido de stock */}
      <Modal
        show={Boolean(productoStock)}
        onHide={cerrarModalStock}
        centered
        backdrop={actualizandoStock ? 'static' : true}
        keyboard={!actualizandoStock}
      >
        <Form onSubmit={guardarStock}>
          <Modal.Header closeButton={!actualizandoStock}>
            <Modal.Title>Actualizar stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-3">
              Producto: <strong>{productoStock?.nombre}</strong> ({productoStock?.codigo})
              <br />
              <small className="text-muted">
                Stock actual: {productoStock?.stock} | Stock mínimo: {productoStock?.stockMinimo}
              </small>
            </p>
            <Form.Group controlId="nuevo-stock">
              <Form.Label>Nuevo stock disponible</Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={1}
                value={nuevoStock}
                onChange={(e) => setNuevoStock(e.target.value)}
                disabled={actualizandoStock}
                required
              />
            </Form.Group>
            {errorStock && (
              <Alert variant="danger" className="mt-3 mb-0">
                {errorStock}
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Boton
              variante="secondary"
              texto="Cancelar"
              type="button"
              onClick={cerrarModalStock}
              disabled={actualizandoStock}
            />
            <Boton
              variante="success"
              texto={actualizandoStock ? 'Actualizando...' : 'Guardar stock'}
              type="submit"
              disabled={actualizandoStock}
            />
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal
        show={Boolean(productoAEliminar)}
        onHide={cancelarEliminacion}
        centered
        backdrop={eliminando ? 'static' : true}
        keyboard={!eliminando}
      >
        <Modal.Header closeButton={!eliminando}>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            ¿Seguro que deseas eliminar el producto{' '}
            <strong>{productoAEliminar?.nombre}</strong> ({productoAEliminar?.codigo})? Esta acción
            no se puede deshacer.
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
            onClick={cancelarEliminacion}
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