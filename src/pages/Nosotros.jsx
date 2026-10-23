import { Container } from 'react-bootstrap';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import Title from '../components/atoms/Title';
import ContenidoNosotros from '../components/organisms/ContenidoNosotros';
import GrillaDesarrolladores from '../components/organisms/GrillaDesarrolladores';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Nosotros() {

    useTituloPagina('Nosotros');
    
    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container style={{ maxWidth: '1000px' }}>
                    <Title texto="Sobre Nosotros" nivel={1} className="text-center mb-5 fw-bold" style={{ color: '#200347', fontSize: '2.5rem' }} />
                    
                    <ContenidoNosotros />
                    
                    <section className="text-center pt-5 border-top border-secondary">
                        <Title texto="Equipo de Desarrollo Web" nivel={2} className="mb-3 fs-2 fw-bold" style={{ color: '#200347' }} />
                        <p className="mb-5 fs-5 mx-auto" style={{ maxWidth: '700px', color: '#333' }}>
                            Esta plataforma web fue desarrollada con la idea de optimizar la experiencia de compra en línea y la gestión integral de catálogo e inventario para Sonido Vivo.
                        </p>
                        <GrillaDesarrolladores />
                    </section>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default Nosotros;