// src/components/templates/PlantillaAdministrador.jsx
import { Container } from 'react-bootstrap';
import BarraLateral from '../organisms/BarraLateral';
import logo from '../../assets/Logo.png'; // Ajusta la ruta a tu imagen si la usas

// Centralizamos los ítems del menú aquí (o puedes importarlos desde un archivo de constantes)
const itemsMenu = [
    { texto: 'Inicio', ruta: '/admin' },
    { texto: 'Gestión de usuarios', ruta: '/admin/usuarios' },
    { texto: 'Gestión de inventario', ruta: '/admin/inventario' },
    { texto: 'Gestión de categorías', ruta: '/admin/categorias' }
];

function PlantillaAdministrador(props) {
    const contenido = props.children;

    return (
        <Container fluid className="p-0 d-flex min-vh-100 w-100 bg-light">
            
            {/* La barra lateral ahora está gestionada 100% por la plantilla */}
            <BarraLateral 
                tituloMarca="Sonido Vivo" 
                logoSrc={logo} 
                items={itemsMenu} 
            />

            {/* Columna Derecha: Contenido Principal Dinámico */}
            <main className="flex-grow-1 p-4 overflow-auto">
                {contenido}
            </main>
        </Container>
    );
}

export default PlantillaAdministrador;