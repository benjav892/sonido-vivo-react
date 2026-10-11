// src/components/atoms/InputTexto.jsx
import { Form } from 'react-bootstrap';

function InputTexto(props) {
    return (
        <Form.Control 
            type={props.tipo || "text"} 
            placeholder={props.placeholder} 
            value={props.valor} 
            onChange={props.onChange}
            className={props.className}
        />
    );
}

export default InputTexto;