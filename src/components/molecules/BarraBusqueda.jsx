// src/components/molecules/BarraBusqueda.jsx
import { InputGroup } from 'react-bootstrap';
import InputTexto from '../atoms/InputTexto';
import Boton from '../atoms/Boton';

function BarraBusqueda(props) {
    return (
        <InputGroup className="mb-4 shadow-sm">
            <InputTexto 
                placeholder={props.placeholder} 
                className="bg-light border-secondary"
                valor={props.valor}
                onChange={props.onChange}
            />
            <Boton 
                variante="secondary" 
                texto={props.textoBoton} 
                onClick={props.onBuscar} 
            />
        </InputGroup>
    );
}

export default BarraBusqueda;