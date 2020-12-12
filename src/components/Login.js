import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { storeCurrentUser, storeCurrentToken } from '../auth';
import { logIn, getUserByUsername } from '../api';
import './Styles.css';

export default function Login({ token, setUser, setToken, setOrders }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});
  const history = useHistory();

  const handleLogin = async (event) => {

    try {
      event.preventDefault();
      const data = await logIn(username, password);

      if (data && data.message === 'You are logged in!') {
        const userInfo = await getUserByUsername(data.token);

        setUser(userInfo);
        setToken(data.token);

        storeCurrentToken(data.token);
        storeCurrentUser(data.username);

        setAlert(data);
        setTimeout(function(){ history.push('/users'); }, 2000);
      } else {
        setAlert(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (<>
    <div className='login'>
      <div>
        <form
          className='login-card'
          onSubmit={handleLogin}>
          <div className='alert'>{alert.message}</div>
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
};
