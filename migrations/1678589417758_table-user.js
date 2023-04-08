/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: { type: 'varchar(255)', primaryKey: true },
    name: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true },
    password: { type: 'varchar(255)', notNull: true },
    role: { type: 'varchar(50)', notNull: true },
    createdAt: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
