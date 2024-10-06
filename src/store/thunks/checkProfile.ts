import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from '../../axios/axios';
import { MemberStateI } from '../../@types/memberStateI';

interface ProfilePayload {
  id: number | null;
}

const actionGetMembers = createAsyncThunk<
  { members: MemberStateI[] },
  ProfilePayload
>('profile/GET_MEMBERS', async (payload: ProfilePayload, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/account/${payload.id}/profile`);
    return { members: response.data.data.profile };
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(axiosError.response?.data);
  }
});

export default actionGetMembers;
