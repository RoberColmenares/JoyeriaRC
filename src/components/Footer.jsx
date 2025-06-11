import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>

    <div>
      <footer className='footer'>
      <nav>
        <ul className='footer-nav'>
          <Link to="/home"> inicio</Link>
          <Link to="/productos">Categorias</Link>
        </ul>
      </nav>

      <div className='footer-social'>
        <a
          href="https://github.com/RoberColmenares"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="icon-link"
        >
          {/* Icono GitHub SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .297a12 12 0 0 0-3.79 23.39c.6.113.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.833 2.807 1.303 3.492.996.108-.775.42-1.304.763-1.604-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.123-.303-.535-1.52.117-3.176 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 0 1 3-.404c1.02.004 2.047.138 3 .404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.656.24 2.873.117 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.8 5.625-5.473 5.92.43.37.823 1.102.823 2.222 0 1.606-.014 2.9-.014 3.293 0 .322.216.694.825.576A12.01 12.01 0 0 0 12 .297"/>
          </svg>
        </a>

        <a
          href="https://www.linkedin.com/in/rober-colmenares-52a472284/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="icon-link"
        >
          {/* Icono LinkedIn SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8a2.5 2.5 0 0 0-.02-4.5zM3 9h4v12H3zm7 0h3.6v1.68h.05c.5-.95 1.7-1.95 3.5-1.95 3.75 0 4.5 2.48 4.5 5.7V21h-4v-5.7c0-1.4-.03-3.2-2-3.2-2 0-2.3 1.56-2.3 3.1V21h-4z"/>
          </svg>
        </a>
      </div>
    </footer>

    </div>
    <div className='final'>
      

    <p>Rober Colmenares</p>
    <p>Roberjosecolmenares@gmail.com</p>
    </div>
    
    
    </>


    
  )
}

export default Footer
