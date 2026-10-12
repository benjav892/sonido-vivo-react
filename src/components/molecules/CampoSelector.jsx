import { Form } from 'react-bootstrap';
import Selector from '../atoms/Selector';

function CampoSelector(props) {
    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={props.id}>{props.etiqueta}</Form.Label>
            <Selector
                value={props.value}
                onChange={props.onChange}
                id={props.id}
                opciones={props.opciones}
            />
            <span className="text-danger error" id={`error-${props.id}`}>{props.error}</span>
        </Form.Group>
    );
}

export default CampoSelector;