import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
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




