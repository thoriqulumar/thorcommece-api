/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('category', {
    id: { type: 'integer', primaryKey: true },
    name: { type: 'varchar(50)' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('category');
};
