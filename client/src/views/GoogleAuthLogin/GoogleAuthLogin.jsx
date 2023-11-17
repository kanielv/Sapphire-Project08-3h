import React from 'react';
import './GoogleAuthLogin.less';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID=import.meta.env.VITE_CLIENT_ID;

const GoogleAuthLogin = () => {

  return (
    <button className='google-sign-in'>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLogin
        ux_mode='popup' // not working
        shape='pill'
        theme='filled_blue'
        size='large'
        onSuccess={credentialRes => { console.log(credentialRes) }}
        onError={() => console.log("Login Failed")} 
        />
      </GoogleOAuthProvider>
    </button>
  );

};

export default GoogleAuthLogin;
