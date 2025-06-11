import { createContext, useContext, useEffect, useState } from "react";

const AutenticacionContext = createContext();

export const ProveedorAut = ({ children }) => {
  const [isAut, setIsAut] = useState(false);
  const [user, setUser] = useState(null);  // nuevo: para guardar datos del usuario
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    if (tokenGuardado) {
      setIsAut(true);
      // Traemos info del usuario desde backend con ese token:
      fetch("http://localhost:3001/api/perfil", {
        headers: { Authorization: `Bearer ${tokenGuardado}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("No autorizado");
          return res.json();
        })
        .then((data) => {
          setUser(data.usuario); // recuerda que en backend envías { usuario: req.user }
        })
        .catch(() => {
          setIsAut(false);
          setUser(null);
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setIsAut(false);
      setUser(null);
      setLoading(false);
    }
  }, []);

  return (
    <AutenticacionContext.Provider value={{ isAut, setIsAut, user, setUser, loading }}>
      {children}
    </AutenticacionContext.Provider>
  );
};

export const useAut = () => useContext(AutenticacionContext);