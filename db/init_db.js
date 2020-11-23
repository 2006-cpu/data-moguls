// code to build and initialize DB goes here
const {
  client,
  createProduct,
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByUser,
  getOrderByProduct,
  getCartByUser
  // other db methods 
} = require('./index');

async function dropTables() {

  console.log('Dropping All Tables..');
  try {

    await client.query(`
        DROP TABLE IF EXISTS order_products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users
      `);
  } catch (error) {
    throw error;
  }
}

async function buildTables() {

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
          "datePlaced" DATE DEFAULT CURRENT_DATE
        );
        CREATE TABLE order_products (
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "orderId" INTEGER REFERENCES orders(id),
          price INTEGER NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 0
        );      
      `);
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    await client.query(`
      INSERT INTO users("firstName", "lastName", email, username, password)
      VALUES ('Tommy-da-boi', 'Smith', 'tommy93@gmail.com', 'tsmith', 'tomtom')
      RETURNING *;
    `);
  } catch (error) {
    throw error;
  };
  /* console.log('Starting to create users...');
  try {

    const usersToCreate = [
      { username: 'Tommy-da-boi', password: 'tomtom' },
      { username: 'Turtles', password: 'turtleTime' },
      { username: 'Sandy', password: 'sandyBeach' },
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  } */
}

async function createInitialProducts() {
  try {

    const productsToCreate = [
      { name: 'beer', description: 'its tasty', price: 2000, imageURL: '', inStock: 'yes', category: 'IPA' },

    ]
    const createTheProducts = await Promise.all(productsToCreate.map(createProduct));
    console.log('product created')
    console.log(createTheProducts)
    console.log('Finished creating products!')
  } catch (error) {
    throw error;
  };
};

async function createInitialOrders() {
  try {
    const ordersToCreate = [
      {userId: 1, datePlaced: "2020-11-23", status: 'created'}
    ]

    const createTheOrders = await Promise.all(ordersToCreate.map(createOrder));
    console.log("Orders created.");
    console.log(createTheOrders);
    console.log('Finished creating orders!');
  } catch (error) {
    throw error;
  };
};

async function createInitialOrderProducts(){
  try {
    await client.query(`
      INSERT INTO order_products("productId", "orderId", price, quantity)
      VALUES (1, 1, 2000, 1);
    `);
  } catch (error) {
    throw error;
  };
};

async function testingMyFunctions(){
  try {
    console.log("TESTING FUNCTIONS...")
    const allOfTheOrders = await getAllOrders();
    const orderWithId1 = await getOrderById({id: 1});
    const getOrderByUsername = await getOrderByUser({username: "tsmith"}) ;
    const productOrderByProduct = await getOrderByProduct({id: 1});
    const cart = await getCartByUser({id: 1});

    console.log("THIS should be all of the orders", allOfTheOrders);
    console.log("This should be orders with id 1", orderWithId1);
    console.log("THIS HSOULD BE thoms order", getOrderByUsername);
    console.log("THIS SHOULD BE order_products for product 1", productOrderByProduct);
  } catch (error) {
    throw error;
  };
};

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialOrders();
    await createInitialOrderProducts();
    await testingMyFunctions();
    client.end();
  } catch (error) {
    console.log('error durring rebuildDB');
    throw error;
  };
};

rebuildDB();