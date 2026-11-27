import { useState } from 'react'
import { Alert, Container, Modal, Table, Badge } from 'react-bootstrap'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'
import Title from '../components/atoms/Title'
import Precio from '../components/atoms/Precio'
import Boton from '../components/atoms/Boton'
import { useAuth } from '../context/AuthContext'
import { usePedidos } from '../context/PedidosContext'
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

function MisPedidos() {
  useTituloPagina('Mis Pedidos')

  const { usuario, estaAutenticado } = useAuth()
  const { pedidos, cargando, error, obtenerPorId, recargar } = usePedidos()

  const [pedidoDetalle, setPedidoDetalle] = useState(null)
  const [cargandoDetalle, setCargandoDetalle] = useState(false)
  const [errorDetalle, setErrorDetalle] = useState('')

  // Para Cliente la API ya devuelve solo los suyos; para personal filtra solo sus compras propias.
  const misPedidosFiltrados =
    estaAutenticado && usuario
      ? pedidos.filter(
          (p) => p.clienteId === usuario.id || p.clienteEmail === (usuario.email ?? usuario.correo)
        )
      : []

  async function abrirDetalle(idPedido) {
    setCargandoDetalle(true)
    setErrorDetalle('')
    setPedidoDetalle({ id: idPedido })
    try {
      const detalle = await obtenerPorId(idPedido)
      setPedidoDetalle(detalle)
    } catch (err) {
      setErrorDetalle(obtenerMensajeError(err))
    } finally {
      setCargandoDetalle(false)
    }
  }

  function cerrarDetalle() {
    setPedidoDetalle(null)
    setErrorDetalle('')
  }

  return (
    <>
      <Navbar />
      <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
        <Container style={{ maxWidth: '960px' }}>
          <Title
            texto="Mis Pedidos"
            nivel={1}
            className="text-center mb-4 fw-bold"
            style={{ color: '#200347' }}
          />

          <div className="bg-white p-4 rounded shadow-sm overflow-auto">
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
                <div className="mt-2">
                  <Boton variante="outline-danger" texto="Reintentar" onClick={recargar} />
                </div>
              </Alert>
            )}

            {!estaAutenticado ? (
              <p className="text-center fs-5 m-0 text-muted">
                Debes iniciar sesión para ver tus pedidos.
              </p>
            ) : cargando ? (
              <p className="text-center fs-5 m-0 text-muted" role="status">
                Cargando tus pedidos...
              </p>
            ) : misPedidosFiltrados.length === 0 ? (
              <p className="text-center fs-5 m-0 text-muted">
                Aún no tienes pedidos registrados.
              </p>
            ) : (
              <Table striped hover className="m-0 align-middle text-center">
                <thead>
                  <tr>
                    <th>Orden</th>
                    <th>Fecha</th>
                    <th>Entrega</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {misPedidosFiltrados.map((pedido) => (
                    <tr key={pedido.id}>
                      <td className="fw-bold">{pedido.codigoPedido}</td>
                      <td>{pedido.fecha}</td>
                      <td className="text-capitalize">{pedido.tipoDespacho}</td>
                      <td>
                        <Precio valor={pedido.total} />
                      </td>
                      <td>
                        <Badge bg={colorEstado(pedido.estado)} className="fs-6">
                          {pedido.estado}
                        </Badge>
                      </td>
                      <td>
                        <Boton
                          variante="outline-primary"
                          texto="Ver detalle"
                          className="btn-sm"
                          onClick={() => abrirDetalle(pedido.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Container>
      </main>

      <Modal show={Boolean(pedidoDetalle)} onHide={cerrarDetalle} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Detalle de pedido {pedidoDetalle?.codigoPedido || ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cargandoDetalle ? (
            <p className="text-center py-3 mb-0" role="status">
              Cargando detalle del pedido...
            </p>
          ) : errorDetalle ? (
            <Alert variant="danger" className="mb-0">
              {errorDetalle}
            </Alert>
          ) : (
            pedidoDetalle && (
              <>
                <div className="mb-3">
                  <p className="mb-1">
                    <strong>Fecha:</strong> {pedidoDetalle.fecha}
                  </p>
                  <p className="mb-1">
                    <strong>Entrega:</strong>{' '}
                    {pedidoDetalle.tipoDespacho === 'retiro'
                      ? 'Retiro en tienda'
                      : 'Despacho a domicilio'}
                  </p>
                  {pedidoDetalle.direccionDespacho && (
                    <p className="mb-1">
                      <strong>Dirección:</strong> {pedidoDetalle.direccionDespacho}
                    </p>
                  )}
                  <p className="mb-0">
                    <strong>Estado:</strong>{' '}
                    <Badge bg={colorEstado(pedidoDetalle.estado)}>
                      {pedidoDetalle.estado}
                    </Badge>
                  </p>
                </div>

                <Table striped bordered size="sm" className="align-middle mb-3">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Producto</th>
                      <th className="text-center">Cant.</th>
                      <th className="text-end">Precio Unit.</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(pedidoDetalle.items || []).map((item) => (
                      <tr key={item.productoId ?? item.codigo}>
                        <td>{item.codigo}</td>
                        <td>{item.nombre}</td>
                        <td className="text-center">{item.cantidad}</td>
                        <td className="text-end">{formatearPrecio(item.precio)}</td>
                        <td className="text-end">{formatearPrecio(item.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <h5 className="text-end mb-0">
                  Total: {formatearPrecio(pedidoDetalle.total)}
                </h5>
              </>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Boton variante="secondary" texto="Cerrar" type="button" onClick={cerrarDetalle} />
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  )
}

export default MisPedidos