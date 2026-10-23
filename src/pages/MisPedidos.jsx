import { Container, Table, Badge } from 'react-bootstrap';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import Title from '../components/atoms/Title';
import Precio from '../components/atoms/Precio';
import { useAuth } from '../context/AuthContext';
import { usePedidos } from '../context/PedidosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function MisPedidos() {
    useTituloPagina('Mis Pedidos');
    
    const { usuario, estaAutenticado } = useAuth();
    const { pedidos } = usePedidos();

    // filtrar dinámicamente usando el estado global de pedidos
    const misPedidosFiltrados = (estaAutenticado && usuario) 
        ? pedidos.filter(p => p.clienteId === usuario.correo)
        : [];

    const colorEstado = (estado) => {
        switch(estado) {
            case 'En preparación': return 'warning';
            case 'Despachado': return 'info';
            case 'Entregado': return 'success';
            default: return 'secondary';
        }
    };

    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container style={{ maxWidth: '900px' }}>
                    <Title texto="Mis Pedidos" nivel={1} className="text-center mb-4 fw-bold" style={{ color: '#200347' }} />
                    
                    <div className="bg-white p-4 rounded shadow-sm overflow-auto">
                        {!estaAutenticado ? (
                            <p className="text-center fs-5 m-0 text-muted">Debes iniciar sesión para ver tus pedidos.</p>
                        ) : misPedidosFiltrados.length === 0 ? (
                            <p className="text-center fs-5 m-0 text-muted">Aún no tienes pedidos registrados.</p>
                        ) : (
                            <Table striped hover className="m-0 align-middle text-center">
                                <thead>
                                    <tr>
                                        <th>Orden</th>
                                        <th>Fecha</th>
                                        <th>Entrega</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {misPedidosFiltrados.map(pedido => (
                                        <tr key={pedido.id}>
                                            <td className="fw-bold">{pedido.id}</td>
                                            <td>{pedido.fecha}</td>
                                            <td className="text-capitalize">{pedido.tipoDespacho}</td>
                                            <td><Precio valor={pedido.total} /></td>
                                            <td>
                                                <Badge bg={colorEstado(pedido.estado)} className="fs-6">
                                                    {pedido.estado}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </div>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default MisPedidos;