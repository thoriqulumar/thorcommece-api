const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSERNAME,
  process.env.PGPASSWORD,
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432, // Postgres default port
  },
);

module.exports = sequelize;
