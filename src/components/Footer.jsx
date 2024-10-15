import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white text-darkviolet py-4 w-full">
      <div className="container mx-auto text-center">
        <p>Copyright ⓒ {year} - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
