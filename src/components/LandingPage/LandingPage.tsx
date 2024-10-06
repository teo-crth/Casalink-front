import { useState } from 'react';
import {
  FaCloudSunRain,
  FaCloudMoonRain,
  FaShoppingBasket,
  FaShoppingCart,
  FaHandHoldingUsd,
} from 'react-icons/fa';
import { useAppDispatch } from '../../hooks/redux';
import {
  actionSetModeLoginModal,
  actionSwitchLoginModal,
} from '../../store/reducer/modal';
import './LandingPage.scss';
import agenda from '../../../public/agenda.webp';

const IMAGES = {
  AGENDA: 'public/agenda.webp',
  METEO: 'public/logo192.png',
  COURSES: 'public/logo192.png',
  BUDGET: 'public/logo192.png',
  DEFAULT: 'public/logo192.png',
};

const SECTIONS = {
  AGENDA: 'AGENDA',
  METEO: 'METEO',
  COURSES: 'COURSES',
  BUDGET: 'BUDGET',
} as const;

type SectionType = keyof typeof SECTIONS | null;

function LandingPage() {
  const dispatch = useAppDispatch();
  const [activeSection, setActiveSection] = useState<SectionType>('AGENDA');
  const [imgTestVisiteur, setImgTestVisiteur] = useState(IMAGES.DEFAULT);

  const handleSectionToggle = (section: SectionType) => {
    if (activeSection === section) {
      setActiveSection(null);
      setImgTestVisiteur(IMAGES.DEFAULT);
    } else {
      setActiveSection(section);
      setImgTestVisiteur(IMAGES[section as keyof typeof IMAGES]);
    }
  };

  return (
    <div className="landingPage">
      <div className="landingPage_BoxFunctionality">
        <h1 className="landingPage_title">
          Planifier le quotidien de votre foyer !
        </h1>
        <ul className="landingPage_listeFonctionnalite">
          <li className="landingPage_listeItem">
            <button
              className="landingPage_btn btn-functionality"
              type="button"
              onClick={() => handleSectionToggle(SECTIONS.AGENDA)}
            >
              Agenda
            </button>
          </li>
          <li className="landingPage_listeItem">
            <button
              className="landingPage_btn btn-functionality"
              type="button"
              onClick={() => handleSectionToggle(SECTIONS.METEO)}
            >
              Météo
            </button>
          </li>
          <li className="landingPage_listeItem">
            <button
              className="landingPage_btn btn-functionality"
              type="button"
              onClick={() => handleSectionToggle(SECTIONS.COURSES)}
            >
              Courses
            </button>
          </li>
          <li className="landingPage_listeItem">
            <button
              className="landingPage_btn btn-functionality"
              type="button"
              onClick={() => handleSectionToggle(SECTIONS.BUDGET)}
            >
              Budget
            </button>
          </li>
        </ul>
      </div>

      <div className="landingPage_actionBox">
        <div className="landingPage_divDescription">
          {activeSection === SECTIONS.METEO && (
            <div className="landingPage_divDescription_iconesMeteo">
              <FaCloudSunRain className="iconeSun" />
              <FaCloudMoonRain className="iconeMoon" />
            </div>
          )}
          {activeSection === SECTIONS.COURSES && (
            <div className="landingPage_divDescription_courses">
              <FaShoppingBasket className="iconeBasket" />
              <FaShoppingCart className="iconeCart" />
            </div>
          )}
          {activeSection === SECTIONS.BUDGET && (
            <div className="landingPage_divDescription_budget">
              <FaHandHoldingUsd className="iconeBudget" />
            </div>
          )}
          {activeSection === SECTIONS.AGENDA && (
            <img className="landingPage_img" src={agenda} alt="Agenda" />
          )}
          {!activeSection && (
            <img
              className="landingPage_img"
              src={IMAGES.DEFAULT}
              alt="Placeholder"
            />
          )}
          <p className="landingPage_description">
            Simplifiez la gestion des emplois du temps, des tâches domestiques
            et des événements au sein de votre foyer. Des fonctionnalités sont à
            venir, comme l&apos;affichage de la météo, une liste de courses 
            commune ou encore un budget afin de prévoir les dépenses mensuelles.
          </p>
          <button
            className="btn-signin"
            type="button"
            onClick={() => {
              dispatch(actionSetModeLoginModal('signup'));
              dispatch(actionSwitchLoginModal());
            }}
          >
            <span className="landingPage_btn-text">INSCRIVEZ-VOUS !</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
