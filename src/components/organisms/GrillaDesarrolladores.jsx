import { Row, Col } from 'react-bootstrap';
import Title from '../atoms/Title';

function GrillaDesarrolladores() {
    const desarrolladores = [
        { id: 1, nombre: 'Camilo Vera', rol: 'Desarrollador Frontend' },
        { id: 2, nombre: 'Benjamín Vásquez', rol: 'Desarrollador Frontend' },
        { id: 3, nombre: 'Sebastián Toro', rol: 'Desarrollador Frontend' }
    ];

    return (
        <Row className="g-4 justify-content-center">
            {desarrolladores.map((dev) => (
                <Col xs={12} md={4} key={dev.id}>
                    <div className="p-4 rounded shadow-sm h-100 text-center" style={{ backgroundColor: 'rgb(200, 184, 224)', transition: 'transform 0.3s' }}>
                        <Title texto={dev.nombre} nivel={3} className="fs-4 mb-2 fw-bold" style={{ color: '#200347' }} />
                        <p className="fw-bold m-0" style={{ color: '#4D3D4F' }}>{dev.rol}</p>
                    </div>
                </Col>
            ))}
        </Row>
    );
}

export default GrillaDesarrolladores;