import React, { useEffect, useState } from 'react';

import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getGoogleLoginUrl, GoogleUserGetProfile} from '../../Utils/GoogleAuthRequests';
import { setUserSession } from '../../Utils/AuthRequests'
import { useSearchParams } from 'react-router-dom';
import { getCurrUser } from '../../Utils/userState';
import { useNavigate } from 'react-router-dom';



const GoogleAuthLogin = () => {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async (code) => {
      return await GoogleUserGetProfile(code);
    }

    if(queryParams.get('code') !== null) {
      let userInfo = getUser(queryParams.get('code')).then(data => {
        let user = data.data.user;
        let token = data.data.token
        setUserSession(token, JSON.stringify(user));
        navigate('/dashboard');        
      })
    }
  }, [])

  const handleLoginCallback = async () => {
    const url = await getGoogleLoginUrl()
    console.log(url.data.url)
    console.log(window.location.replace(url.data.url))
  }

  return (
    <div style={{ background: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      <button onClick={handleLoginCallback}> Sign In With Google </button>
    </div >

  );
};

export default GoogleAuthLogin;
