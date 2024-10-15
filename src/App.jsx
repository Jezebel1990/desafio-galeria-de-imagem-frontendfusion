import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, toggleFavorite } from './redux/slices/imagesSlice';
import Navbar from './components/Navbar';
import ImageDetail from './components/ImageDetails';
import useColorThief from 'use-color-thief'; 
import { FaSearch } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Spinner from './components/Spinner';


// Função para converter array de RGB para string RGB
const arrayToRgbString = (rgbArray) => {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
  }
  return null;
};

const colorNames = {
  // (o objeto colorNames permanece o mesmo)
};

const ImageItem = ({ image, onSelect, isFavorite, onToggleFavorite, setDominantColors }) => {
  const { color } = useColorThief(image.download_url, {
    format: 'rgb',
    colorCount: 10,
    quality: 10,
  });

  useEffect(() => {
    if (color) {
      setDominantColors(prevColors => ({
        ...prevColors,
        [image.id]: color,
      }));
    }
  }, [color, image.id, setDominantColors]);

  return (
    <motion.div key={image.id} className="relative" whileHover={{
      position: 'relative',
      zIndex: 1,
      scale: 1.2,
      transition: {
        duration: .2
      }
    }}
    >
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
    </motion.div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { images, favorites, status } = useSelector(state => state.images);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dominantColors, setDominantColors] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const filteredImages = images.filter(image => {
    const imageColor = dominantColors[image.id];
    const searchColorRgb = colorNames[searchQuery.toLowerCase()];

    if (!searchColorRgb) return true;

    if (imageColor) {
      const imageColorString = Array.isArray(imageColor) ? arrayToRgbString(imageColor) : imageColor;
      return Array.isArray(searchColorRgb)
        ? searchColorRgb.includes(imageColorString)
        : imageColorString === searchColorRgb;
    }

    return true;
  });

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    if (value) {
      const filteredSuggestions = Object.keys(colorNames).filter(color => color.startsWith(value));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const goHome = () => {
    setSelectedImage(null);
    setShowFavorites(false);
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
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
    <div className="flex flex-col min-h-screen"> {/* Wrapper flexbox para estruturar a página */}
      <Navbar showFavorites={showFavorites} setShowFavorites={setShowFavorites} goHome={goHome} />
      <main className="container mx-auto p-4 flex-grow"> {/* Adicione flex-grow para ocupar o espaço restante */}
        <div className='bg-site bg-cover bg-center p-8 rounded-lg mb-5'>
          {/* Restante do conteúdo */}
          <div className="text-base md:text-xl xl:text-3xl uppercase font-bold text-white xl:mb-8 mt-6 md:m-3 xl:m-28 text-center">
            {showFavorites ? 'Imagens Favoritas' : 'Encontre imagens para baixar!'}
            <TypeAnimation
              sequence={['Cada cor conta uma história, qual é a sua?', 2000]}
              wrapper="span"
              repeat={Infinity}
              style={{ display: 'block', color: 'white', textAlign: 'center', marginBottom: '1rem', fontSize: '10px' }}
            />
          </div>

          <div className="flex justify-center items-center xl:mb-28">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                placeholder="Buscar por cor (ex: azul, marrom, verde ...)"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-50 overflow-auto">
                  {suggestions.map(color => (
                    <li
                      key={color}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setSearchQuery(color);
                        setSuggestions([]);
                      }}
                    >
                      {color}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {!showFavorites ? (
            filteredImages.length > 0 ? (
              filteredImages.map(image => (
                <ImageItem
                  key={image.id}
                  image={image}
                  onSelect={setSelectedImage}
                  isFavorite={favorites.includes(image.id)}
                  onToggleFavorite={() => dispatch(toggleFavorite(image.id))}
                  setDominantColors={setDominantColors}
                />
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">Nenhuma imagem encontrada para a cor selecionada.</div>
            )
          ) : (
            images.filter(img => favorites.includes(img.id)).map(image => (
              <ImageItem
                key={image.id}
                image={image}
                onSelect={setSelectedImage}
                isFavorite={favorites.includes(image.id)}
                onToggleFavorite={() => dispatch(toggleFavorite(image.id))}
                setDominantColors={setDominantColors}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
