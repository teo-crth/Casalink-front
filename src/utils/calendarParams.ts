import { format, getDay, parse, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { dateFnsLocalizer } from 'react-big-calendar';

const locales = {
  fr,
};

export const mlocalizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const messages = {
  allDay: 'Toute la journée',
  previous: 'Précédent',
  next: 'Suivant',
  today: "Aujourd'hui",
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  agenda: 'Agenda',
  date: 'Date',
  time: 'Heure',
  event: 'Événement',
  showMore: (total: number) => `+ ${total}`,
};
