import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUsuarios } from '../context/UsuariosContext'
import { usePedidos } from '../context/PedidosContext'
import { obtenerMensajeError } from '../services/api'
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador'
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion'
import TablaDinamica from '../components/organisms/TablaDinamica'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'

function PaginaDetalleUsuario() {
  const navigate = useNavigate()
  const params = useParams()
  const { obtenerPorId } = useUsuarios()
  const { pedidos } = usePedidos()

  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useTituloPagina('Detalle de Usuario')

  useEffect(() => {
    let activo = true

    async function cargarDetalle() {
      setCargando(true)
      setError('')
      try {
        const encontrado = await obtenerPorId(Number(params.id))
        if (activo) setUsuario(encontrado)
      } catch (err) {
        if (activo) {
          setUsuario(null)
          setError(obtenerMensajeError(err))
        }
      } finally {
        if (activo) setCargando(false)
      }
    }

    cargarDetalle()
    return () => { activo = false }
  }, [params.id, obtenerPorId])

  if (cargando) {
    return (
      <PlantillaAdministrador>
        <EncabezadoSeccion titulo="Detalle de Usuario" />
        <p role="status">Cargando información del usuario...</p>
      </PlantillaAdministrador>
    )
  }

  if (!usuario) {
    return (
      <PlantillaAdministrador>
        <EncabezadoSeccion titulo="Usuario no encontrado" />
        <div className="alert alert-warning mb-4">
          {error || 'El usuario solicitado no existe o fue eliminado.'}
        </div>
        <Boton
          variante="secondary"
          texto="Volver a usuarios"
          onClick={() => navigate('/admin/usuarios')}
        />
      </PlantillaAdministrador>
    )
  }

  const nombreCompleto = `${usuario.nombre ?? ''} ${usuario.apellido ?? ''}`.trim()
  const pedidosUsuario = pedidos.filter(
  (p) => p.clienteId === usuario.id || p.clienteEmail === usuario.correo)

  const columnasPedidos = [
    { titulo: '# Pedido', llave: 'codigoPedido' },
    { titulo: 'Fecha', llave: 'fecha' },
    {
      titulo: 'Entrega',
      render: (ped) => (ped.tipoDespacho === 'retiro' ? 'Retiro en tienda' : 'Despacho'),
    },
    {
      titulo: 'Total',
      render: (ped) => `$${ped.total?.toLocaleString('es-CL') ?? 0}`,
    },
    {
      titulo: 'Estado',
      render: (ped) => (
        <span
          className={`badge ${
            ped.estado === 'Entregado'
              ? 'bg-success'
              : ped.estado === 'Despachado'
                ? 'bg-info text-dark'
                : 'bg-warning text-dark'
          }`}
        >
          {ped.estado || 'En proceso'}
        </span>
      ),
    },
  ]

  return (
    <PlantillaAdministrador>
      <EncabezadoSeccion titulo={`Detalle de Usuario: ${nombreCompleto}`} />

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3 text-primary">Información Personal</h5>
        <p className="mb-1"><strong>ID:</strong> {usuario.id}</p>
        <p className="mb-1"><strong>Nombre completo:</strong> {nombreCompleto}</p>
        <p className="mb-1"><strong>Correo Electrónico:</strong> {usuario.correo}</p>
        <p className="mb-1"><strong>Teléfono:</strong> {usuario.numeroTelefono || 'No registrado'}</p>
        <p className="mb-1"><strong>Rol en el Sistema:</strong> {usuario.rol}</p>
        {usuario.fechaRegistro && (
          <p className="mb-0">
            <strong>Fecha de registro:</strong>{' '}
            {new Date(usuario.fechaRegistro).toLocaleString('es-CL')}
          </p>
        )}
      </div>

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3 text-primary">Historial de Solicitudes / Compras</h5>
        {pedidosUsuario.length > 0 ? (
          <TablaDinamica columnas={columnasPedidos} datos={pedidosUsuario} />
        ) : (
          <div className="alert alert-info mb-0">
            Este usuario no ha realizado ninguna solicitud o compra todavía.
          </div>
        )}
      </div>

      <Boton
        variante="secondary"
        texto="Volver a usuarios"
        onClick={() => navigate('/admin/usuarios')}
      />
    </PlantillaAdministrador>
  )
}

export default PaginaDetalleUsuario