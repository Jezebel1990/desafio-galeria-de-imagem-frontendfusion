import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

export default function TextSpinnerLoader() {
  const text = "CARREGANDO. THE GALLERY."; 
  const characters = text.split(""); 

  const [radius, setRadius] = useState(100); // Define o valor padrão para o radius
  const letterSpacing = 12.5; 

  const [scope, animate] = useAnimate();

  // Hook para atualizar o radius com base na largura da tela
  useEffect(() => {
    const handleResize = () => {
      // Define o radius como 50 se a largura da tela for menor que 640px (ponto de quebra de mobile do Tailwind)
      setRadius(window.innerWidth < 640 ? 50 : 100);
    };

    handleResize(); // Verifica a largura inicial
    window.addEventListener("resize", handleResize); // Adiciona o listener para redimensionamento

    // Remove o listener ao desmontar o componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const animateLoader = async () => {
      const letterAnimation = [];
      characters.forEach((_, i) => {
        letterAnimation.push([
          `.letter-${i}`,
          { opacity: 0 },
          { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" },
        ]);
      });
      characters.forEach((_, i) => {
        letterAnimation.push([
          `.letter-${i}`,
          { opacity: 1 },
          { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" },
        ]);
      });
      animate(letterAnimation, {
        ease: "linear",
        repeat: Infinity,
      });
      animate(
        scope.current,
        { rotate: 360 },
        { duration: 4, ease: "linear", repeat: Infinity }
      );
    };
    animateLoader();
  }, [animate, characters, scope]);

  return (
    <motion.div
      ref={scope}
      className="relative flex justify-center items-center"
      style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
    >
      <p aria-label={text} />
      <p aria-hidden="true" className="text-accent relative">
        {characters.map((ch, i) => (
          <motion.span
            key={i}
            className={`letter letter-${i} absolute font-creepster text-[20px] sm:text-[20px] md:text-[32px] lg:text-[52px]`}
            style={{
              transformOrigin: `0 ${radius}px`,
              transform: `rotate(${i * letterSpacing}deg) translateY(-${radius}px)`,
            }}
          >
            {ch}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
}
