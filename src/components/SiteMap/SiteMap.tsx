import { Link } from 'react-router-dom';
import './SiteMap.scss';
import baseURL from '../../utils/baseURL';
import { useAppSelector } from '../../hooks/redux';

function SiteMap() {
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);

  return (
    <div className={`${isDarkMode ? 'sitemap-dark' : ''} sitemap`}>
      <h1 className="sitemap_title">Plan du site</h1>
      <div
        className={`${
          isDarkMode ? 'sitemap-dark_boxForInfo' : ''
        } sitemap_boxForInfo`}
      >
        <span
          className={`${
            isDarkMode ? 'sitemap-dark_boxForInfo_item' : ''
          } sitemap_boxForInfo_item`}
        >
          <Link
            to="/"
            className="sitemap_boxForInfo_item_link sitemap-dark_boxForInfo_item_link"
          >
            Accueil :
          </Link>{' '}
          {baseURL}
        </span>
        <span
          className={`${
            isDarkMode ? 'sitemap-dark_boxForInfo_item' : ''
          } sitemap_boxForInfo_item`}
        >
          <Link
            to="/foyer"
            className="sitemap_boxForInfo_item_link sitemap-dark_boxForInfo_item_link"
          >
            Foyer :
          </Link>{' '}
          {baseURL}/foyer
        </span>
        <span
          className={`${
            isDarkMode ? 'sitemap-dark_boxForInfo_item' : ''
          } sitemap_boxForInfo_item`}
        >
          <Link
            to="/preferences"
            className="sitemap_boxForInfo_item_link sitemap-dark_boxForInfo_item_link"
          >
            Préférences :
          </Link>{' '}
          {baseURL}/preferences
        </span>
        <span
          className={`${
            isDarkMode ? 'sitemap-dark_boxForInfo_item' : ''
          } sitemap_boxForInfo_item`}
        >
          <Link
            to="/contact"
            className="sitemap_boxForInfo_item_link sitemap-dark_boxForInfo_item_link"
          >
            Contact :
          </Link>{' '}
          {baseURL}/contact
        </span>
        <span className="sitemap_boxForInfo_item">
          <Link to="/mentions-legales" className="sitemap_boxForInfo_item_link">
            Mentions légales :
          </Link>{' '}
          {baseURL}/mentions-legales
        </span>
      </div>
    </div>
  );
}

export default SiteMap;
