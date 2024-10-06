import { useAppSelector } from '../../hooks/redux';
import './MentionsLegales.scss';

function MentionsLegales() {
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);

  return (
    <div
      className={`${isDarkMode ? 'mentionslegales-dark' : ''} mentionslegales`}
    >
      <h2
        className={`${
          isDarkMode ? 'mentionslegales-dark_title' : ''
        } mentionslegales_title`}
      >
        Mentions légales
      </h2>
      <p
        className={`${
          isDarkMode ? 'mentionslegales-dark_description' : ''
        } mentionslegales_description`}
      >
        Nom et prénom : Jean Dupont Adresse du domicile : 12, rue de la Paix,
        75002 Paris Adresse du siège social : 12, rue de la Paix, 75002 Paris
        Coordonnées de l’hébergeur du site : contact@monsite.com Nom du
        directeur de la publication : Jean Dupont Nom du responsable de la
        rédaction : Pierre Martin Informations sur les données personnelles :
        Nous collectons vos données personnelles pour vous contacter et vous
        informer de nos actualités. Vous pouvez exercer vos droits d’accès, de
        rectification et d’opposition en nous contactant à l’adresse ci-dessus.
      </p>
    </div>
  );
}

export default MentionsLegales;
