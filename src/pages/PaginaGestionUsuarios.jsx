// src/pages/PaginaGestionUsuarios.jsx
import { useState } from 'react'
import { Alert, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useUsuarios } from '../context/UsuariosContext'
import { obtenerMensajeError } from '../services/api'
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador'
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion'
import BarraBusqueda from '../components/molecules/BarraBusqueda'
import TablaDinamica from '../components/organisms/TablaDinamica'
import FormularioUsuario from '../components/organisms/FormularioUsuario'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'

function PaginaGestionUsuarios() {
  const navigate = useNavigate()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [errorFormulario, setErrorFormulario] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')

  // Estado del modal de confirmación para eliminar
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const [errorEliminacion, setErrorEliminacion] = useState('')

  const { usuarios, cargando, error, crear, actualizar, eliminar, recargar } = useUsuarios()

  const texto = busqueda.toLowerCase()
  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nombre ?? ''} ${u.apellido ?? ''}`.toLowerCase().includes(texto) ||
    (u.correo ?? '').toLowerCase().includes(texto) ||
    (u.rol ?? '').toLowerCase().includes(texto)
  )

  function abrirNuevo() {
    setErrorFormulario('')
    setMensajeExito('')
    setMostrarFormulario(true)
    setUsuarioEditando(null)
  }

  function abrirEditar(usuario) {
    setErrorFormulario('')
    setMensajeExito('')
    setMostrarFormulario(true)
    setUsuarioEditando(usuario)
  }

  function cerrarFormulario() {
    setMostrarFormulario(false)
    setUsuarioEditando(null)
    setErrorFormulario('')
  }

  async function alGuardar(dto) {
    setGuardando(true)
    setErrorFormulario('')
    setMensajeExito('')
    try {
      if (usuarioEditando) {
        await actualizar(usuarioEditando.id, dto)
        setMensajeExito('Usuario actualizado correctamente.')
      } else {
        await crear(dto)
        setMensajeExito('Usuario creado correctamente.')
      }
      cerrarFormulario()
    } catch (err) {
      setErrorFormulario(obtenerMensajeError(err))
    } finally {
      setGuardando(false)
    }
  }

  function solicitarEliminacion(usuario) {
    setErrorEliminacion('')
    setMensajeExito('')
    setUsuarioAEliminar(usuario)
  }

  function cancelarEliminacion() {
    if (eliminando) return
    setUsuarioAEliminar(null)
    setErrorEliminacion('')
  }

  async function confirmarEliminacion() {
    if (!usuarioAEliminar) return
    setEliminando(true)
    setErrorEliminacion('')
    try {
      await eliminar(usuarioAEliminar.id)
      setMensajeExito('Usuario eliminado correctamente.')
      setUsuarioAEliminar(null)
    } catch (err) {
      setErrorEliminacion(obtenerMensajeError(err))
    } finally {
      setEliminando(false)
    }
  }

  const columnas = [
    {
      titulo: 'Nombre',
      render: (usuario) => `${usuario.nombre ?? ''} ${usuario.apellido ?? ''}`.trim(),
    },
    { titulo: 'Correo', llave: 'correo' },
    {
      titulo: 'Teléfono',
      render: (usuario) => usuario.numeroTelefono || '—',
    },
    { titulo: 'Rol', llave: 'rol' },
    {
      titulo: 'Acciones',
      render: (usuario) => (
        <div className="d-flex gap-2 flex-wrap">
          <Boton
            variante="info"
            texto="Ver"
            onClick={() => navigate(`/admin/usuarios/detalle/${usuario.id}`)}
          />
          <Boton
            variante="warning"
            texto="Editar"
            onClick={() => abrirEditar(usuario)}
          />
          <Boton
            variante="danger"
            texto="Eliminar"
            onClick={() => solicitarEliminacion(usuario)}
          />
        </div>
      ),
    },
  ]

  useTituloPagina('Gestión de usuarios')

  return (
    <PlantillaAdministrador>
      <EncabezadoSeccion
        titulo="Gestión de Usuarios"
        textoBoton="NUEVO USUARIO"
        varianteBoton="success"
        onClickBoton={abrirNuevo}
      />

      {mensajeExito && (
        <Alert variant="success" dismissible onClose={() => setMensajeExito('')}>
          {mensajeExito}
        </Alert>
      )}

      {error && (
        <Alert variant="danger">
          {error}
          <div className="mt-2">
            <Boton variante="outline-danger" texto="Reintentar" onClick={recargar} />
          </div>
        </Alert>
      )}

      {mostrarFormulario && (
        <div className="card shadow-sm p-4 mb-4">
          <h5 className="mb-3">
            {usuarioEditando ? 'Editar usuario' : 'Crear nuevo usuario'}
          </h5>
          <FormularioUsuario
            key={usuarioEditando?.id ?? 'nuevo'}
            usuario={usuarioEditando}
            onGuardar={alGuardar}
            onCancelar={cerrarFormulario}
            cargando={guardando}
            error={errorFormulario}
          />
        </div>
      )}

      <BarraBusqueda
        placeholder="Buscar por nombre, correo o rol"
        valor={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
        textoBoton="LIMPIAR"
        onBuscar={() => setBusqueda('')}
      />

      {cargando ? (
        <div className="text-center py-4" role="status">
          Cargando usuarios desde el servidor...
        </div>
      ) : (
        <TablaDinamica columnas={columnas} datos={usuariosFiltrados} />
      )}

      <Modal
        show={Boolean(usuarioAEliminar)}
        onHide={cancelarEliminacion}
        centered
        backdrop={eliminando ? 'static' : true}
        keyboard={!eliminando}
      >
        <Modal.Header closeButton={!eliminando}>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            ¿Seguro que deseas eliminar al usuario{' '}
            <strong>
              {`${usuarioAEliminar?.nombre ?? ''} ${usuarioAEliminar?.apellido ?? ''}`.trim()}
            </strong>{' '}
            ({usuarioAEliminar?.correo})? Esta acción no se puede deshacer.
          </p>
          {errorEliminacion && (
            <Alert variant="danger" className="mt-3 mb-0">
              {errorEliminacion}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Boton
            variante="secondary"
            texto="Cancelar"
            type="button"
            onClick={cancelarEliminacion}
            disabled={eliminando}
          />
          <Boton
            variante="danger"
            texto={eliminando ? 'Eliminando...' : 'Eliminar'}
            type="button"
            onClick={confirmarEliminacion}
            disabled={eliminando}
          />
        </Modal.Footer>
      </Modal>
    </PlantillaAdministrador>
  )
}

export default PaginaGestionUsuarios