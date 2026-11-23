import { useState } from 'react'
import { Form } from 'react-bootstrap'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import {
  validarNombre,
  validarCorreo,
  validarContrasena,
  validarConfirmarContrasena,
} from '../../utils/validaciones'
import { crearRegistroRequestDto } from '../../dto/auth.dto'

function FormularioRegistro(props) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [correo, setCorreo] = useState('')
  const [numeroTelefono, setNumeroTelefono] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [confirmarContrasena, setConfirmarContrasena] = useState('')

  const [errorNombre, setErrorNombre] = useState('')
  const [errorApellido, setErrorApellido] = useState('')
  const [errorCorreo, setErrorCorreo] = useState('')
  const [errorContrasena, setErrorContrasena] = useState('')
  const [errorConfirmar, setErrorConfirmar] = useState('')

  async function alEnviar(evento) {
    evento.preventDefault()

    const mensajeNombre = validarNombre(nombre)
    const mensajeApellido = apellido.trim() ? '' : 'El apellido es obligatorio'
    const mensajeCorreo = validarCorreo(correo)
    const mensajeContrasena = validarContrasena(contrasena)
    const mensajeConfirmar = validarConfirmarContrasena(contrasena, confirmarContrasena)

    setErrorNombre(mensajeNombre)
    setErrorApellido(mensajeApellido)
    setErrorCorreo(mensajeCorreo)
    setErrorContrasena(mensajeContrasena)
    setErrorConfirmar(mensajeConfirmar)

    if (
      mensajeNombre === '' &&
      mensajeApellido === '' &&
      mensajeCorreo === '' &&
      mensajeContrasena === '' &&
      mensajeConfirmar === ''
    ) {
      const dto = crearRegistroRequestDto({
        nombre,
        apellido,
        correo,
        numeroTelefono,
        contrasena,
      })
      const registrado = await props.onRegistro(dto)
      if (registrado) {
        setNombre('')
        setApellido('')
        setCorreo('')
        setNumeroTelefono('')
        setContrasena('')
        setConfirmarContrasena('')
      }
    }
  }

  return (
    <Form id="registro" noValidate onSubmit={alEnviar}>
      <CampoFormulario
        etiqueta="Nombre"
        id="nombre-registro"
        tipo="text"
        requerido={true}
        value={nombre}
        onChange={(evento) => setNombre(evento.target.value)}
        error={errorNombre}
      />

      <CampoFormulario
        etiqueta="Apellido"
        id="apellido-registro"
        tipo="text"
        requerido={true}
        value={apellido}
        onChange={(evento) => setApellido(evento.target.value)}
        error={errorApellido}
      />

      <CampoFormulario
        etiqueta="Correo electrónico (@duoc.cl, @profesor.duoc.cl o @gmail.com)"
        id="correo-registro"
        tipo="email"
        requerido={true}
        value={correo}
        onChange={(evento) => setCorreo(evento.target.value)}
        error={errorCorreo}
      />

      <CampoFormulario
        etiqueta="Teléfono (opcional)"
        id="telefono-registro"
        tipo="tel"
        requerido={false}
        value={numeroTelefono}
        onChange={(evento) => setNumeroTelefono(evento.target.value)}
        error=""
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
        texto={props.cargando ? 'Creando cuenta...' : 'Crear Cuenta'}
        type="submit"
        className="w-100 mt-2"
        disabled={props.cargando}
      />

      {props.error && (
        <p id="error-registro" className="mt-3 text-center text-danger">
          {props.error}
        </p>
      )}
      {props.exito && (
        <p id="mensaje-confirmacion" className="mt-3 text-center text-success">
          {props.exito}
        </p>
      )}
    </Form>
  )
}

export default FormularioRegistro