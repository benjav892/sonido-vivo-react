import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../components/organisms/Navbar'; 
import Footer from '../components/organisms/Footer';
import GrillaProductos from '../components/organisms/GrillaProductos';
import Title from '../components/atoms/Title';
import { useProductos } from '../context/ProductoContext';
import { useNavigate } from 'react-router-dom';
import { puedeAgregarAlCarrito } from '../utils/flujoCompra';
import './Catalogo.css'; 
import { useTituloPagina } from '../hooks/useTituloPagina';

function Catalogo() {
    useTituloPagina('Catalogo');

    const { productos } = useProductos();
    const navigate = useNavigate();
    
    // crear el estado para controlar el mensaje en pantalla
    const [mensajeToast, setMensajeToast] = useState('');

    function alAgregarCarrito(codigo) {
        let carritoActual = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
        const productoEncontrado = productos.find(p => p.codigo === codigo);

        if (productoEncontrado) {
            const validacion = puedeAgregarAlCarrito(productoEncontrado, 1, carritoActual);
            
            if (!validacion.valido) {
                //mostrar el error usando Toast
                setMensajeToast(validacion.mensaje);
                setTimeout(() => setMensajeToast(''), 3000);
                return; 
            }

            const indexItem = carritoActual.findIndex(item => item.codigo === codigo);
            
            if (indexItem >= 0) {
                carritoActual[indexItem].cantidad++;
            } else {
                carritoActual.push({ ...productoEncontrado, cantidad: 1 });
            }

            localStorage.setItem('carritoSonidoVivo', JSON.stringify(carritoActual));
            window.dispatchEvent(new Event('storage'));
            
            // mostrar el mensaje de éxito usando el estado
            setMensajeToast(`${productoEncontrado.nombre} añadido al carrito.`);
            
            // borrar el mensaje después de 3 segundos (3000 milisegundos)
            setTimeout(() => {
                setMensajeToast('');
            }, 3000);
        }
    }

    function alVerDetalle(codigo) {
        navigate(`/producto/${codigo}`);
    }

    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container>
                    <Title texto="Catálogo" nivel={1} className="text-center mb-5 fw-bold" style={{color: '#200347'}} />
                    
                    <GrillaProductos 
                        productos={productos} 
                        onAgregarCarrito={alAgregarCarrito}
                        onVerDetalle={alVerDetalle}
                    />
                </Container>
            </main>

            {/* Renderizar el elemento visual solo si hay un mensaje escrito */}
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