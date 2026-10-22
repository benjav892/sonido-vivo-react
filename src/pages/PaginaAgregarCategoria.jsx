// src/pages/PaginaAgregarCategoria.jsx
import { useNavigate, useParams } from 'react-router-dom';
import { useCategorias } from '../context/CategoriaContext';
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion';
import FormularioCategoria from '../components/organisms/FormularioCategoria';

export function PaginaAgregarCategoria(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const { categorias, crear, actualizar } = useCategorias();

    const categoriaAEditar = id ? categorias.find((c) => c.id === Number(id)) : null;

    function manejarEnvioExitoso(datosCategoria) {
        if (id) {
            actualizar(Number(id), datosCategoria);
        } else {
            crear(datosCategoria);
        }
        navigate('/admin/categorias');
    }

    function manejarCancelar() {
        navigate('/admin/categorias');
    }

    const titulo = id ? "Editar Categoría" : "Añadir Nueva Categoría";

    return (
        <PlantillaAdministrador>
            <EncabezadoSeccion 
                titulo={titulo}
                textoBoton="← Volver a Categorías"
                varianteBoton="outline-secondary"
                onClickBoton={manejarCancelar}
            />

            <div className="bg-white p-4 shadow-sm rounded border">
                <FormularioCategoria 
                    datosFormulario={categoriaAEditar}
                    onSubmit={manejarEnvioExitoso}
                    onCancelar={manejarCancelar}
                />
            </div>
        </PlantillaAdministrador>
    );
}

export default PaginaAgregarCategoria;