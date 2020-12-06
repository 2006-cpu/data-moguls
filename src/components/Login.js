import React, { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { storeCurrentUser, storeCurrentToken, getCurrentToken } from '../auth';
import { logIn } from '../api';
import './Styles.css';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [redirctTo, setRedirctTo] = useState(false);

  const handleLogin = async (event) => {

    try {
      event.preventDefault();
      const data = await logIn(username, password);

      if (data) {
        setUser(data.username);
        setToken(data.token);
        storeCurrentToken(data.token);
        storeCurrentUser(data.username);
        window.location.reload();
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (() => {
      if (token || getCurrentToken()) {
        setRedirctTo(true);
      }
    })();
  });

  if (redirctTo) {
    return <Redirect to='/users/me' />
  } else {

    return (<>
      <div className='login'>
        <div>
          <form
            className='login-card'
            onSubmit={handleLogin}>
            <h2>Log In Form</h2>
            <label>Username: </label>
            <input type="text" value={username} onChange={(event) => {
              setUsername(event.target.value)
            }} />
            <label>Password: </label>
            <input type="password" value={password} onChange={(event) => {
              setPassword(event.target.value)
            }} />
            <button type="submit" >LOG IN</button>
            <NavLink to='/signup' className='button'>SIGNUP HERE</NavLink>
          </form>
        </div>
      </div>
    </>)
  }
};
