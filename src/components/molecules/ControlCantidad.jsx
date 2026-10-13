import { Form } from 'react-bootstrap';

function ControlCantidad(props) {
    return (
        <div className="d-flex align-items-center gap-2">
            <Form.Label htmlFor={props.id} className="fw-bold mb-0" style={{ color: '#200347' }}>
                {props.etiqueta}:
            </Form.Label>
            <Form.Control
                type="number"
                id={props.id}
                min={props.min}
                max={props.max}
                value={props.valor}
                onChange={props.onChange}
                style={{ width: '80px', textAlign: 'center' }}
            />
        </div>
    );
}

export default ControlCantidad;