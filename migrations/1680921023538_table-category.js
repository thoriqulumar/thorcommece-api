/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('category', {
    id: { type: 'varchar(255)', primaryKey: true },
    name: { type: 'varchar(255)', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('category');
};
