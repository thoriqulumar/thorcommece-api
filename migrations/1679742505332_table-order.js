/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('orders', {
    id: { type: 'varchar(255)', primaryKey: true },
    user_id: { type: 'varchar(255)', notNull: true, references: 'users' },
    product_id: { type: 'varchar(255)', notNull: true, references: 'product' },
    quantity: { type: 'integer', notNull: true },
    createdAt: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('orders');
};
