// src/components/organisms/BarraLateral.jsx
import { Nav } from 'react-bootstrap';
import EncabezadoMarca from '../molecules/EncabezadoMarca';
import ItemBarraLateral from '../molecules/ItemBarraLateral';

function BarraLateral(props) {
    const logoSrc = props.logoSrc;
    const tituloMarca = props.tituloMarca;
    const items = props.items || [];

    return (
        <aside
            className={`flex-column p-0 bg-dark text-white min-vh-100 flex-shrink-0 ${props.className || ''}`}
            style={{ width: "260px" }}
        >
            <EncabezadoMarca logoSrc={logoSrc} titulo={tituloMarca} className="p-0" />

            <hr className="text-white-50 my-5" />

            {/* Usamos variant="pills" para habilitar los fondos de colores en los elementos activos */}
            <Nav variant="pills" className="flex-column gap-2 w-100 ps-3 pe-3 text-center">
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