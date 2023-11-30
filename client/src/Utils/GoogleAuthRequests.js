import { server } from './hosts';
import { setUserState, getCurrUser } from './userState';
import axios from 'axios';


export const getGoogleLoginUrl = async () => {
    const url = await axios.get(`${server}/google-auth-provider/initGoogleLogin`);
    return url;
}

export const GoogleUserGetProfile = async (code) => {
    const url = new URL("http://localhost:1337/api/google-auth-provider/initGoogleLogin/callback");
    url.searchParams.append('code', code);
    const dataRes = await axios.get(url);
    return dataRes;
}

export const getGapiToken = () => {
    return sessionStorage.getItem('gapiToken')
}

export const setGoogleUserSession = (jwt, gapi, user) => {
    sessionStorage.setItem('token', jwt);
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('gapiToken', gapi)
    setUserState(getCurrUser());
  };