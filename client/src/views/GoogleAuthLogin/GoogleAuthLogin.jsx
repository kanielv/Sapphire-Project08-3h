import React, { useEffect, useState } from 'react';

import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { setUserSession } from '../../Utils/AuthRequests';
import { getCurrUser } from '../../Utils/userState';
import axios from 'axios';

const GoogleAuthLogin = () => {
  const [tokenClient, setTokenClient] = useState({});

  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
  const SCOPES = `https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/userinfo.profile`

  useEffect(() => {
    const google = window.google;

    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleLoginCallback
    });

    // token client
    setTokenClient(
      google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
          console.log(tokenResponse);
        }
      })
    )

    google.accounts.id.prompt();    
  }, []);

  const handleLoginCallback = (credentialsObj) => {
    // console.log(credentialsObj)
    tokenClient.requestAccessToken();
  }

  return (
    <div style={{ background: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLogin onSuccess={credentialsObj => handleLoginCallback(credentialsObj)} onError={() => console.log("Login Failed")} />
      </GoogleOAuthProvider>
    </div >

  );
};

export default GoogleAuthLogin;
