import React, { useEffect, useState } from 'react';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
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
        console.log(token)
        setUserSession(token, JSON.stringify(user));
        navigate('/dashboard');        
      })
    }
  }, [])
  
  const redirectURL = async () => {
    const url = await getGoogleLoginUrl().then(res =>{
      window.location.replace(res.data.url);
    });
  }

  const handleLoginCallback = (e) => {
    e.preventDefault();
    redirectURL();
  }

  return (
      // <button onClick={handleLoginCallback}> Sign In With Google </button>
      <GoogleLogin
      ux_mode='popup' // not working
      shape='pill'
      theme='filled_blue'
      size='large'
      onSuccess={credentialRes => { console.log(credentialRes) }}
      onError={() => console.log("Login Failed")}
    />
  );

};

export default GoogleAuthLogin;
