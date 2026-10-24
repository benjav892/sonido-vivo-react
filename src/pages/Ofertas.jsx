import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import GrillaProductos from '../components/organisms/GrillaProductos';
import Title from '../components/atoms/Title';
import { useProductos } from '../context/ProductoContext';
import { useAgregarAlCarrito } from '../hooks/useAgregarAlCarrito';
import { useTituloPagina } from '../hooks/useTituloPagina';
import codigosOferta from '../data/ofertas.json';
import './Catalogo.css';

// Productos destacados o en promoción. Ruta: /ofertas
// Los códigos de los productos destacados están en data/ofertas.json
function Ofertas() {
    const navigate = useNavigate();
    const { productos } = useProductos();
    const { agregar, mensajeToast } = useAgregarAlCarrito(productos);
    useTituloPagina('Ofertas');

    const enOferta = productos.filter((p) => codigosOferta.includes(p.codigo));

    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container>
                    <Title texto="Ofertas" nivel={1} className="text-center mb-5 fw-bold" style={{ color: '#200347' }} />

                    {enOferta.length === 0 ? (
                        <div className="text-center bg-white p-5 rounded shadow-sm">
                            <h4>Por ahora no hay ofertas disponibles</h4>
                        </div>
                    ) : (
                        <GrillaProductos
                            productos={enOferta}
                            onAgregarCarrito={agregar}
                            onVerDetalle={(codigo) => navigate(`/producto/${codigo}`)}
                        />
                    )}
                </Container>
            </main>

            {mensajeToast !== '' && <div className="toast-mensaje">{mensajeToast}</div>}
            <Footer />
        </>
    );
}

export default Ofertas;
