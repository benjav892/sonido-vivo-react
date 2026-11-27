import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  listarCategoriasApi,
  crearCategoriaApi,
  actualizarCategoriaApi,
  eliminarCategoriaApi,
} from './categoriaService';
import { api } from './api';

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('categoriaService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('devuelve la lista de categorías normalizada desde la API', async () => {
    api.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          nombre: 'Guitarras Acústicas',
          imagen: '/categorias/GuitarraAcustica.png',
          textoAlternativo: 'Guitarra Acustica',
        },
      ],
    });

    const categorias = await listarCategoriasApi();

    expect(api.get).toHaveBeenCalledWith('/v1/categorias');
    expect(Array.isArray(categorias)).toBe(true);
    expect(categorias).toHaveLength(1);
    expect(categorias[0].texto).toBe('Guitarras Acústicas');
    expect(categorias[0].src).toBe('/categorias/GuitarraAcustica.png');
  });

  it('crea una nueva categoría correctamente', async () => {
    const dto = {
      nombre: 'Sintetizadores Análogos',
      imagen: '/img/placeholder.png',
      textoAlternativo: 'Sintetizadores Análogos',
    };
    api.post.mockResolvedValueOnce({ data: { id: 11, ...dto } });

    const nueva = await crearCategoriaApi(dto);

    expect(api.post).toHaveBeenCalledWith('/v1/categorias', dto);
    expect(nueva.texto).toBe('Sintetizadores Análogos');
    expect(nueva).toHaveProperty('id', 11);
  });

  it('actualiza el nombre de una categoría existente', async () => {
    const dto = {
      nombre: 'Baterías y Percusión',
      imagen: '/categorias/bateria.png',
      textoAlternativo: 'Baterías y Percusión',
    };
    api.put.mockResolvedValueOnce({ data: { id: 4, ...dto } });

    const actualizada = await actualizarCategoriaApi(4, dto);

    expect(api.put).toHaveBeenCalledWith('/v1/categorias/4', dto);
    expect(actualizada.texto).toBe('Baterías y Percusión');
  });

  it('elimina una categoría mediante DELETE', async () => {
    api.delete.mockResolvedValueOnce({});

    await eliminarCategoriaApi(11);

    expect(api.delete).toHaveBeenCalledWith('/v1/categorias/11');
  });
});