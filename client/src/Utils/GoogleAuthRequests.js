import { server } from './hosts';
import { setUserState, getCurrUser } from './userState';
import { axios } from 'axios';

const GOOGLE_SERVER = 'https://classroom.googleapis.com/v1'

export const GoogleUserSetSession = (jwt, user) => {
    sessionStorage.setItem('token', jwt);
    sessionStorage.setItem('user', user);
    setUserState(getCurrUser());
}

export const GoogleUserGetProfile = (token) => {

}