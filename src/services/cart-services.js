const { nanoid } = require('nanoid');
const Cart = require('../models/cart');
const Product = require('../models/product');
const { getInfoUser } = require('../middleware/auth');

const addCart = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const user = getInfoUser(authHeader);
    const { productId, quantity } = req.body;

    const id = `cart-${nanoid()}`;
    // check input
    if (!productId || !quantity) {
      return res
        .status(401)
        .send({ status: 'failed', message: 'missing required fields' });
    }

    const existingCart = await Cart.findOne({
      where: { user_id: user.id, product_id: productId },
    });

    const product = await Product.findOne({ where: { id: productId } });

    if (existingCart) {
      const newQuantity = existingCart.quantity + quantity;
      await Cart.update(
        {
          price: product.price * newQuantity,
          quantity: newQuantity,
        },
        {
          where: { user_id: user.id, product_id: productId },
        }
      );

      return res.status(201).send({
        status: 'success',
        message: 'cart already added, quantity updated',
      });
    }

    if (!product) {
      return res
        .status(401)
        .send({ status: 'failed', message: 'product not exists' });
    }

    await Cart.create({
      id,
      user_id: user.id,
      product_id: productId,
      price: product.price * quantity,
      quantity,
    });

    return res
      .status(201)
      .send({ status: 'success', message: 'cart succesfully added' });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const getAllCartByUserId = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const user = getInfoUser(authHeader);
    const carts = await Cart.findAll({
      where: { user_id: user.id },
    });

    var data = [];
    for (const idx in carts) {
      const product = await Product.findOne({
        where: { id: carts[idx].product_id },
      });
      const newData = {
        id: carts[idx].id,
        user_id: carts[idx].user_id,
        product_id: carts[idx].product_id,
        price: product.price,
        total: carts[idx].price,
        quantity: carts[idx].quantity,
        createdAt: carts[idx].createdAt,
        updatedAt: carts[idx].updatedAt,
      };

      data.push(newData);
    }

    return res.status(200).send({ status: 'success', data });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const authHeader = req.headers.authorization;
    const user = getInfoUser(authHeader);
    const { productId, quantity } = req.body;

    // check input
    if (!productId || !quantity) {
      return res
        .status(401)
        .send({ status: 'failed', message: 'missing required fields' });
    }

    const product = await Product.findOne({ where: { id: productId } });

    if (!product) {
      return res
        .status(401)
        .send({ status: 'failed', message: 'product not exists' });
    }

    await Cart.update(
      {
        user_id: user.id,
        product_id: productId,
        price: product.price * quantity,
        quantity,
      },
      {
        where: {
          id: cartId,
        },
      }
    );

    return res
      .status(201)
      .send({ status: 'success', message: 'cart succesfully updated' });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    await Cart.destroy({
      where: {
        id: cartId,
      },
    });

    return res
      .status(200)
      .send({ status: 'success', message: 'cart succesfully deleted' });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

module.exports = {
  addCart,
  getAllCartByUserId,
  updateCart,
  deleteCart,
};
