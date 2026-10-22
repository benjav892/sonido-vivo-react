import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioCategoria from './FormularioCategoria';
import { useCategorias } from '../../context/CategoriaContext';

// 1. Simulamos el hook del contexto para controlar los datos en cada test
vi.mock('../../context/CategoriaContext', () => ({
    useCategorias: vi.fn(),
}));

describe('FormularioCategoria', () => {
    // Lista simulada de categorías para evaluar duplicados
    const mockCategorias = [
        { id: 1, texto: 'Guitarras' },
        { id: 2, texto: 'Baterías' }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        // Configuramos el valor por defecto que devolverá useCategorias()
        useCategorias.mockReturnValue({ categorias: mockCategorias });
    });

    it('renderiza en modo creación vacio y ejecuta onCancelar al hacer clic en Cancelar', async () => {
        const onCancelar = vi.fn();
        render(<FormularioCategoria onSubmit={vi.fn()} onCancelar={onCancelar} />);

        // Comprobamos que el campo esté vacío y el botón diga "Crear Categoría"
        expect(screen.getByLabelText(/nombre de la categoría/i)).toHaveValue('');
        expect(screen.getByRole('button', { name: /crear categoría/i })).toBeInTheDocument();

        // Simulamos clic en Cancelar
        await userEvent.click(screen.getByRole('button', { name: /cancelar/i }));
        expect(onCancelar).toHaveBeenCalledTimes(1);
    });

    it('muestra un mensaje de error cuando el campo se envía vacío y no ejecuta onSubmit', async () => {
        const onSubmit = vi.fn();
        render(<FormularioCategoria onSubmit={onSubmit} onCancelar={vi.fn()} />);

        // Intentamos enviar el formulario vacío
        await userEvent.click(screen.getByRole('button', { name: /crear categoría/i }));

        // Verificamos que aparezca la alerta/mensaje y no se llame al callback
        expect(screen.getByText(/el nombre de la categoría es obligatorio/i)).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('muestra un error de validación al intentar registrar un nombre duplicado', async () => {
        const onSubmit = vi.fn();
        render(<FormularioCategoria onSubmit={onSubmit} onCancelar={vi.fn()} />);

        const input = screen.getByLabelText(/nombre de la categoría/i);
        await userEvent.type(input, 'Guitarras'); // Nombre que ya está en mockCategorias
        await userEvent.click(screen.getByRole('button', { name: /crear categoría/i }));

        expect(screen.getByText(/ya existe una categoría con este nombre/i)).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('permite escribir un nombre válido y envía los datos procesados en onSubmit', async () => {
        const onSubmit = vi.fn();
        render(<FormularioCategoria onSubmit={onSubmit} onCancelar={vi.fn()} />);

        const input = screen.getByLabelText(/nombre de la categoría/i);
        await userEvent.type(input, 'Teclados');
        await userEvent.click(screen.getByRole('button', { name: /crear categoría/i }));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
            texto: 'Teclados',
            src: '/categorias/accesorios.png',
            alt: 'Teclados'
        });
    });

    it('precarga datos existentes en modo edición y permite su actualización', async () => {
        const datosEdicion = { id: 1, texto: 'Guitarras', src: '/guitarras.png', alt: 'Guitarras' };
        const onSubmit = vi.fn();

        render(<FormularioCategoria datosFormulario={datosEdicion} onSubmit={onSubmit} onCancelar={vi.fn()} />);

        const input = screen.getByLabelText(/nombre de la categoría/i);
        expect(input).toHaveValue('Guitarras');
        expect(screen.getByRole('button', { name: /actualizar categoría/i })).toBeInTheDocument();

        // Modificamos el nombre y enviamos
        await userEvent.clear(input);
        await userEvent.type(input, 'Guitarras Eléctricas');
        await userEvent.click(screen.getByRole('button', { name: /actualizar categoría/i }));

        expect(onSubmit).toHaveBeenCalledWith({
            id: 1,
            texto: 'Guitarras Eléctricas',
            src: '/guitarras.png',
            alt: 'Guitarras Eléctricas'
        });
    });
});