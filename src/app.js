/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./helper/swagger');
const cors = require('cors');
const { uploadErrorHandler } = require('./services/local-uploads-services');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(uploadErrorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
const userRouters = require('./routes/user');
const authenticationRouters = require('./routes/authentications');
const productRouters = require('./routes/product');
const profileRouters = require('./routes/profile');
const categoryRouters = require('./routes/category');
const brandsRouters = require('./routes/brands');
const cartRouters = require('./routes/cart');
const orderRouters = require('./routes/order');

// endpoint
app.use('/api/user', userRouters);
app.use('/api/product', productRouters);
app.use('/api/category', categoryRouters);
app.use('/api/brands', brandsRouters);
app.use('/api/profile', profileRouters);
app.use('/api/authentications', authenticationRouters);
app.use('/api/cart', cartRouters);
app.use('/api/order', orderRouters);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to thorcommerce');
});

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at port ${PORT}`);
});

module.exports = app;
