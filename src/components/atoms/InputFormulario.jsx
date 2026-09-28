import { Form } from 'react-bootstrap';

function InputFormulario(props) {
    return (
        <Form.Control
            type={props.tipo}
            id={props.id}
            required={props.requerido}
        />
    );
}

export default InputFormulario;