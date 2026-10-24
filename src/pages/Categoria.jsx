import { Container } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import MigaPan from '../components/molecules/MigaPan';
import GrillaProductos from '../components/organisms/GrillaProductos';
import Title from '../components/atoms/Title';
import { useProductos } from '../context/ProductoContext';
import { useAgregarAlCarrito } from '../hooks/useAgregarAlCarrito';
import { useTituloPagina } from '../hooks/useTituloPagina';
import './Catalogo.css';

// Productos de una categoría. Ruta: /categoria/:nombre
function Categoria() {
    const { nombre } = useParams();
    const navigate = useNavigate();
    const { productos } = useProductos();
    const { agregar, mensajeToast } = useAgregarAlCarrito(productos);
    useTituloPagina(nombre);

    const delaCategoria = productos.filter((p) => p.categoria === nombre);

    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container>
                    <MigaPan enlaces={[{ texto: 'Categorías', ruta: '/categorias' }]} actual={nombre} />
                    <Title texto={nombre} nivel={1} className="text-center mb-5 fw-bold" style={{ color: '#200347' }} />

                    {delaCategoria.length === 0 ? (
                        <div className="text-center bg-white p-5 rounded shadow-sm">
                            <h4>No hay productos en esta categoría</h4>
                            <Link to="/categorias">Volver a categorías</Link>
                        </div>
                    ) : (
                        <GrillaProductos
                            productos={delaCategoria}
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

export default Categoria;
