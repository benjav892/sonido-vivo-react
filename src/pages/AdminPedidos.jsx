import { useState } from 'react';
import { Badge, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion';
import BarraBusqueda from '../components/molecules/BarraBusqueda';
import TablaDinamica from '../components/organisms/TablaDinamica';
import Boton from '../components/atoms/Boton';
import { usePedidos } from '../context/PedidosContext';
import { useUsuarios } from '../context/UsuariosContext';
import { useSoloPersonal } from '../hooks/useSoloPersonal';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { formatearPrecio } from '../utils/formatos';

function colorEstado(estado) {
    switch (estado) {
        case 'En preparación': return 'warning';
        case 'Despachado': return 'info';
        case 'Entregado': return 'success';
        default: return 'secondary';
    }
}

function AdminPedidos() {
    const autorizado = useSoloPersonal();
    const navigate = useNavigate();
    const { pedidos, cambiarEstado, borrarPedido } = usePedidos();
    const { usuarios } = useUsuarios();
    const [busqueda, setBusqueda] = useState('');
    useTituloPagina('Gestión de pedidos');

    if (!autorizado) return null;

    // el pedido guarda el correo del cliente, se busca su nombre para mostrarlo
    function nombreCliente(correo) {
        const cliente = usuarios.find((u) => u.correo === correo);
        return cliente ? cliente.nombre : correo;
    }

    function confirmarYBorrar(id) {
        if (window.confirm(`¿Eliminar el pedido ${id}? Esta acción no se puede deshacer.`)) {
            borrarPedido(id);
        }
    }

    const texto = busqueda.toLowerCase();
    const pedidosFiltrados = [...pedidos].reverse().filter((p) =>
        p.id.toLowerCase().includes(texto) ||
        (p.clienteId ?? '').toLowerCase().includes(texto)
    );

    const columnas = [
        { titulo: 'Orden', llave: 'id' },
        { titulo: 'Cliente', render: (p) => nombreCliente(p.clienteId) },
        { titulo: 'Fecha', llave: 'fecha' },
        { titulo: 'Total', render: (p) => formatearPrecio(p.total) },
        {
            titulo: 'Estado',
            render: (p) => (
                <>
                    <Badge bg={colorEstado(p.estado)} className="mb-2 d-block" style={{ width: 'fit-content' }}>
                        {p.estado}
                    </Badge>
                    <Form.Select
                        size="sm"
                        value={p.estado}
                        onChange={(e) => cambiarEstado(p.id, e.target.value)}
                        style={{ maxWidth: '160px' }}
                    >
                        <option value="En preparación">En preparación</option>
                        <option value="Despachado">Despachado</option>
                        <option value="Entregado">Entregado</option>
                    </Form.Select>
                </>
            )
        },
        {
            titulo: 'Acciones',
            render: (p) => (
                <>
                    <Boton className="me-2" variante="info" texto="Ver comprobante" onClick={() => navigate(`/admin/pedidos/${p.id}`)} />
                    <Boton variante="danger" texto="Eliminar" onClick={() => confirmarYBorrar(p.id)} />
                </>
            )
        }
    ];

    return (
        <PlantillaAdministrador>
            <EncabezadoSeccion titulo="Gestión de Pedidos" />
            <BarraBusqueda
                placeholder="Buscar por número de orden o correo del cliente"
                valor={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                textoBoton="LIMPIAR"
                onBuscar={() => setBusqueda('')}
            />
            <TablaDinamica columnas={columnas} datos={pedidosFiltrados} />
        </PlantillaAdministrador>
    );
}

export default AdminPedidos;
