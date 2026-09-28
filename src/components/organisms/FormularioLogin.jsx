import { Form } from "react-bootstrap";
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

function FormularioLogin(props) {
    return (<Form id="login" noValidate onSubmit={props.onLogin}>
        <CampoFormulario
            etiqueta="Correo electrónico"
            id="correo-login"
            tipo="email"
            requerido={true}
        />
        <CampoFormulario
            etiqueta="Contraseña"
            id="contrasena"
            tipo="password"
            requerido={true}
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