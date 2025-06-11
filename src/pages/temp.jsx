import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import "../style/checkout.css"; 

const Checkout = () => {
  const location = useLocation(); 
  const { totalCompra = 0, cantidadItems = 0 } = location.state || {}; 

  const [compraRealizada, setCompraRealizada] = useState(false);

  const handleRealizarCompra = (e) => {
    e.preventDefault();  
    console.log("Simulando compra...");
    setCompraRealizada(true);  
  };

  return (
    <div className='checkout-page'>  
      <h1>Página CheckOut</h1>

      <div className='checkout-container'>
        <div className='billing-details'>
          <h2>Detalle de facturación y dirección</h2>
 
          <form onSubmit={handleRealizarCompra}>  
            <h3>Datos de persona que Recibe</h3>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" required />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input type="text" id="apellido" name="apellido" required />
            </div>
            <div className="form-group">
              <label htmlFor="rut">Rut</label>
              <input type="text" id="rut" name="rut" required />
            </div>
            <div className="form-group">
              <label htmlFor="pais">País</label>
              <input type="text" id="pais" name="pais" required />
            </div>
            <div className="form-group">
              <label htmlFor="region">Región</label>
              <input type="text" id="region" name="region" required />
            </div>
            <div className="form-group">
              <label htmlFor="ciudad">Ciudad</label>
              <input type="text" id="ciudad" name="ciudad" required />
            </div>
            <div className="form-group">
              <label htmlFor="comuna">Comuna</label>
              <input type="text" id="comuna" name="comuna" required />
            </div>
            <div className="form-group full-width">  
              <label htmlFor="direccion">Dirección</label>
              <input type="text" id="direccion" name="direccion" required />
            </div>

 
            <div className="form-action">
              {!compraRealizada && (
                <button type="submit"  className="btn-stylec">
                  Realizar Compra
                </button>
              )}
            </div>
          </form>

        </div>

        <div className='order-summary'>
          <h2>Tu pedido</h2>
          <div className="summary-row header">
            <span>Productos</span>
            <span>Precio</span>
          </div>

          <div className="summary-row">
            <span>Cantidad de ítems:</span>
            <span>{cantidadItems}</span>
          </div>
          <div className="summary-row subtotal">
            <span>Sub-Total:</span>
            <span>${totalCompra.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${totalCompra.toFixed(2)}</span>  
          </div>

          {compraRealizada && (
            <p className="thank-you-message">  ¡Listo! Tu compra ha sido confirmada. ¡Gracias por preferirnos!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;