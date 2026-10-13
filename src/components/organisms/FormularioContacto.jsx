import { useState } from 'react';
import { Form } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { validarNombre, validarCorreo } from '../../utils/validaciones';

function FormularioContacto() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [comentario, setComentario] = useState('');

    const [errorNombre, setErrorNombre] = useState('');
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorComentario, setErrorComentario] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');

    function alEnviar(e) {
        e.preventDefault();
        
        const errNom = validarNombre(nombre);
        const errCor = validarCorreo(correo);
        let errCom = '';

        if (comentario.trim() === '') {
            errCom = 'Debe ingresar un mensaje o comentario.';
        } else if (comentario.length > 500) {
            errCom = 'El comentario no puede superar los 500 caracteres.';
        }

        setErrorNombre(errNom);
        setErrorCorreo(errCor);
        setErrorComentario(errCom);

        if (!errNom && !errCor && !errCom) {
            setMensajeExito('Consulta enviada con éxito.');
            setNombre('');
            setCorreo('');
            setComentario('');
        } else {
            setMensajeExito('');
        }
    }

    return (
        <Form onSubmit={alEnviar} noValidate className="p-4 rounded shadow w-100" style={{ backgroundColor: 'rgb(168, 123, 151)' }}>
            <div className="text-center mb-4 p-3 rounded" style={{ backgroundColor: 'rgb(142, 96, 125)', color: 'white' }}>
                <h3 className="m-0 text-white">FORMULARIO DE CONTACTO</h3>
            </div>

            <CampoFormulario etiqueta="Nombre Completo:" id="nombre" tipo="text" value={nombre} onChange={(e) => setNombre(e.target.value)} error={errorNombre} requerido={true} />
            <CampoFormulario etiqueta="Correo Electrónico:" id="correo" tipo="email" value={correo} onChange={(e) => setCorreo(e.target.value)} error={errorCorreo} requerido={true} />

            <Form.Group className="mb-3">
                <Form.Label htmlFor="comentario" className="fw-bold" style={{ color: '#4D3D4F' }}>Mensaje / Comentario:</Form.Label>
                <Form.Control as="textarea" id="comentario" rows={5} maxLength={500} value={comentario} onChange={(e) => setComentario(e.target.value)} className={errorComentario ? 'is-invalid' : ''} />
                <span className="text-danger error d-block mt-1 fw-bold">{errorComentario}</span>
            </Form.Group>

            <Boton texto="Enviar Mensaje" type="submit" className="w-100 mt-2 py-2" variante="dark" />
            
            {mensajeExito && <p className="mt-3 text-center fw-bold" style={{ color: '#094d17' }}>{mensajeExito}</p>}
        </Form>
    );
}

export default FormularioContacto;