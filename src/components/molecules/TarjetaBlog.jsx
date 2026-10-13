import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Boton from '../atoms/Boton';

function TarjetaBlog(props) {
    const navigate = useNavigate();

    return (
        <Card className="mb-4 shadow-sm border-0" style={{ backgroundColor: 'rgb(165, 114, 146)', borderRadius: '8px', overflow: 'hidden' }}>
            <Row className="g-0 align-items-center">
                <Col md={7} className="p-4 d-flex flex-column justify-content-center">
                    <Card.Title as="h2" style={{ color: '#200347', fontSize: '1.5rem', marginBottom: '15px', textAlign: 'left' }}>
                        {props.titulo}
                    </Card.Title>
                    <Card.Text style={{ color: '#0e0d0d', fontSize: '1.05rem', lineHeight: '1.6' }}>
                        {props.descCorta}
                    </Card.Text>
                    <Boton 
                        texto="VER CASO" 
                        variante="light" 
                        className="fw-bold mt-2 align-self-start" 
                        onClick={() => navigate(props.rutaDestino)} 
                    />
                </Col>
                <Col md={5}>
                    <Card.Img src={props.imagen} alt={props.titulo} style={{ height: '100%', minHeight: '250px', objectFit: 'cover' }} />
                </Col>
            </Row>
        </Card>
    );
}

export default TarjetaBlog;