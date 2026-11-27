import { useState } from 'react'
import { Alert, Container, Row, Col, Form } from 'react-bootstrap'
import Navbar from '../components/organisms/Navbar'
import Footer from '../components/organisms/Footer'
import GrillaProductos from '../components/organisms/GrillaProductos'
import Title from '../components/atoms/Title'
import Boton from '../components/atoms/Boton'
import { useProductos } from '../context/ProductoContext'
import { useNavigate } from 'react-router-dom'
import { puedeAgregarAlCarrito } from '../utils/flujoCompra'
import { useTituloPagina } from '../hooks/useTituloPagina'
import './Catalogo.css'

function Catalogo() {
  const { productos, cargando, error, recargar } = useProductos()
  const navigate = useNavigate()

  const [mensajeToast, setMensajeToast] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')

  useTituloPagina('Catálogo')

  const categorias = [...new Set(productos.map((p) => p.categoria))]
  const texto = busqueda.toLowerCase()
  const productosFiltrados = productos.filter((p) =>
    (categoria === '' || p.categoria === categoria) &&
    (p.nombre.toLowerCase().includes(texto) || (p.marca ?? '').toLowerCase().includes(texto))
  )

  function alAgregarCarrito(codigo) {
    const carritoActual = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || []
    const productoEncontrado = productos.find((p) => p.codigo === codigo)

    if (productoEncontrado) {
      const validacion = puedeAgregarAlCarrito(productoEncontrado, 1, carritoActual)

      if (!validacion.valido) {
        setMensajeToast(validacion.mensaje)
        setTimeout(() => setMensajeToast(''), 3000)
        return
      }

      const indexItem = carritoActual.findIndex((item) => item.codigo === codigo)

      if (indexItem >= 0) {
        carritoActual[indexItem].cantidad++
      } else {
        carritoActual.push({ ...productoEncontrado, cantidad: 1 })
      }

      localStorage.setItem('carritoSonidoVivo', JSON.stringify(carritoActual))
      window.dispatchEvent(new Event('storage'))

      setMensajeToast(`${productoEncontrado.nombre} añadido al carrito.`)
      setTimeout(() => {
        setMensajeToast('')
      }, 3000)
    }
  }

  function alVerDetalle(codigo) {
    navigate(`/producto/${codigo}`)
  }

  return (
    <>
      <Navbar />
      <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
        <Container>
          <Title texto="Catálogo" nivel={1} className="text-center mb-5 fw-bold" style={{ color: '#200347' }} />

          <Row className="g-3 mb-4">
            <Col xs={12} md={8}>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre o marca"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="">Todas las categorías</option>
                {categorias.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
              <div className="mt-2">
                <Boton variante="outline-danger" texto="Reintentar" onClick={recargar} />
              </div>
            </Alert>
          )}

          {cargando ? (
            <p className="text-center fs-5 py-4" role="status">
              Cargando catálogo desde el servidor...
            </p>
          ) : (
            <>
              {productosFiltrados.length === 0 && !error && (
                <p className="text-center fs-5">No se encontraron productos con esos filtros.</p>
              )}

              <GrillaProductos
                productos={productosFiltrados}
                onAgregarCarrito={alAgregarCarrito}
                onVerDetalle={alVerDetalle}
              />
            </>
          )}
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

export default Catalogo