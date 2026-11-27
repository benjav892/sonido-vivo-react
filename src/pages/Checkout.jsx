import { useState, useEffect } from 'react'
import { Alert, Container, Form, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'
import Title from '../components/atoms/Title'
import Boton from '../components/atoms/Boton'
import { useProductos } from '../context/ProductoContext'
import { useAuth } from '../context/AuthContext'
import { usePedidos } from '../context/PedidosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { crearPedidoRequestDto } from '../dto/pedido.dto'
import { obtenerMensajeError } from '../services/api'
import { formatearPrecio } from '../utils/formatos'

function Checkout() {
  useTituloPagina('Checkout')

  const [carrito, setCarrito] = useState([])
  const [tipoDespacho, setTipoDespacho] = useState('despacho')
  const [direccionDespacho, setDireccionDespacho] = useState('')
  const [metodoPago, setMetodoPago] = useState('tarjeta')
  const [enviando, setEnviando] = useState(false)
  const [errorMensaje, setErrorMensaje] = useState('')
  const [esConflictoStock, setEsConflictoStock] = useState(false)

  const navigate = useNavigate()
  const { productos, recargar: recargarProductos } = useProductos()
  const { estaAutenticado } = useAuth()
  const { crearPedido } = usePedidos()

  useEffect(() => {
    if (!estaAutenticado) {
      navigate('/login')
      return
    }

    const carritoGuardado = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || []
    if (carritoGuardado.length === 0) {
      navigate('/carrito')
      return
    }
    setCarrito(carritoGuardado)
  }, [navigate, estaAutenticado])

  const totalEstimado = carrito.reduce(
    (acc, item) => acc + Number(item.precio ?? item.precioClp ?? 0) * Number(item.cantidad ?? 0),
    0
  )

  async function confirmarPedido(e) {
    e.preventDefault()
    setErrorMensaje('')
    setEsConflictoStock(false)

    if (tipoDespacho === 'despacho' && !direccionDespacho.trim()) {
      setErrorMensaje('Debes ingresar una dirección para el despacho a domicilio.')
      return
    }

    const dto = crearPedidoRequestDto({
      tipoDespacho,
      direccionDespacho,
      carrito,
      productos,
    })

    if (dto.items.some((item) => !item.productoId || Number.isNaN(item.productoId))) {
      setErrorMensaje(
        'Uno o más productos del carrito no están sincronizados. Vacía el carrito y vuelve a agregarlos.'
      )
      return
    }

    setEnviando(true)
    try {
      const pedidoCreado = await crearPedido(dto)

      localStorage.removeItem('carritoSonidoVivo')
      window.dispatchEvent(new Event('storage'))
      await recargarProductos()

      navigate('/respuesta-compra', {
        state: {
          exito: true,
          orden: pedidoCreado.codigoPedido,
          total: pedidoCreado.total,
        },
      })
    } catch (err) {
      const es409 = err.response?.status === 409
      setEsConflictoStock(es409)
      setErrorMensaje(obtenerMensajeError(err))
      if (es409) {
        await recargarProductos()
      }
    } finally {
      setEnviando(false)
    }
  }

  if (!estaAutenticado) return null

  return (
    <>
      <Navbar />
      <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
        <Container style={{ maxWidth: '650px' }}>
          <Title
            texto="Checkout"
            nivel={1}
            className="text-center mb-4 fw-bold"
            style={{ color: '#200347' }}
          />

          <Form onSubmit={confirmarPedido} className="bg-white p-4 rounded shadow-sm">
            <h4 className="mb-3" style={{ color: '#4D3D4F' }}>
              Resumen de productos
            </h4>
            <ListGroup className="mb-4">
              {carrito.map((item) => (
                <ListGroup.Item
                  key={item.codigo}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.nombre}</strong>{' '}
                    <span className="text-muted">x{item.cantidad}</span>
                  </div>
                  <span>
                    {formatearPrecio(
                      Number(item.precio ?? item.precioClp ?? 0) * Number(item.cantidad ?? 0)
                    )}
                  </span>
                </ListGroup.Item>
              ))}
              <ListGroup.Item className="d-flex justify-content-between fw-bold bg-light">
                <span>Total estimado</span>
                <span>{formatearPrecio(totalEstimado)}</span>
              </ListGroup.Item>
            </ListGroup>

            <h4 className="mb-3" style={{ color: '#4D3D4F' }}>
              1. Opciones de Entrega
            </h4>
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                id="entrega-despacho"
                label="Despacho a Domicilio"
                name="despacho"
                checked={tipoDespacho === 'despacho'}
                onChange={() => setTipoDespacho('despacho')}
                disabled={enviando}
              />
              <Form.Check
                type="radio"
                id="entrega-retiro"
                label="Retiro en Tienda (Viña del Mar)"
                name="despacho"
                checked={tipoDespacho === 'retiro'}
                onChange={() => setTipoDespacho('retiro')}
                disabled={enviando}
              />
            </Form.Group>

            {tipoDespacho === 'despacho' && (
              <Form.Group className="mb-4" controlId="direccion-despacho">
                <Form.Label>Dirección de despacho *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Av. Libertad 1348, Viña del Mar"
                  value={direccionDespacho}
                  onChange={(e) => setDireccionDespacho(e.target.value)}
                  disabled={enviando}
                  required
                />
              </Form.Group>
            )}

            <h4 className="mb-3" style={{ color: '#4D3D4F' }}>
              2. Método de Pago
            </h4>
            <Form.Group className="mb-4">
              <Form.Select
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
                disabled={enviando}
              >
                <option value="tarjeta">Tarjeta de Crédito / Débito</option>
                <option value="transferencia">Transferencia Bancaria</option>
              </Form.Select>
            </Form.Group>

            {errorMensaje && (
              <Alert variant={esConflictoStock ? 'warning' : 'danger'} className="mb-4">
                <strong>
                  {esConflictoStock ? 'Conflicto de stock (409): ' : 'No se pudo completar el pedido: '}
                </strong>
                {errorMensaje}
                {esConflictoStock && (
                  <div className="mt-2">
                    <Boton
                      variante="outline-dark"
                      texto="Volver al carrito para ajustar cantidades"
                      type="button"
                      onClick={() => navigate('/carrito')}
                    />
                  </div>
                )}
              </Alert>
            )}

            <Boton
              texto={enviando ? 'Procesando pedido...' : 'Confirmar y Pagar'}
              type="submit"
              className="w-100 py-3 fs-5"
              style={{ backgroundColor: '#094d17', border: 'none' }}
              disabled={enviando}
            />
          </Form>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default Checkout