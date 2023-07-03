exports.up = (pgm) => {
  pgm.createTable('brands', {
    id: { type: 'serial', primaryKey: true },
    brand: { type: 'varchar(100)' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('brands');
};
