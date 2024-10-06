import { createAction, createReducer } from '@reduxjs/toolkit';
import actionCheckLogin from '../thunks/checkLogin';
import { UserStateI } from '../../@types/userStateI';
import actionCheckSignup from '../thunks/checkSignup';

export const initialState: UserStateI = {
  id: null,
  logged: false,
  foyer: 'ma maison',
  credentials: {
    login: {
      emailSignin: '',
      passwordSignin: '',
    },
    signup: {
      email: '',
      password: '',
      passwordConfirm: '',
      firstname: '',
      lastname: '',
    },
  },
  pseudo: null,
  token: null,
  error: null,
};

export const actionChangeCredentialsSignin = createAction<{
  name: 'emailSignin' | 'passwordSignin';
  value: string;
}>('user/CHANGE_CREDENTIAL_SIGNIN');

export const actionChangeCredentialsSignup = createAction<{
  name: 'email' | 'password' | 'passwordConfirm' | 'firstname' | 'lastname';
  value: string;
}>('user/CHANGE_CREDENTIAL_SIGNUP');

export const actionLogout = createAction('user/LOG_OUT');

export const actionChangePinErrorMessage = createAction(
  'user/CHANGE_ERROR_MESSAGE'
);

export const actionResetErrorMessage = createAction('user/RESET_ERROR_MESSAGE');

export const actionResetCredential = createAction('user/RESET_CREDENTIAL');

// jwt & pseudo: prorpiétés
export const actionLogin = createAction<{
  jwt: string;
  id: number;
}>('user/LOGIN');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionChangeCredentialsSignin, (state, action) => {
      state.credentials.login[action.payload.name] = action.payload.value;
    })
    .addCase(actionChangeCredentialsSignup, (state, action) => {
      (state.credentials.signup[action.payload.name] as string) =
        action.payload.value;
    })
    .addCase(actionChangePinErrorMessage, (state) => {
      state.error = 'Pin incorrecte';
    })
    .addCase(actionResetErrorMessage, (state) => {
      state.error = null;
    })
    .addCase(actionResetCredential, (state) => {
      state.credentials.login.emailSignin = '';
      state.credentials.login.passwordSignin = '';
      state.credentials.signup.email = '';
      state.credentials.signup.password = '';
      state.credentials.signup.passwordConfirm = '';
      state.credentials.signup.firstname = '';
      state.credentials.signup.lastname = '';
    })
    .addCase(actionLogout, (state) => {
      state.logged = false;
      state.pseudo = null;
    })
    .addCase(actionLogin, (state, action) => {
      state.logged = true;
      state.id = action.payload.id;
      state.token = action.payload.jwt;
      state.error = null;
    })
    .addCase(actionCheckLogin.fulfilled, (state, action) => {
      state.logged = true;
      state.id = action.payload.account.id;
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(actionCheckLogin.rejected, (state) => {
      state.error = 'Identifiant ou mot de passe inccorect';
    })
    .addCase(actionCheckSignup.fulfilled, (state, action) => {
      state.error = null;
    })
    .addCase(actionCheckSignup.rejected, (state, action) => {
      if (typeof action.payload === 'object' && action.payload !== null) {
        const { message } = action.payload as { message: string };
        if (typeof message === 'string') state.error = message;
      }
    });
});

export default userReducer;
