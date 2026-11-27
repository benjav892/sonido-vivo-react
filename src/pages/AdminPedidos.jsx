import { useState } from 'react'
import { Alert, Badge, Form, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador'
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion'
import BarraBusqueda from '../components/molecules/BarraBusqueda'
import TablaDinamica from '../components/organisms/TablaDinamica'
import Boton from '../components/atoms/Boton'
import { usePedidos } from '../context/PedidosContext'
import { useProductos } from '../context/ProductoContext'
import { useSoloPersonal } from '../hooks/useSoloPersonal'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { crearPedidoEstadoDto } from '../dto/pedido.dto'
import { obtenerMensajeError } from '../services/api'
import { formatearPrecio } from '../utils/formatos'

function colorEstado(estado) {
  switch (estado) {
    case 'En preparación':
      return 'warning'
    case 'Despachado':
      return 'info'
    case 'Entregado':
      return 'success'
    case 'Cancelado':
      return 'danger'
    default:
      return 'secondary'
  }
}

function AdminPedidos() {
  const autorizado = useSoloPersonal()
  const navigate = useNavigate()
  const { pedidos, cargando, error, cambiarEstado, recargar } = usePedidos()
  const { recargar: recargarProductos } = useProductos()

  const [busqueda, setBusqueda] = useState('')
  const [actualizandoId, setActualizandoId] = useState(null)
  const [errorAccion, setErrorAccion] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')

  // Modal de confirmación para cancelar pedido (restituye stock en BD)
  const [pedidoACancelar, setPedidoACancelar] = useState(null)

  useTituloPagina('Gestión de pedidos')

  if (!autorizado) return null

  async function aplicarCambioEstado(pedido, nuevoEstado) {
    setActualizandoId(pedido.id)
    setErrorAccion('')
    setMensajeExito('')
    try {
      const dto = crearPedidoEstadoDto(nuevoEstado)
      await cambiarEstado(pedido.id, dto)
      if (nuevoEstado === 'Cancelado') {
        await recargarProductos()
        setMensajeExito(
          `Pedido ${pedido.codigoPedido} cancelado. El stock de los productos fue restituido.`
        )
      } else {
        setMensajeExito(
          `Estado del pedido ${pedido.codigoPedido} actualizado a "${nuevoEstado}".`
        )
      }
      setPedidoACancelar(null)
    } catch (err) {
      setErrorAccion(obtenerMensajeError(err))
      setPedidoACancelar(null)
    } finally {
      setActualizandoId(null)
    }
  }

  function manejarSeleccionEstado(pedido, nuevoEstado) {
    if (nuevoEstado === pedido.estado) return
    if (nuevoEstado === 'Cancelado') {
      setErrorAccion('')
      setPedidoACancelar(pedido)
      return
    }
    aplicarCambioEstado(pedido, nuevoEstado)
  }

  const texto = busqueda.toLowerCase()
  const pedidosFiltrados = pedidos.filter(
    (p) =>
      (p.codigoPedido ?? '').toLowerCase().includes(texto) ||
      (p.clienteNombre ?? '').toLowerCase().includes(texto) ||
      (p.clienteEmail ?? '').toLowerCase().includes(texto) ||
      (p.estado ?? '').toLowerCase().includes(texto)
  )

  const columnas = [
    { titulo: 'Orden', llave: 'codigoPedido' },
    {
      titulo: 'Cliente',
      render: (p) => (
        <div>
          <div className="fw-semibold">{p.clienteNombre}</div>
          <small className="text-muted">{p.clienteEmail}</small>
        </div>
      ),
    },
    { titulo: 'Fecha', llave: 'fecha' },
    { titulo: 'Total', render: (p) => formatearPrecio(p.total) },
    {
      titulo: 'Estado',
      render: (p) => {
        const esFinal = p.estado === 'Entregado' || p.estado === 'Cancelado'
        return (
          <>
            <Badge
              bg={colorEstado(p.estado)}
              className="mb-2 d-block"
              style={{ width: 'fit-content' }}
            >
              {p.estado}
            </Badge>
            <Form.Select
              size="sm"
              value={p.estado}
              disabled={esFinal || actualizandoId === p.id}
              onChange={(e) => manejarSeleccionEstado(p, e.target.value)}
              style={{ maxWidth: '170px' }}
            >
              <option value="En preparación">En preparación</option>
              <option value="Despachado">Despachado</option>
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
            </Form.Select>
          </>
        )
      },
    },
    {
      titulo: 'Acciones',
      render: (p) => (
        <Boton
          variante="info"
          texto="Ver comprobante"
          className="btn-sm"
          onClick={() => navigate(`/admin/pedidos/${p.id}`)}
        />
      ),
    },
  ]

  return (
    <PlantillaAdministrador>
      <EncabezadoSeccion titulo="Gestión de Pedidos" />

      {mensajeExito && (
        <Alert variant="success" dismissible onClose={() => setMensajeExito('')}>
          {mensajeExito}
        </Alert>
      )}

      {(error || errorAccion) && (
        <Alert variant="danger" dismissible onClose={() => setErrorAccion('')}>
          {errorAccion || error}
          {error && (
            <div className="mt-2">
              <Boton variante="outline-danger" texto="Reintentar" onClick={recargar} />
            </div>
          )}
        </Alert>
      )}

      <BarraBusqueda
        placeholder="Buscar por orden, cliente, correo o estado"
        valor={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        textoBoton="LIMPIAR"
        onBuscar={() => setBusqueda('')}
      />

      {cargando ? (
        <div className="text-center py-4" role="status">
          Cargando pedidos desde el servidor...
        </div>
      ) : (
        <TablaDinamica columnas={columnas} datos={pedidosFiltrados} />
      )}

      <Modal
        show={Boolean(pedidoACancelar)}
        onHide={() => (actualizandoId ? null : setPedidoACancelar(null))}
        centered
        backdrop={actualizandoId ? 'static' : true}
        keyboard={!actualizandoId}
      >
        <Modal.Header closeButton={!actualizandoId}>
          <Modal.Title>Confirmar cancelación de pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            ¿Seguro que deseas cancelar el pedido{' '}
            <strong>{pedidoACancelar?.codigoPedido}</strong>? Esta acción restituirá
            automáticamente el stock de sus productos en el inventario y no se podrá revertir.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Boton
            variante="secondary"
            texto="Volver"
            type="button"
            onClick={() => setPedidoACancelar(null)}
            disabled={Boolean(actualizandoId)}
          />
          <Boton
            variante="danger"
            texto={actualizandoId ? 'Cancelando...' : 'Confirmar cancelación'}
            type="button"
            onClick={() => aplicarCambioEstado(pedidoACancelar, 'Cancelado')}
            disabled={Boolean(actualizandoId)}
          />
        </Modal.Footer>
      </Modal>
    </PlantillaAdministrador>
  )
}

export default AdminPedidos