exports.up = (pgm) => {
  pgm.createTable('cart', {
    id: { type: 'varchar(255)', primaryKey: true },
    user_id: { type: 'varchar(255)', notNull: true, references: 'users' },
    product_id: { type: 'varchar(255)', notNull: false, references: 'products' },
    price: { type: 'integer', notNull: false },
    quantity: { type: 'integer', notNull: false },
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
    'cart',
    'fk_cart.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE',
  );

  pgm.addConstraint(
    'cart',
    'fk_cart.product_id_products.id',
    'FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('products');
};
