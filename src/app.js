/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const cron = require('node-cron');

const app = express();

app.use(express.json());
app.use(cors());

// routes
const userRouters = require('./routes/user');
const productRouters = require('./routes/product');
const profileRouters = require('./routes/profile');
const categoryRouters = require('./routes/category');

// scheduler
const { checkTokenExpired } = require('./services/scheduler-services');

// management
app.use('/api/v1/user', userRouters);

// admin
app.use('/api/v1/product', productRouters);
app.use('/api/v1/category', categoryRouters);

// user
app.use('/api/v1/profile', profileRouters);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to thorcommerce');
});

cron.schedule('0 * * * *', () => {
  checkTokenExpired();
});

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at port ${PORT}`);
});

module.exports = app;
