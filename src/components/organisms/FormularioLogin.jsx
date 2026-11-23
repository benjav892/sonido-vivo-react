import { Form } from 'react-bootstrap'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import { useState } from 'react'
import { validarCorreo, validarContrasena } from '../../utils/validaciones'
import { crearLoginRequestDto } from '../../dto/auth.dto'

function FormularioLogin(props) {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [errorCorreo, setErrorCorreo] = useState('')
  const [errorContrasena, setErrorContrasena] = useState('')

  async function alClickear(evento) {
    evento.preventDefault()
    const mensajeCorreo = validarCorreo(correo)
    const mensajeContrasena = validarContrasena(contrasena)
    setErrorCorreo(mensajeCorreo)
    setErrorContrasena(mensajeContrasena)

    if (mensajeContrasena === '' && mensajeCorreo === '') {
      const dto = crearLoginRequestDto({ correo, contrasena })
      await props.onLogin(dto)
    }
  }

  return (
    <Form id="login" noValidate onSubmit={alClickear}>
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
        texto={props.cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        type="submit"
        className="w-100 mt-2"
        disabled={props.cargando}
      />

      {props.error && (
        <p id="error-login" className="mt-3 text-center text-danger">
          {props.error}
        </p>
      )}
    </Form>
  )
}

export default FormularioLogin