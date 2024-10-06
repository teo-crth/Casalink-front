import { Link } from 'react-router-dom';
import './404.scss';
import { useAppSelector } from '../../hooks/redux';

function NotFount() {
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);

  return (
    <div className={`${isDarkMode ? 'container-dark' : ''} container`}>
      <h1 className={`${isDarkMode ? 'container-dark_h1' : ''} container_h1`}>404 : Page introuvable</h1>
      <img
        className={`${isDarkMode ? 'container-dark_img' : ''} container_img`}
        src="src/assets/chapeau-1293807_1280.png"
        alt="Homme perdu"
      />
      <p className={`${isDarkMode ? 'container-dark_p' : ''} container_p`}>Vous êtes perdu ? Revenez sur vos pas !</p>
      <Link to="/">
        <button className="container_button" type="button">
          Accueil
        </button>
      </Link>
    </div>
  );
}
export default NotFount;
