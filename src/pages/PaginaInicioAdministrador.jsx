import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import Titulo from '../components/atoms/Title';
import MetricsGrid from '../components/organisms/MetricsGrid';
import { usePedidos } from '../context/PedidosContext';
import { useProductos } from '../context/ProductoContext';
import { useUsuarios } from '../context/UsuariosContext';
import { useSoloPersonal } from '../hooks/useSoloPersonal';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { formatearPrecio } from '../utils/formatos';

// Dashboard: resumen de pedidos, catálogo y usuarios.
function PaginaInicioAdministrador() {
    const autorizado = useSoloPersonal();
    const { pedidos } = usePedidos();
    const { productos } = useProductos();
    const { usuarios } = useUsuarios();
    useTituloPagina('Panel de administración');

    if (!autorizado) return null;

    const enPreparacion = pedidos.filter((p) => p.estado === 'En preparación').length;
    const criticos = productos.filter((p) => p.stock <= (p.stockMinimo || 0)).length;
    const ventas = pedidos.reduce((acc, p) => acc + p.total, 0);

    const metricas = [
        { id: 1, titulo: 'Pedidos totales', valor: pedidos.length, color: 'primary' },
        { id: 2, titulo: 'Pedidos en preparación', valor: enPreparacion, color: 'warning' },
        { id: 3, titulo: 'Ventas totales', valor: formatearPrecio(ventas), color: 'success' },
        { id: 4, titulo: 'Productos en catálogo', valor: productos.length, color: 'info' },
        { id: 5, titulo: 'Productos críticos', valor: criticos, color: 'danger' },
        { id: 6, titulo: 'Usuarios registrados', valor: usuarios.length, color: 'secondary' }
    ];

    return (
        <PlantillaAdministrador>
            <div className="mt-4">
                <Titulo texto="¡Bienvenido al panel!" nivel={2} className="mb-4 text-center" />
            </div>
            <MetricsGrid metricas={metricas} />
        </PlantillaAdministrador>
    );
}

export default PaginaInicioAdministrador;
