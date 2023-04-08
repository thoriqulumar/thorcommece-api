/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('product', {
    id: { type: 'varchar(255)', primaryKey: true },
    title: { type: 'varchar(255)', notNull: true },
    description: { type: 'varchar(255)', notNull: true },
    price: { type: 'integer', notNull: true },
    stock: { type: 'integer', notNull: true },
    createdAt: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('product');
};
