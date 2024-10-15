import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageDetails from './ImageDetails';

// Mock para o logo e o ícone
jest.mock('../assets/gallery.png', () => 'mocked-logo');
jest.mock('react-icons/io5', () => ({
  IoChevronBackOutline: () => <span>MockedBackIcon</span>,
}));

// Mock para URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-object-url');

describe('ImageDetails Component', () => {
  const image = {
    download_url: 'https://example.com/image.jpg',
    author: 'Fulano',
    width: 600,
    height: 400,
  };

  test('deve chamar a função de download da imagem quando o botão é clicado', async () => {
    // Simula a função fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        blob: () => Promise.resolve(new Blob()),
      })
    );

    const onBackMock = jest.fn();

    render(<ImageDetails image={image} onBack={onBackMock} />);

    const downloadButton = screen.getByText(/Download PNG/i);
    
    // Simula o clique no botão
    fireEvent.click(downloadButton);

    // Aguarda as operações assíncronas serem completadas
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(image.download_url);
      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });
  });
});
