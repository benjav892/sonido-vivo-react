import { Image } from 'react-bootstrap';

function GaleriaDetalle(props) {
    return (
        <article className="d-flex flex-column gap-3 h-100">
            <div className="bg-white border rounded p-3 text-center" style={{ borderColor: '#b08bb5' }}>
                <Image 
                    src={props.imagenPrincipal} 
                    alt="Producto principal" 
                    fluid 
                    style={{ maxHeight: '350px', objectFit: 'contain' }} 
                />
            </div>
            
            {/* miniaturas: por ahora se reutiliza la imagen principal*/}
            <div className="d-flex gap-3 justify-content-between">
                <div className="bg-white border rounded p-2" style={{ borderColor: '#b08bb5', width: '30%', cursor: 'pointer' }}>
                    <Image src={props.imagenPrincipal} alt="Miniatura 1" fluid style={{ height: '80px', objectFit: 'contain' }} />
                </div>
                <div className="bg-white border rounded p-2" style={{ borderColor: '#b08bb5', width: '30%', cursor: 'pointer' }}>
                    <Image src={props.imagenPrincipal} alt="Miniatura 2" fluid style={{ height: '80px', objectFit: 'contain' }} />
                </div>
                <div className="bg-white border rounded p-2" style={{ borderColor: '#b08bb5', width: '30%', cursor: 'pointer' }}>
                    <Image src={props.imagenPrincipal} alt="Miniatura 3" fluid style={{ height: '80px', objectFit: 'contain' }} />
                </div>
            </div>
        </article>
    );
}

export default GaleriaDetalle;