// src/components/molecules/EncabezadoMarca.jsx
import { Stack } from 'react-bootstrap';
import Logo from '../atoms/Logo';
import Titulo from '../atoms/Title';

function EncabezadoMarca(props) {
    const titulo = props.titulo || <>Sonido <br /> Vivo</>;
    const logoSrc = props.logoSrc; // Extraemos la propiedad, aunque venga vacía
    
    return (
        <Stack direction="vertical" gap={0} className={`align-items-center ${props.className || ''}`}>
            <Logo src={logoSrc} tamano="100px" />
            <Titulo 
                texto={titulo} 
                nivel={1} 
                className="m-0 text-center fs-2" 
            />
        </Stack>
    );
}

export default EncabezadoMarca;