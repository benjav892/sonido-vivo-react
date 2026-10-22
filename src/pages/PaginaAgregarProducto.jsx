// src/pages/PaginaAgregarProducto.jsx
import { useNavigate, useParams } from 'react-router-dom';
import { useProductos } from '../context/ProductoContext';
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion';
import { FormularioProducto } from '../components/organisms/FormularioProducto';

export function PaginaAgregarProducto(props) {
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

    const titulo = id ? "Editar Producto" : "Añadir Nuevo Producto";

    return (
        <PlantillaAdministrador>
            <EncabezadoSeccion 
                titulo={titulo}
                textoBoton="← Volver al Inventario"
                varianteBoton="outline-secondary"
                onClickBoton={manejarCancelar}
            />

            <div className="bg-white p-4 shadow-sm rounded border">
                <FormularioProducto 
                    datosFormulario={productoAEditar}
                    onSubmit={manejarEnvioExitoso}
                    onCancelar={manejarCancelar}
                />
            </div>
        </PlantillaAdministrador>
    );
}

export default PaginaAgregarProducto;