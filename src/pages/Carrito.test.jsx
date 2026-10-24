import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Carrito from './Carrito';
import * as AuthContext from '../context/AuthContext';

// simular el hook personalizado para que la prueba no falle
vi.mock('../hooks/useTituloPagina', () => ({
    useTituloPagina: vi.fn()
}));

describe('Página Carrito', () => {
    
    // antes de cada prueba, se limpia el almacenamiento
    beforeEach(() => {
        localStorage.clear();
    });

    it('Debe mostrar el mensaje de "carrito vacío" cuando no hay productos en localStorage', () => {
        // simular que el usuario sí inicio sesion
        vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ estaAutenticado: true, usuario: { rol: 'Cliente' } 
        });

        // renderizar la pagina envuelta en MemoryRouter porque usa <Link> y navigate
        render(
            <MemoryRouter>
                <Carrito />
            </MemoryRouter>
        );

        // buscar el texto exacto que esta en Carrito.jsx
        const mensajeVacio = screen.getByText('Tu carrito está vacío');
        
        // verificar que el texto exista en la pantalla
        expect(mensajeVacio).toBeDefined();
    });
});