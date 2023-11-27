import React, { useEffect, useState } from 'react';

import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getGoogleLoginUrl } from '../../Utils/GoogleAuthRequests';

const GoogleAuthLogin = () => {

  const handleLoginCallback = async () => {
    const url = await getGoogleLoginUrl()
    console.log(url)
  }

  return (
    <div style={{ background: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      <button onClick={handleLoginCallback}></button>
    </div >

  );
};

export default GoogleAuthLogin;
