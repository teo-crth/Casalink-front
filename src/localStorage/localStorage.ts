import { MemberStateI } from '../@types/memberStateI';
import { removeTokenJwtToAxiosInstance } from '../axios/axios';

export function addTokenAndPseudoToLocalStorage(token: string) {
  localStorage.setItem('jwt', token);
}

export function addProfileToLocalStorage(profile: MemberStateI) {
  const profileString = JSON.stringify(profile);
  localStorage.setItem('profile', profileString);
}

export function getTokenAndPseudoFromLocalStorage() {
  const jwt = localStorage.getItem('jwt');
  return { jwt };
}

export function getProfileFromLocalStorage() {
  const profile = localStorage.getItem('profile');
  if (profile !== null) {
    const profileOject = JSON.parse(profile);
    return profileOject;
  }
  return null;
}

export function disconnectLocalStorage() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('profile');
  removeTokenJwtToAxiosInstance();
}

export function disconnectProfileLocalStorage() {
  localStorage.removeItem('profile');
}
