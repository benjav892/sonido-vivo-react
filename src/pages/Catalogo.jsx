import { useState } from 'react'; // <-- Importamos useState
import { Container, Row, Col, Form } from 'react-bootstrap';
import Navbar from '../components/organisms/Navbar'; 
import Footer from '../components/organisms/Footer';
import GrillaProductos from '../components/organisms/GrillaProductos';
import Title from '../components/atoms/Title';
import { useProductos } from '../context/ProductoContext';
import { useNavigate } from 'react-router-dom';
import { puedeAgregarAlCarrito } from '../utils/flujoCompra';
import './Catalogo.css'; 

function Catalogo() {
    const { productos } = useProductos();
    const navigate = useNavigate();
    
    // crear el estado para controlar el mensaje en pantalla
    const [mensajeToast, setMensajeToast] = useState('');

    // filtros de búsqueda: por texto y por categoría
    const [busqueda, setBusqueda] = useState('');
    const [categoria, setCategoria] = useState('');
    const categorias = [...new Set(productos.map((p) => p.categoria))];
    const texto = busqueda.toLowerCase();
    const productosFiltrados = productos.filter((p) =>
        (categoria === '' || p.categoria === categoria) &&
        (p.nombre.toLowerCase().includes(texto) || (p.marca ?? '').toLowerCase().includes(texto))
    );

    function alAgregarCarrito(codigo) {
        let carritoActual = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
        const productoEncontrado = productos.find(p => p.codigo === codigo);

        if (productoEncontrado) {
            const validacion = puedeAgregarAlCarrito(productoEncontrado, 1, carritoActual);
            
            if (!validacion.valido) {
                //mostrar el error usando Toast
                setMensajeToast(validacion.mensaje);
                setTimeout(() => setMensajeToast(''), 3000);
                return; 
            }

            const indexItem = carritoActual.findIndex(item => item.codigo === codigo);
            
            if (indexItem >= 0) {
                carritoActual[indexItem].cantidad++;
            } else {
                carritoActual.push({ ...productoEncontrado, cantidad: 1 });
            }

            localStorage.setItem('carritoSonidoVivo', JSON.stringify(carritoActual));
            window.dispatchEvent(new Event('storage'));
            
            // mostrar el mensaje de éxito usando el estado
            setMensajeToast(`${productoEncontrado.nombre} añadido al carrito.`);
            
            // borrar el mensaje después de 3 segundos (3000 milisegundos)
            setTimeout(() => {
                setMensajeToast('');
            }, 3000);
        }
    }

    function alVerDetalle(codigo) {
        navigate(`/producto/${codigo}`);
    }

    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container>
                    <Title texto="Catálogo" nivel={1} className="text-center mb-5 fw-bold" style={{color: '#200347'}} />
                    
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

                    {productosFiltrados.length === 0 && (
                        <p className="text-center fs-5">No se encontraron productos con esos filtros.</p>
                    )}

                    <GrillaProductos 
                        productos={productosFiltrados} 
                        onAgregarCarrito={alAgregarCarrito}
                        onVerDetalle={alVerDetalle}
                    />
                </Container>
            </main>

            {/* Renderizar el elemento visual solo si hay un mensaje escrito */}
            {mensajeToast !== '' && (
                <div className="toast-mensaje">
                    {mensajeToast}
                </div>
            )}

            <Footer />
        </>
    );
}

export default Catalogo;