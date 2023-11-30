import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { postUser, setUserSession } from '../../Utils/AuthRequests';
import { setGoogleUserSession } from '../../Utils/GoogleAuthRequests';
import { getGoogleLoginUrl, GoogleUserGetProfile } from '../../Utils/GoogleAuthRequests';
import './TeacherLogin.less';
import { getCurrUser } from '../../Utils/userState';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';



const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default function TeacherLogin() {
  const email = useFormInput('');
  const password = useFormInput('');
  const [loading, setLoading] = useState(false);
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async (code) => {
      return await GoogleUserGetProfile(code);
    }

    if (queryParams.get('code') !== null) {
      let userInfo = getUser(queryParams.get('code')).then(data => {
        let user = data.data.user;
        let token = data.data.token;
        console.log(data)
        console.log(token)
        setUserSession(token, JSON.stringify(user));
        console.log(getCurrUser())
        navigate('/dashboard');
      })
    }
  }, [])

  const handleLogin = () => {
    setLoading(true);
    let body = { identifier: email.value, password: password.value };

    postUser(body)
      .then((response) => {
        setUserSession(response.data.jwt, JSON.stringify(response.data.user));
        setLoading(false);
        if (response.data.user.role.name === 'Content Creator') {
          navigate('/ccdashboard');
        } else if (response.data.user.role.name === 'Researcher') {
          navigate('/report');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setLoading(false);
        message.error('Login failed. Please input a valid email and password.');
      });
  };


  const handleCredential = async (res) => {
    const credential = res.credential
    const url = new URL("http://localhost:1337/api/google-auth-provider/initGoogleLogin/callback")
    url.searchParams.append('code', credential)
    const dataRes = await axios.get(url)
    setGoogleUserSession(dataRes.data.token, dataRes.data.gapi_token, JSON.stringify(dataRes.data.user));
    navigate('/dashboard');  
  }

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='content-wrapper'>
        <form
          id='box'
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleLogin();
          }}
        >
          <div id='box-title'>User Login</div>
          <input
            type='email'
            {...email}
            placeholder='Email'
            autoComplete='username'
          />
          <input
            type='password'
            {...password}
            placeholder='Password'
            autoComplete='current-password'
          />

          <p id='forgot-password' onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </p>

          <div className='google-sign-in'>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
              <GoogleLogin
                ux_mode='popup'
                shape='pill'
                theme='filled_blue'
                size='large'
                onSuccess={res => {handleCredential(res)}}
                onError={() => console.log("Login Failed")}
              />
            </GoogleOAuthProvider>
          </div>
      

          {/* <div style={{ background: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <button onClick={handleLoginCallback}> Sign In With Google </button>
          </div > */}

          <input
            type='button'
            value={loading ? 'Loading...' : 'Login'}
            onClick={handleLogin}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}
