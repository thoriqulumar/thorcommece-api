const midtrans = require('midtrans-client');

const CoreAPI = new midtrans.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

module.exports = CoreAPI;
