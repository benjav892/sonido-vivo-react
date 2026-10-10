// src/components/atoms/Logo.jsx
import { Image } from 'react-bootstrap';
// 1. Importas la imagen subiendo dos niveles en las carpetas
import logoPorDefecto from '../../assets/Logo.png'; 

function Logo(props) {
    const tamano = props.tamano || "40px";
    const alt = props.alt || "Logo de la marca";
    
    // 2. Si alguien pasa un 'src' por prop lo usa, sino, usa la imagen importada
    const src = props.src || logoPorDefecto;

    return (
        <Image
            src={src}
            alt={alt}
            onClick={props.onClick}
            style={{ width: tamano, cursor: props.onClick ? "pointer" : "default" }}
            className={props.className}
            fluid
        />
    );
}

export default Logo;