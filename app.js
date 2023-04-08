require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');

const app = express();
app.use(express.json());

const userRouters = require('./routes/user');
const productRouters = require('./routes/product');
const orderRouters = require('./routes/order');

app.use('/api/v1/user', userRouters);
app.use('/api/v1/product', productRouters);
app.use('/api/v1/order', orderRouters);

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at port ${PORT}`);
});
