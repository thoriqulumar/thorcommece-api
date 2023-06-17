exports.up = (pgm) => {
  pgm.createTable('category', {
    id: { type: 'integer', primaryKey: true },
    category: { type: 'varchar(50)' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('category');
};
