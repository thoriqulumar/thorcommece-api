/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// routes
const userRouters = require('./routes/user');
const authenticationRouters = require('./routes/authentications');
const productRouters = require('./routes/product');
const profileRouters = require('./routes/profile');
const categoryRouters = require('./routes/category');
const brandsRouters = require('./routes/brands');

// endpoint
app.use('/api/v1/user', userRouters);
app.use('/api/v1/product', productRouters);
app.use('/api/v1/category', categoryRouters);
app.use('/api/v1/brands', brandsRouters);
app.use('/api/v1/profile', profileRouters);
app.use('/api/v1/authentications', authenticationRouters);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to thorcommerce');
});

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at port ${PORT}`);
});

module.exports = app;
