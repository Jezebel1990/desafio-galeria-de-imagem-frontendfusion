import React from 'react';
import Logo from '../assets/gallery.png'
import { TbPhotoHeart } from "react-icons/tb";

const Navbar = ({ showFavorites, setShowFavorites, goHome }) => {
  return (
    <nav className="bg-white-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-2xl font-bold">
          <img src={Logo} alt='' width={150} />
        </div>

        <div className="flex space-x-4">
        <button
             onClick={goHome}
            className="text-black hover:text-gray-500 px-3 py-2 rounded-md text-sm font-bold"
          >
            HOME
          </button>
          <button
           onClick={() => setShowFavorites(!showFavorites)}
            className={`text-black hover:text-gray-500 px-3 py-2 rounded-md text-sm font-bold ${
                    showFavorites ? 'text-white' : ''
                  }`}
          >
            <TbPhotoHeart size={22}/>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
