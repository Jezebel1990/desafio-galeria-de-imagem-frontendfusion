import React from 'react';
import Logo from '../assets/gallery.png';
import { IoChevronBackOutline } from "react-icons/io5";

const ImageDetail = ({ image, onBack }) => {
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
            className="mb-4 text-pink-500 hover:underline flex items-center font-bold"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
