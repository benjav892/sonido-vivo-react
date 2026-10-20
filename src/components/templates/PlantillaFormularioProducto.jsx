// src/components/templates/PlantillaFormularioProducto.jsx
import PlantillaAdministrador from './PlantillaAdministrador';
import EncabezadoSeccion from '../molecules/EncabezadoSeccion';
import { FormularioProducto } from '../organisms/FormularioProducto';

export function PlantillaFormularioProducto(props) {
    return (
        <PlantillaAdministrador>
            <div className="mb-4">
                <EncabezadoSeccion 
                    titulo={props.tituloEncabezado} 
                />
            </div>

            <div className="mt-4">
                <FormularioProducto 
                    datosIniciales={props.datosFormulario}
                    onSubmit={props.onSubmit}
                    onCancelar={props.onCancelar}
                />
            </div>
        </PlantillaAdministrador>
    );
}