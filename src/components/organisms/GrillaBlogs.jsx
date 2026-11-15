import TarjetaBlog from '../molecules/TarjetaBlog';
import blogsData from '../../data/blogs.json';

function GrillaBlogs(props) {
    const listaBlogs = props.blogs || blogsData;

    return (
        <section className={`d-flex flex-column gap-4 ${props.className || ''}`}>
            {listaBlogs.map((blog) => (
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