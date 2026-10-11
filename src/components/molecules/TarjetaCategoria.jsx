import ImagenInstrumento from "../atoms/ImagenInstrumento";
import DescInstrumento from "../atoms/DescInstrumento";
import { Card } from "react-bootstrap";

function TarjetaCategoria(props) {

    return (

        <Card className="tarjeta-categoria h-100">
            <ImagenInstrumento src={props.src} alt={props.alt} />
            <DescInstrumento texto={props.texto} />
        </Card>
    );
}

export default TarjetaCategoria;