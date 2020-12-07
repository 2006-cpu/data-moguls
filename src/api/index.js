
import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function signUp(username, password, firstName, lastName, email, imageURL, isAdmin) {

  try {
    const { data } = await axios.post(`/api/users/register`, { username, password, firstName, lastName, email, imageURL, isAdmin },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    localStorage.setItem('data.token', data.token)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logIn(username, password) {

  try {

    const { data } = await axios.post(`/api/users/login`, { username, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUserByUsername(token) {

  try {
    const { data } = await axios.get(`/api/users/me`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }}
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const { data } = await axios.get(`/api/products/${id}`);

    return data;
  } catch (error) {
    throw error;
  };
};

export async function getAllProducts() {
  try {
    const { data } = await axios.get('/api/products');

    return data;
  } catch (error) {
    throw error;
  };
};

export async function getOrderById(id) {
  try {
    const { data } = await axios.get(`/api/orders/${id}`);

    return data;
  } catch (error) {
    throw error;
  };
};

export async function getAllOrders() {
  try {
    const { data } = await axios.get('/api/orders');

    return data;
  } catch (error) {
    throw error;
  };
};

export async function getUserOrdersById(id, token){
  try {
    const { data } = await axios.get(`/api/users/${id}/orders`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }}
    );
    
    return data;
  } catch (error) {
    throw error;
  };
};

export async function getUsersCart(token){
  try {
    const { data } = await axios.get(`/api/orders/cart`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }});
    return data;
    
  } catch (error) {
    throw error;
  };
};



