import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user } = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Evitar setAuth se o valor não mudar
    if (user && auth !== true) {
      setAuth(true);
    } else if (!user && auth !== false) {
      setAuth(false);
    }

    setLoading(false);
  }, [user, auth]); // Mudei a dependência para garantir que não entre em loop

  return { auth, loading };
};
