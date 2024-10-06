import React, { useState } from 'react';
import './Contact.scss';
import axios from 'axios';
import { useAppSelector } from '../../hooks/redux';

function Contact() {
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_APP_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_email: email,
        subject,
        message,
      },
    };

    axios
      .post('https://api.emailjs.com/api/v1.0/email/send', data)
      .then((res) => {
        console.log(res.data);
        setEmail('');
        setSubject('');
        setMessage('');
        setStatusMessage('Votre message a bien été envoyé.');
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setStatusMessage('Une erreur est survenue, veuillez réessayer.');
      });
  };

  return (
    <div>
      <div className={`${isDarkMode ? 'contact-dark' : ''} contact`}>
        <h1>Contact</h1>
        <div
          className={`${
            isDarkMode ? 'contact-dark_presentation' : ''
          } contact_presentation`}
        >
          <h2
            className={`${
              isDarkMode ? 'contact-dark_presentation_title' : ''
            } contact_presentation_title`}
          >
            Des questions sans réponses ? Nous sommes là pour y répondre.
          </h2>
          <p
            className={`${
              isDarkMode ? 'contact-dark_presentation_text' : ''
            } contact_presentation_text`}
          >
            CasaLink est une application web conçue pour simplifier la gestion
            des emplois du temps, des tâches domestiques et des événements au
            sein d&apos;un foyer. Elle vise à améliorer la coordination et la
            communication entre les membres d&apos;un même foyer en offrant une
            plateforme centralisée pour organiser et partager des informations
            importantes.
          </p>
        </div>
        <div
          className={`${isDarkMode ? 'contact-dark_modal' : ''} contact_modal`}
        >
          {statusMessage && (
            <p
              className={`${
                isDarkMode ? 'contact-dark_status_message' : ''
              } contact_status_message`}
            >
              {statusMessage}
            </p>
          )}
          <form
            className={`${
              isDarkMode ? 'contact-dark_modal_form' : ''
            } contact_modal_form`}
            onSubmit={sendEmail}
          >
            <h1>Nous contacter</h1>

            <div
              className={`${
                isDarkMode ? 'contact-dark_modal_form_field' : ''
              } contact_modal_form_field`}
            >
              <label htmlFor="email">Email</label>
              <input
                className="input_required"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div
              className={`${
                isDarkMode ? 'contact-dark_modal_form_field' : ''
              } contact_modal_form_field`}
            >
              <label htmlFor="subject">Objet</label>
              <input
                className="input_required"
                type="text"
                name="subject"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div
              className={`${
                isDarkMode ? 'contact-dark_modal_form_field' : ''
              } contact_modal_form_field`}
            >
              <label htmlFor="message">Message</label>
              <textarea
                className="input_required"
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
