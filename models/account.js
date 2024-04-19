const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const accountSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: [true, "Veuillez fournir un nom de banque"],
  },
  customName: {
    type: String,
    required: [true, "Veuillez fournir un nom personnalisé"],
    maxlength: [50, "Le nom personnalisé ne peut pas dépasser 50 caractères"],
  },
  lastUpdated: {
    type: Date,
    required: [true, "Veuillez fournir une date de dernière mise à jour"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Veuillez fournir un identifiant d'utilisateur"],
  },
});

accountSchema.plugin(uniqueValidator, { message: '{PATH} doit être unique.' });
module.exports = Account;
