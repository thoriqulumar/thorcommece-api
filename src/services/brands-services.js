const Brands = require('../models/brands');

const addBrand = async (req, res) => {
  try {
    const { name } = req.body;
    // check input
    if (!name) {
      return res.status(401).send({ status: 'failed', message: 'missing required fields' });
    }

    const brand = await Brands.create({
      brand: name,
    });

    return res.status(201).send({ status: 'success', data: brand });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const getBrands = async (req, res) => {
  try {
    const brands = await Brands.findAll({
      order: [
        ['id', 'ASC'],
      ],
    });

    return res.status(200).send({ status: 'success', data: brands });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id, name } = req.body;

    // check input
    if (!id || !name) {
      return res.status(401).send({ status: 'failed', message: 'missing required fields' });
    }

    await Brands.update(
      {
        brand: name,
      },
      {
        where: {
          id,
        },
      },
    );

    return res.status(201).send({ status: 'success', message: 'brand succesfully updated' });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.body;

    // check input
    if (!id) {
      return res.status(401).send({ status: 'failed', message: 'missing required fields' });
    }

    await Brands.destroy({
      where: {
        id,
      },
    });

    return res.status(201).send({ status: 'success', message: 'brand succesfully deleted' });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

module.exports = {
  addBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
