import Category from '../models/category.js';

// add category
export const createCategory = async (req, res, next) => {
  try {
    const newCategory = new Category({
      ...req.body,
    });
    const category = await Category.find({ name: req.body.name });

    if (category)
      return res.status(404).send({ message: 'category already exists' });
    await newCategory.save();
    return res.status(200).send({ message: 'Category created !!!' });
  } catch (err) {
    return res.status(400).send({ message: 'Internal Server Error' });
  }
};

// find all categories
export const getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await Category.find();
    return res.status(200).send({ allCategories: allCategories });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};
