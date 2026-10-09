
import { Nav } from 'react-bootstrap';
import EncabezadoMarca from '../molecules/EncabezadoMarca';
import ItemBarraLateral from '../molecules/ItemBarraLateral';

function BarraLateral(props) {
    const logoSrc = props.logoSrc;
    const tituloMarca = props.tituloMarca;
    const items = props.items || [];

    return (
        <aside
            className={`d-flex flex-column p-3 bg-dark text-white min-vh-100 flex-shrink-0 ${props.className || ''}`}
            style={{ width: "260px" }}
        >
            <EncabezadoMarca logoSrc={logoSrc} titulo={tituloMarca} />

            <hr className="text-white-50 my-3" />

            <Nav className="flex-column gap-1">
                {items.map((item, index) => (
                    <ItemBarraLateral
                        key={item.id || index}
                        texto={item.texto}
                        ruta={item.ruta}
                    />
                ))}
            </Nav>
        </aside>
    );
}

export default BarraLateral;