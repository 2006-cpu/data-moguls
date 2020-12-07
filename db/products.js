const { client } = require('./client');

async function createProduct({ name, description, price, imageURL, inStock, category }) {
  try {
    const { rows: [product] } = await client.query(`
            INSERT INTO products(name, description, price, "imageURL", "inStock", category)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, description, price, imageURL, inStock, category]);
    if (product.name === '' || product.description === '' || product.price === '' || product.imageURL === '' || product.inStock === '' || product.category === '') {
      next({
        name: "IncorrectFieldsError",
        message: "Missing one of the required fields to create product"
      })
    } else {
      return product;
    }
  } catch (error) {
    next(error);
  };
};

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
            SELECT * FROM products;
        `);

    return products;
  } catch (error) {
    throw error;
  };
};

async function getProductById(id) {
  try {
    const { rows: [product] } = await client.query(`
            SELECT * FROM products
            WHERE id = $1;
        `, [id]);

    return product;
  } catch (error) {
    throw error;
  };
};

const updateProduct = async ({ id, ...fields }) => {
  const fieldKeys = Object.keys(fields)
    .map((fieldName, index) => `"${fieldName}"=$${index + 1}`)
    .join(", ");

  const setValues = Object.values(fields);

  if (fieldKeys.length === 0) {
    return;
  }

  setValues.push(id);

  try {
    const {
      rows: [product],
    } = await client.query(
      `
            UPDATE products
            SET ${setString}
            WHERE id = $${setValues.length}
            RETURNING *;
        `,
      setValues
    );
    return product;
  } catch (error) {
    throw error;
  }
};

const destroyProduct = async ({ id }) => {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
    DELETE FROM order_products
    USING products
    WHERE products.id = order_products."productId"
    AND products.id = $1;
    DELETE FROM products
    WHERE products.id = $1
    RETURNING *;
    `,
      [id]
    );
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  updateProduct,
  destroyProduct,
  getAllProducts,
  getProductById,

}
