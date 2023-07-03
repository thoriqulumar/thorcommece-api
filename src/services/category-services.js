const Category = require('../models/category');

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    // check input
    if (!name) {
      return res.status(400).send({ status: 'failed', message: 'missing required fields' });
    }

    const category = await Category.create({
      category: name,
    });

    return res.status(201).send({ status: 'success', data: category });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [
        ['id', 'ASC'],
      ],
    });

    return res.status(200).send({ status: 'success', data: categories });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id, name } = req.body;

    // check input
    if (!id) {
      return res.status(400).send({ status: 'failed', message: 'missing required fields' });
    }

    await Category.update(
      {
        category: name,
      },
      {
        where: {
          id,
        },
      },
    );

    return res.status(201).send({ status: 'success', message: 'category succesfully updated' });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;

    // check input
    if (!id) {
      return res.status(400).send({ status: 'failed', message: 'missing required fields' });
    }

    await Category.destroy({
      where: {
        id,
      },
    });

    return res.status(200).send({ status: 'success', message: 'category succesfully deleted' });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

module.exports = {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
