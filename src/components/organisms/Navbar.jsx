import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.png';

function Navbar() {
    return (
        <header>
            <Image src={logo} alt="Logo sonido vivo" />
            <h1>Sonido Vivo</h1>
            <nav>
                <Link to="/catalogo">Catálogo</Link>
                <Link to="/nosotros">Nosotros</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contactos">Contactos</Link>
                <Link to="/login">Iniciar sesion</Link>
                <Link to="/registro-usuario">Registrar usuario</Link>
            </nav>
        </header>
    )
}
export default Navbar;