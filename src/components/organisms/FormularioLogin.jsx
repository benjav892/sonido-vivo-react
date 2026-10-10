import { Form } from "react-bootstrap";
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { useState } from "react";
import { validarCorreo, validarContrasena } from "../../utils/validaciones";


function FormularioLogin(props) {
    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [errorCorreo, setErrorCorreo] = useState('')
    const [errorContrasena, setErrorContrasena] = useState('')
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState('')


    function alclickear(evento) {
        evento.preventDefault();
        const mensajeCorreo = validarCorreo(correo)
        const mensajeContrasena = validarContrasena(contrasena)
        setErrorCorreo(mensajeCorreo)
        setErrorContrasena(mensajeContrasena)
        if (mensajeContrasena == '' && mensajeCorreo == '') {
            setMensajeConfirmacion('Login exitoso')
            props.onLogin(correo, contrasena);
        } else {
            setMensajeConfirmacion('')
        }
    }
    return (<Form id="login" noValidate onSubmit={alclickear}>
        <CampoFormulario
            etiqueta="Correo electrónico"
            id="correo-login"
            tipo="email"
            requerido={true}
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
            error={errorCorreo}


        />
        <CampoFormulario
            etiqueta="Contraseña"
            id="contrasena"
            tipo="password"
            requerido={true}
            value={contrasena}
            onChange={(evento) => setContrasena(evento.target.value)}
            error={errorContrasena}

        />

        <Boton
            texto="Iniciar Sesion"
            type="submit"
            className="w-100 mt-2"
        />

        <p id="mensaje-confirmacion" className="mt-3 text-center">{mensajeConfirmacion}</p>
    </Form>);
}
export default FormularioLogin;