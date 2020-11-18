const { client } = require('./index');

async function getProductById(id) {
    try {
        const {rows: [product]} = await client.query(`
            SELECT * FROM routines
            WHERE id=${id};
        `);

        return product;
    } catch (error) {
        throw error;
    };
};