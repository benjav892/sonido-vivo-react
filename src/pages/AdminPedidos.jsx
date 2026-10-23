import { useEffect } from 'react';
import { Container, Table, Badge, Form } from 'react-bootstrap';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import Title from '../components/atoms/Title';
import Precio from '../components/atoms/Precio';
import Boton from '../components/atoms/Boton';
import { useAuth } from '../context/AuthContext';
import { usePedidos } from '../context/PedidosContext';
import { useNavigate } from 'react-router-dom';
import { useTituloPagina } from '../hooks/useTituloPagina';


function AdminPedidos() {
    useTituloPagina('Administrar Pedidos');

    const { estaAutenticado } = useAuth();
    const { pedidos, cambiarEstado, borrarPedido } = usePedidos();
    const navigate = useNavigate();

    useEffect(() => {
        if (!estaAutenticado) {
            navigate('/');
        }
    }, [estaAutenticado, navigate]);

    const confirmarYBorrar = (id) => {
        const confirmacion = window.confirm(`¿Estás seguro de eliminar el pedido ${id}? Esta acción no se puede deshacer.`);
        if (confirmacion) {
            borrarPedido(id);
        }
    };

    const colorEstado = (estado) => {
        switch(estado) {
            case 'En preparación': return 'warning';
            case 'Despachado': return 'info';
            case 'Entregado': return 'success';
            default: return 'secondary';
        }
    };

    if (!estaAutenticado) return null;

    return (
        <>
            <Navbar />
            <main className="py-5 min-vh-100" style={{ backgroundColor: 'rgb(207, 193, 228)' }}>
                <Container>
                    <Title texto="Panel Administrativo de Pedidos" nivel={1} className="text-center mb-4 fw-bold" style={{ color: '#200347' }} />
                    
                    <div className="bg-white p-4 rounded shadow-sm overflow-auto">
                        {pedidos.length === 0 ? (
                            <p className="text-center fs-5 m-0 text-muted">No hay pedidos registrados en el sistema.</p>
                        ) : (
                            <Table striped hover className="m-0 align-middle text-center">
                                <thead>
                                    <tr>
                                        <th>Orden</th>
                                        <th>Cliente</th>
                                        <th>Fecha</th>
                                        <th>Total</th>
                                        <th>Estado Actual</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidos.map(pedido => (
                                        <tr key={pedido.id}>
                                            <td className="fw-bold">{pedido.id}</td>
                                            <td>{pedido.clienteId}</td>
                                            <td>{pedido.fecha}</td>
                                            <td><Precio valor={pedido.total} /></td>
                                            <td style={{ minWidth: '180px' }}>
                                                <Badge bg={colorEstado(pedido.estado)} className="fs-6 mb-2 d-block mx-auto" style={{ width: 'fit-content' }}>
                                                    {pedido.estado}
                                                </Badge>
                                                <Form.Select 
                                                    size="sm" 
                                                    value={pedido.estado} 
                                                    onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                                                    className="mx-auto"
                                                    style={{ maxWidth: '150px' }}
                                                >
                                                    <option value="En preparación">En preparación</option>
                                                    <option value="Despachado">Despachado</option>
                                                    <option value="Entregado">Entregado</option>
                                                </Form.Select>
                                            </td>
                                            <td>
                                                <Boton 
                                                    texto="Eliminar" 
                                                    variante="danger" 
                                                    className="btn-sm fw-bold" 
                                                    onClick={() => confirmarYBorrar(pedido.id)} 
                                                />
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

export default AdminPedidos;