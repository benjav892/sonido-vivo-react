import { Form } from 'react-bootstrap';
import InputFormulario from '../atoms/InputFormulario';

function CampoFormulario(props) {
    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={props.id}>{props.etiqueta}</Form.Label>
            <InputFormulario
                value={props.value}
                onChange={props.onChange}
                tipo={props.tipo}
                id={props.id}
                requerido={props.requerido}
            />
            <span className="text-danger error" id={`error-${props.id}`}>{props.error}</span>
        </Form.Group>
    );
}

export default CampoFormulario;