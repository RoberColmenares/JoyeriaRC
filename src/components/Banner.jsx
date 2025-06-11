import React, { useState, useEffect } from 'react';
import "../style/Banner.css";

import banner1 from "../assets/Imagen/Banner/banner1.png";
import banner2 from "../assets/Imagen/Banner/banner2.png";
import banner3 from "../assets/Imagen/Banner/banner3.png";
import { Link } from 'react-router-dom';

const images = [banner1, banner2, banner3];

const Banner = () => {



  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner">
      <img
        src={images[currentIndex]}
        alt={`banner-${currentIndex}`}
        className="fade"
      />
      <Link to="/productos" className="banner-link">Ver todos los productos</Link>
    </div>
  );
};

export default Banner;