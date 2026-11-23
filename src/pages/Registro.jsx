import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FormularioRegistro from '../components/organisms/FormularioRegistro'
import { registrarApi } from '../services/authService'
import { obtenerMensajeError } from '../services/api'
import { useTituloPagina } from '../hooks/useTituloPagina'

function Registro() {
  const navigate = useNavigate()
  const [cargando, setCargando] = useState(false)
  const [errorRegistro, setErrorRegistro] = useState('')
  const [exitoRegistro, setExitoRegistro] = useState('')

  useTituloPagina('Crear cuenta')

  async function alCompletarRegistro(dto) {
    setCargando(true)
    setErrorRegistro('')
    setExitoRegistro('')
    try {
      await registrarApi(dto)
      setExitoRegistro('Cuenta creada exitosamente. Redirigiendo al inicio de sesión...')
      setTimeout(() => navigate('/login'), 1200)
      return true
    } catch (error) {
      setErrorRegistro(obtenerMensajeError(error))
      return false
    } finally {
      setCargando(false)
    }
  }

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <header id="header-registro" className="text-center mb-4">
            <h1 className="fw-bold">Sonido Vivo</h1>
            <p className="text-muted">Crear cuenta de cliente</p>
          </header>

          <div className="p-4 border rounded shadow-sm bg-white">
            <FormularioRegistro
              onRegistro={alCompletarRegistro}
              cargando={cargando}
              error={errorRegistro}
              exito={exitoRegistro}
            />
            <div className="text-center mt-3">
              <small className="text-muted">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
              </small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Registro