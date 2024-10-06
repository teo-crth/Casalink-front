import { useCallback, useEffect, useState } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { Calendar, DateLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { addHours, format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ModalStateI, actionSwitchTaskModal } from '../../store/reducer/modal';

import './HomePage.scss';
import Task from '../Modals/Task/Task';
import { mlocalizer, messages } from '../../utils/calendarParams';
import { EventsI } from '../../@types/events';
import {
  actionAddTask,
  actionGetTask,
  actionModifyTask,
} from '../../store/thunks/checkTask';
import { UserStateI } from '../../@types/userStateI';
import { MembersState } from '../../store/reducer/profile';
import { TaskStateInt } from '../../store/reducer/task';
import actionGetMembers from '../../store/thunks/checkProfile';
import { actionChangeOpenPopup } from '../../store/reducer/popup';

interface DragNDropI {
  event: EventsI;
  startUnserielized: Date;
  endUnserielized: Date;
}

interface StateReducerI {
  user: UserStateI;
  modal: ModalStateI;
  profile: MembersState;
  task: TaskStateInt;
}

const DragNDropCalendar = withDragAndDrop<EventsI>(Calendar);

function HomePage() {
  const dispatch = useAppDispatch();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [eventSelected, setEventSelected] = useState<null | EventsI>(null);
  const [taskModalMode, setTaskModalMode] = useState<'add' | 'edit'>('add');
  const taskModalIsOpen = useAppSelector(
    (state) => state.modal.taskModalIsOpen
  );
  const accountId = useAppSelector((state) => state.user.id);

  const memberSelected = useAppSelector(
    (state) => state.profile.memberSelected
  );
  const membersList = useAppSelector((state) => state.profile.members);

  const getTasks = (state: StateReducerI) => state.task.list;
  const getMappedTasks = createSelector([getTasks], (tasks) =>
    tasks.map((task) => ({
      ...task,
      title: task.nameTask,
      start: new Date(task.start),
      end: new Date(task.end),
      childTask: task.childTask,
    }))
  );
  const events = useAppSelector(getMappedTasks);

  const eventPropGetter = useCallback(
    (
      event: EventsI,
      start: string | Date,
      end: string | Date,
      isSelected: boolean
    ) => ({
      ...(isSelected && {
        style: {
          backgroundColor: '#005C75',
        },
      }),
      ...(event.childTask && {
        style: {
          backgroundColor: '#5500B4',
          borderColor: '#7800FF',
        },
      }),
    }),
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (accountId !== null && memberSelected !== null) {
      dispatch(actionGetTask({ id: accountId, member: memberSelected }));
      dispatch(actionGetMembers({ id: accountId }));
    }
  }, [accountId, memberSelected, dispatch]);

  const addTask = async (
    id: number,
    startUnserielized: Date,
    endUnserielized: Date,
    title: string,
    content: string,
    memberTarget: number,
    memberRole: 'adult' | 'child'
  ) => {
    const start = startUnserielized.toISOString();
    const end = endUnserielized.toISOString();
    if (memberSelected && accountId) {
      const resultActionAddTask = dispatch(
        actionAddTask({
          id: accountId,
          start,
          end,
          nameTask: title,
          descriptionTask: content,
          memberTarget,
          memberRole,
        })
      );
      if ((await resultActionAddTask).meta.requestStatus === 'fulfilled')
        dispatch(actionChangeOpenPopup({ content: 'Tâche créée' }));
    }
    dispatch(actionSwitchTaskModal());
  };

  const editTask = async (
    id: number,
    startUnserielized: Date,
    endUnserielized: Date,
    title: string,
    content: string,
    memberTarget: number,
    memberRole: 'adult' | 'child'
  ) => {
    const start = startUnserielized.toISOString();
    const end = endUnserielized.toISOString();
    const resultActionModifyTask = dispatch(
      actionModifyTask({
        id,
        start,
        end,
        nameTask: title,
        descriptionTask: content,
        memberTarget,
        memberRole,
      })
    );
    if ((await resultActionModifyTask).meta.requestStatus === 'fulfilled')
      dispatch(actionChangeOpenPopup({ content: 'Tâche modifiée' }));
    dispatch(actionSwitchTaskModal());
  };

  // We put a useCallback to avoid the function recreation at each render
  const handleSelectSlot = useCallback(
    ({ start }: { start: Date }) => {
      const endWithOneHour = addHours(start, 1);
      if (memberSelected?.role === 'child') return;
      setTaskModalMode('add');
      setEventSelected({
        id: 0,
        start,
        end: endWithOneHour,
        nameTask: '',
        descriptionTask: '',
        childTask: false,
        childTaskToValidate: false,
        taskValidated: false,
      });
      dispatch(actionSwitchTaskModal());
    },
    // We put dispatch in the dependencies array to avoid the linter warning
    // He will never change
    [dispatch, memberSelected?.role]
  );

  const handleSelectEvent = useCallback(
    (event: EventsI) => {
      setTaskModalMode('edit');
      setEventSelected({ ...event });
      dispatch(actionSwitchTaskModal());
    },
    [dispatch]
  );

  const handleEventDrop = useCallback(
    ({ event, startUnserielized, endUnserielized }: DragNDropI) => {
      if (memberSelected?.role === 'child') return;
      const start = format(startUnserielized, 'yyyy-MM-dd HH:mm');
      const end = format(endUnserielized, 'yyyy-MM-dd HH:mm');
      dispatch(
        actionModifyTask({
          id: event.id,
          start,
          end,
          nameTask: event.nameTask,
          descriptionTask: event.descriptionTask,
        })
      );
    },
    [dispatch, memberSelected?.role]
  );

  const handleEventResize = useCallback(
    ({ event, startUnserielized, endUnserielized }: DragNDropI) => {
      if (memberSelected?.role === 'child') return;
      const start = format(startUnserielized, 'yyyy-MM-dd HH:mm');
      const end = format(endUnserielized, 'yyyy-MM-dd HH:mm');
      dispatch(
        actionModifyTask({
          id: event.id,
          start,
          end,
          nameTask: event.nameTask,
          descriptionTask: event.descriptionTask,
        })
      );
    },
    [dispatch, memberSelected?.role]
  );

  const formats = {
    dateFormat: 'd',
    dayFormat: isMobileView ? 'dd' : 'dd eee',
    weekdayFormat: 'cccc',
    timeGutterFormat: 'p',
    monthHeaderFormat: 'MMMM yyyy',
    dayRangeHeaderFormat: (
      { start, end }: { start: Date; end: Date },
      culture: string | undefined,
      localizer: DateLocalizer | undefined
    ) => {
      const s = localizer?.format(start, 'dd MMM', culture);
      const e = localizer?.format(end, 'dd MMM', culture);
      return `${s} - ${e}`;
    },
    dayHeaderFormat: 'cccc do MMM',
    agendaDateFormat: 'ccc MMM dd',
    agendaTimeFormat: 'p',
  };

  return (
    <div className="HomePage">
      {taskModalIsOpen && eventSelected && (
        <Task
          taskModalMode={taskModalMode}
          eventSelect={eventSelected}
          addTask={addTask}
          editTask={editTask}
          membersList={membersList}
          memberSelected={memberSelected}
        />
      )}
      <main>
        <DragNDropCalendar
          localizer={mlocalizer}
          formats={formats}
          defaultView="week"
          culture="fr"
          messages={messages}
          events={events}
          popup
          selectable
          longPressThreshold={5}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={({ event, start, end }) => {
            const startConverted = new Date(start);
            const endConverted = new Date(end);
            handleEventDrop({
              event,
              startUnserielized: startConverted,
              endUnserielized: endConverted,
            });
          }}
          onEventResize={({ event, start, end }) => {
            const startConverted = new Date(start);
            const endConverted = new Date(end);
            handleEventResize({
              event,
              startUnserielized: startConverted,
              endUnserielized: endConverted,
            });
          }}
          resizable
          eventPropGetter={eventPropGetter}
        />
      </main>
    </div>
  );
}

export default HomePage;
