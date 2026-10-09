// src/components/moleculas/ItemBarraLateral.jsx
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function ItemBarraLateral(props) {
    const texto = props.texto;
    const ruta = props.ruta;

    return (
        <Nav.Link
            as={NavLink}
            to={ruta}
            className={({ isActive }) =>
                `text-white my-1 rounded ${isActive ? 'bg-primary' : ''} ${props.className || ''}`
            }
        >
            {texto}
        </Nav.Link>
    );
}

export default ItemBarraLateral;