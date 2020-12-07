
const { client } = require('./client');
const { createOrderProduct } = require('./orderProducts');
const { createOrder, getOrdersByUser } = require('./orders');
const { createProduct } = require('./products')
const { createUser } = require('./users')

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
          "datePlaced" DATE NOT NULL DEFAULT CURRENT_DATE
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
  console.log('Starting to create users...');
  try {

    const usersToCreate = [
      { username: 'Tommy-da-boi', password: 'tomtom', firstName: 'Tom', lastName: 'Smith', email: "tommy93@gmail.com", isAdmin: 'false' },
      { username: 'Turtles', password: 'turtleTime', firstName: 'Bob', lastName: 'Rodgers', email: "turtle@gmail.com", isAdmin: 'false' },
      { username: 'Sandy', password: 'sandyBeach', firstName: 'Sandra', lastName: 'Beach', email: "sandy@gmail.com", isAdmin: 'false' },
      { username: 'BigBoss', password: 'bigboss123', firstName: 'Big', lastName: 'Boss', email: "bigboss@gmail.com", isAdmin: 'true' },
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}



async function createInitialProducts() {
  try {

    const productsToCreate = [

      { name: 'AleSmith San Diego Pale Ale .394',
      description: 'AleSmith dialed in the recipe resulting in an extremely drinkable 6% ABV Pale Ale with light bitterness and accentuated hoppiness designed to fill the gap between AleSmith X Extra Pale Ale and AleSmith IPA. This San Diego Pale Ale will showcase abundant piney and citrusy hop aroma and flavor from an intense dry-hopping schedule. A balanced malt profile will round out these hoppy flavors with a biscuity finish to enhance drinkability throughout the innings. (12 oz. can).',
      imageURL: '/assets/image001.jpeg',
      price: 499,
      inStock: true,
      category: 'Pale Ale - American' },

      { name: 'Berryessa Freshie Pale Ale',
      description: 'Pours a golden amber with a thick beige head and a fruity spice aroma. A strong malt base melds the fruitiness from the wet hops only available harvest season. (12 oz. can).',
      imageURL: '/assets/image002.jpg',
      price: 599,
      inStock: true,
      category: 'Pale Ale - American' },

      { name: 'Pizza Port Chronic Ale',
      description: 'Historically brewed with hemp seeds, Chronic Ale has been a staple at Pizza Port for over a decade! This mellow amber ale is the most popular beer in all of our pub locations as it agrees with everyone’s palate and goes great with pizza. It was a dream come true to finally put it in a can and give people the chance to carry it with them wherever they go! (12 oz. can).',
      imageURL: '/assets/image003.png',
      price: 499,
      inStock: true,
      category: 'Amber Ale - American' },

      { name: 'Garage Imperial Oatmeal Brown Ale - Barrel Aged',
      description: 'This out of the ordinary Imperial Brown Ale is darker in color than a typical brown ale, and it features toasty, nutty and light vanilla notes. (22 oz. bottle).',
      imageURL: '/assets/image004.jpeg',
      price: 1299,
      inStock: true,
      category: 'Brown Ale - American' },

      { name: 'Almanac Hypernova Volume IV',
      description: 'A snapshot of stone fruit season from the Californian Central Valley. Every summer, Blossom Bluff Orchards provides us with a bounty of fruit at its peak ripeness. For this beer, we really wanted to emphasize the flavors of ripe apricots and nectarines. A small addition of vanilla and lactose rounds out the mouthfeel and magnifies the aromas into intense notes of candied peaches. This barrel-aged lightly tart beer has more stone fruit than we’ve ever used in ANY BEER WE HAVE EVER MADE—and our hope is that it reminds you of the very best of what summer has to offer. (16 oz. can).',
      imageURL: '/assets/image005.jpg',
      price: 799,
      inStock: true,
      category: 'Barrel-aged Beer - American' },

      { name: 'Amplified Ale Works Midnigh Barrel-Aged Baltic',
      description: 'A barrel-aged baltic porter. (22 oz. bottle).',
      imageURL: '/assets/image006.jpg',
      price: 1299,
      inStock: true,
      category: 'Barrel-aged Beer - American' },

      { name: 'Cascade Encyclopedia Botanica Blonde Ale',
      description: 'A barrel aged blond ale with elderflowers, orange peel, juniper berries and botanical spices. (8.4 oz. can).',
      imageURL: '/assets/image007.jpg',
      price: 799,
      inStock: true,
      category: 'Barrel-aged Blonde Ale - American' },

      { name: 'Anderson Valley Huge Arker Barrel Aged Imperial Stout',
      description: 'True to its Boontling moniker, “Huge Arker” is a massive force of nature that detonates on your tongue. After primary fermentation, the beer is aged in Wild Turkey® Bourbon barrels until it fully matures. The deep mahogany color is evocative of the opulence to follow. Dark luscious aromas of burnished oak mingle with candy sugar, bourbon and hearth-baked bread. The luxurious flavors redolent of honey and molasses are intertwined with the richness of dark chocolate and the ardent warmth of alcohol, underpinned with hints of coffee, vanilla and dark fruits. (12 oz. can).',
      imageURL: '/assets/image008.jpg',
      price: 599,
      inStock: true,
      category: 'Barrel-aged Stout - American' },

      { name: 'Abnormal Real American Dry Hopped Lager',
      description: 'Dry-hopped with Yakima Chief Hops "Veterans Day Blend" featuring Simcoe, Loral, Ahtanum, Ekuanot and HBC 472. (16 oz. can).',
      imageURL: '/assets/image009.jpg',
      price: 499,
      inStock: true,
      category: 'Lager - American' },

      { name: 'Black Plague Silo Surfer Lager',
      description: 'Silo Surfer Lager: A light, refreshing lager brewed with Southern Cross and Mandarina Bavaria hops. The aroma awakens pipe dreams fresh cut limes, gooseberry and black current while citus notes of tangerine and lemon zest surf over your tastebuds! (12 oz. can).',
      imageURL: '/assets/image010.jpg',
      price: 499,
      inStock: true,
      category: 'Lager - American' },

      { name: 'Beachwood Hayabusa',
      description: 'Hayabusa is an ultra-crisp and refreshing Japanese-style lager made with American barley, Canadian pilsner, toasted flaked rice and German Hallertau Mittelfruh. (12 oz. can).',
      imageURL: '/assets/image011.jpeg',
      price: 499,
      inStock: true,
      category: 'Lager - American' },

      { name: 'Barrel Brothers Crushables Lunchtime Lager',
      description: 'Crisp, crushable lunchtime light lager. (16 oz. can).',
      imageURL: '/assets/image012.jpg',
      price: 499,
      inStock: true,
      category: 'Lager - American' },

      { name: 'Brouwerij West Popfuji Pilsner',
      description: 'Our take on the historic Kellerbier, Popfuji Unfiltered Pilsner delivers a delicate malt sweetness combined with a subtle fruit and spice character from the use of German Noble Hops. Unlike the typical Pilsner, however, Popfuji\'s uniqueness is in it\'s smooth, creamy texture, making it perfect for any occasion. (16 oz. can).',
      imageURL: '/assets/image013.jpg',
      price: 499,
      inStock: true,
      category: 'Pilsner - German' },

      { name: 'Burning Beard Normcore Pilsner',
      description: 'A Czech-style pilsner. (16 oz. can).',
      imageURL: '/assets/image014.jpg',
      price: 599,
      inStock: true,
      category: 'Pilsner - Czech' },

      { name: 'Fort Point Sfizio Pilsner',
      description: 'Sfizio is an Italian Style Pilsner with a snappy, cracker-like malt body and a tantalizingly bitter finish. This modern approach to pilsner is hopped as generously as an American IPA, but with Noble hop varieties that are more delicate than their American counterparts. Heaps of Hallertau Mittelfrüh and Aurora hops create fragrant notes of pine and eucalyptus as lively as a zip around San Francisco\'s rolling city streets. (12 oz. can).',
      imageURL: '/assets/image015.jpg',
      price: 499,
      inStock: true,
      category: 'Pilsner - Italian' },

      { name: 'Maui Pau Hana Pilsner',
      description: 'European Pilsner malt offers sweetness balanced by a spicy hop profile. (12 oz. can).',
      imageURL: '/assets/image016.jpeg',
      price: 499,
      inStock: true,
      category: 'Pilsner - Czech' },

      { name: 'Clown Shoes Pecan Pie Porter',
      description: 'Genghis Pecan rules with an iron fist.  He conquers all that he surveys. But he also is a strategic genius. Genghis plans his meals weeks and weeks ahead so that he arrives at the Clown Shoes Pecan Pie Eating Contest ravenous and ready for another conquest. A seasonal favorite to go alongside a classic dessert, Pecan Pie Porter puts sweet dessert flavors inside a full-bodied and robust porter. (16 oz. can).',
      imageURL: '/assets/image017.jpeg',
      price: 499,
      inStock: true,
      category: 'Porter - American' },

      { name: 'Garage Piston Pumpkin Porter',
      description: 'Decadent and satisfying Pump-Kin Spiced Porter will get you rev\'d up since the winter season is just around the corner. (12 oz. can).',
      imageURL: '/assets/image018.jpeg',
      price: 499,
      inStock: true,
      category: 'Porter - American' },

      { name: 'Deschutes Black Butte Porter',
      description: 'This is the beer that started it all. A delicate, creamy mouthfeel contrasts with layered depth revealing distinctive chocolate and coffee notes. Dark and rich, yet easy to drink. (12 oz. bottle).',
      imageURL: '/assets/image019.jpeg',
      price: 499,
      inStock: true,
      category: 'Porter - American' },

      { name: 'Pizza Port Bacon and Eggs',
      description: 'With award-winning cold-pressed coffee from Bird Rock Roasters of La Jolla, this Coffee Porter is black in color with a khaki tan head. Strong coffee flavors with rich chocolate and roasted malts. (16 oz. can).',
      imageURL: '/assets/image020.jpg',
      price: 499,
      inStock: true,
      category: 'Porter - American' },

      { name: 'Castro Valley Honey Ale',
      description: 'From the historic Castro Valley Brewery in Northern California comes their latest offering. Light, refreshing and perfect for those hot summer nights by the lake. (16 oz. can).',
      imageURL: '/assets/defaultimage.jpg',
      price: 599,
      inStock: true,
      category: 'Honey Ale - American' },

      { name: 'Sonoma Valley Wheat Ale',
      description: 'The Sonoma Valley is usually known for its wine. But from rolling hills of wine country in Northern California comes their latest offering. Use it as a substitue for Chardonnay. Exquisite! (12 oz. can).',
      imageURL: '/assets/defaultimage.jpg',
      price: 699,
      inStock: true,
      category: 'Wheat Ale - American' },

      { name: 'Sonoma Valley Wheat Ale',
      description: 'The Sonoma Valley is usually known for its wine. But from rolling hills of wine country in Northern California comes their latest offering. Use it as a substitue for Chardonnay. Exquisite! (12 oz. can).',
      imageURL: '/assets/defaultimage.jpg',
      price: 699,
      inStock: false,
      category: 'Wheat Ale - American' },

    ]

    const createTheProducts = await Promise.all(productsToCreate.map(createProduct));
    console.log('product created')
    console.log(createTheProducts)
    console.log('Finished creating products!')
  } catch (error) {
    throw error;
  }
}

async function createInitialOrders(){
  console.log('Starting to create orders...');

  const ordersToCreate = [
    {userId: 2, status: 'created'}, {userId: 1, status: 'created'}, {userId: 3, status: 'created'}, {userId: 2, status: 'cancelled'}, {userId: 1, status: 'completed'}, {userId: 3, status: 'completed'}
  ];

  try {
    const orders = await Promise.all(ordersToCreate.map(createOrder));
    console.log('Orders created:');
    console.log(orders);
    console.log('Finished creating orders!');
  } catch (error) {
    console.error('Error creating orders!')
    throw error;
  };
};

async function createInitialOrderProducts(){
  const orderProductsToCreate = [
    {productId: 1, orderId: 1, price: 499, quantity: 1},
    {productId: 4, orderId: 1, price: 1299, quantity: 1},
    {productId: 5, orderId: 2, price: 799, quantity: 1},
    {productId: 4, orderId: 2, price: 1299, quantity: 1},
    {productId: 1, orderId: 3, price: 998, quantity: 1},
    {productId: 1, orderId: 3, price: 499, quantity: 1},
    {productId: 9, orderId: 4, price: 998, quantity: 2},
    {productId: 4, orderId: 4, price: 1299, quantity: 1},
    {productId: 13, orderId: 5, price: 499, quantity: 1},
    {productId: 7, orderId: 5, price: 799, quantity: 1},
    {productId: 7, orderId: 6, price: 799, quantity: 1},
    {productId: 14, orderId: 6, price: 599, quantity: 1}
  ]
  try {
    
    const orderProducts = await Promise.all(orderProductsToCreate.map(createOrderProduct));
    console.log('Order products created:');
    console.log(orderProducts);
    console.log('Finished creating order products!');
  } catch (error) {
    throw error;
  };
};

/* async function testDb () {
  try {
    const orders = await getOrdersByUser(2);

    console.log("THESEA RE USER 1 orders", orders);
  } catch (error) {
    throw error;
  };
}; */

async function rebuildDB() {
  try {
    client.connect();
    /* await testDb(); */
    await dropTables();
    await buildTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialOrders();
    await createInitialOrderProducts();
    client.end();
  } catch (error) {
    console.log('error durring rebuildDB')
    throw error;
  };
};

rebuildDB();
