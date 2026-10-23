import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import Title from '../components/atoms/Title';
import Boton from '../components/atoms/Boton';
import { useTituloPagina } from '../hooks/useTituloPagina';

function RespuestaCompra() {
    useTituloPagina('Resultado de tu compra');

    const location = useLocation();
    const navigate = useNavigate();
    
    const exito = location.state?.exito || false;
    const mensaje = location.state?.mensaje || 'Hubo un problema procesando tu pago.';
    const orden = location.state?.orden || '';

    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100 d-flex align-items-center" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container style={{ maxWidth: '600px' }}>
                    <div className="bg-white p-5 rounded shadow-sm text-center">
                        {exito ? (
                            <>
                                <div className="mb-4" style={{ fontSize: '4rem' }}>✅</div>
                                <Title texto="¡Compra Exitosa!" nivel={1} className="fw-bold mb-3" style={{ color: '#094d17' }} />
                                <p className="fs-5 text-secondary">Tu pedido <strong>{orden}</strong> ha sido confirmado.</p>
                                <div className="d-flex gap-3 justify-content-center mt-4">
                                    <Boton texto="Seguir Comprando" variante="outline-secondary" onClick={() => navigate('/catalogo')} />
                                    <Boton texto="Ver mis pedidos" style={{ backgroundColor: 'rgb(142, 96, 125)', border: 'none' }} onClick={() => navigate('/mis-pedidos')} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mb-4" style={{ fontSize: '4rem' }}>❌</div>
                                <Title texto="Pago Fallido" nivel={1} className="fw-bold mb-3 text-danger" />
                                <p className="fs-5 text-secondary">{mensaje}</p>
                                <Boton texto="Volver al Carrito" variante="danger" className="mt-4" onClick={() => navigate('/carrito')} />
                            </>
                        )}
                    </div>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default RespuestaCompra;