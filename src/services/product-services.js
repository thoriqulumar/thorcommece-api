const { nanoid } = require('nanoid');
const Product = require('../models/product');

const addProduct = async (req, res) => {
  try {
    const {
      title, description, price, stock,
    } = req.body;

    const id = nanoid(20);
    // check input
    if (!title || !description || !price || !stock) {
      return res.status(401).send({ message: 'missing required fields' });
    }

    const product = await Product.create({
      id,
      title,
      description,
      price,
      stock,
    });

    if (product) {
      return res.status(201).send({ message: 'product succesfully created' });
    }
    return res.status(500).send({ message: 'failed to create product' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.findAll();

    if (products) {
      return res.status(201).send({ data: products });
    }
    return res.status(500).send({ message: 'failed to get products' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      id, title, description, price, stock,
    } = req.body;

    // check input
    if (!id || !title || !description || !price || !stock) {
      return res.status(401).send({ message: 'missing required fields' });
    }

    const product = await Product.update({
      title, description, price, stock,
    }, {
      where: {
        id,
      },
    });

    if (product) {
      return res.status(201).send({ message: 'product succesfully updated' });
    }
    return res.status(500).send({ message: 'failed to update product' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const {
      id,
    } = req.body;

    // check input
    if (!id) {
      return res.status(401).send({ message: 'missing required fields' });
    }

    const product = await Product.destroy({
      where: {
        id,
      },
    });

    if (product) {
      return res.status(201).send({ message: 'product succesfully deleted' });
    }
    return res.status(500).send({ message: 'failed to delete product' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
