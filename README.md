KraftBier.com

KraftBier.com is an online e-commerce site, dedicated to offering specialty craft beers from all over the world. Kraftbier.com’s philosophy is to maintain quality of selection over a high quantity of product offerings.Kraftbier.com was developed utilizing the full technical stack.


Deployed URL

https://sleepy-plateau-79384.herokuapp.com/


The Tech Stack

Backend: Node.js, Express.js, PostgreSQL, JavaScript

The express server and all associated routing middleware are located in the root index.js file.  Database adapters are located in the db folder. All routes are located in the routes folder.

Frontend: React.js, CSS, JavaScript

The root React code starts in the src/index.js file. All React component files, as well as CSS style sheets can be located in the src/components folder. Additionally, all image files are located in the public/assets folder.


Project Structure

├── db
│   ├── client.js
│   ├── index.js
│   ├── init_db.js
│   ├── orderProducts.js
│   ├── orders.js
│   ├── products.js
│   └── users.js
├── .env
├── gitignore
├── index.js
├── package.json
├── package-lock.json
├── public
│   ├── assets
│   │   └── images.jpg
│   └── index.html
├── README.md
├── routes
│   ├── index.js
│   ├── orders.js
│   ├── products.js
│   ├── users.js
│   └── utils.js
└── src
    ├── api
    │   └── index.js
    ├── auth
    │   └── index.js
    ├── components
    │   ├── assets
    │   │   └── images.jpg
    │   ├── Allproducts.js
    │   ├── App.js
    │   ├── Footer.js
    │   ├── Header.js
    │   ├── index.js
    │   ├── Login.js
    │   ├── Navbar.js
    │   ├── Product.js
    │   ├── Signup.js
    │   ├── Singleorder.js
    │   ├── Styles.css
    │   └── User.js
    └── index.js

The top level index.js contains the Express Server configuration. This is responsible for setting up the API, starting the server, and connecting to the database.
 
Inside the db folder, resides the index.js which is responsible for creating all database connection functions. Additionally, the init_db.js file resides in the db folder, which is necessary for rebuilding PostgreSQL tables and seeding initial data. The database adapters are saved in appropriately named files, specific to their use. (users.js for users, products.js for products, etc.).
 
Inside the routes folder, resides the index.js, which is responsible for building the apiRouter, which is attached in the express server. This will build and direct all routes that the React front-end application will use to send/receive data via JSON. The routes are saved in appropriately named files, specific to their use. (users.js for users, products.js for products, etc.).
 
Inside the api folder, resides the index.js file. In this file are API calls that the front-end utilizes to fetch and retrieve data from the express server.
 
Finally, the public and src folders are specifically designed for use by React front-end. The public folder contains any static files necessary for the front-end, including image and html files. The src/components folder contains the React component source code, as well as accompanying CSS style sheets utilized by the front end.


Development

Run npm install to install all node modules.
 
Decide on a name for the local testing database, and edit db/index.js changing the value of DB_NAME.

Once a name has been decided, run createdb from the command line so it exists (and can be connected to).
 
In the terminal (or VSCode integrated terminal), run npm run server:dev to start the web server. In a second terminal navigate back to the local repo and run npm run client:dev to start the react server. Run npm run db:build which rebuilds the database, all the tables, and ensures that there is meaningful data present.

This is set up to run on a proxy, so that api calls can be made without needing absolute paths. Instead, axios.get('/api/posts') api calls can be run without needing to know the root URL.

Once both dev commands are running, development can commence. The server restarts utilizing `nodemon`, and the client restarts utilizing `react-scripts`.


Command Line Tools

In addition to client:dev and server:dev, db:build can be run in development in order to rebuild the database, the tables, and ensures that the database has been seeded with meaningful data.


Deployment 

Setting up Heroku (once):

```bash
heroku create hopeful-project-name

heroku addons:create heroku-postgresql:hobby-dev
```

This creates a Heroku project which will live at https://hopeful-project-name.herokuapp.com (note, you should change this to be relevant to your project).

It will also create a postgres database for you, on the free tier.

Deploying to Heroku:

Once the front-end has been developed and is ready for deployment, run git push heroku master. Note: the git repository has to be clean for this to work (which is why two git commands live as part of getting ready to deploy, above). This will send off the new code to heroku, will install the node modules on their server, and will run npm start, starting up the express server on Heroku.

If the database needs to be rebuilt on Heroku, it can be done with this command:

```bash
heroku run npm run db:build
```

This command is equivalent to the npm run db:build on the Heroku server. Once that command has run, type heroku open to get a browser to open up locally with the full-stack application running remotely.


Contributors

Austin Relerford, Leonel Lopez, Frank Silva and Dennis C. Castro. Their GitHub profiles can be viewed here:

Austin Relerford - https://github.com/Ajrelerford
Leonel Lopez - https://github.com/lionllopez
Frank Silva - https://github.com/frankjoesilva
Dennis C. Castro - https://github.com/dennisccastro

