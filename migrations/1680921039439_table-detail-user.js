exports.up = (pgm) => {
  pgm.createTable('detail_users', {
    id: { type: 'varchar(255)', primaryKey: true },
    user_id: { type: 'varchar(255)', notNull: true, references: 'users' },
    first_name: { type: 'varchar(255)', notNull: false },
    last_name: { type: 'varchar(255)', notNull: false },
    email: { type: 'varchar(255)', notNull: false },
    address: { type: 'varchar(255)', notNull: false },
    img_profile: { type: 'varchar(255)', notNull: false },
    postal_code: { type: 'varchar(50)', notNull: false },
    createdAt: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });

  pgm.addConstraint(
    'detail_users',
    'fk_detail_users.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('detail_users');
};
