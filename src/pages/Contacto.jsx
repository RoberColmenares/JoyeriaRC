import React from 'react';
import '../style/Contacto.css';

const Contacto = () => {
  return (

    <div className='all'>
            <div className="contacto-container">
      <h2>Contacto</h2>
      <p className="intro-text">
        ¡Gracias por usar esta app! Si te gustó y quieres saber más sobre mí, contáctame:
      </p>

      <div className="contact-info">
        <div className="contact-item">
          <img
            src="https://cdn-icons-png.flaticon.com/512/15/15974.png"
            alt="Teléfono"
            className="icon"
          />
          <span><strong>Teléfono:</strong> +56 9 4668 1870</span>
        </div>

        <div className="contact-item">
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
            alt="WhatsApp"
            className="icon"
          />
          <span><strong>WhatsApp:</strong> +56 9 4668 1870</span>
        </div>

        <div className="contact-item">
          <img
            src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
            alt="Email"
            className="icon"
          />
          <span><strong>Email:</strong> Roberjosecolmenares@gmail.com</span>
        </div>
      </div>

      <p className="closing-text">¡Espero saber de ti pronto!</p>
    </div>
    </div>

  );
};

export default Contacto;
