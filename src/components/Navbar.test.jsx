import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  const mockSetShowFavorites = jest.fn();
  const mockGoHome = jest.fn();

  beforeEach(() => {
    render(
      <Navbar
        showFavorites={false}
        setShowFavorites={mockSetShowFavorites}
        goHome={mockGoHome}
      />
    );
  });

  test('toggles favorites when the favorites button is clicked', () => {
    const favoritesButton = screen.getByRole('button', { name: /favoritos/i }); 
    fireEvent.click(favoritesButton);
    expect(mockSetShowFavorites).toHaveBeenCalled(); // Verifica se a função setShowFavorites foi chamada
  });
});

