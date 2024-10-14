import React from 'react';
import Logo from '../assets/gallery.png';
import { IoChevronBackOutline } from "react-icons/io5";

const ImageDetail = ({ image, onBack }) => {
  const downloadImageAsPng = async () => {
    // Faz o fetch da imagem
    const response = await fetch(image.download_url);
    const blob = await response.blob(); // Converte a resposta em um blob
    const url = URL.createObjectURL(blob); // Cria uma URL a partir do blob
    const img = new Image();
    img.src = url;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width; 
      canvas.height = img.height; 
      ctx.drawImage(img, 0, 0); 

      // Gera o link de download
      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${image.author.replace(/\s+/g, '_')}_image.png`;
        document.body.appendChild(link);
        link.click(); // Simula o clique para download
        document.body.removeChild(link); 
      }, 'image/png');
    };
  };

  return (
    <div>
      <nav className="bg-white p-4">
        <div className="max-w-screen-lg mx-auto flex justify-start"> 
          <img src={Logo} alt="Gallery Logo" width={150} />
        </div>
      </nav>

      <div className="max-w-screen-lg mx-auto p-4">
        <div className="flex flex-col items-start">
          <button
            onClick={onBack}
            className="mb-4 text-accent hover:text-darkviolet flex items-center font-bold"
          >
            <IoChevronBackOutline className="mr-1" /> 
            Voltar
          </button>

          <div className="flex flex-col items-center">
            <img
              src={image.download_url}
              alt={image.author}
              style={{
                width: `${image.width}px`,
                height: 'auto',
                maxWidth: '100%',
              }}
              className="rounded-lg shadow-lg"
            />
            <div className="p-4 text-center">
              <p className="font-semibold">Autor: {image.author}</p>
              <p className="text-sm text-gray-600">
                Dimensões: {image.width} x {image.height}
              </p>
              <button
                onClick={downloadImageAsPng}
                className="mt-4 bg-accent text-white px-4 py-2 rounded hover:bg-darkviolet transition"
              >
                Download PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
