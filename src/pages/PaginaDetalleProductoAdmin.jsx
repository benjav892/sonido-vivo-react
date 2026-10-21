// src/pages/PaginaDetalleProducto.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useProductos } from '../context/ProductoContext';
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion';
import TarjetaProductoAdmin from '../components/molecules/TarjetaProductoAdmin';
import Title from '../components/atoms/Title';
import Boton from '../components/atoms/Boton';

function PaginaDetalleProducto(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { productos, eliminar } = useProductos();

    const producto = productos.find((p) => p.id === Number(id));

    function manejarEliminar() {
        if (window.confirm(`¿Estás seguro de que deseas eliminar "${producto.nombre}"?`)) {
            eliminar(producto.id);
            navigate('/admin/inventario');
        }
    }

    // Caso en el que no exista el producto
    if (!producto) {
        return (
            <PlantillaAdministrador>
                <div className="py-5 text-center">
                    <Title nivel={2} texto="Producto no encontrado" className="fw-bold mb-3" />
                    <p className="text-muted mb-4">El producto consultado no existe o fue eliminado del inventario.</p>
                    <Boton
                        variante="primary"
                        texto="Volver a Gestión de Inventario"
                        onClick={() => navigate('/admin/inventario')}
                    />
                </div>
            </PlantillaAdministrador>
        );
    }

    return (
        <PlantillaAdministrador>
            <EncabezadoSeccion 
                titulo="Detalle del Producto"
                textoBoton="← Volver al Inventario"
                varianteBoton="outline-secondary"
                onClickBoton={() => navigate('/admin/inventario')}
            />

            <TarjetaProductoAdmin 
                producto={producto}
                onEditar={() => navigate(`/admin/inventario/editar/${producto.id}`)}
                onEliminar={manejarEliminar}
            />
        </PlantillaAdministrador>
    );
}

export default PaginaDetalleProducto;