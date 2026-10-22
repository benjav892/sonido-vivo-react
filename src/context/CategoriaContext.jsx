import { createContext, useContext, useState } from 'react'
import * as categoriaService from '../services/categoriaService';

const CategoriasContext = createContext(null);

export function CategoriasProvider({ children }) {
    const [categorias, setCategorias] = useState(() => categoriaService.listarCategorias());

    function crear(datos) {
        categoriaService.crearCategoria(datos);
        setCategorias(categoriaService.listarCategorias());
    }

    function actualizar(id, cambios) {
        categoriaService.actualizarCategoria(id, cambios);
        setCategorias(categoriaService.listarCategorias());
    }
    function recargar() {
        setCategorias(categoriaService.listarCategorias());
    }

    return (
        <CategoriasContext.Provider value={{ categorias, crear, actualizar }}>
            {children}
        </CategoriasContext.Provider>
    );
}
export function useCategorias() {
    const contexto = useContext(CategoriasContext);
    if (!contexto) {
        throw new Error('useCategorias debe usarse dentro de un CategoriasProvider');
    }
    return contexto;
}