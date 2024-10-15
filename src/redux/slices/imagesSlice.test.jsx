import axios from 'axios';
import { fetchImages } from './imagesSlice'; 

jest.mock('axios');

describe('imagesSlice', () => {
  it('deve buscar imagens com sucesso (fulfilled)', async () => {
    const mockData = [
      { id: '1', download_url: 'https://example.com/image1.jpg', author: 'Author 1' },
      { id: '2', download_url: 'https://example.com/image2.jpg', author: 'Author 2' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    const dispatch = jest.fn();
    const thunk = fetchImages();
    await thunk(dispatch, () => ({}), undefined);

    // Verifica se os dispatches corretos foram chamados com as ações esperadas
    expect(dispatch).toHaveBeenCalledWith({
      type: fetchImages.pending.type,
      meta: expect.any(Object), // Verifica que a ação pending foi disparada
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: fetchImages.fulfilled.type,
      payload: mockData,
      meta: expect.any(Object), // Verifica que a ação fulfilled foi disparada
    });
  });

  it('deve lidar com falhas ao buscar imagens (rejected)', async () => {
    const errorMessage = 'Erro na API';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const dispatch = jest.fn();
    const thunk = fetchImages();
    await thunk(dispatch, () => ({}), undefined);

    // Verifica se os dispatches corretos foram chamados com as ações esperadas
    expect(dispatch).toHaveBeenCalledWith({
      type: fetchImages.pending.type,
      meta: expect.any(Object), // Verifica que a ação pending foi disparada
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: fetchImages.rejected.type,
      error: expect.objectContaining({ message: errorMessage }),
      meta: expect.any(Object), // Verifica que a ação rejected foi disparada
    });
  });
});
