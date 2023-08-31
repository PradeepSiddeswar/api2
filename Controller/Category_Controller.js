const Category = require('../Model/Category_Model');
 
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });

    await category.save();
    res.json({ category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Error creating category' });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, { _id: 1, name: 1 });
    res.json({ category: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Error fetching categories' });
  }
};


exports.delete = (req, res) => {
  const id = req.params.id

  Category.findByIdAndDelete(id)
      .then(data => {
          if (!data) {
              res.status(400).send(`User not Found with ${id}`)
          } else {
              res.send("user deleted successfully")
          }
      })
      .catch(error => {
          res.status(500).send(error)
      })
}