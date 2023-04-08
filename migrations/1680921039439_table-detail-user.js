/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('detail_users', {
    id: { type: 'varchar(255)', primaryKey: true },
    user_id: { type: 'varchar(255)', notNull: true, references: 'users' },
    name: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true },
    address: { type: 'varchar(255)', notNull: true },
    img_profile: { type: 'varchar(255)', notNull: false },
    postal_code: { type: 'varchar(50)', notNull: true },
    createdAt: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('detail_users');
};
