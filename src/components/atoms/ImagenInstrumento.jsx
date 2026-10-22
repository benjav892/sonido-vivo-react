// src/components/atoms/ImagenInstrumento.jsx
import { Image } from "react-bootstrap";

function ImagenInstrumento(props) {
    return (
        <Image 
            src={props.src || '/img/placeholder.png'} 
            alt={props.alt || 'Imagen de instrumento'} 
            fluid 
            className={props.className}
            style={props.style}
            onError={(e) => {
                e.target.src = '/img/placeholder.png';
            }}
        />
    );
}

export default ImagenInstrumento;