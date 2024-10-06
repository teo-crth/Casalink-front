import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import {
  actionAddTask,
  actionDeleteTask,
  actionGetTask,
  actionModifyTask,
} from '../thunks/checkTask';
import { TaskI, TaskInputI } from '../../@types/taskStateI';
import { EventsI } from '../../@types/events';

export interface TaskStateInt {
  input: TaskInputI;
  list: EventsI[];
}

interface ChangeTaskPayload {
  name: keyof TaskInputI;
  value: string | number | null;
}

interface ApiTask {
  task_id: number | null;
  task_start_date: string | Date;
  task_end_date: string | Date;
  task_name: string;
  task_description: string | null;
  profile_id: number | null;
  profile_role: 'child' | 'adult';
}

export const initialState: TaskStateInt = {
  input: {
    id: 0,
    nameTask: '',
    descriptionTask: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    startTime: format(new Date(), 'HH:mm'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    endTime: format(new Date(), 'HH:mm'),
  },
  list: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    actionChangeTask(state, action: PayloadAction<ChangeTaskPayload>) {
      const { name, value } = action.payload;
      (state.input[name] as string | number | null) = value;
    },
    actionCleanTask(state) {
      state.list = [];
    },
    actionEditTask(state, action) {
      const { id, start, end, nameTask, descriptionTask } = action.payload;
      state.list = state.list.map((ev) =>
        ev.id === id ? { ...ev, start, end, nameTask, descriptionTask } : ev
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionAddTask.fulfilled, (state, action) => {
      const { id, start, end, nameTask, descriptionTask, memberRole } =
        action.payload;
      state.list.push({
        id,
        start,
        end,
        nameTask,
        descriptionTask,
        childTask: memberRole === 'child',
      });
    });
    builder.addCase(actionAddTask.rejected, (state, action) => {
      // Gérer l'erreur
    });
    builder.addCase(actionModifyTask.fulfilled, (state, action) => {
      const { id, start, end, nameTask, descriptionTask, memberRole } =
        action.payload;
      state.list = state.list.map((ev) =>
        ev.id === id
          ? {
              ...ev,
              start,
              end,
              nameTask,
              descriptionTask,
              childTask: memberRole === 'child',
            }
          : ev
      );
    });
    builder.addCase(actionModifyTask.rejected, (state, action) => {
      // Gérer l'erreur
    });
    builder.addCase(
      actionGetTask.fulfilled,
      (state, action: PayloadAction<ApiTask[]>) => {
        state.list = [];
        action.payload.forEach((task: ApiTask) => {
          const newTask = {
            id: task.task_id,
            start: task.task_start_date,
            end: task.task_end_date,
            nameTask: task.task_name,
            descriptionTask: task.task_description,
            childTask: task.profile_role === 'child',
          };
          if (task.profile_id) newTask.childTask = true;
          state.list.push(newTask);
        });
      }
    );
    builder.addCase(actionGetTask.rejected, (state, action) => {
      // Gérer l'erreur
    });
    builder.addCase(actionDeleteTask.fulfilled, (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
    });
    builder.addCase(actionDeleteTask.rejected, (state, action) => {
      // Gérer l'erreur
    });
  },
});

export const { actionChangeTask, actionEditTask, actionCleanTask } =
  taskSlice.actions;
export default taskSlice.reducer;
