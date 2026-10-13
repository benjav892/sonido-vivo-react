import { Form } from 'react-bootstrap';

function TextArea(props) {
    return (
        <Form.Control 
            as="textarea"
            id={props.id}
            rows={props.rows || 3}
            maxLength={props.maxLength}
            placeholder={props.placeholder} 
            value={props.valor} 
            onChange={props.onChange}
            className={props.className}
            required={props.requerido}
        />
    );
}

export default TextArea;