import { Container } from 'react-bootstrap';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import Title from '../components/atoms/Title';
import GrillaBlogs from '../components/organisms/GrillaBlogs';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Blogs() {
    useTituloPagina('Blogs');

    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container style={{ maxWidth: '1000px' }}>
                    <Title texto="NOTICIAS IMPORTANTES" nivel={1} className="text-center mb-5 fw-bold" style={{ color: '#200347', fontSize: '2.2rem' }} />
                    <GrillaBlogs />
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default Blogs;