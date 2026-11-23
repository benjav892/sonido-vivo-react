import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormularioLogin from '../components/organisms/FormularioLogin'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { useAuth } from '../context/AuthContext'
import { obtenerMensajeError } from '../services/api'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { iniciarSesion } = useAuth()
  const [cargando, setCargando] = useState(false)
  const [errorLogin, setErrorLogin] = useState('')

  useTituloPagina('Inicio de sesión')

  async function alIniciarSesion(dto) {
    setCargando(true)
    setErrorLogin('')
    try {
      const usuarioAutenticado = await iniciarSesion(dto)
      const destinoPrevio = location.state?.desde
      if (destinoPrevio && destinoPrevio !== '/login') {
        navigate(destinoPrevio, { replace: true })
      } else if (usuarioAutenticado.rol === 'Administrador' || usuarioAutenticado.rol === 'Vendedor') {
        navigate('/admin', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
      return true
    } catch (error) {
      setErrorLogin(obtenerMensajeError(error))
      return false
    } finally {
      setCargando(false)
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={4}>
          <header id="header-login" className="text-center mb-4">
            <h1 className="fw-bold">Sonido Vivo</h1>
            <p className="text-muted">Inicia sesión en tu cuenta</p>
          </header>

          <div className="p-4 border rounded shadow-sm bg-white">
            <FormularioLogin
              onLogin={alIniciarSesion}
              cargando={cargando}
              error={errorLogin}
            />
            <div className="text-center mt-3">
              <small className="text-muted">
                ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
              </small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login