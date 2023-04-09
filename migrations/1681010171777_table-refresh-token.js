/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('refresh_token', {
    user_id: { type: 'varchar(255)', notNull: true, references: 'users' },
    refresh_token: { type: 'varchar(255)' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('refresh_token');
};
