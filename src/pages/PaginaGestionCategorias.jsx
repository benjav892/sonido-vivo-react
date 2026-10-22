// src/pages/PaginaGestionCategorias.jsx
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useCategorias } from '../context/CategoriaContext';
import PlantillaAdministrador from '../components/templates/PlantillaAdministrador';
import EncabezadoSeccion from '../components/molecules/EncabezadoSeccion';
import BarraBusqueda from '../components/molecules/BarraBusqueda';
import TablaDinamica from '../components/organisms/TablaDinamica';
import Boton from '../components/atoms/Boton'; 

export function PaginaGestionCategorias(props) {
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate(); 

    const { categorias } = useCategorias();

    function irAAgregarCategoria() {
        navigate('/admin/categorias/nueva');
    }

    function irAEditarCategoria(id) {
        navigate(`/admin/categorias/editar/${id}`);
    }

    // Filtrado por el campo 'texto' de la categoría
    const categoriasFiltradas = (categorias || []).filter((categoria) => {
        const textoBusqueda = busqueda.toLowerCase();
        const nombre = categoria.texto ? categoria.texto.toLowerCase() : "";
        return nombre.includes(textoBusqueda);
    });

    // Definición de columnas directa sin cálculo de productos
    const columnasCategorias = [
        { 
            titulo: 'ID', 
            llave: 'id' 
        },
        { 
            titulo: 'Categoría', 
            llave: 'texto',
            render: (categoria) => <span className="fw-bold">{categoria.texto}</span>
        },
        { 
            titulo: 'Acciones', 
            llave: 'acciones',
            render: (categoria) => (
                <Boton 
                    variante="warning" 
                    texto="Editar" 
                    className="btn-sm border me-1" 
                    onClick={() => irAEditarCategoria(categoria.id)} 
                />
            )
        }
    ];

    return (
        <PlantillaAdministrador>
            <EncabezadoSeccion 
                titulo="Gestión de Categorías" 
                textoBoton="AGREGAR CATEGORÍA" 
                onClickBoton={irAAgregarCategoria} 
            />
            
            <BarraBusqueda 
                placeholder="Buscar por nombre" 
                textoBoton="LIMPIAR" 
                valor={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)} 
                onBuscar={() => setBusqueda('')}
            />
            
            <TablaDinamica 
                columnas={columnasCategorias} 
                datos={categoriasFiltradas} 
            />
        </PlantillaAdministrador>
    );
}

