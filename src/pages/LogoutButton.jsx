import { useAut } from '../context/ContextProvider';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
  const { setIsAut } = useAut();

  const logout = () => {
    localStorage.removeItem('token');
    setIsAut(false);
  };

  return   <button className="logout-button" onClick={logout} aria-label="Cerrar sesión" title="Cerrar sesión" style={{ fontSize: '20px' }}>
      <FaSignOutAlt style={{fontSize:"30px"}}/>
    </button>
};

export default LogoutButton