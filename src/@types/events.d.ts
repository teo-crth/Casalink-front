export interface EventsI {
  id: number | null;
  nameTask: string;
  descriptionTask: string | null;
  start: string | Date;
  end: string | Date;
  childTask?: boolean | null;
  childTaskToValidate?: boolean | null;
  taskValidated?: boolean | null;
}

export interface EventsWithMemberI {
  id: number | null;
  nameTask: string;
  descriptionTask: string | null;
  start: string | Date;
  end: string | Date;
  memberTarget?: number | null;
  memberRole?: 'adult' | 'child';
}
