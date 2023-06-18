exports.up = (pgm) => {
  pgm.createTable('category', {
    id: { type: 'serial', primaryKey: true },
    category: { type: 'varchar(50)' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('category');
};
