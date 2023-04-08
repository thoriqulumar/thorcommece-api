const { nanoid } = require('nanoid');
const Order = require('../models/order');
const Product = require('../models/product');

const orderProduct = async (req, res) => {
  try {
    const {
      userId, productId, quantity,
    } = req.body;

    const id = nanoid(10);
    // check input
    if (!userId || !productId || !quantity) {
      return res.status(401).send({ message: 'missing required fields' });
    }

    const order = await Order.create({
      id,
      user_id: userId,
      product_id: productId,
      quantity,
    });

    if (order) {
      const productOrdered = await Product.findOne({ where: { id: productId } });
      const prevStock = productOrdered.stock;
      if (productOrdered) {
        const productUpdated = await Product.update({
          stock: prevStock - quantity,
        }, {
          where: {
            id: productId,
          },
        });
        if (productUpdated) {
          return res.status(201).send({ message: 'order succesfully created' });
        }
      }
    }
    return res.status(500).send({ message: 'failed to create order' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  orderProduct,
};
