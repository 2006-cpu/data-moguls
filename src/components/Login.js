import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { logIn } from '../api';
import './Components.css';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  const handleLogin = async (event) => {

    try {
      event.preventDefault();
      const data = await logIn(username, password);

      if (data) {
        setUser(data.user);
        setToken(data.token);
        alert(data.message);
      } else {
        alert(data.message);
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
