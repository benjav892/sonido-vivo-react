// src/pages/PaginaAgregarProducto.jsx
import { useNavigate } from 'react-router-dom';
import { useProductos } from '../context/ProductoContext';
import PlantillaFormularioProducto from '../components/templates/PlantillaFormularioProducto';

function PaginaAgregarProducto() {
    const navigate = useNavigate();
    const { crear } = useProductos();

    // Esta función solo se ejecuta cuando el formulario ya validó todos los campos
    const handleSubmitExitoso = (nuevoProducto) => {
        crear(nuevoProducto);
        navigate('/admin/inventario');
    };

    const handleCancelar = () => {
        navigate('/admin/inventario');
    };

    return (
        <PlantillaFormularioProducto 
            tituloEncabezado="Añadir Nuevo Producto"
            onSubmit={handleSubmitExitoso}
            onCancelar={handleCancelar}
        />
    );
}

export default PaginaAgregarProducto;