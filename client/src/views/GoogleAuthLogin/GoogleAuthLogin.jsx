import React from 'react';

import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuthLogin = () => {

  return (
    <div style={{ background: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID} >
        <GoogleLogin onSuccess={credentialRes => { console.log(credentialRes) }} onError={() => console.log("Login Failed")} />
      </GoogleOAuthProvider>
    </div >

  );
};

export default GoogleAuthLogin;
