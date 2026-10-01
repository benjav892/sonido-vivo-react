import { Form } from "react-bootstrap";
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { useState } from "react";

function FormularioLogin(props) {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('')

    function alclickear(evento) {
        evento.preventDefault();
        props.onLogin(correo, contrasena);
    }
    return (<Form id="login" noValidate onSubmit={alclickear}>
        <CampoFormulario
            etiqueta="Correo electrónico"
            id="correo-login"
            tipo="email"
            requerido={true}
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}


        />
        <CampoFormulario
            etiqueta="Contraseña"
            id="contrasena"
            tipo="password"
            requerido={true}
            value={contrasena}
            onChange={(evento) => setContrasena(evento.target.value)}

        />

        <Boton
            texto="Iniciar Sesion"
            type="submit"
            className="w-100 mt-2"
        />

        <p id="mensaje-confirmacion" className="mt-3 text-center"></p>
    </Form>);
}
export default FormularioLogin;