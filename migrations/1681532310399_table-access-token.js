/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('access_token', {
    user_id: { type: 'varchar(255)', notNull: true, references: 'users' },
    token: { type: 'varchar(255)' },
    expired_at: { type: 'DATE' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('access_token');
};
