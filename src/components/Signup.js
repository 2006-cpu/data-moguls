import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signUp } from '../api';
import './Styles.css';

export default function Signup() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignUp = async (event) => {

    try {
      event.preventDefault();
      const data = await signUp(username, password, firstName, lastName, email, imageURL, isAdmin);

      if (data && data.user) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (<>
    <div className='signup'>
      <div>
        <form
          className='signup-card'
          onSubmit={handleSignUp}>
          <h2>Sign Up Form</h2>
          <label>Username: </label>
          <input type="text" value={username} onChange={(event) => {
            setUsername(event.target.value)
          }} />
          <label>Password: </label>
          <input type="password" value={password} onChange={(event) => {
            setPassword(event.target.value)
          }} />
          <label>First Name: </label>
          <input type="text" value={firstName} onChange={(event) => {
            setFirstName(event.target.value)
          }} />
          <label>Last Name: </label>
          <input type="text" value={lastName} onChange={(event) => {
            setLastName(event.target.value)
          }} />
          <label>Email Address: </label>
          <input type="text" value={email} onChange={(event) => {
            setEmail(event.target.value)
          }} />
          <button type="submit" >SIGN UP</button>
          <NavLink to='/login' className='button'>LOGIN HERE</NavLink>
        </form>
      </div>
    </div>
  </>)
};
