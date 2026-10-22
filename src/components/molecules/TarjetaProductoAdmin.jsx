// src/components/molecules/TarjetaProductoAdmin.jsx
import { Row, Col, Badge } from 'react-bootstrap';
import ImagenInstrumento from '../atoms/ImagenInstrumento';
import Title from '../atoms/Title';
import Precio from '../atoms/Precio';
import Boton from '../atoms/Boton';

function TarjetaProductoAdmin(props) {
    const producto = props.producto || {};
    const esStockCritico = producto.stock <= (producto.stockMinimo || 0);

    return (
        <div className="bg-white p-4 shadow-sm rounded border">
            <Row className="align-items-center">
                {/* Columna Izquierda: Imagen */}
                <Col md={5} className="text-center mb-4 mb-md-0 border-end pe-md-4">
                    <div className="d-flex justify-content-center align-items-center bg-light p-3 rounded" style={{ minHeight: '280px' }}>
                        <ImagenInstrumento 
                            src={producto.imagen || '/img/placeholder.png'} 
                            alt={producto.nombre} 
                            style={{ maxHeight: '350px', objectFit: 'contain' }}
                        />
                    </div>
                </Col>

                {/* Columna Derecha: Información del producto */}
                <Col md={7} className="ps-md-4">
                    <Badge bg="secondary" className="mb-2 fs-6">
                        {producto.categoria}
                    </Badge>

                    <Title nivel={2} texto={producto.nombre} className="fw-bold text-dark mb-2" />

                    <p className="text-muted mb-2">
                        <strong>Código:</strong> {producto.codigo}
                    </p>

                    {(producto.marca || producto.modelo) && (
                        <p className="text-muted mb-3">
                            <strong>Marca:</strong> {producto.marca || 'N/A'}{' '}
                            {producto.modelo ? `| Modelo: ${producto.modelo}` : ''}
                        </p>
                    )}

                    <div className="my-3">
                        <Precio valor={producto.precio || 0} className="text-success fw-bold fs-3" />
                    </div>

                    <div className="mb-3">
                        <strong>Descripción breve:</strong>
                        <p className="mt-1 text-secondary">{producto.descripcion}</p>
                    </div>

                    <p className="mb-4">
                        <strong>Stock disponible:</strong>{' '}
                        <span className={esStockCritico ? 'text-danger fw-bold' : 'text-dark'}>
                            {producto.stock} unidades
                        </span>
                        {esStockCritico && (
                            <Badge bg="danger" className="ms-2">
                                Stock Crítico
                            </Badge>
                        )}
                    </p>

                    {/* Conjunto de botones de acción */}
                    <div className="d-flex gap-2 border-top pt-3">
                        <Boton
                            variante="warning"
                            texto="Editar Producto"
                            onClick={props.onEditar}
                        />
                        <Boton
                            variante="danger"
                            texto="Eliminar Producto"
                            onClick={props.onEliminar}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default TarjetaProductoAdmin;