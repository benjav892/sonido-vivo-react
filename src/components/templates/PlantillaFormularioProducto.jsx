// src/components/templates/PlantillaFormularioProducto.jsx
import PlantillaAdministrador from './PlantillaAdministrador';
import EncabezadoSeccion from '../molecules/EncabezadoSeccion';
import FormularioProducto from '../organisms/FormularioProducto';

function PlantillaFormularioProducto(props) {
    return (
        <PlantillaAdministrador>

            <div className="mb-4">
                <EncabezadoSeccion 
                    titulo={props.tituloEncabezado} 
                />
            </div>


            <div className="mt-4">
                <FormularioProducto 
                    datos={props.datosFormulario}
                    onCampoChange={props.onCampoChange}
                    onSubmit={props.onSubmit}
                    onCancelar={props.onCancelar}
                />
            </div>
        </PlantillaAdministrador>
    );
}

export default PlantillaFormularioProducto;