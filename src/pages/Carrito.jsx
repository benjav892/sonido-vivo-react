import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import Title from '../components/atoms/Title';
import Boton from '../components/atoms/Boton';
import Precio from '../components/atoms/Precio';
import ItemCarrito from '../components/molecules/ItemCarrito';
import { useAuth } from '../context/AuthContext';
import './Catalogo.css';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Carrito() {
    useTituloPagina('Carrito');


    const [carrito, setCarrito] = useState([]);
    const [mensajeToast, setMensajeToast] = useState('');
    const navigate = useNavigate();
    
    // llamar a la variable que dice si hay sesion activa
    const { estaAutenticado } = useAuth(); 

    useEffect(() => {
        const cargarCarrito = () => {
            const carritoGuardado = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
            setCarrito(carritoGuardado);
        };
        cargarCarrito();
        window.addEventListener('storage', cargarCarrito);
        return () => window.removeEventListener('storage', cargarCarrito);
    }, []);

    const eliminarDelCarrito = (codigo) => {
        const nuevoCarrito = carrito.filter(item => item.codigo !== codigo);
        setCarrito(nuevoCarrito);
        localStorage.setItem('carritoSonidoVivo', JSON.stringify(nuevoCarrito));
        window.dispatchEvent(new Event('storage'));
    };

    const irAlCheckout = () => {
        if (estaAutenticado) {
            navigate('/checkout');
        } else {
            setMensajeToast('Debes iniciar sesión para proceder al pago.');
            setTimeout(() => setMensajeToast(''), 3000);
        }
    };

    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container style={{ maxWidth: '800px' }}>
                    <Title texto="Mi Carrito" nivel={1} className="text-center mb-4 fw-bold" style={{ color: '#200347' }} />
                    
                    {carrito.length === 0 ? (
                        <div className="text-center bg-white p-5 rounded shadow-sm">
                            <h4>Tu carrito está vacío</h4>
                            <Boton texto="Volver al catálogo" className="mt-3" onClick={() => navigate('/catalogo')} />
                        </div>
                    ) : (
                        <div className="bg-white p-4 rounded shadow-sm">
                            {carrito.map(item => (
                                <ItemCarrito key={item.codigo} item={item} onEliminar={eliminarDelCarrito} />
                            ))}
                            
                            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                                <h4 className="m-0 fw-bold" style={{ color: '#200347' }}>Total:</h4>
                                <Precio valor={total} className="fw-bold fs-3" style={{ color: '#094d17' }} />
                            </div>

                            <div className="d-flex justify-content-end mt-4">
                                <Boton 
                                    texto="Ir al Checkout" 
                                    className="px-4 py-2 fs-5" 
                                    style={{ backgroundColor: 'rgb(142, 96, 125)', border: 'none' }}
                                    onClick={irAlCheckout} 
                                />
                            </div>
                        </div>
                    )}
                </Container>
            </main>

            {mensajeToast !== '' && (
                <div className="toast-mensaje bg-danger">
                    {mensajeToast}
                </div>
            )}
            <Footer />
        </>
    );
}

export default Carrito;