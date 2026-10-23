import { describe, it, expect } from 'vitest';
import { puedeAgregarAlCarrito } from './flujoCompra';

describe('Validaciones de flujoCompra', () => {
    
    it('Debe permitir agregar al carrito si la cantidad no supera el stock', () => {
        // Arrange: preparar el escenario
        const productoFalso = { codigo: 'P01', nombre: 'Guitarra', stock: 5 };
        const carritoActual = []; 
        const cantidadDeseada = 2;

        // Act: ejecutar la acción
        const resultado = puedeAgregarAlCarrito(productoFalso, cantidadDeseada, carritoActual);

        // Assert: afirmar el resultado
        expect(resultado.valido).toBe(true);
    });

    it('Debe rechazar si la cantidad solicitada + lo que ya está en el carrito supera el stock', () => {
        const productoFalso = { codigo: 'P01', nombre: 'Guitarra', stock: 5 };
        // simular que el usuario ya tiene 4 en el carrito
        const carritoActual = [{ codigo: 'P01', cantidad: 4 }]; 
        // intentar agregar 2 más (Total 6, pero solo hay 5)
        const cantidadDeseada = 2; 

        const resultado = puedeAgregarAlCarrito(productoFalso, cantidadDeseada, carritoActual);

        expect(resultado.valido).toBe(false);
        // verificar que el mensaje de error sea correcto
        expect(resultado.mensaje).toContain('Stock insuficiente');
    });
});