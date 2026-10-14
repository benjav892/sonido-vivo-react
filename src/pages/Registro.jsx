import { Container, Row, Col } from "react-bootstrap";
import FormularioRegistro from "../components/organisms/FormularioRegistro";
import { useNavigate } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import { existeCorreo } from "../services/usuarioService";

function Registro() {
    const navigate = useNavigate();
    const { crear } = useUsuarios();

    function alCompletarRegistro(datosUsuario) {
        if (existeCorreo(datosUsuario.correo)) {
            return false
        }
        crear({ ...datosUsuario, rol: 'Cliente' })
        navigate('/login');
        return true
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={5}>
                    <header id="header-registro" className="text-center mb-4">
                        <h1 className="fw-bold">Sonido Vivo</h1>
                        <p className="text-muted">Crear cuenta</p>
                    </header>

                    <div className="p-4 border rounded shadow-sm bg-white">
                        <FormularioRegistro onRegistro={alCompletarRegistro} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Registro;