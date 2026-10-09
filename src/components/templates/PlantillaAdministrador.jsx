
import { Container } from 'react-bootstrap';

function PlantillaAdministrador(props) {
    const barraLateral = props.barraLateral;
    const contenido = props.children;

    return (
        <Container fluid className="p-0 d-flex min-vh-100 w-100 bg-light">
            {/* Columna Izquierda: Barra Lateral Fija */}
            {barraLateral}

            {/* Columna Derecha: Contenido Principal Dinámico */}
            <main className="flex-grow-1 p-4 overflow-auto">
                {contenido}
            </main>
        </Container>
    );
}

export default PlantillaAdministrador;