import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import CategoriaProductos from '../components/organisms/CategoriaProductos';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Lista todas las categorías. Ruta: /categorias
function Categorias() {
    const navigate = useNavigate();
    useTituloPagina('Categorías');

    return (
        <Container>
            <Navbar />
            <CategoriaProductos
                onSeleccionar={(categoria) => navigate(`/categoria/${encodeURIComponent(categoria)}`)}
            />
            <Footer />
        </Container>
    );
}

export default Categorias;
