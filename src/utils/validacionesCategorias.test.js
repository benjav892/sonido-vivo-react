// src/utils/validacionesCategorias.test.js
import { describe, it, expect } from 'vitest';
import { validarNombreCategoria, esCategoriaDuplicada } from './validacionesCategorias';

const listaEjemplo = [
    { id: 1, texto: 'Guitarras' },
    { id: 2, texto: 'Baterías' }
];

describe('esCategoriaDuplicada', () => {
    it('retorna true si la categoría existe (sin importar mayúsculas/minúsculas)', () => {
        expect(esCategoriaDuplicada('GUITARRAS', listaEjemplo)).toBe(true);
    });

    it('retorna false si la categoría no existe en la lista', () => {
        expect(esCategoriaDuplicada('Teclados', listaEjemplo)).toBe(false);
    });

    it('retorna false si coincide el nombre pero pertenece al mismo ID (modo edición)', () => {
        expect(esCategoriaDuplicada('Guitarras', listaEjemplo, 1)).toBe(false);
    });
});

describe('validarNombreCategoria', () => {
    it('devuelve error si el nombre está vacío', () => {
        expect(validarNombreCategoria('')).toBe('El nombre de la categoría es obligatorio');
    });

    it('devuelve error si el nombre tiene menos de 3 caracteres', () => {
        expect(validarNombreCategoria('Ab')).toBe('El nombre debe tener al menos 3 caracteres');
    });

    it('devuelve error si el nombre ya existe en la lista', () => {
        expect(validarNombreCategoria('guitarras', listaEjemplo)).toBe('Ya existe una categoría con este nombre');
    });

    it('permite mantener el mismo nombre al editar la misma categoría (mismo ID)', () => {
        expect(validarNombreCategoria('Guitarras', listaEjemplo, 1)).toBe('');
    });

    it('devuelve un string vacío si el nombre es válido y no está duplicado', () => {
        expect(validarNombreCategoria('Teclados', listaEjemplo)).toBe('');
    });
});
describe('esCategoriaDuplicada - Cobertura 100%', () => {
    it('retorna false si el nombre recibido es nulo o vacío', () => {
        expect(esCategoriaDuplicada('')).toBe(false);
        expect(esCategoriaDuplicada(null)).toBe(false);
    });

    it('retorna false si la lista contiene objetos sin la propiedad texto', () => {
        const listaIncompleta = [{ id: 99 }];
        expect(esCategoriaDuplicada('Guitarras', listaIncompleta)).toBe(false);
    });
});