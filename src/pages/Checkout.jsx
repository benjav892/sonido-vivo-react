import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import Title from '../components/atoms/Title';
import Boton from '../components/atoms/Boton';
import { useProductos } from '../context/ProductoContext';
import { procesarConfirmacionPedido } from '../utils/flujoCompra';
import { useAuth } from '../context/AuthContext';
import { usePedidos } from '../context/PedidosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Checkout() {
    useTituloPagina('Checkout');

    const [carrito, setCarrito] = useState([]);
    const [tipoDespacho, setTipoDespacho] = useState('despacho');
    const [metodoPago, setMetodoPago] = useState('tarjeta');
    const [errorMensaje, setErrorMensaje] = useState('');
    
    const navigate = useNavigate();
    const { productos, actualizar } = useProductos();
    const { usuario, estaAutenticado } = useAuth();
    
    const { agregarPedido } = usePedidos();

    useEffect(() => {
        if (!estaAutenticado) {
            navigate('/carrito');
            return;
        }

        const carritoGuardado = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
        if (carritoGuardado.length === 0) navigate('/carrito');
        setCarrito(carritoGuardado);
    }, [navigate, estaAutenticado]);

    const confirmarPedido = (e) => {
        e.preventDefault();
        setErrorMensaje('');

        const resultado = procesarConfirmacionPedido(carrito, productos, actualizar);

        if (resultado.exito) {
            const nuevoPedido = {
                id: `ORD-${Math.floor(Math.random() * 10000)}`,
                fecha: new Date().toLocaleDateString(),
                estado: 'En preparación',
                total: carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0),
                tipoDespacho,
                clienteId: usuario.email 
            };
            
            agregarPedido(nuevoPedido); 

            navigate('/respuesta-compra', { state: { exito: true, orden: nuevoPedido.id } });
        } else {
            navigate('/respuesta-compra', { state: { exito: false, mensaje: resultado.mensaje } });
        }
    };

    if (!estaAutenticado) return null;

    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container style={{ maxWidth: '600px' }}>
                    <Title texto="Checkout" nivel={1} className="text-center mb-4 fw-bold" style={{ color: '#200347' }} />
                    
                    <Form onSubmit={confirmarPedido} className="bg-white p-4 rounded shadow-sm">
                        <h4 className="mb-3" style={{ color: '#4D3D4F' }}>1. Opciones de Entrega</h4>
                        <Form.Group className="mb-4">
                            <Form.Check 
                                type="radio" label="Despacho a Domicilio" name="despacho" 
                                checked={tipoDespacho === 'despacho'} onChange={() => setTipoDespacho('despacho')} 
                            />
                            <Form.Check 
                                type="radio" label="Retiro en Tienda (Viña del Mar)" name="despacho" 
                                checked={tipoDespacho === 'retiro'} onChange={() => setTipoDespacho('retiro')} 
                            />
                        </Form.Group>

                        <h4 className="mb-3" style={{ color: '#4D3D4F' }}>2. Método de Pago</h4>
                        <Form.Group className="mb-4">
                            <Form.Select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                                <option value="tarjeta">Tarjeta de Crédito / Débito</option>
                                <option value="transferencia">Transferencia Bancaria</option>
                            </Form.Select>
                        </Form.Group>

                        {errorMensaje && <p className="text-danger fw-bold">{errorMensaje}</p>}

                        <Boton texto="Confirmar y Pagar" type="submit" className="w-100 py-3 fs-5" style={{ backgroundColor: '#094d17', border: 'none' }} />
                    </Form>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default Checkout;