import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { RootState } from '..';
import axiosInstance from '../../axios/axios';
import { TaskStateI } from '../../@types/memberStateI';

interface Task {
  id: null | number;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  status: string;
  reward_point: number;
  category_id: number;
  priority: string;
  profile_id: number;
}

interface TaskPayload {
  id: number | null;
  profile_id: number | null;
}

const actionFetchTasks = createAsyncThunk<{ tasks: TaskStateI[] }, TaskPayload>(
  'profile/FETCH_TASKS',
  async (payload: TaskPayload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/task/`);
      return { tasks: response.data.data.tasks };
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

export default actionFetchTasks;
