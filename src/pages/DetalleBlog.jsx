import { useParams, Link } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import MigaPan from '../components/molecules/MigaPan';
import Title from '../components/atoms/Title';
import blogsData from '../data/blogs.json';
import { useTituloPagina } from '../hooks/useTituloPagina';

function DetalleBlog() {

    useTituloPagina('Blogs');

    const { id } = useParams();
    const blog = blogsData.find(b => b.id === parseInt(id));

    if (!blog) {
        return (
            <Container className="mt-5 text-center min-vh-100">
                <h2>Blog no encontrado</h2>
                <Link to="/blogs">Volver a noticias</Link>
            </Container>
        );
    }

    const enlacesMiga = [{ texto: 'Noticias Importantes', ruta: '/blogs' }];

    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container style={{ maxWidth: '800px' }}>
                    <MigaPan enlaces={enlacesMiga} actual={`Caso Curioso #${blog.id}`} />
                    
                    <article className="bg-white p-4 rounded shadow-sm">
                        <Title texto={blog.titulo} nivel={1} className="fw-bold mb-3" style={{ color: '#200347', fontSize: '2.5rem' }} />
                        
                        <div className="d-flex justify-content-between text-secondary mb-4 pb-3 border-bottom" style={{ fontSize: '0.95rem' }}>
                            <span>Publicado el {blog.fecha}</span>
                            <span className="fw-bold" style={{ color: 'rgb(142, 96, 125)' }}>Por: {blog.autor}</span>
                        </div>

                        <Image src={blog.imagen} alt={blog.titulo} fluid className="rounded mb-4 w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />

                        <div className="fs-5 text-dark" style={{ lineHeight: '1.8' }}>
                            {blog.contenido.map((parrafo, index) => (
                                <p key={index} className="mb-4">{parrafo}</p>
                            ))}
                        </div>

                        <Link to="/blogs" className="fw-bold d-inline-block mt-4" style={{ color: 'rgb(142, 96, 125)', textDecoration: 'none' }}>
                            &larr; Volver a las noticias
                        </Link>
                    </article>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default DetalleBlog;