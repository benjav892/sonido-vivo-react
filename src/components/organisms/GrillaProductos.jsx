import { Row, Col } from 'react-bootstrap';
import TarjetaProducto from '../molecules/TarjetaProducto';

function GrillaProductos(props) {
    return (
        <Row className="g-4">
            {props.productos.map((producto) => (
                // 1 columna en móvil (xs), 2 en tablet (md), 4 en escritorio (lg)
                <Col key={producto.codigo} xs={12} md={6} lg={3}>
                    <TarjetaProducto 
                        codigo={producto.codigo}
                        nombre={producto.nombre}
                        precio={producto.precio}
                        imagen={producto.imagen}
                        marca={producto.marca}
                        modelo={producto.modelo}
                        descripcion={producto.descripcion}
                        stock={producto.stock}
                        onAgregarCarrito={props.onAgregarCarrito}
                        onVerDetalle={props.onVerDetalle}
                    />
                </Col>
            ))}
        </Row>
    );
}

export default GrillaProductos;