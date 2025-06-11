import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/ProductoDetalle';
import Perfil from './pages/Perfil';
import Contacto from './pages/Contacto';
import PerfilVisitante from './pages/PerfilVisitante';
import CrearPublicacion from './pages/CrearPublicacion';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import RutaPrivada from './components/RutaPrivada';
import LayoutConBanner from './components/LayoutConBanner';  // nuevo
import Footer from './components/Footer';
import Barra from './components/Barra';
import './index.css';
import ProductosPorCategoria from './pages/ProductosPorCategoria';
import EditarPublicacion from './pages/EditarPublicacion';

function App() {
  return (
    <BrowserRouter>
      <Barra />

      <Routes>
        {/* Redirigir '/' a '/home' */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Rutas con banner */}
        <Route element={<LayoutConBanner />}>
          <Route path="/home" element={<Home />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:categoria" element={<Productos />} />
          <Route path="/categoria/:categoria" element={<ProductosPorCategoria />} />
          <Route path="/carrito" element={<Carrito />} />
        </Route>

        {/* Rutas públicas sin banner */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<Contacto />} />

        {/* Rutas privadas sin banner */}
        <Route element={<RutaPrivada />}>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/crear-publicacion" element={<CrearPublicacion />} />
          <Route path="/editar-publicacion/:id" element={<EditarPublicacion />} />
          <Route path="/perfil/:id" element={<PerfilVisitante />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
