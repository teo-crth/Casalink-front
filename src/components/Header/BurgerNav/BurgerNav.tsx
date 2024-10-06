import { useState } from 'react';
import './BurgerNav.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';

function BurgerNav() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);
  const isConnected = useAppSelector((state) => state.user.logged);
  return (
    <nav
      className={`navbar ${
        openMenu ? 'navbar_menu-open' : 'navbar_menu-hidden'
      }`}
    >
      <ul className="navbar_links">
        <li className="navbar_item">
          <Link to="/" className="navbar_link">
            Accueil
          </Link>
        </li>
        {isConnected && (
          <li className={`${isDarkMode ? 'navbar_item-dark' : ''} navbar_item`}>
            <Link to="/foyer" className="navbar_link">
              Mon foyer
            </Link>
          </li>
        )}

        <li className="navbar_item">
          <Link to="/preferences" className="navbar_link">
            Préférences
          </Link>
        </li>
        <li className="navbar_item">
          <Link to="/contact" className="navbar_link">
            Contact
          </Link>
        </li>
        <li className="navbar_item">
          <a href="/" className="navbar_link">
            Se déconnecter
          </a>
        </li>
      </ul>
      <button
        className="navbar_burger navbar_burger-hidden"
        type="button"
        onClick={handleOpenMenu}
      >
        <span className="navbar-bar" />
      </button>
    </nav>
  );
}
export default BurgerNav;
