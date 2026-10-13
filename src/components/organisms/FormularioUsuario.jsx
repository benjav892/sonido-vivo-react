import { useState } from "react";
import { validarContrasena, validarCorreo, validarNombre, validarRol } from "../../utils/validaciones";
import { Form } from "react-bootstrap";
import CampoFormulario from "../molecules/CampoFormulario";
import CampoSelector from "../molecules/CampoSelector";
import Boton from "../atoms/Boton";

const ROLES = ['Administrador', 'Vendedor', 'Cliente']

function FormularioUsuario(props) {
    const [nombre, setNombre] = useState(props.usuario?.nombre ?? '')
    const [correo, setCorreo] = useState(props.usuario?.correo ?? '')
    const [contrasena, setContrasena] = useState('')
    const [rol, setRol] = useState(props.usuario?.rol ?? '')
    const [errorNombre, setErrorNombre] = useState('')
    const [errorCorreo, setErrorCorreo] = useState('')
    const [errorContrasena, setErrorContrasena] = useState('')
    const [errorRol, setErrorRol] = useState('')

    function alEnviar(evento) {
        evento.preventDefault()
        const mensajeNombre = validarNombre(nombre)
        const mensajeCorreo = validarCorreo(correo)
        const mensajeContrasena = (props.usuario && contrasena === '') ? '' : validarContrasena(contrasena)
        const mensajeRol = validarRol(rol)
        setErrorNombre(mensajeNombre)
        setErrorCorreo(mensajeCorreo)
        setErrorContrasena(mensajeContrasena)
        setErrorRol(mensajeRol)
        if (mensajeNombre === '' && mensajeCorreo === '' && mensajeContrasena === '' && mensajeRol === '') {
            const datos = { nombre, correo, rol }
            if (contrasena !== '') {
                datos.contrasena = contrasena
            }
            props.onGuardar(datos)
        }
    }

    return (
        < Form noValidate onSubmit={alEnviar} >
            <CampoFormulario
                etiqueta="Nombre"
                id="nombre-usuario"
                tipo="text"
                requerido={true}
                value={nombre}
                onChange={(evento) => setNombre(evento.target.value)}
                error={errorNombre}
            />

            <CampoFormulario
                etiqueta="Correo electrónico"
                id="correo-usuario"
                tipo="email"
                requerido={true}
                value={correo}
                onChange={(evento) => setCorreo(evento.target.value)}
                error={errorCorreo}
            />


            <CampoFormulario
                etiqueta={props.usuario ? "Contraseña (dejar en blanco para mantener la actual)" : "Contraseña"}
                id="contrasena-usuario"
                tipo="password"
                requerido={!props.usuario}
                value={contrasena}
                onChange={(evento) => setContrasena(evento.target.value)}
                error={errorContrasena}
            />

            <CampoSelector
                etiqueta="Rol *"
                id="rol-usuario"
                value={rol}
                onChange={(evento) => setRol(evento.target.value)}
                opciones={ROLES}
                error={errorRol}
            />
            <div className="d-flex justify-content-end gap-2 mt-4">
                {props.onCancelar && (
                    <Boton
                        variante="secondary"
                        texto="Cancelar"
                        type="button"
                        onClick={props.onCancelar}
                    />
                )}
                <Boton
                    variante="primary"
                    texto={props.usuario ? "Actualizar" : "Guardar"}
                    type="submit"
                />
            </div>


        </Form >
    )




}

export default FormularioUsuario;