import { Card } from 'react-bootstrap';
import Boton from '../atoms/Boton';

function TarjetaProducto(props) {
    const precioCLP = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(props.precio);

    return (
        <Card className="h-100 producto-catalogo border-0">
            <a href="#" onClick={(e) => { e.preventDefault(); props.onVerDetalle(props.codigo); }} className="enlace-detalle">
                <Card.Img variant="top" src={props.imagen} alt={props.nombre} />
            </a>
            
            <Card.Body className="d-flex flex-column p-0 mt-2">
                <a href="#" onClick={(e) => { e.preventDefault(); props.onVerDetalle(props.codigo); }} className="enlace-detalle text-decoration-none">
                    <Card.Title as="h2">{props.nombre}</Card.Title>
                </a>
                
                <Card.Text className="precio">
                    {precioCLP}
                </Card.Text>
                
                <div className="mt-auto text-start">
                    <Card.Text className="marca mb-1"><strong>Marca:</strong> {props.marca}</Card.Text>
                    <Card.Text className="modelo mb-1"><strong>Modelo:</strong> {props.modelo}</Card.Text>
                    <Card.Text className="descripcion">{props.descripcion}</Card.Text>
                    <Card.Text className="stock">Stock disponible: {props.stock}</Card.Text>
                    
                    <Boton 
                        texto="Añadir al Carrito" 
                        className="btn-agregar" 
                        onClick={() => props.onAgregarCarrito(props.codigo)} 
                    />
                </div>
            </Card.Body>
        </Card>
    );
}

export default TarjetaProducto;