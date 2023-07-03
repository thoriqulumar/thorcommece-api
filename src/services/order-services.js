const Cart = require('../models/cart');
const Product = require('../models/product');
const Profile = require('../models/profile');
const Order = require('../models/order');
const { getInfoUser } = require('../middleware/auth');
const CoreAPI = require('../config/midtrans');

const order = async (req, res) => {
  try {
    var { bank } = req.body;

    const authHeader = req.headers.authorization;
    const user = getInfoUser(authHeader);

    if (!bank) {
      return res
        .status(401)
        .send({ status: 'failed', message: 'missing required fields' });
    }
    bank = bank.toLowerCase();
    if (!checkBank(bank)) {
      return res
        .status(401)
        .send({ status: 'failed', message: 'bank is not available' });
    }

    const carts = await Cart.findAll({
      where: { user_id: user.id },
    });
    const { itemDetails, totalAmount } = await processCart(carts);
    const detailCustomer = await processCustomerDetail(user.id);
    const bankCode = getBankCode(bank);
    const orderId = generateOrderId();

    let parameter = {
      payment_type: 'bank_transfer',
      transaction_details: {
        gross_amount: totalAmount,
        order_id: bankCode + orderId,
      },
      customer_details: detailCustomer,
      item_details: itemDetails,
      bank_transfer: {
        bank,
      },
    };

    const response = await CoreAPI.charge(parameter);
    if (response.status_code === '201') {
      await Order.create({
        id: bankCode + orderId,
        user_id: user.id,
        amount: totalAmount,
        status: response.transaction_status,
        transaction_id: response.transaction_id,
        item_order: `${itemDetails}`,
      });

      await Cart.destroy({
        where: {
          user_id: user.id,
        },
      });

      await updateStockProduct();
      return res.status(201).send({ status: 'success', data: response });
    } else {
      return res.status(500).send({
        message: 'internal server problem',
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const processCart = async (carts) => {
  const itemDetails = [];
  var totalAmount = 0;
  for (const idx in carts) {
    const product = await Product.findOne({
      where: { id: carts[idx].product_id },
    });
    const item = {
      id: carts[idx].id,
      price: product.price,
      quantity: carts[idx].quantity,
      name: product.product_name,
    };
    const amount = item.price * item.quantity;
    totalAmount += amount;
    itemDetails.push(item);
  }

  return {
    itemDetails,
    totalAmount,
  };
};

const checkBank = (bank) => {
  const channels = ['bri', 'bca', 'bni'];
  return channels.includes(bank);
};

const processCustomerDetail = async (userId) => {
  const user = await Profile.findOne({ where: { user_id: userId } });

  const detailCustomer = {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    address: user.address,
  };

  return detailCustomer;
};

const getBankCode = (bank) => {
  if (bank === 'bri') {
    return '001';
  } else if (bank === 'bca') {
    return '002';
  } else {
    return '003';
  }
};

const generateOrderId = () => {
  const now = new Date();

  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  const orderId = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  return orderId;
};

const updateStockProduct = async (carts) => {
  for (const idx in carts) {
    const product = await Product.findOne({
      where: { id: carts[idx].product_id },
    });

    await Product.update(
      {
        quantity: product.quantity - carts[idx].quantity,
      },
      {
        where: {
          id: carts[idx].product_id,
        },
      }
    );
  }
};

module.exports = { order };
