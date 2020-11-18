// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log('Dropping All Tables..');
    try {
      await client.query(`
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users
      `);
    } catch (error) {
      throw error;
    };

    // build tables in correct order
    console.log('Starting to build tables...');
    try {
      await client.query(`
        CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          "firstName" VARCHAR(255) NOT NULL,
          "lastName" VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL, 
          "imageURL" VARCHAR(255) DEFAULT 'imageUrl',  
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) UNIQUE NOT NULL,
          "isAdmin" BOOLEAN DEFAULT false NOT NULL  
        );
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          price INTEGER NOT NULL,
          "imageURL" VARCHAR(255) DEFAULT 'imageUrl goes here',
          "inStock" BOOLEAN NOT NULL DEFAULT false,
          category VARCHAR(255) NOT NULL
        );
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          status VARCHAR(255) DEFAULT 'created',
          "userId" INTEGER REFERENCES users(id),
          "datePlaced" DATE NOT NULL DEFAULT CURRENT_DATE
        );
      `);
    } catch (error) {
      throw error;
    };
  } catch (error) {
    throw error;
  };
};

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());