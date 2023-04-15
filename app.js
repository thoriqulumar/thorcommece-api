/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const userRouters = require('./routes/user');
const productRouters = require('./routes/product');
const orderRouters = require('./routes/order');
const profileRouters = require('./routes/profile');
const categoryRouters = require('./routes/category');

// management
app.use('/api/v1/user', userRouters);

// admin
app.use('/api/v1/product', productRouters);
app.use('/api/v1/category', categoryRouters);

// user
app.use('/api/v1/order', orderRouters);
app.use('/api/v1/profile', profileRouters);

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at port ${PORT}`);
});
