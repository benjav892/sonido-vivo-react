import { Container } from 'react-bootstrap';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import FormularioContacto from '../components/organisms/FormularioContacto';
import EncabezadoMarca from '../components/molecules/EncabezadoMarca';
import logo from '../assets/Logo.png';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Contacto() {
    useTituloPagina('Contacto');
    
    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container className="d-flex flex-column align-items-center" style={{ maxWidth: '600px' }}>
                    <EncabezadoMarca logoSrc={logo} titulo={<>Sonido Vivo</>} className="mb-4" />
                    <FormularioContacto 
                        titulo="FORMULARIO DE CONTACTO" 
                        textoBoton="Enviar Mensaje" 
                        maxCaracteres={500} 
                    />
                </Container>
            </main>
            <Footer anio={2026} />
        </>
    );
}

export default Contacto;