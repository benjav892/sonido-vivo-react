// src/pages/PaginaGestionInventario.jsx
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook de navegación
import { useProductos } from '../context/ProductoContext'; 
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion';
import BarraBusqueda from '../components/molecules/BarraBusqueda';
import TablaDinamica from '../components/organisms/TablaDinamica';
import Boton from '../components/atoms/Boton'; 

function PaginaGestionInventario() {
    const [busqueda, setBusqueda] = useState("");

    const { productos, eliminar, actualizar} = useProductos();
    
    // 2. Inicializamos el hook
    const navigate = useNavigate(); 

    // 3. Creamos la función que maneja el redireccionamiento
    const irAAgregarProducto = () => {
        navigate('/admin/inventario/nuevo');
    };

    const productosFiltrados = productos.filter((producto) => {
        const textoBusqueda = busqueda.toLowerCase();
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
            render: (producto) => (
                <>
                    {/* También le pasamos la función al botón Agregar de la tabla */}
                    <Boton 
                        variante="success" 
                        texto="Agregar" 
                        className="btn-sm border me-1" 
                        onClick={() => actualizar(producto.id, { ...producto, stock: producto.stock + 1 })} 
                    />
                    <Boton variante="warning" texto="Editar" className="btn-sm border me-1" />
                    <Boton variante="danger" texto="Eliminar" className="btn-sm border" onClick={() => eliminar(producto.id)} />
                </>
            )
        }
    ];

    return (
        <PlantillaAdministrador>
            <EncabezadoSeccion 
                titulo="Gestión de Inventario" 
                textoBoton="AGREGAR PRODUCTO" 
                onClickBoton={irAAgregarProducto} // 4. Conectamos el botón principal
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