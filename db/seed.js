
const {client} = require('./client');
const { rebuildDB } = require('./init_db')

rebuildDB()
    .catch(console.error)
    .finally(() => client.end());
