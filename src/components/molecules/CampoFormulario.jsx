import { Form } from 'react-bootstrap';
import InputFormulario from '../atoms/InputFormulario';
import TextArea from '../atoms/TextArea'; // Asegúrate de crear este átomo

function CampoFormulario(props) {
    // si la prop 'as' es 'textarea', renderiza el TextArea, de lo contrario el Input
    const isTextArea = props.as === 'textarea';

    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={props.id} className="fw-bold" style={{ color: '#4D3D4F' }}>
                {props.etiqueta}
            </Form.Label>
            
            {isTextArea ? (
                <TextArea
                    id={props.id}
                    rows={props.rows}
                    maxLength={props.maxLength}
                    valor={props.value}
                    onChange={props.onChange}
                    requerido={props.requerido}
                    className={props.error ? 'is-invalid' : ''}
                />
            ) : (
                <InputFormulario
                    value={props.value}
                    onChange={props.onChange}
                    tipo={props.tipo}
                    id={props.id}
                    requerido={props.requerido}
                    className={props.error ? 'is-invalid' : ''}
                />
            )}
            <span className="text-danger error d-block mt-1 fw-bold" id={`error-${props.id}`}>
                {props.error}
            </span>
        </Form.Group>
    );
}

export default CampoFormulario;