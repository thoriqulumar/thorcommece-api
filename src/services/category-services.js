const Category = require('../models/category');

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    // check input
    if (!name) {
      return res.status(401).send({ status: 'failed', message: 'missing required fields' });
    }

    const category = await Category.create({
      category: name,
    });

    return res.status(201).send({ status: 'success', data: category });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();

    return res.status(201).send({ status: 'success', data: categories });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id, name } = req.body;

    // check input
    if (!id) {
      return res.status(401).send({ status: 'failed', message: 'missing required fields' });
    }

    await Category.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      },
    );

    return res.status(201).send({ status: 'success', message: 'category succesfully updated' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;

    // check input
    if (!id) {
      return res.status(401).send({ status: 'failed', message: 'missing required fields' });
    }

    await Category.destroy({
      where: {
        id,
      },
    });

    return res.status(201).send({ status: 'success', message: 'category succesfully deleted' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
