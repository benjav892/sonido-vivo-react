import { Container, Row, Col } from "react-bootstrap";
import FormularioLogin from "../components/organisms/FormularioLogin";
import { useNavigate } from "react-router-dom";
import { autenticarUsuario } from "../services/usuarioService";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { useAuth } from "../context/AuthContext";

function Login(props) {
    const navigate = useNavigate()
    const { login } = useAuth()
    function alIniciarSesion(correo, contrasena) {
        const usuarioEncontrado = autenticarUsuario(correo, contrasena)
        if (usuarioEncontrado) {
            // guardar la sesión sin la contraseña
            login({
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.nombre,
                correo: usuarioEncontrado.correo,
                rol: usuarioEncontrado.rol
            })
            if (usuarioEncontrado.rol === 'Administrador') {
                navigate('/admin')
            } else {
                navigate('/')
            }
            return true
        } else {
            return false
        }
    }
    useTituloPagina('Inicio de sesión')
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={4}>
                    <header id="header-login" className="text-center mb-4">
                        <h1 className="fw-bold">Sonido Vivo</h1>
                        <p className="text-muted">Inicia sesión en tu cuenta</p>
                    </header>

                    <div className="p-4 border rounded shadow-sm bg-white">
                        {/* Se pasa la función al organismo como prop, igual que en la guía */}
                        <FormularioLogin onLogin={alIniciarSesion} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;