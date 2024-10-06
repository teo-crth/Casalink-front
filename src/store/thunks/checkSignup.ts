import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { RootState } from '..';
import axiosInstance from '../../axios/axios';

const actionCheckSignup = createAsyncThunk(
  'user/CHECK_SIGNUP',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const response = await axiosInstance.post('/signup', {
        email: state.user.credentials.signup.email,
        password: state.user.credentials.signup.password,
        confirmPassword: state.user.credentials.signup.passwordConfirm,
        firstname: state.user.credentials.signup.firstname,
        lastname: state.user.credentials.signup.lastname,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

export default actionCheckSignup;
