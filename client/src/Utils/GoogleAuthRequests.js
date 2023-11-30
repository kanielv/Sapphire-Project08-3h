import { server } from './hosts';
import { setUserState, getCurrUser } from './userState';
import axios from 'axios';


export const getGoogleLoginUrl = async () => {
    const url = await axios.get(`${server}/google-auth-provider/initGoogleLogin`);
    return url;
}

export const GoogleUserGetProfile = async (code) => {
    const user = await axios.get(`${server}/google-auth-provider/initGoogleLogin/callback?code=${code}`);
    return user;
}

export const getGapiToken = () => {
    return sessionStorage.getItem('gapi_token')
}

export const setGoogleUserSession = (jwt, gapi, user) => {
    sessionStorage.setItem('token', jwt);
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('gapiToken', gapi)
    setUserState(getCurrUser());
  };