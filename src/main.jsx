import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx'
import { ProveedorAut } from './context/ContextProvider.jsx';
import { ProductosProvider } from './context/ContextApi.jsx';
import { CarritoProvider } from './context/carritoContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductosProvider>
      <ProveedorAut>
        <CarritoProvider>
          <App />
        </CarritoProvider>  
      </ProveedorAut>
    </ProductosProvider>
  </StrictMode>,
)

   