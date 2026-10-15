import { Form } from 'react-bootstrap';
import TextArea from '../atoms/TextArea'; // El átomo de tu compañero

function CampoTextArea(props) {
    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={props.id}>{props.etiqueta}</Form.Label>
            <TextArea
                id={props.id}
                rows={props.rows}
                placeholder={props.placeholder}
                valor={props.valor} // Su átomo usa 'valor'
                onChange={props.onChange}
                className={props.error ? 'is-invalid' : ''}
                requerido={props.requerido} 
            />
            <span className="text-danger error d-block mt-1" id={`error-${props.id}`}>
                {props.error}
            </span>
        </Form.Group>
    );
}

export default CampoTextArea;