import React from 'react';
import Logo from '../assets/gallery.png';
import { IoChevronBackOutline } from "react-icons/io5";
import { motion, useScroll, useTransform } from 'framer-motion';

const ImageDetail = ({ image, onBack }) => {
  const downloadImageAsPng = async () => {
    const response = await fetch(image.download_url);
    const blob = await response.blob(); 
    const url = URL.createObjectURL(blob); 
    const img = new Image();
    img.src = url;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width; 
      canvas.height = img.height; 
      ctx.drawImage(img, 0, 0); 

      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${image.author.replace(/\s+/g, '_')}_image.png`;
        document.body.appendChild(link);
        link.click(); 
        document.body.removeChild(link); 
      }, 'image/png');
    };
  };

  const variantesBotao = {
    hover: { scale: 1.1, backgroundColor: '#5b1778' }, 
    tap: { scale: 0.9, backgroundColor: '#B809C3' },  
  };

  const variantesDiv = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Configuração de scroll e animações com useTransform
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0.3]); // Rotação de 0 a 360 graus
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 1],
    [
      '0px 0px 0px rgba(0, 0, 0, 0)',
      '10px 20px 30px rgba(0, 0, 0, 0.4)',
    ] // Mudança de sombra ao rolar
  );

  return (
    <div className="min-h-screen flex flex-col justify-between">
  <nav className="bg-white p-4">
    <div className="max-w-screen-lg mx-auto flex justify-start">
      <img src={Logo} alt="Gallery Logo" width={150} />
    </div>
  </nav>

  <motion.div
    className="max-w-screen-lg mx-auto p-4 flex-grow"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={variantesDiv}
    transition={{ duration: 0.5 }}
  >
    {/* Conteúdo do componente */}
    <motion.div className="flex flex-col items-start">
      <motion.button
        onClick={onBack}
        className="mb-4 text-accent hover:text-darkviolet flex items-center font-bold"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <IoChevronBackOutline className="mr-1" />
        Voltar
      </motion.button>

      <div className="flex flex-col items-center">
        <motion.img
          src={image.download_url}
          alt={image.author}
          style={{
            width: `${image.width}px`,
            height: 'auto',
            maxWidth: '100%',
            rotate,
            boxShadow,
          }}
          className="rounded-lg shadow-lg"
        />
        <div className="p-4 text-center">
          <p className="font-semibold">Autor: {image.author}</p>
          <p className="text-sm text-gray-600">
            Dimensões: {image.width} x {image.height}
          </p>
          <motion.button
            variants={variantesBotao}
            whileHover="hover"
            whileTap="tap"
            onClick={downloadImageAsPng}
            className="mt-4 bg-accent text-white px-4 py-2 rounded"
          >
            Download PNG
          </motion.button>
        </div>
      </div>
    </motion.div>
  </motion.div>
  </div>
  );
};

export default ImageDetail;

