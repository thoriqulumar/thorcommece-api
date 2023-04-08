const Category = require('../models/category');

const addCategory = async (req, res) => {
  try {
    const {
      name,
    } = req.body;
    // check input
    if (!name) {
      return res.status(401).send({ message: 'missing required fields' });
    }

    const category = await Category.create({
      name,
    });

    if (category) {
      return res.status(201).send({ message: 'category succesfully created' });
    }
    return res.status(500).send({ message: 'failed to create category' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();

    if (categories) {
      return res.status(201).send({ data: categories });
    }
    return res.status(500).send({ message: 'failed to get category' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const {
      id, name,
    } = req.body;

    // check input
    if (!id) {
      return res.status(401).send({ message: 'missing required fields' });
    }

    const category = await Category.update({
      name,
    }, {
      where: {
        id,
      },
    });

    if (category) {
      return res.status(201).send({ message: 'category succesfully updated' });
    }
    return res.status(500).send({ message: 'failed to update category' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const {
      id,
    } = req.body;

    // check input
    if (!id) {
      return res.status(401).send({ message: 'missing required fields' });
    }

    const category = await Category.destroy({
      where: {
        id,
      },
    });

    if (category) {
      return res.status(201).send({ message: 'category succesfully deleted' });
    }
    return res.status(500).send({ message: 'failed to delete product' });
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
