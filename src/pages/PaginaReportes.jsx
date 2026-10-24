import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion';
import MetricsGrid from '../components/organisms/MetricsGrid';
import TablaDinamica from '../components/organisms/TablaDinamica';
import { usePedidos } from '../context/PedidosContext';
import { useSoloPersonal } from '../hooks/useSoloPersonal';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { formatearPrecio } from '../utils/formatos';

const ESTADOS = ['En preparación', 'Despachado', 'Entregado'];

function PaginaReportes() {
    const autorizado = useSoloPersonal();
    const { pedidos } = usePedidos();
    useTituloPagina('Reportes');

    if (!autorizado) return null;

    const ventasTotales = pedidos.reduce((acc, p) => acc + p.total, 0);
    const ticketPromedio = pedidos.length > 0 ? Math.round(ventasTotales / pedidos.length) : 0;

    const metricas = [
        { id: 1, titulo: 'Pedidos totales', valor: pedidos.length, color: 'primary' },
        { id: 2, titulo: 'Ventas totales', valor: formatearPrecio(ventasTotales), color: 'success' },
        { id: 3, titulo: 'Ticket promedio', valor: formatearPrecio(ticketPromedio), color: 'info' }
    ];

    const porEstado = ESTADOS.map((estado) => {
        const delEstado = pedidos.filter((p) => p.estado === estado);
        return {
            estado,
            cantidad: delEstado.length,
            monto: delEstado.reduce((acc, p) => acc + p.total, 0)
        };
    });


    const vendidos = {};
    pedidos.forEach((p) => {
        (p.items ?? []).forEach((i) => {
            vendidos[i.nombre] = (vendidos[i.nombre] ?? 0) + i.cantidad;
        });
    });
    const topProductos = Object.entries(vendidos)
        .map(([nombre, unidades]) => ({ nombre, unidades }))
        .sort((a, b) => b.unidades - a.unidades)
        .slice(0, 5);

    const columnasEstado = [
        { titulo: 'Estado', llave: 'estado' },
        { titulo: 'Pedidos', llave: 'cantidad' },
        { titulo: 'Monto', render: (f) => formatearPrecio(f.monto) }
    ];
    const columnasTop = [
        { titulo: 'Producto', llave: 'nombre' },
        { titulo: 'Unidades vendidas', llave: 'unidades' }
    ];

    return (
        <PlantillaAdministrador>
            <EncabezadoSeccion titulo="Reportes" />
            <MetricsGrid metricas={metricas} />

            <h5 className="mt-4 mb-3">Pedidos por estado</h5>
            <TablaDinamica columnas={columnasEstado} datos={porEstado} />

            <h5 className="mt-4 mb-3">Productos más vendidos</h5>
            <TablaDinamica columnas={columnasTop} datos={topProductos} />
        </PlantillaAdministrador>
    );
}

export default PaginaReportes;
