// src/pages/PaginaGestionInventario.jsx
import { useState } from 'react'; // 1. Importación agregada
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion';
import BarraBusqueda from '../components/molecules/BarraBusqueda';
import TablaDinamica from '../components/organisms/TablaDinamica';
import Boton from '../components/atoms/Boton'; 

const productosMock = [
    { nombre: "Guitarra Eléctrica Fender", codigo: "001", categoria: "Instrumentos de Cuerda", precio: 699990, stock: 10 },
    { nombre: "Bajo Eléctrico Fender", codigo: "002", categoria: "Instrumentos de Cuerda", precio: 849990, stock: 5 },
];

const itemsMenu = [
    { texto: 'Inicio', ruta: '/admin' },
    { texto: 'Gestión de usuarios', ruta: '/admin/usuarios' },
    { texto: 'Gestión de inventario', ruta: '/admin/inventario' }
];

function PaginaGestionInventario() {
    const [busqueda, setBusqueda] = useState("");

    const productosFiltrados = productosMock.filter((producto) => {
        const textoBusqueda = busqueda.toLowerCase();
        const coincideNombre = producto.nombre.toLowerCase().includes(textoBusqueda);
        const coincideCodigo = producto.codigo.toLowerCase().includes(textoBusqueda);
        
        return coincideNombre || coincideCodigo;
    });  

    const columnasInventario = [
        { titulo: 'Nombre', llave: 'nombre' },
        { titulo: 'Cod. Producto', llave: 'codigo' },
        { titulo: 'Categoría', llave: 'categoria' },
        { 
            titulo: 'Precio', 
            llave: 'precio', 
            render: (producto) => `$${producto.precio.toLocaleString()}` 
        },
        { 
            titulo: 'Stock', 
            llave: 'stock', 
            claseCelda: 'text-danger fw-bold' 
        },
        { 
            titulo: 'Acciones', 
            llave: 'acciones',
            claseEncabezado: 'text-center',
            claseCelda: 'text-center',
            render: () => (
                <>
                    <Boton variante="light" texto="Agregar" className="btn-sm border me-1" />
                    <Boton variante="light" texto="Editar" className="btn-sm border me-1" />
                    <Boton variante="light" texto="Eliminar" className="btn-sm border" />
                </>
            )
        }
    ];

    return (
        <PlantillaAdministrador>
            <EncabezadoSeccion 
                titulo="Gestión de Inventario" 
                textoBoton="AGREGAR PRODUCTO" 
            />
            <BarraBusqueda 
                placeholder="Buscar por nombre o código" 
                textoBoton="FILTRAR" 
                valor={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)} 
            />
            

            <TablaDinamica columnas={columnasInventario} datos={productosFiltrados} />
            
        </PlantillaAdministrador>
    );
}

export default PaginaGestionInventario;