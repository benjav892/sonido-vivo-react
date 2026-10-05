import { Image } from "react-bootstrap";

function ImagenInstrumento(props) {

    return (
        <Image src={props.src} alt={props.alt} />

    );
}

export default ImagenInstrumento;