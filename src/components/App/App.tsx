import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { jwtDecode } from 'jwt-decode';

import LandingPage from '../LandingPage/LandingPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';

import './App.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import HomePage from '../HomePage/HomePage';
import MentionsLegales from '../MentionsLegales/MentionsLegales';
import SiteMap from '../SiteMap/SiteMap';
import NotFount from '../404/404';
import ProfilePage from '../ProfilePage/profilePage';
import SideMenu from '../SideMenu/SideMenu';
import SettingPage from '../SettingPage/SettingPage';
import SelectProfile from '../SelectProfile/SelectProfile';
import AskPin from '../Modals/Pin/AskPin';
import {
  getProfileFromLocalStorage,
  getTokenAndPseudoFromLocalStorage,
} from '../../localStorage/localStorage';
import { addTokenJwtToAxiosInstance } from '../../axios/axios';
import { actionLogin } from '../../store/reducer/user';
import { actionSelectProfile } from '../../store/reducer/profile';
import Popup from '../Modals/Popup/Popup';

function App() {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.user.logged);
  const modalIsOpen = useAppSelector((state) => state.modal.pinModalIsActive);
  const memberConnected = useAppSelector(
    (state) => state.profile.memberConnected
  );
  const isOpen = useAppSelector((state) => state.popup.isOpen);
  const content = useAppSelector((state) => state.popup.content);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const jwtObject = getTokenAndPseudoFromLocalStorage() as { jwt: string };

    if (jwtObject.jwt !== null && jwtObject.jwt !== null) {
      const jwtDecoded = jwtDecode(jwtObject.jwt) as { userId: number };
      addTokenJwtToAxiosInstance(jwtObject.jwt);
      dispatch(actionLogin({ jwt: jwtObject.jwt, id: jwtDecoded.userId }));
      const profile = getProfileFromLocalStorage();

      if (profile !== null) {
        dispatch(actionSelectProfile(profile));
      }
    }
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) return null;

  let homePageElement;
  if (isLogged && memberConnected) {
    homePageElement = <HomePage />;
  } else if (isLogged && !memberConnected) {
    homePageElement = <Navigate to="/profil" />;
  } else {
    homePageElement = <Navigate to="/landingpage" />;
  }
  return (
    <div className="app">
      {isOpen && <Popup content={content} />}
      <Header />
      <div className="mainContainer">
        {isLogged && memberConnected && <SideMenu />}
        {modalIsOpen && <AskPin />}
        <Routes>
          <Route path="/" element={homePageElement} />

          <Route
            path="/preferences"
            element={
              isLogged ? <SettingPage /> : <Navigate to="/landingpage" />
            }
          />

          <Route
            path="/foyer"
            element={
              isLogged ? <ProfilePage /> : <Navigate to="/landingpage" />
            }
          />

          <Route
            path="/profil"
            element={
              isLogged ? <SelectProfile /> : <Navigate to="/landingpage" />
            }
          />

          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/sitemap" element={<SiteMap />} />
          <Route path="*" element={<NotFount />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
