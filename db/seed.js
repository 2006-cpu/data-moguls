
const client = require('./index');
const { rebuildDB } = require('./init_db')

rebuildDB()
    .catch(console.error)
    .finally(() => client.end());
