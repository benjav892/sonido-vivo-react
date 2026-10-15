import { Form } from 'react-bootstrap';
import InputTexto from '../atoms/InputTexto'; // Tu átomo original

function CampoInput(props) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{props.etiqueta}</Form.Label>
            <InputTexto
                tipo={props.tipo}
                placeholder={props.placeholder}
                valor={props.valor}
                onChange={props.onChange}
                className={props.error ? 'is-invalid' : ''}
                requerido={props.requerido}
            />
            <span className="text-danger error d-block mt-1">{props.error}</span>
        </Form.Group>
    );
}

export default CampoInput;