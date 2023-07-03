exports.up = (pgm) => {
  pgm.createTable('orders', {
    id: { type: 'varchar(255)', primaryKey: true },
    user_id: { type: 'varchar(255)', notNull: true, references: 'users' },
    amount: { type: 'integer', notNull: false },
    status: { type: 'varchar(20)' },
    transaction_id: { type: 'varchar(255)', notNull: false },
    item_order: { type: 'text', notNull: false },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint(
    'orders',
    'fk_orders.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropTable('orders');
};
