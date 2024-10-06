import { useEffect } from 'react';

import { BiHomeAlt2 } from 'react-icons/bi';
import { MdFamilyRestroom, MdSettingsSuggest, MdWbSunny } from 'react-icons/md';
import { TbMoonFilled } from 'react-icons/tb';
import { HiMail } from 'react-icons/hi';
import { IoLogOut } from 'react-icons/io5';
import './SideMenu.scss';
import { BsArrowLeftShort } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  actionSwitchDarkMode,
  actionSwitchSideMenuModal,
} from '../../store/reducer/modal';
import { disconnectLocalStorage } from '../../localStorage/localStorage';
import { actionLogout } from '../../store/reducer/user';
import { actionDisconnectProfile } from '../../store/reducer/profile';

function SideMenu() {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);
  const openMenu = useAppSelector((state) => state.modal.sideMenuModalIsOpen);

  const openOrCloseMenu = () => {
    dispatch(actionSwitchSideMenuModal());
  };
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };
  const handleLogOutLick = () => {
    disconnectLocalStorage();
    dispatch(actionDisconnectProfile());
    dispatch(actionLogout());
    navigate('/');
  };
  const handleFoyerClick = () => {
    navigate('/foyer');
  };

  const handleSettingClick = () => {
    navigate('/preferences');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const HandleSwitchDarkMode = () => {
    dispatch(actionSwitchDarkMode());
  };

  useEffect(() => {
    if (openMenu) {
      openOrCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div
      className={`${isDarkMode ? 'dark' : ''} ${
        !openMenu ? 'side' : 'side-open'
      } 
      `}
    >
      <BsArrowLeftShort
        className={`${
          !openMenu ? 'side_menubtn_icon' : 'side_menubtn_icon-open'
        }`}
        onClick={openOrCloseMenu}
      />
      <div className={`${openMenu ? 'side_boxItem' : 'side_boxItem-hidden'}`}>
        <BiHomeAlt2
          className={`${openMenu ? 'side_icon-open' : 'side_icon'}`}
          onClick={handleHomeClick}
        />
        <Link
          to="/"
          className={`${!openMenu ? 'side_item' : 'side_item-open'}`}
        >
          {openMenu ? 'Accueil' : ''}
        </Link>
      </div>
      <div className={`${openMenu ? 'side_boxItem' : 'side_boxItem-hidden'}`}>
        <MdFamilyRestroom
          className={`${openMenu ? 'side_icon-open' : 'side_icon'}`}
          onClick={handleFoyerClick}
        />
        <Link
          to="/foyer"
          className={`${!openMenu ? 'side_item' : 'side_item-open'}`}
        >
          {openMenu ? 'Mon foyer' : ''}
        </Link>
      </div>
      <div className={`${openMenu ? 'side_boxItem' : 'side_boxItem-hidden'}`}>
        <MdSettingsSuggest
          className={`${openMenu ? 'side_icon-open' : 'side_icon'}`}
          onClick={handleSettingClick}
        />
        <Link
          to="/preferences"
          className={`${!openMenu ? 'side_item' : 'side_item-open'}`}
        >
          {openMenu ? 'Préférences' : ''}
        </Link>
      </div>
      <div className={`${openMenu ? 'side_boxItem' : 'side_boxItem-hidden'}`}>
        <HiMail
          className={`${openMenu ? 'side_icon-open' : 'side_icon'}`}
          onClick={handleContactClick}
        />
        <Link
          to="/contact"
          className={`${!openMenu ? 'side_item' : 'side_item-open'}`}
        >
          {openMenu ? 'Contact' : ''}
        </Link>
      </div>
      <div className={`${openMenu ? 'side_boxItem' : 'side_boxItem-hidden'}`}>
        <IoLogOut
          className={`${openMenu ? 'side_icon-open' : 'side_icon'}`}
          onClick={handleLogOutLick}
        />
        <Link
          to="/"
          onClick={handleLogOutLick}
          className={`${!openMenu ? 'side_item' : 'side_item-open'}`}
        >
          {openMenu ? 'Déconnexion' : ''}
        </Link>
      </div>
      <div className={`${openMenu ? ' side_boxItem' : 'side_boxItem-hidden'}`}>
        {isDarkMode ? (
          <TbMoonFilled
            className={`side_iconmoon ${
              openMenu ? 'side_icon-open' : 'side_icon'
            }`}
            onClick={HandleSwitchDarkMode}
          />
        ) : (
          <MdWbSunny
            className={`side_iconsun ${
              openMenu ? 'side_icon-open' : 'side_icon'
            }`}
            onClick={HandleSwitchDarkMode}
          />
        )}
        <button
          type="button"
          className={`btn-dark ${!openMenu ? 'side_item' : 'side_item-open'}`}
          onClick={HandleSwitchDarkMode}
        >
          {openMenu ? `${isDarkMode ? 'Switch light' : 'Switch dark'}` : ''}
        </button>
      </div>
    </div>
  );
}
export default SideMenu;
