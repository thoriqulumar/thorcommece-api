const { nanoid } = require('nanoid');
const Product = require('../models/product');

const addProduct = async (req, res) => {
  try {
    const {
      productName, description, price, quantity, categoryId, brandId,
    } = req.body;

    const id = `product-${nanoid()}`;
    // check input
    if (!productName || !categoryId || !brandId) {
      return res.status(401).send({ status: 'failed', message: 'missing required fields' });
    }

    const product = await Product.create({
      id,
      product_name: productName,
      description,
      price,
      quantity,
      category_id: categoryId,
      brand_id: brandId,
    });

    return res.status(201).send({ status: 'success', message: 'product succesfully created', data: product });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll();

    return res.status(200).send({ status: 'success', data: products });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ where: { id: productId } });

    return res.status(200).send({ status: 'success', data: product });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      productName, description, price, quantity, categoryId, brandId,
    } = req.body;

    // check input
    if (!productName || !categoryId || !brandId) {
      return res.status(401).send({ status: 'failed', message: 'missing required fields' });
    }

    await Product.update({
      product_name: productName,
      description,
      price,
      quantity,
      category_id: categoryId,
      brand_id: brandId,
    }, {
      where: {
        id: productId,
      },
    });

    return res.status(201).send({ status: 'success', message: 'product succesfully updated' });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    await Product.destroy({
      where: {
        id: productId,
      },
    });

    return res.status(200).send({ status: 'success', message: 'product succesfully deleted' });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const uploadProductImage = async (req, res) => {
  try {
    const { productId } = req.params;

    const localPath = req.file.path;
    const path = localPath.split('\\');

    const imagePath = `/uploads/products/${path[2]}`;

    await Product.update({
      img_product: imagePath,
    }, {
      where: {
        id: productId,
      },
    });
    return res.status(201).send({ status: 'success', message: 'image product succesfully uploaded' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).send({
        message: 'Only image files are allowed!',
      });
    }
    // Custom errors or other internal server errors
    return res.status(500).send({
      message: 'Internal server problem',
    });
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImage,
};
