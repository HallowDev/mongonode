const Category = require('../models/category');

exports.readAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erreur Serveur' });
  }
};

exports.create = async (req, res) => {
  try {
    const name = req.body.name;
    
    const newCategory = new Category({ name });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Erreur Serveur' });
    }
  }
};

exports.update = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const name = req.body;

    let category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Compte non trouvé' });
    }

    if (category.userId.toString() !== req.auth.userId) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    category = await Category.findByIdAndUpdate(
        categoryId,
      { $set: { name } },
      { new: true }
    );

    res.status(200).json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erreur Serveur' });
  }
};

exports.delete = async (req, res) => {
  try {
    const categoryId = req.params.id;

    let category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Compte non trouvé' });
    }

    if (category.userId.toString() !== req.auth.userId) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ message: 'Compte supprimé' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erreur Serveur' });
  }
};
