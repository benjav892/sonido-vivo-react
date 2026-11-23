import { Container, Alert, Button } from 'react-bootstrap'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaProtegida(props) {
  const { usuario, estaAutenticado, cargandoSesion } = useAuth()
  const location = useLocation()

  if (cargandoSesion) {
    return (
      <Container className="py-5 text-center">
        <p role="status">Verificando sesión...</p>
      </Container>
    )
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" state={{ desde: location.pathname }} replace />
  }

  if (props.rolesPermitidos && !props.rolesPermitidos.includes(usuario.rol)) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="shadow-sm">
          <Alert.Heading>Acceso denegado (403)</Alert.Heading>
          <p className="mb-3">
            Tu rol actual (<strong>{usuario.rol}</strong>) no tiene permisos para acceder a esta sección.
          </p>
          <div className="d-flex gap-2">
            <Button as={Link} to="/" variant="outline-danger">
              Volver al inicio
            </Button>
            {usuario.rol === 'Vendedor' && (
              <Button as={Link} to="/admin" variant="dark">
                Ir al panel
              </Button>
            )}
          </div>
        </Alert>
      </Container>
    )
  }

  return props.children
}

export default RutaProtegida