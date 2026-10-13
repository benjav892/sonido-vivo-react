// src/pages/PaginaGestionInventario.jsx
import { useState } from 'react'; 
import { useProductos } from '../context/ProductoContext'; 
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion';
import BarraBusqueda from '../components/molecules/BarraBusqueda';
import TablaDinamica from '../components/organisms/TablaDinamica';
import Boton from '../components/atoms/Boton'; 



function PaginaGestionInventario() {
    const [busqueda, setBusqueda] = useState("");

    const { productos } = useProductos();

    const productosFiltrados = productos.filter((producto) => {
        const textoBusqueda = busqueda.toLowerCase();
        // Agregamos un condicional por seguridad por si el producto aún no se carga bien
        const nombre = producto.nombre ? producto.nombre.toLowerCase() : "";
        const codigo = producto.codigo ? producto.codigo.toLowerCase() : "";
        
        return nombre.includes(textoBusqueda) || codigo.includes(textoBusqueda);
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
            titulo: 'Stock Mínimo', 
            llave: 'stockMinimo',
            claseCelda: 'text-warning fw-bold'
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