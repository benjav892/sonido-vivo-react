import TarjetaBlog from '../molecules/TarjetaBlog';
import blogsData from '../../data/blogs.json';

function GrillaBlogs() {
    return (
        <section className="d-flex flex-column gap-4">
            {blogsData.map((blog) => (
                <TarjetaBlog 
                    key={blog.id}
                    titulo={blog.titulo}
                    descCorta={blog.descCorta}
                    imagen={blog.imagen}
                    rutaDestino={`/blog/${blog.id}`} 
                />
            ))}
        </section>
    );
}

export default GrillaBlogs;