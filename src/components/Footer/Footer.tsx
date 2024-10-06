import { Link } from 'react-router-dom';
import './Footer.scss';
import { useAppSelector } from '../../hooks/redux';

function Footer() {
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);
  return (
    <div className={`${isDarkMode ? 'Footer-dark' : ''} Footer`}>
      <Link
        to="/contact"
        className={`${
          isDarkMode ? 'Footer-dark_listItems' : ''
        } Footer_listItems`}
      >
        Contact
      </Link>

      <Link
        to="/mentions-legales"
        className={`${
          isDarkMode ? 'Footer-dark_listItems' : ''
        } Footer_listItems`}
      >
        Mentions légales
      </Link>

      <Link
        to="/sitemap"
        className={`${
          isDarkMode ? 'Footer-dark_listItems' : ''
        } Footer_listItems`}
      >
        Site map
      </Link>
    </div>
  );
}

export default Footer;
