import { Row, Col } from 'react-bootstrap';
import Boton from '../atoms/Boton';
import Precio from '../atoms/Precio';
import ControlCantidad from './ControlCantidad';

function ItemCarrito(props) {
    const stockDisponible = props.stockDisponible ?? props.item.stock;
    const excedeStock = typeof stockDisponible === 'number' && props.item.cantidad > stockDisponible;

    return (
        <Row className={`align-items-center border-bottom py-3 bg-white g-2 ${props.className || ''}`}>
            <Col xs={3} md={2}>
                <img src={props.item.imagen} alt={props.item.nombre} className="img-fluid rounded" />
            </Col>
            <Col xs={9} md={3}>
                <h5 className="mb-1" style={{ color: '#200347' }}>{props.item.nombre}</h5>
                {typeof stockDisponible === 'number' && (
                    <small className={excedeStock ? 'text-danger fw-bold' : 'text-muted'}>
                        {excedeStock
                            ? `Excede el stock actual (${stockDisponible} disp.)`
                            : `Stock disponible: ${stockDisponible}`}
                    </small>
                )}
            </Col>
            <Col xs={7} md={3}>
                <ControlCantidad
                    id={`cantidad-${props.item.codigo}`}
                    etiqueta="Cant."
                    min={1}
                    max={typeof stockDisponible === 'number' && stockDisponible > 0 ? stockDisponible : undefined}
                    valor={props.item.cantidad}
                    onChange={(e) => props.onCambiarCantidad(props.item.codigo, e.target.value)}
                />
            </Col>
            <Col xs={5} md={2} className="text-end">
                <Precio
                    valor={props.item.precio * props.item.cantidad}
                    className="fw-bold"
                    style={{ color: '#094d17', fontSize: '1.1rem' }}
                />
            </Col>
            <Col xs={12} md={2} className="text-end mt-2 mt-md-0">
                <Boton
                    variante="outline-danger"
                    texto="Eliminar"
                    className="btn-sm"
                    onClick={() => props.onEliminar(props.item.codigo)}
                />
            </Col>
        </Row>
    );
}

export default ItemCarrito;