import './SideNavBurger.scss';
import { Link, NavLink } from 'react-router-dom';
import {
  AtSign,
  Home,
  LogOut,
  Map,
  Moon,
  Sun,
  ToggleLeft,
  ToggleRight,
  Users,
} from 'react-feather';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  actionSwitchDarkMode,
  actionSwitchSideMenuModal,
} from '../../../store/reducer/modal';
import { actionLogout } from '../../../store/reducer/user';

interface SideNavPropsI {
  isConnected: boolean;
}

function SideNavBurger({ isConnected }: SideNavPropsI) {
  const [hideToggleLeft, setHideToggleLeft] = useState(false);
  const [hideToggleRight, setHideToggleRight] = useState(true);

  const sideMenuModalIsOpen = useAppSelector(
    (state) => state.modal.sideMenuModalIsOpen
  );
  const DarkModeIsActive = useAppSelector(
    (state) => state.modal.darkModeIsActive
  );
  const dispatch = useAppDispatch();

  return (
    <div className="sideMenuContainer">
      <button
        className={`btnSideBarMenu ${
          sideMenuModalIsOpen && 'btnSideBarMenu-open'
        }`}
        type="button"
        onClick={() => {
          dispatch(actionSwitchSideMenuModal());
        }}
      >
        <span className="btnSideBarMenu-bar" />
      </button>
      <nav
        className={` ${sideMenuModalIsOpen ? 'sideMenu-open' : 'sideMenu'} `}
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <Home className="sideNavIcon" />
          <span
            className={`navLink_desc ${
              sideMenuModalIsOpen ? '' : 'navLink_desc-hidden'
            } `}
          >
            Accueil
          </span>
        </NavLink>
        <NavLink
          to="/foyer"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => {
            dispatch(actionSwitchSideMenuModal());
          }}
        >
          <Users className="sideNavIcon" />
          <span
            className={`navLink_desc ${
              sideMenuModalIsOpen ? '' : 'navLink_desc-hidden'
            }  `}
          >
            Mon foyer
          </span>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <AtSign className="sideNavIcon" />
          <span
            className={`navLink_desc ${
              sideMenuModalIsOpen ? '' : 'navLink_desc-hidden'
            } `}
          >
            Contact
          </span>
        </NavLink>
        <NavLink
          to="/sitemap"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <Map className="sideNavIcon" />
          <span
            className={`navLink_desc ${
              sideMenuModalIsOpen ? '' : 'navLink_desc-hidden'
            } `}
          >
            Site map
          </span>
        </NavLink>
        {isConnected && (
          <Link
            to="/"
            className="btn_deco"
            onClick={() => {
              dispatch(actionLogout());
            }}
          >
            <LogOut className="sideNavIcon" />
            <span
              className={`navLink_desc ${
                sideMenuModalIsOpen ? '' : 'navLink_desc-hidden'
              } `}
            >
              Déconnexion
            </span>
          </Link>
        )}

        <ToggleLeft
          className={`${
            sideMenuModalIsOpen ? 'toggleLeft' : 'toggleLeft-hidden'
          } ${!hideToggleRight && 'toggleLeft-hidden'}`}
          onClick={() => {
            setHideToggleRight((oldHide) => !oldHide);
            setHideToggleLeft((oldHide) => !oldHide);
            dispatch(actionSwitchDarkMode());
          }}
        />
        <ToggleRight
          className={`${
            sideMenuModalIsOpen ? 'toggleRight' : 'toggleRight-hidden'
          } ${hideToggleRight && 'toggleRight-hidden'}`}
          onClick={() => {
            setHideToggleRight(!hideToggleRight);
            setHideToggleLeft(!hideToggleLeft);
            dispatch(actionSwitchDarkMode());
          }}
        />
        {DarkModeIsActive ? (
          <Sun
            className={`${
              sideMenuModalIsOpen
                ? 'sunModeIcon sunModeIcon-open'
                : 'sunModeIcon'
            } `}
          />
        ) : (
          <Moon
            className={`${
              sideMenuModalIsOpen
                ? 'sunModeIcon sunModeIcon-open'
                : 'sunModeIcon'
            } `}
          />
        )}
      </nav>
    </div>
  );
}

export default SideNavBurger;
