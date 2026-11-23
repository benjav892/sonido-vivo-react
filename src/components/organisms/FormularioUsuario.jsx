import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { validarContrasena, validarCorreo, validarNombre, validarRol } from '../../utils/validaciones'
import { crearUsuarioCreateDto, crearUsuarioUpdateDto } from '../../dto/usuario.dto'
import CampoFormulario from '../molecules/CampoFormulario'
import CampoSelector from '../molecules/CampoSelector'
import Boton from '../atoms/Boton'

const ROLES = ['Administrador', 'Vendedor', 'Cliente']

function FormularioUsuario(props) {
  const esEdicion = Boolean(props.usuario)

  const [nombre, setNombre] = useState(props.usuario?.nombre ?? '')
  const [apellido, setApellido] = useState(props.usuario?.apellido ?? '')
  const [correo, setCorreo] = useState(props.usuario?.correo ?? props.usuario?.email ?? '')
  const [numeroTelefono, setNumeroTelefono] = useState(props.usuario?.numeroTelefono ?? '')
  const [contrasena, setContrasena] = useState('')
  const [rol, setRol] = useState(props.usuario?.rol ?? '')

  const [errorNombre, setErrorNombre] = useState('')
  const [errorApellido, setErrorApellido] = useState('')
  const [errorCorreo, setErrorCorreo] = useState('')
  const [errorContrasena, setErrorContrasena] = useState('')
  const [errorRol, setErrorRol] = useState('')

  async function alEnviar(evento) {
    evento.preventDefault()

    const mensajeNombre = validarNombre(nombre)
    const mensajeApellido = apellido.trim() ? '' : 'El apellido es obligatorio'
    const mensajeCorreo = esEdicion ? '' : validarCorreo(correo)
    const mensajeContrasena = esEdicion ? '' : validarContrasena(contrasena)
    const mensajeRol = validarRol(rol)

    setErrorNombre(mensajeNombre)
    setErrorApellido(mensajeApellido)
    setErrorCorreo(mensajeCorreo)
    setErrorContrasena(mensajeContrasena)
    setErrorRol(mensajeRol)

    if (
      mensajeNombre === '' &&
      mensajeApellido === '' &&
      mensajeCorreo === '' &&
      mensajeContrasena === '' &&
      mensajeRol === ''
    ) {
      const dto = esEdicion
        ? crearUsuarioUpdateDto({ nombre, apellido, numeroTelefono, rol })
        : crearUsuarioCreateDto({ nombre, apellido, correo, numeroTelefono, contrasena, rol })

      await props.onGuardar(dto)
    }
  }

  return (
    <Form noValidate onSubmit={alEnviar}>
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
        etiqueta="Apellido"
        id="apellido-usuario"
        tipo="text"
        requerido={true}
        value={apellido}
        onChange={(evento) => setApellido(evento.target.value)}
        error={errorApellido}
      />

      {esEdicion ? (
        <Form.Group className="mb-3" controlId="correo-usuario">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" value={correo} disabled readOnly />
          <Form.Text className="text-muted">
            El correo no se modifica al editar un usuario.
          </Form.Text>
        </Form.Group>
      ) : (
        <CampoFormulario
          etiqueta="Correo electrónico (@duoc.cl, @profesor.duoc.cl o @gmail.com)"
          id="correo-usuario"
          tipo="email"
          requerido={true}
          value={correo}
          onChange={(evento) => setCorreo(evento.target.value)}
          error={errorCorreo}
        />
      )}

      <CampoFormulario
        etiqueta="Teléfono (opcional)"
        id="telefono-usuario"
        tipo="tel"
        requerido={false}
        value={numeroTelefono}
        onChange={(evento) => setNumeroTelefono(evento.target.value)}
        error=""
      />

      {!esEdicion && (
        <CampoFormulario
          etiqueta="Contraseña"
          id="contrasena-usuario"
          tipo="password"
          requerido={true}
          value={contrasena}
          onChange={(evento) => setContrasena(evento.target.value)}
          error={errorContrasena}
        />
      )}

      <CampoSelector
        etiqueta="Rol *"
        id="rol-usuario"
        value={rol}
        onChange={(evento) => setRol(evento.target.value)}
        opciones={ROLES}
        error={errorRol}
      />

      {props.error && (
        <p className="mt-3 text-danger fw-semibold">{props.error}</p>
      )}

      <div className="d-flex justify-content-end gap-2 mt-4">
        {props.onCancelar && (
          <Boton
            variante="secondary"
            texto="Cancelar"
            type="button"
            onClick={props.onCancelar}
            disabled={props.cargando}
          />
        )}
        <Boton
          variante="primary"
          texto={
            props.cargando
              ? 'Guardando...'
              : esEdicion
                ? 'Actualizar'
                : 'Guardar'
          }
          type="submit"
          disabled={props.cargando}
        />
      </div>
    </Form>
  )
}

export default FormularioUsuario