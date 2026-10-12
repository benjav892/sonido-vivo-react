import { Form } from "react-bootstrap";

function Selector(props) {
    return (
        <Form.Select value={props.value} onChange={props.onChange} id={props.id}>
            <option value="">Seleccione...</option>
            {props.opciones.map((opcion) => (
                <option key={opcion.key} value={opcion.value}>{opcion}</option>
            ))}
        </Form.Select>
    );
}

export default Selector;