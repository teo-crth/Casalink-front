import { useLocation } from 'react-router-dom';

// Créez un hook personnalisé pour vérifier le chemin
const useIsOnSpecificPath = (pathName: string) => {
  const location = useLocation();
  return location.pathname === pathName;
};

export default useIsOnSpecificPath;
