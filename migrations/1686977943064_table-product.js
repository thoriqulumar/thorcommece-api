exports.up = (pgm) => {
  pgm.createTable('products', {
    id: { type: 'varchar(255)', primaryKey: true },
    product_name: { type: 'varchar(50)', notNull: false },
    description: { type: 'varchar(255)', notNull: false },
    img_product: { type: 'TEXT', notNull: false },
    price: { type: 'integer', notNull: false },
    quantity: { type: 'integer', notNull: false },
    category_id: { type: 'integer', notNull: true },
    brand_id: { type: 'integer', notNull: true },
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
    'products',
    'fk_products.category_id_category.id',
    'FOREIGN KEY(category_id) REFERENCES category(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'products',
    'fk_products.brand_id_thread.id',
    'FOREIGN KEY(brand_id) REFERENCES brands(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('products');
};
