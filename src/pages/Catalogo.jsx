import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../components/organisms/Navbar'; 
import Footer from '../components/organisms/Footer';
import GrillaProductos from '../components/organisms/GrillaProductos';
import datosCatalogo from '../data/catalogo.json';
import './Catalogo.css';

function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [mensajeToast, setMensajeToast] = useState(''); // Estado para controlar el Toast

    useEffect(() => {
        setProductos(datosCatalogo);
    }, []);

    function alAgregarCarrito(codigo) {
        let carritoActual = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
        const productoEncontrado = productos.find(p => p.codigo === codigo);

        if (productoEncontrado) {
            const indexItem = carritoActual.findIndex(item => item.codigo === codigo);
            
            if (indexItem >= 0) {
                carritoActual[indexItem].cantidad++;
            } else {
                carritoActual.push({ ...productoEncontrado, cantidad: 1 });
            }

            localStorage.setItem('carritoSonidoVivo', JSON.stringify(carritoActual));
            window.dispatchEvent(new Event('storage'));

            // mostrar el mensaje en el Toast
            setMensajeToast(`${productoEncontrado.nombre} añadido al carrito.`);

            // ocultar el Toast después de 3 segundos
            setTimeout(() => {
                setMensajeToast('');
            }, 3000);
        }
    }

    function alVerDetalle(codigo) {
        alert(`Se abrirán los detalles del producto ${codigo}`);
    }

    return (
        <>
            <Navbar />
            
            <main className="py-5 min-vh-100">
                <Container id="catalogo">
                    {/* Tu clase titulo-catalogo aplica el color #200347 */}
                    <h1 className="titulo-catalogo fw-bold">Catálogo</h1>
                    
                    <GrillaProductos 
                        productos={productos} 
                        onAgregarCarrito={alAgregarCarrito}
                        onVerDetalle={alVerDetalle}
                    />
                </Container>
            </main>

            {/* Renderizado condicional del Toast*/}
            {mensajeToast !== '' && (
                <div className="toast-mensaje">
                    {mensajeToast}
                </div>
            )}

            <Footer />
        </>
    );
}

export default Catalogo;