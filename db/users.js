const { client } = require("./client");
const bcrypt = require("bcrypt");
const { getOrdersByUser } = require("./orders");
const SALT_COUNT = 10;

async function createUser({
    username,
    password,
    firstName,
    lastName,
    email,
    imageURL,
    isAdmin,
}) {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const {
            rows: [user],
        } = await client.query(
            `
        INSERT INTO users(username, password, "firstName", "lastName", email, "imageURL", "isAdmin") 
        VALUES($1, $2, $3, $4, $5, $6, $7) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
        `,
            [username, hashedPassword, firstName, lastName, email, imageURL, isAdmin]
        );
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUser({ username, password }) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
       SELECT *
       FROM users
       WHERE username=$1;
       `,
            [username]
        );
        const isAMatch = await bcrypt.compare(password, user.password);
        if (isAMatch) {
            delete user.password;
            return user;
        }
    } catch (error) {
        throw error;
    }
}

async function getAllUsers() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM users;
    `);
        delete user.password;
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getUserById(id) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
    SELECT *
    FROM users
    WHERE id = $1;
    `,
            [id]
        );
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUserByUsername(username) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
        SELECT *
        FROM users
        WHERE username=$1;
    `,
            [username]
        );
        
        if (!user) {
            return null;
        }

        const allOrders = await getOrdersByUser()

        return user;
    } catch (error) {
        throw error;
    }
}

async function updateUser(id, fields) {

    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    const setValues = Object.values(fields);
    setValues.push(id);


    if (setString.length === 0) {
        return;
    }

    try {
        const result = await client.query(`
        UPDATE users
        SET ${setString}
        WHERE id=$${setValues.length}
        RETURNING *;
      `, setValues);

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    updateUser,
};
