import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Footer from './Footer';

describe('Footer Component', () => {
  test('deve renderizar o texto com o ano atual', () => {
    // Obtém o ano atual
    const currentYear = new Date().getFullYear();

    // Renderiza o componente Footer
    render(<Footer />);

    // Verifica se o texto contém o ano atual
    const footerText = screen.getByText(`Copyright ⓒ ${currentYear} - Todos os direitos reservados.`);
    expect(footerText).toBeInTheDocument();
  });
});
