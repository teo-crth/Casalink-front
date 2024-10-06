import { Link, useNavigate } from 'react-router-dom';
import { TbMoonFilled } from 'react-icons/tb';
import { BiHomeAlt2 } from 'react-icons/bi';
import { MdFamilyRestroom, MdSettingsSuggest, MdWbSunny } from 'react-icons/md';
import { HiMail } from 'react-icons/hi';
import { IoLogOut } from 'react-icons/io5';
import baseURL from '../../utils/baseURL';
import './Header.scss';
import Login from '../Modals/Login/Login';
import BtnConnect from './BtnConnect/BtnConnect';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  actionSwitchDarkMode,
  actionSwitchSideMenuModal,
} from '../../store/reducer/modal';
import { disconnectLocalStorage } from '../../localStorage/localStorage';
import { actionLogout } from '../../store/reducer/user';
import logo from '../../../public/logo-casalink-lettre-v2.webp';

function Header() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);
  const loginModalIsOpen = useAppSelector(
    (state) => state.modal.loginModalIsOpen
  );
  const isMenuOpen = useAppSelector((state) => state.modal.sideMenuModalIsOpen);
  const isConnected = useAppSelector((state) => state.user.logged);
  const memberConnected = useAppSelector(
    (state) => state.profile.memberConnected
  );

  const HandleSwitchDarkMode = () => {
    dispatch(actionSwitchDarkMode());
    if (isMenuOpen) {
      dispatch(actionSwitchSideMenuModal());
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter' || event.key === ' ') {
      HandleSwitchDarkMode();
    }
  };
  const navigate = useNavigate();
  const handleLogOutLick = () => {
    disconnectLocalStorage();
    dispatch(actionLogout());
    navigate('/');
    dispatch(actionSwitchSideMenuModal());
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} header`}>
      {isConnected && memberConnected && (
        <div
          className={`${
            isMenuOpen ? 'header_avatar-menuOpen' : 'header_avatar'
          }`}
        >
          <Link to="/profil" className="header_avatar_link">
            <img
              src={
                memberConnected.image
                  ? `${baseURL}/${memberConnected.image}`
                  : `${baseURL}/uploads/avatars/default-avatar.webp`
              }
              alt="userAvatar"
              className={`${
                isMenuOpen ? 'header_avatar-menuOpen_img' : 'header_avatar_img'
              }`}
            />
          </Link>
        </div>
      )}
      <Link to="/" className="header_title">
        <div className="header_logoDiv">
          <img className="header_logo" src={logo} alt="logo casaLink" />
        </div>
      </Link>
      <div
        className={`${
          isMenuOpen ? 'header_menuMobile-open' : 'header_menuMobile'
        }`}
      >
        {isConnected && memberConnected && (
          <div
            className={`${
              isMenuOpen ? 'header_menuMobile-open_avatar' : 'header_avatar'
            }`}
          >
            <Link to="/profil" className="header_menuMobile-open_avatar_link">
              <img
                src={
                  memberConnected.image
                    ? `${baseURL}/${memberConnected.image}`
                    : `${baseURL}/uploads/avatars/default-avatar.webp`
                }
                alt="userAvatar"
                className={`${
                  isMenuOpen
                    ? 'header_menuMobile-open_avatar_img'
                    : 'header_menuMobile_avatar_img'
                }`}
              />
            </Link>
          </div>
        )}
        <Link to="/" className="header_menuMobile_link">
          <div className="header_menuMobileDiv" onMouseEnter={() => {}}>
            <div>
              <BiHomeAlt2 className="header_menuMobile_icon" />
            </div>
            Accueil
          </div>
        </Link>
        <Link to="/foyer" className="header_menuMobile_link">
          <div className="header_menuMobileDiv">
            <MdFamilyRestroom className="header_menuMobile_icon" />
            Mon foyer
          </div>
        </Link>
        <Link to="/preferences" className="header_menuMobile_link">
          <div className="header_menuMobileDiv">
            <MdSettingsSuggest className="header_menuMobile_icon" />
            Préférences
          </div>
        </Link>
        <Link to="/contact" className="header_menuMobile_link">
          <div className="header_menuMobileDiv">
            <HiMail className="header_menuMobile_icon" />
            Contact
          </div>
        </Link>
        <Link
          to="/"
          onClick={handleLogOutLick}
          className="header_menuMobile_link"
        >
          <div className="header_menuMobileDiv">
            <IoLogOut className="header_menuMobile_icon" />
            Déconnexion
          </div>
        </Link>
        <div
          className="header_menuMobileDiv"
          onClick={HandleSwitchDarkMode}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={
            isDarkMode ? 'Passez au thème clair' : 'Passez au thème sombre'
          }
        >
          {isDarkMode ? (
            <TbMoonFilled
              className={`header_menuMobile_icon `}
              onClick={HandleSwitchDarkMode}
            />
          ) : (
            <MdWbSunny
              className="header_menuMobile_icon"
              onClick={HandleSwitchDarkMode}
            />
          )}
          {isDarkMode ? 'Switch light' : 'Switch dark'}
        </div>
      </div>
      {isConnected && memberConnected && (
        <div
          className={` ${isMenuOpen ? 'header_btnDiv-open' : 'header_btnDiv'}`}
        >
          <button
            className="header_BtnMenuMobile"
            type="button"
            onClick={() => {
              dispatch(actionSwitchSideMenuModal());
            }}
          >
            <span className="header-bar" />
          </button>
        </div>
      )}
      {!isConnected && <BtnConnect />}
      {loginModalIsOpen && <Login />}
    </div>
  );
}

export default Header;
