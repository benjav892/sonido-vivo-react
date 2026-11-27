import { useEffect, useState } from 'react'
import { Alert, Badge } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador'
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion'
import TablaDinamica from '../components/organisms/TablaDinamica'
import Boton from '../components/atoms/Boton'
import { usePedidos } from '../context/PedidosContext'
import { useSoloPersonal } from '../hooks/useSoloPersonal'
import { useTituloPagina } from '../hooks/useTituloPagina'
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

function PaginaDetallePedido() {
  const autorizado = useSoloPersonal()
  const navigate = useNavigate()
  const { id } = useParams()
  const { obtenerPorId } = usePedidos()

  const [pedido, setPedido] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useTituloPagina('Comprobante de pedido')

  useEffect(() => {
    if (!autorizado) return
    let activo = true

    async function cargarPedido() {
      setCargando(true)
      setError('')
      try {
        const encontrado = await obtenerPorId(Number(id))
        if (activo) setPedido(encontrado)
      } catch (err) {
        if (activo) {
          setPedido(null)
          setError(obtenerMensajeError(err))
        }
      } finally {
        if (activo) setCargando(false)
      }
    }

    cargarPedido()
    return () => { activo = false }
  }, [id, autorizado, obtenerPorId])

  if (!autorizado) return null

  const volver = (
    <Boton
      variante="secondary"
      texto="Volver a pedidos"
      onClick={() => navigate('/admin/pedidos')}
    />
  )

  if (cargando) {
    return (
      <PlantillaAdministrador>
        <EncabezadoSeccion titulo="Comprobante de pedido" />
        <p role="status">Cargando información del pedido...</p>
      </PlantillaAdministrador>
    )
  }

  if (!pedido) {
    return (
      <PlantillaAdministrador>
        <EncabezadoSeccion titulo="Pedido no encontrado" />
        <Alert variant="warning" className="mb-4">
          {error || `No existe un pedido con el identificador "${id}".`}
        </Alert>
        {volver}
      </PlantillaAdministrador>
    )
  }

  const items = pedido.items ?? []

  const columnas = [
    { titulo: 'Código', llave: 'codigo' },
    { titulo: 'Producto', llave: 'nombre' },
    { titulo: 'Cantidad', llave: 'cantidad' },
    { titulo: 'Precio unitario', render: (i) => formatearPrecio(i.precio) },
    { titulo: 'Subtotal', render: (i) => formatearPrecio(i.subtotal ?? i.precio * i.cantidad) },
  ]

  return (
    <PlantillaAdministrador>
      <EncabezadoSeccion titulo={`Comprobante ${pedido.codigoPedido}`} />

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3 text-primary">Datos del pedido</h5>
        <p className="mb-1"><strong>Código de orden:</strong> {pedido.codigoPedido}</p>
        <p className="mb-1"><strong>Cliente:</strong> {pedido.clienteNombre}</p>
        <p className="mb-1"><strong>Correo:</strong> {pedido.clienteEmail}</p>
        <p className="mb-1"><strong>Fecha:</strong> {pedido.fecha}</p>
        <p className="mb-1">
          <strong>Entrega:</strong>{' '}
          {pedido.tipoDespacho === 'retiro' ? 'Retiro en tienda' : 'Despacho a domicilio'}
        </p>
        {pedido.direccionDespacho && (
          <p className="mb-1"><strong>Dirección:</strong> {pedido.direccionDespacho}</p>
        )}
        <p className="mb-0">
          <strong>Estado:</strong>{' '}
          <Badge bg={colorEstado(pedido.estado)}>{pedido.estado}</Badge>
        </p>
      </div>

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3 text-primary">Detalle de la compra</h5>
        {items.length > 0 ? (
          <TablaDinamica columnas={columnas} datos={items} />
        ) : (
          <div className="alert alert-info mb-0">
            Este pedido no registra ítems asociados.
          </div>
        )}
        <h4 className="text-end mt-3 mb-0">Total: {formatearPrecio(pedido.total)}</h4>
      </div>

      {volver}
    </PlantillaAdministrador>
  )
}

export default PaginaDetallePedido