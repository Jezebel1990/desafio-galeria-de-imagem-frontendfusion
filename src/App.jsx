import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, toggleFavorite } from './redux/slices/imagesSlice';
import Navbar from './components/Navbar';
import ImageDetail from './components/ImageDetails';
import useColorThief from 'use-color-thief'; 
import { FaSearch } from 'react-icons/fa';

const colorNames = {
  vermelho: ['rgb(255, 0, 0)', 'rgb(62, 14, 15)'],
  azul: ['rgb(0, 0, 255)', 'rgb(30, 63, 69)', 'rgb(72, 93, 106)'],
  verde: ['rgb(0, 128, 0)', 'rgb(41, 66, 49)', 'rgb(34, 57, 46)', 'rgb(40, 64, 40)', 'rgb(74, 116, 64)', 'rgb(50, 68, 41)', 'rgb(193, 220, 206)', 'rgb(86, 116, 44)'],
  amarelo: 'rgb(255, 255, 0)',
  preto: ['rgb(0, 0, 0)', 'rgb(34, 29, 31)', 'rgb(42, 38, 44)', 'rgb(52, 54, 54)', 'rgb(18, 21, 21)'],
  branco: 'rgb(255, 255, 255)',
  marrom: ['rgb(182, 147, 113)', 'rgb(43, 30, 17)', 'rgb(36, 30, 27)', 'rgb(175, 143, 111)', 'rgb(138, 94, 60)', 'rgb(140, 91, 57)', 'rgb(150, 117, 74)', 'rgb(169, 129, 77)', 'rgb(203, 167, 142)', 'rgb(167, 124, 94)'],
  cinza: ['rgb(208, 213, 212)', 'rgb(133, 174, 187)', 'rgb(146, 151, 143)', 'rgb(201, 199, 175)', 'rgb(232, 223, 224)', 'rgb(95, 91, 94)']
};

const ImageItem = ({ image, onSelect, isFavorite, onToggleFavorite, setDominantColors }) => {
  // Usando o hook useColorThief
  const { color } = useColorThief(image.download_url, {
    format: 'rgb',
    colorCount: 10,
    quality: 10,
  });

  useEffect(() => {
    const colorResult = color || 'Cor não encontrada';
    console.log(`Cor dominante da imagem ${image.id}:`, colorResult);
    setDominantColors((prevColors) => ({
      ...prevColors,
      [image.id]: colorResult,
    }));
  }, [color, image.id, setDominantColors]);

  return (
    <div key={image.id} className="relative">
      <img
        src={image.download_url}
        alt={image.author}
        className="h-auto max-w-full rounded-lg cursor-pointer"
        onClick={() => onSelect(image)}
      />
      <div className="absolute top-2 right-2">
        <button
          onClick={() => onToggleFavorite(image.id)}
          className={`p-2 rounded-full bg-[#0c0d0d72] shadow-md ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
        >
          {isFavorite ? '💜' : '🤍'}
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { images, favorites, status } = useSelector((state) => state.images);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dominantColors, setDominantColors] = useState({});

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);


  const arrayToRgbString = (rgbArray) => {
    return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
  };

// Função para filtrar imagens com base na cor
const filteredImages = images.filter((image) => {
  const imageColor = dominantColors[image.id];
  const searchColorRgb = colorNames[searchQuery.toLowerCase()];

  if (Array.isArray(searchColorRgb)) {
    // Verifica se imageColor é um array antes de fazer a conversão
    const imageColorString = Array.isArray(imageColor) ? arrayToRgbString(imageColor) : imageColor;

    // Verifica se imageColor corresponde a qualquer uma das cores no array
    const isMatch = searchColorRgb.some((color) => imageColorString === color);
    console.log(`Imagem ${image.id} combina com a cor buscada?`, isMatch);
    return isMatch; // Retorna true se houver uma correspondência
  } else if (searchColorRgb) {
    // Se for uma única cor (não um array), compara diretamente
    const imageColorString = Array.isArray(imageColor) ? arrayToRgbString(imageColor) : imageColor;
    const isMatch = imageColorString === searchColorRgb;
    console.log(`Imagem ${image.id} combina com a cor buscada (única)?`, isMatch);
    return isMatch;
  }

  return true; // Se não encontrar nenhuma cor correspondente, exibe todas as imagens.
});



  const goHome = () => {
    setSelectedImage(null);
    setShowFavorites(false);
  };

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-red-500">Erro ao carregar imagens!</div>;
  }

  if (selectedImage) {
    return (
      <ImageDetail
        image={selectedImage}
        onBack={goHome}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Navbar showFavorites={showFavorites} setShowFavorites={setShowFavorites} goHome={goHome} />

      <div className='bg-site bg-cover bg-center p-8 rounded-lg mb-12'>
      <h2 className="text-base md:text-xl xl:text-3xl uppercase font-bold text-white xl:mb-8  xl:m-32 text-center">
        {showFavorites ? 'Imagens Favoritas' : 'Encontre imagens para baixar!'}
      </h2>
     
      <div className="flex justify-center items-center xl:mb-24">
     
        <div className="relative w-full max-w-md">
        
          <input
            type="text"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
            placeholder="Buscar por cor (ex: azul, marrom, verde ...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      </div>

      {!showFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {filteredImages.map((image) => (
            <ImageItem
              key={image.id}
              image={image}
              onSelect={setSelectedImage}
              isFavorite={favorites.includes(image.id)}
              onToggleFavorite={() => dispatch(toggleFavorite(image.id))}
              setDominantColors={setDominantColors}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {favorites.length > 0 ? (
            favorites.map((favId) => {
              const favImage = images.find((image) => image.id === favId);
              return (
                favImage && (
                  <ImageItem
                    key={favImage.id}
                    image={favImage}
                    onSelect={setSelectedImage}
                    isFavorite={true}
                    onToggleFavorite={() => dispatch(toggleFavorite(favImage.id))}
                    setDominantColors={setDominantColors}
                  />
                )
              );
            })
          ) : (
            <p className="text-center text-gray-600">Nenhuma imagem favorita adicionada ainda.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
