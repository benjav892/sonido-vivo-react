import Title from '../atoms/Title';
import Precio from '../atoms/Precio';
import Boton from '../atoms/Boton';
import ControlCantidad from '../molecules/ControlCantidad';

function InfoDetalleProducto(props) {
    const producto = props.producto;

    return (
        <article className="d-flex flex-column h-100">
            <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom pb-3 mb-4" style={{ borderColor: '#b08bb5' }}>
                <Title texto={producto.nombre} nivel={1} className="m-0" style={{ color: '#200347', fontSize: '2.2rem' }} />
                <Precio valor={producto.precio} className="fw-bold" style={{ color: '#094d17', fontSize: '2rem' }} />
            </div>
            
            <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
                {producto.descripcion}
            </p>
            
            <div className="mt-auto d-flex flex-wrap align-items-center gap-3">
                <ControlCantidad 
                    id={`cant-${producto.codigo}`}
                    etiqueta="Cantidad"
                    min="1"
                    max={producto.stock}
                    valor={props.cantidad}
                    onChange={props.onChangeCantidad}
                />
                <Boton 
                    texto="Añadir al carrito" 
                    className="flex-grow-1 py-2 fs-5" 
                    style={{ backgroundColor: 'rgb(142, 96, 125)', border: 'none' }}
                    onClick={props.onAgregarCarrito} 
                />
            </div>
        </article>
    );
}

export default InfoDetalleProducto;