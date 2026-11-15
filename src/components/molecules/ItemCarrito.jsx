import { Row, Col } from 'react-bootstrap';
import Boton from '../atoms/Boton';
import Precio from '../atoms/Precio';

function ItemCarrito(props) {
    return (
        <Row className={`align-items-center border-bottom py-3 bg-white ${props.className || ''}`}>
            <Col xs={3} md={2}>
                <img src={props.item.imagen} alt={props.item.nombre} className="img-fluid rounded" />
            </Col>
            <Col xs={5} md={5}>
                <h5 className="mb-1" style={{ color: '#200347' }}>{props.item.nombre}</h5>
                <p className="mb-0 text-muted">Cantidad: {props.item.cantidad}</p>
            </Col>
            <Col xs={4} md={3} className="text-end">
                <Precio valor={props.item.precio * props.item.cantidad} className="fw-bold" style={{ color: '#094d17', fontSize: '1.2rem' }} />
            </Col>
            <Col xs={12} md={2} className="text-end mt-2 mt-md-0">
                <Boton variante="outline-danger" texto="Eliminar" onClick={() => props.onEliminar(props.item.codigo)} />
            </Col>
        </Row>
    );
}

export default ItemCarrito;