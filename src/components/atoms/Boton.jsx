import { Button } from 'react-bootstrap';

function Boton(props) {
    const variante = props.variante || "primary";
    const tipo = props.type || "button";
    
    return (
        <Button variant={variante} type={tipo} className={props.className} onClick={props.onClick}>
            {props.texto}
        </Button>
    );
}

export default Boton;