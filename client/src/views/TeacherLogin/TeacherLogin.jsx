import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { postUser, setUserSession } from '../../Utils/AuthRequests';
import { getGoogleLoginUrl, GoogleUserGetProfile } from '../../Utils/GoogleAuthRequests';
import './TeacherLogin.less';
import { getCurrUser } from '../../Utils/userState';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


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

  // TODO MOVE TO GOOGLE AUTH
  const redirectURL = async () => {
    const url = await getGoogleLoginUrl().then(res => {
      window.location.replace(res.data.url);
    });
  }
  const handleGoogleLogin = async (e) => {
    e.preventDefault()
    setLoading(true);
    const url = await getGoogleLoginUrl();
    window.location.replace(url.data.url);
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
                ux_mode='popup' // not working
                shape='pill'
                theme='filled_blue'
                size='large'
                onSuccess={credentialRes => { console.log(credentialRes) }}
                onError={() => console.log("Login Failed")}
              />
            </GoogleOAuthProvider>
          </div>


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
