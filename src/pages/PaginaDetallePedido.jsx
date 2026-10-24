import { useNavigate, useParams } from 'react-router-dom';
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion';
import TablaDinamica from '../components/organisms/TablaDinamica';
import Boton from '../components/atoms/Boton';
import { usePedidos } from '../context/PedidosContext';
import { useUsuarios } from '../context/UsuariosContext';
import { useSoloPersonal } from '../hooks/useSoloPersonal';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { formatearPrecio } from '../utils/formatos';


function PaginaDetallePedido() {
    const autorizado = useSoloPersonal();
    const navigate = useNavigate();
    const { id } = useParams();
    const { pedidos } = usePedidos();
    const { usuarios } = useUsuarios();
    useTituloPagina('Comprobante de pedido');

    if (!autorizado) return null;

    const pedido = pedidos.find((p) => p.id === id);
    const volver = <Boton variante="secondary" texto="Volver a pedidos" onClick={() => navigate('/admin/pedidos')} />;

    if (!pedido) {
        return (
            <PlantillaAdministrador>
                <EncabezadoSeccion titulo="Pedido no encontrado" />
                <div className="alert alert-warning mb-4">No existe un pedido con el número "{id}".</div>
                {volver}
            </PlantillaAdministrador>
        );
    }

    const cliente = usuarios.find((u) => u.correo === pedido.clienteId);
    const items = pedido.items ?? [];

    const columnas = [
        { titulo: 'Código', llave: 'codigo' },
        { titulo: 'Producto', llave: 'nombre' },
        { titulo: 'Cantidad', llave: 'cantidad' },
        { titulo: 'Precio unitario', render: (i) => formatearPrecio(i.precio) },
        { titulo: 'Subtotal', render: (i) => formatearPrecio(i.precio * i.cantidad) }
    ];

    return (
        <PlantillaAdministrador>
            <EncabezadoSeccion titulo={`Comprobante ${pedido.id}`} />

            <div className="card shadow-sm p-4 mb-4">
                <h5 className="mb-3 text-primary">Datos del pedido</h5>
                <p className="mb-1"><strong>Cliente:</strong> {cliente ? cliente.nombre : '(usuario no encontrado)'}</p>
                <p className="mb-1"><strong>Correo:</strong> {pedido.clienteId}</p>
                <p className="mb-1"><strong>Fecha:</strong> {pedido.fecha}</p>
                <p className="mb-1"><strong>Entrega:</strong> {pedido.tipoDespacho === 'retiro' ? 'Retiro en tienda' : 'Despacho a domicilio'}</p>
                <p className="mb-0"><strong>Estado:</strong> {pedido.estado}</p>
            </div>

            <div className="card shadow-sm p-4 mb-4">
                <h5 className="mb-3 text-primary">Detalle de la compra</h5>
                {items.length > 0 ? (
                    <TablaDinamica columnas={columnas} datos={items} />
                ) : (
                    <div className="alert alert-info mb-0">
                        Este pedido no tiene el detalle de productos guardado (es un pedido de ejemplo).
                    </div>
                )}
                <h4 className="text-end mt-3 mb-0">Total: {formatearPrecio(pedido.total)}</h4>
            </div>

            {volver}
        </PlantillaAdministrador>
    );
}

export default PaginaDetallePedido;
