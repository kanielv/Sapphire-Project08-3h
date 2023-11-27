import React, { useEffect, useState } from 'react';

import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getGoogleLoginUrl } from '../../Utils/GoogleAuthRequests';
import { useLinkClickHandler } from 'react-router-dom';


const GoogleAuthLogin = () => {

  const handleLoginCallback = async () => {
    const url = await getGoogleLoginUrl()
    console.log(window.location.replace(url.data.url))
    // window.location.replace(url)
  }

  return (
    <div style={{ background: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      <button onClick={handleLoginCallback}> Sign In With Google </button>
    </div >

  );
};

export default GoogleAuthLogin;
