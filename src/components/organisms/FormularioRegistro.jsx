import { useState } from "react";
import { Form } from "react-bootstrap";
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import {
    validarNombre,
    validarCorreo,
    validarContrasena,
    validarConfirmarContrasena
} from "../../utils/validaciones";


function FormularioRegistro(props) {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');

    const [errorNombre, setErrorNombre] = useState('');
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorContrasena, setErrorContrasena] = useState('');
    const [errorConfirmar, setErrorConfirmar] = useState('');
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');

    function alEnviar(evento) {
        evento.preventDefault();

        const mensajeNombre = validarNombre(nombre);
        const mensajeCorreo = validarCorreo(correo);
        const mensajeContrasena = validarContrasena(contrasena);
        const mensajeConfirmar = validarConfirmarContrasena(contrasena, confirmarContrasena);

        setErrorNombre(mensajeNombre);
        setErrorCorreo(mensajeCorreo);
        setErrorContrasena(mensajeContrasena);
        setErrorConfirmar(mensajeConfirmar);

        if (mensajeNombre == '' && mensajeCorreo == '' && mensajeContrasena == '' && mensajeConfirmar == '') {
            const registrado = props.onRegistro({ nombre, correo, contrasena });
            if (registrado) {
                setMensajeConfirmacion('Registrado exitosamente')
            } else {
                setErrorCorreo('Correo ya registrado')
                setMensajeConfirmacion('')
            }
        } else {
            setMensajeConfirmacion('');
        }
    }
    return (
        <Form id="registro" noValidate onSubmit={alEnviar}>
            <CampoFormulario
                etiqueta="Nombre completo"
                id="nombre-registro"
                tipo="text"
                requerido={true}
                value={nombre}
                onChange={(evento) => setNombre(evento.target.value)}
                error={errorNombre}
            />

            <CampoFormulario
                etiqueta="Correo electrónico"
                id="correo-registro"
                tipo="email"
                requerido={true}
                value={correo}
                onChange={(evento) => setCorreo(evento.target.value)}
                error={errorCorreo}
            />

            <CampoFormulario
                etiqueta="Contraseña"
                id="contrasena-registro"
                tipo="password"
                requerido={true}
                value={contrasena}
                onChange={(evento) => setContrasena(evento.target.value)}
                error={errorContrasena}
            />

            <CampoFormulario
                etiqueta="Confirmar contraseña"
                id="confirmar-contrasena-registro"
                tipo="password"
                requerido={true}
                value={confirmarContrasena}
                onChange={(evento) => setConfirmarContrasena(evento.target.value)}
                error={errorConfirmar}
            />

            <Boton
                texto="Crear Cuenta"
                type="submit"
                className="w-100 mt-2"
            />

            <p id="mensaje-confirmacion" className="mt-3 text-center">{mensajeConfirmacion}</p>
        </Form>
    );

}
export default FormularioRegistro;