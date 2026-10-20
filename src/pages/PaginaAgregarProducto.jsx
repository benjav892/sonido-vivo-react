// src/pages/PaginaAgregarProducto.jsx
import { useNavigate, useParams } from 'react-router-dom';
import { useProductos } from '../context/ProductoContext';
import { PlantillaFormularioProducto } from '../components/templates/PlantillaFormularioProducto';

export function PaginaAgregarProducto() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { productos, crear, actualizar } = useProductos();

    const productoAEditar = id ? productos.find((p) => p.id === Number(id)) : null;

    function manejarEnvioExitoso(datosProducto) {
        if (id) {
            actualizar(Number(id), datosProducto);
        } else {
            crear(datosProducto);
        }
        navigate('/admin/inventario');
    }

    function manejarCancelar() {
        navigate('/admin/inventario');
    }

    return (
        <PlantillaFormularioProducto 
            tituloEncabezado={id ? "Editar Producto" : "Añadir Nuevo Producto"}
            datosFormulario={productoAEditar}
            onSubmit={manejarEnvioExitoso}
            onCancelar={manejarCancelar}
        />
    );
}