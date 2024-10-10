import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white text-gray-800 py-4">
      <div className="container mx-auto text-center">
      <hr className="border-t border-gray-300 my-2" /> 
        <p>Copyright ⓒ {year} - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
