import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Alert, Container, Row, Col } from 'react-bootstrap'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'
import MigaPan from '../components/molecules/MigaPan'
import GaleriaDetalle from '../components/organisms/GaleriaDetalle'
import InfoDetalleProducto from '../components/organisms/InfoDetalleProducto'
import GrillaProductos from '../components/organisms/GrillaProductos'
import Title from '../components/atoms/Title'
import Boton from '../components/atoms/Boton'
import { useProductos } from '../context/ProductoContext'
import { puedeAgregarAlCarrito } from '../utils/flujoCompra'
import { useTituloPagina } from '../hooks/useTituloPagina'
import './Catalogo.css'

function DetalleProducto() {
  const { codigo } = useParams()
  const { productos, cargando, error, recargar } = useProductos()
  const navigate = useNavigate()
  const [cantidad, setCantidad] = useState(1)
  const [mensajeToast, setMensajeToast] = useState('')

  useEffect(() => {
    setCantidad(1)
  }, [codigo])

  const producto = productos.find(
    (p) => (p.codigo ?? '').toUpperCase() === (codigo ?? '').toUpperCase()
  )

  useTituloPagina(
    cargando ? 'Cargando producto...' : producto ? producto.nombre : 'Producto no encontrado'
  )

  if (cargando && !producto) {
    return (
      <>
        <Navbar />
        <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
          <Container className="text-center py-5">
            <p className="fs-5" role="status">Cargando producto...</p>
          </Container>
        </main>
        <Footer />
      </>
    )
  }

  if (!producto) {
    return (
      <>
        <Navbar />
        <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
          <Container className="mt-5 text-center">
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
                <div className="mt-2">
                  <Boton variante="outline-danger" texto="Reintentar" onClick={recargar} />
                </div>
              </Alert>
            )}
            <h2>Producto no encontrado</h2>
            <Link to="/catalogo">Volver al catálogo</Link>
          </Container>
        </main>
        <Footer />
      </>
    )
  }

  const enlacesMiga = [{ texto: 'Catálogo', ruta: '/catalogo' }]
  const productosRelacionados = productos.filter((p) => p.codigo !== producto.codigo).slice(0, 4)

  const mostrarToast = (mensaje) => {
    setMensajeToast(mensaje)
    setTimeout(() => setMensajeToast(''), 3000)
  }

  function alAgregarCarrito() {
    const carritoActual = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || []

    const validacion = puedeAgregarAlCarrito(producto, Number(cantidad), carritoActual)
    if (!validacion.valido) {
      mostrarToast(validacion.mensaje)
      return
    }

    const indexItem = carritoActual.findIndex((item) => item.codigo === producto.codigo)
    if (indexItem >= 0) {
      carritoActual[indexItem].cantidad += Number(cantidad)
    } else {
      carritoActual.push({ ...producto, cantidad: Number(cantidad) })
    }

    localStorage.setItem('carritoSonidoVivo', JSON.stringify(carritoActual))
    window.dispatchEvent(new Event('storage'))

    mostrarToast(`${producto.nombre} añadido al carrito.`)
  }

  function alVerDetalle(cod) {
    navigate(`/producto/${cod}`)
  }

  return (
    <>
      <Navbar />
      <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
        <Container>
          <MigaPan enlaces={enlacesMiga} actual={producto.nombre} />

          <Row className="g-5 bg-white p-4 rounded shadow-sm mb-5">
            <Col md={6}>
              <GaleriaDetalle imagenPrincipal={producto.imagen} />
            </Col>
            <Col md={6}>
              <InfoDetalleProducto
                producto={producto}
                cantidad={cantidad}
                onChangeCantidad={(e) => setCantidad(e.target.value)}
                onAgregarCarrito={alAgregarCarrito}
              />
            </Col>
          </Row>

          <section className="pt-4 border-top border-secondary">
            <Title
              texto="Productos Relacionados"
              nivel={3}
              className="text-center mb-4 fw-bold"
              style={{ color: '#200347', fontSize: '1.8rem' }}
            />
            <GrillaProductos
              productos={productosRelacionados}
              onAgregarCarrito={(cod) => {
                const p = productos.find((x) => x.codigo === cod)
                const c = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || []

                const validacion = puedeAgregarAlCarrito(p, 1, c)
                if (!validacion.valido) {
                  mostrarToast(validacion.mensaje)
                  return
                }

                const idx = c.findIndex((item) => item.codigo === cod)
                if (idx >= 0) c[idx].cantidad++
                else c.push({ ...p, cantidad: 1 })

                localStorage.setItem('carritoSonidoVivo', JSON.stringify(c))
                window.dispatchEvent(new Event('storage'))

                mostrarToast(`${p.nombre} añadido al carrito.`)
              }}
              onVerDetalle={alVerDetalle}
            />
          </section>
        </Container>
      </main>

      {mensajeToast !== '' && (
        <div className="toast-mensaje">
          {mensajeToast}
        </div>
      )}

      <Footer />
    </>
  )
}

export default DetalleProducto