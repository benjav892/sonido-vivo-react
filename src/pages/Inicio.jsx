import Navbar from '../components/organisms/Navbar';
import CategoriaProductos from '../components/organisms/CategoriaProductos';
import Footer from '../components/organisms/Footer';
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './Inicio.css';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Inicio() {
    const navigate = useNavigate()
    useTituloPagina('Inicio')
    return (
        <Container>
            <Navbar></Navbar>
            <CategoriaProductos
                onSeleccionar={(categoria) => navigate(`/categoria/${encodeURIComponent(categoria)}`)}
            />
            <Footer></Footer>
        </Container>
    )
}
export default Inicio;