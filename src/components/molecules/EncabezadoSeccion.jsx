// src/components/molecules/EncabezadoSeccion.jsx
import { Stack } from 'react-bootstrap';
import Title from '../atoms/Title';
import Boton from '../atoms/Boton';

function EncabezadoSeccion(props) {
    return (
        <Stack direction="horizontal" className="mb-4 d-flex justify-content-between align-items-center">
            <Title texto={props.titulo} nivel={2} className="m-0 fs-3 fw-bold text-dark" />
            
            {props.textoBoton && (
                <Boton 
                    variante={props.varianteBoton || "primary"} 
                    texto={props.textoBoton} 
                    onClick={props.onClickBoton} 
                />
            )}
        </Stack>
    );
}

export default EncabezadoSeccion;