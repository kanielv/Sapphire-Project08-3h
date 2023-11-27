import { server } from './hosts';
import { setUserState, getCurrUser } from './userState';
import axios from 'axios';


export const getGoogleLoginUrl = async () => {
    const url = await axios.get(`${server}/google-auth-provider/initGoogleLogin`);
    return url;
}

export const GoogleUserGetProfile = (token) => {

}