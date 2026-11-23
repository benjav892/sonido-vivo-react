// src/components/templates/PlantillaAdministrador.jsx
import { Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import BarraLateral from '../organisms/BarraLateral'
import logo from '../../assets/Logo.png'
import { useAuth } from '../../context/AuthContext'

const ITEMS_MENU = [
  { texto: 'Inicio', ruta: '/admin' },
  { texto: 'Gestión de usuarios', ruta: '/admin/usuarios', soloAdmin: true },
  { texto: 'Gestión de inventario', ruta: '/admin/inventario' },
  { texto: 'Gestión de categorías', ruta: '/admin/categorias' },
  { texto: 'Gestión de pedidos', ruta: '/admin/pedidos' },
  { texto: 'Ítems críticos', ruta: '/admin/criticos' },
  { texto: 'Reportes', ruta: '/admin/reportes' },
  { texto: 'Mi perfil', ruta: '/admin/perfil' },
]

function PlantillaAdministrador(props) {
  const contenido = props.children
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const itemsVisibles = ITEMS_MENU.filter(
    (item) => !item.soloAdmin || usuario?.rol === 'Administrador'
  )

  function manejarCerrarSesion() {
    logout()
    navigate('/login')
  }

  return (
    <Container fluid className="p-0 d-flex min-vh-100 w-100 bg-light">
      <BarraLateral
        tituloMarca="Sonido Vivo"
        logoSrc={logo}
        items={itemsVisibles}
      />

      <main className="flex-grow-1 p-4 overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom flex-wrap gap-2">
          <div className="text-muted small">
            Sesión activa:{' '}
            <strong>
              {usuario ? `${usuario.nombre} ${usuario.apellido ?? ''}`.trim() : 'Invitado'}
            </strong>{' '}
            {usuario?.rol && <span className="badge bg-dark ms-1">{usuario.rol}</span>}
          </div>
          <div className="d-flex gap-2">
            <Link to="/" className="btn btn-outline-secondary btn-sm">
              Ir a la tienda
            </Link>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={manejarCerrarSesion}
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {contenido}
      </main>
    </Container>
  )
}

export default PlantillaAdministrador