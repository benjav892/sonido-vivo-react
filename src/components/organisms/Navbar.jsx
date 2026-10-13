import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../assets/Logo.png';

function Navbar() {
    const [cantidadCarrito, setCantidadCarrito] = useState(0);

    // escuchar los cambios en el LocalStorage para actualizar el número
    useEffect(() => {
        const actualizarContador = () => {
            const carritoActual = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
            const total = carritoActual.reduce((acc, item) => acc + item.cantidad, 0);
            setCantidadCarrito(total);
        };

        // ejecutar al montar
        actualizarContador();

        // escuchar el evento personalizado que disparamos al agregar al carrito
        window.addEventListener('storage', actualizarContador);
        
        return () => {
            window.removeEventListener('storage', actualizarContador);
        };
    }, []);

    return (
        <header className="d-flex justify-content-between align-items-center p-3 flex-wrap" style={{ backgroundColor: 'rgb(142, 96, 125)' }}>
            <div className="logo d-flex align-items-center gap-2">
                <Image src={logo} alt="Logo sonido vivo" style={{ width: '60px' }} />
                <h2 className="text-white m-0">Sonido Vivo</h2>
            </div>
            <nav className="d-flex gap-3">
                <Link to="/" className="text-dark fw-bold text-decoration-none">Home</Link>
                <Link to="/catalogo" className="text-dark fw-bold text-decoration-none">Catálogo</Link>
                <Link to="/nosotros" className="text-dark fw-bold text-decoration-none">Nosotros</Link>
                <Link to="/blogs" className="text-dark fw-bold text-decoration-none">Blogs</Link>
                <Link to="/contacto" className="text-dark fw-bold text-decoration-none">Contacto</Link>
                <Link to="/carrito" className="text-dark fw-bold text-decoration-none">Carrito</Link>
                <Link to="/mis-pedidos" className="text-dark fw-bold text-decoration-none">Mis Pedidos</Link>
                <Link to="/login">Iniciar sesion</Link>
                <Link to="/registro">Registrar usuario</Link>
            </nav>
            
            <div className="carrito-nav">
                <Link to="/carrito" className="fw-bold text-decoration-none px-3 py-2 rounded-pill text-dark" style={{ backgroundColor: 'rgb(200, 184, 224)' }}>
                    🛒 Carrito ({cantidadCarrito})
                </Link>
            </div>
        </header>
    );
}

export default Navbar;