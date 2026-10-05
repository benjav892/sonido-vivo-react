import Navbar from '../components/organisms/Navbar';
import CategoriaProductos from '../components/organisms/CategoriaProductos';
import Footer from '../components/organisms/Footer';
import { Container, Row, Col } from "react-bootstrap";

function Inicio() {
    return (
        <Container>
            <Navbar></Navbar>
            <CategoriaProductos></CategoriaProductos>
            <Footer></Footer>
        </Container>
    )
}
export default Inicio;