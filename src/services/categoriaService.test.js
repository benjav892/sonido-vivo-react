import { describe, it, expect, beforeEach } from 'vitest';
import { listarCategorias, crearCategoria, actualizarCategoria, eliminarCategoria } from './categoriaService';

describe('categoriaService', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('devuelve la lista inicial de categorías', () => {
        const categorias = listarCategorias();
        expect(Array.isArray(categorias)).toBe(true);
        expect(categorias.length).toBeGreaterThan(0);
    });

    it('crea una nueva categoría correctamente', () => {
        const nueva = crearCategoria({ texto: 'Sintetizadores Análogos' });
        expect(nueva.texto).toBe('Sintetizadores Análogos');
        expect(nueva).toHaveProperty('id');
    });

    it('actualiza el texto de una categoría existente', () => {
        const creada = crearCategoria({ texto: 'Baterías Electrónicas' });
        const actualizada = actualizarCategoria(creada.id, { texto: 'Baterías y Percusión' });
        expect(actualizada.texto).toBe('Baterías y Percusión');
    });

    it('elimina una categoría de la lista', () => {
        const creada = crearCategoria({ texto: 'Instrumentos de Viento Temp' });
        eliminarCategoria(creada.id);
        const lista = listarCategorias();
        expect(lista.some((c) => c.id === creada.id)).toBe(false);
    });
});