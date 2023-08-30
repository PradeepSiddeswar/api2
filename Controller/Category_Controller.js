const Category = require('../Model/Category_Model');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.json({ category });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { title, image } = req.body;
    const newCategory = new Category({
      title,
      image,
    });
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
