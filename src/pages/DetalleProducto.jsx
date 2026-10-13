import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import MigaPan from '../components/molecules/MigaPan';
import GaleriaDetalle from '../components/organisms/GaleriaDetalle';
import InfoDetalleProducto from '../components/organisms/InfoDetalleProducto';
import GrillaProductos from '../components/organisms/GrillaProductos';
import Title from '../components/atoms/Title';
import { useProductos } from '../context/ProductoContext';
import { puedeAgregarAlCarrito } from '../utils/flujoCompra';
import './Catalogo.css'; 

function DetalleProducto() {
    const { codigo } = useParams();
    const { productos } = useProductos();
    const navigate = useNavigate();
    const [cantidad, setCantidad] = useState(1);
    
    // estado para toast
    const [mensajeToast, setMensajeToast] = useState('');
    
    const producto = productos.find(p => p.codigo === codigo);

    if (!producto) {
        return (
            <Container className="mt-5 text-center min-vh-100">
                <h2>Producto no encontrado</h2>
                <Link to="/catalogo">Volver al catálogo</Link>
            </Container>
        );
    }

    const enlacesMiga = [{ texto: 'Catálogo', ruta: '/catalogo' }];
    const productosRelacionados = productos.filter(p => p.codigo !== codigo).slice(0, 4);

    // funcion para mostrar toast y que desaparezca
    const mostrarToast = (mensaje) => {
        setMensajeToast(mensaje);
        setTimeout(() => setMensajeToast(''), 3000);
    };

    function alAgregarCarrito() {
        let carritoActual = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
        
        const validacion = puedeAgregarAlCarrito(producto, Number(cantidad), carritoActual);
        if (!validacion.valido) {
            mostrarToast(validacion.mensaje); // Reemplazado alert
            return; 
        }

        const indexItem = carritoActual.findIndex(item => item.codigo === codigo);
        if (indexItem >= 0) {
            carritoActual[indexItem].cantidad += Number(cantidad);
        } else {
            carritoActual.push({ ...producto, cantidad: Number(cantidad) });
        }
        
        localStorage.setItem('carritoSonidoVivo', JSON.stringify(carritoActual));
        window.dispatchEvent(new Event('storage'));
        
        mostrarToast(`${producto.nombre} añadido al carrito.`); // Reemplazado alert
    }

    function alVerDetalle(cod) {
        navigate(`/producto/${cod}`);
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
                        <Title texto="Productos Relacionados" nivel={3} className="text-center mb-4 fw-bold" style={{ color: '#200347', fontSize: '1.8rem' }} />
                        <GrillaProductos 
                            productos={productosRelacionados}
                            onAgregarCarrito={(cod) => {
                                const p = productos.find(x => x.codigo === cod);
                                let c = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
                                
                                const validacion = puedeAgregarAlCarrito(p, 1, c);
                                if (!validacion.valido) {
                                    mostrarToast(validacion.mensaje);
                                    return;
                                }

                                const idx = c.findIndex(item => item.codigo === cod);
                                if (idx >= 0) c[idx].cantidad++;
                                else c.push({ ...p, cantidad: 1 });
                                
                                localStorage.setItem('carritoSonidoVivo', JSON.stringify(c));
                                window.dispatchEvent(new Event('storage'));
                                
                                mostrarToast(`${p.nombre} añadido al carrito.`);
                            }}
                            onVerDetalle={alVerDetalle}
                        />
                    </section>
                </Container>
            </main>

            {/* renderizado del toast */}
            {mensajeToast !== '' && (
                <div className="toast-mensaje">
                    {mensajeToast}
                </div>
            )}

            <Footer />
        </>
    );
}

export default DetalleProducto;