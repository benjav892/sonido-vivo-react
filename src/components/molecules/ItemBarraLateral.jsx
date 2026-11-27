// src/components/molecules/ItemBarraLateral.jsx
import { NavLink } from 'react-router-dom';

function ItemBarraLateral(props) {
    const texto = props.texto;
    const ruta = props.ruta;

    return (
        <NavLink
            to={ruta}
            end
            className={({ isActive }) =>
                `nav-link my-1 rounded text-white ${isActive ? 'active bg-primary fw-semibold' : ''} ${props.className || ''}`
            }
            style={{ color: '#ffffff' }}
        >
            {texto}
        </NavLink>
    );
}

export default ItemBarraLateral;