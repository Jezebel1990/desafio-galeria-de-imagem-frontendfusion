import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, toggleFavorite } from './redux/slices/imagesSlice';
import Navbar from './components/Navbar';
import ImageDetail from './components/ImageDetails';

const App = () => {
  const dispatch = useDispatch();
  const { images, favorites, status } = useSelector((state) => state.images);

  const [showFavorites, setShowFavorites] = useState(false); // Estado local para alternar entre galeria e favoritos
  const [selectedImage, setSelectedImage] = useState(null); // Estado para armazenar a imagem selecionada

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  // Função para retornar à galeria (Home)
  const goHome = () => {
    setSelectedImage(null); // Desseleciona a imagem
    setShowFavorites(false); // Define como galeria padrão
  };

  // Estado de carregamento
  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  // Estado de erro
  if (status === 'failed') {
    return <div className="text-center text-red-500">Falhou!</div>;
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
    <div className="max-w-screen-lg mx-auto p-4"> 
      <Navbar showFavorites={showFavorites} setShowFavorites={setShowFavorites} goHome={goHome} />

      <h1 className="text-3xl font-bold text-center mb-6">
        {showFavorites ? 'Imagens Favoritas' : 'Galeria de Imagens'}
      </h1>

      {/* Exibir Galeria ou Favoritos com base no estado */}
      {!showFavorites ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {images.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.download_url}
                alt={image.author}
                className="h-auto max-w-full rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(image)} // Ao clicar, define a imagem selecionada
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => dispatch(toggleFavorite(image.id))}
                  className={`p-2 rounded-full bg-[#0c0d0d72] shadow-md ${
                    favorites.includes(image.id) ? 'text-red-500' : 'text-gray-500'
                  }`}
                >
                  {favorites.includes(image.id) ? '💗' : '🤍'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {favorites.length > 0 ? (
            favorites.map((favId) => {
              const favImage = images.find((image) => image.id === favId);
              return (
                favImage && (
                  <div key={favImage.id} className="relative">
                    <img
                      src={favImage.download_url}
                      alt={favImage.author}
                      className="h-auto max-w-full rounded-lg cursor-pointer"
                      onClick={() => setSelectedImage(favImage)} // Ao clicar, define a imagem selecionada
                    />
                  </div>
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
