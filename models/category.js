const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Veuillez fournir un nom de catégorie"],
    unique: true,
    maxlength: [50, "Le nom de la catégorie ne peut pas dépasser 50 caractères"],
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
