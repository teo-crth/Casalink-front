import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from '../../axios/axios';
import { MemberStateI } from '../../@types/memberStateI';
import type { RootState } from '..';

interface UploadProfileImagePayload {
  base64Image: string;
  profileId: number;
}

interface UpdateRolePayload {
  id: number | null;
  role: string;
}

interface UpdateRoleResponse {
  id: number | null;
  role: string;
}

export const actionUploadProfileImage = createAsyncThunk<
  string,
  UploadProfileImagePayload,
  { rejectValue: string }
>(
  'profile/UPLOAD_PROFILE_IMAGE',
  async ({ base64Image, profileId }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/profile/upload', {
        id: profileId,
        image: base64Image,
      });

      return response.data.filePath;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        typeof axiosError.response?.data === 'string'
          ? axiosError.response?.data
          : "Erreur lors de l'upload de l'image";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const actionDeleteProfile = createAsyncThunk<
  void,
  number | null,
  { rejectValue: string }
>('profile/DELETE_PROFILE', async (profile_id, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/profile/${profile_id}`);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      typeof axiosError.response?.data === 'string'
        ? axiosError.response?.data
        : 'Erreur de suppression';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const actionUpdateProfile = createAsyncThunk<
  MemberStateI,
  MemberStateI,
  { rejectValue: string }
>('profile/UPDATE_PROFILE', async (updatedProfile, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.patch(
      `/profile/${updatedProfile.id}`,
      {
        name: updatedProfile.name,
        role: updatedProfile.role,
        email: updatedProfile.email,
        pin: updatedProfile.pin,
        birthdate: updatedProfile.birthdate,
      }
    );
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      typeof axiosError.response?.data === 'string'
        ? axiosError.response?.data
        : 'Erreur de modification';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const actionAddProfile = createAsyncThunk<
  MemberStateI,
  MemberStateI,
  { rejectValue: string }
>('profile/ADD_PROFILE', async (addProfile, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.post(`/profile/`, {
      name: addProfile.name,
      role: addProfile.role,
      email: addProfile.email,
      pin: addProfile.pin,
      birthdate: addProfile.birthdate,
      score: 0,
      account_id: state.user.id,
    });
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      typeof axiosError.response?.data === 'string'
        ? axiosError.response?.data
        : "Erreur lors de l'ajout d'un profil";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const actionUpdateRole = createAsyncThunk<
  UpdateRoleResponse,
  UpdateRolePayload
>('profile/UPDATE_PROFILE_ROLE', async ({ id, role }, thunkAPI) => {
  try {
    const response = await axiosInstance.patch(`/profile/${id}`, {
      role,
    });
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(
      axiosError.response?.data || 'Erreur de modification'
    );
  }
});

export default { actionDeleteProfile, actionUpdateProfile, actionUpdateRole };
