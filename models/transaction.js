const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const transactionSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "Veuillez fournir un libellé"],
    minlength: [2, "Le libellé doit comporter au moins 2 caractères"],
    maxlength: [50, "Le libellé ne peut pas dépasser 50 caractères"],
  },
  type: {
    type: String,
    required: [true, "Veuillez fournir un type"],
    enum: {
      values: ["débit", "crédit"],
      message: "Le type doit être débit ou crédit",
    },
  },
  amount: {
    type: Number,
    required: [true, "Veuillez fournir un montant"],
  },
  paymentDate: {
    type: Date,
    required: [true, "Veuillez fournir une date de paiement"],
  },
  paymentMethod: {
    type: String,
    required: [true, "Veuillez fournir un mode de paiement"],
    enum: {
      values: ["chèque", "espèces", "carte de crédit", "dépôt", "virement"],
      message:
        "Le mode de paiement doit être chèque, espèces, carte de crédit, dépôt ou virement",
    },
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Veuillez fournir une catégorie"],
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "Veuillez fournir un identifiant de compte"],
  },
});

transactionSchema.plugin(uniqueValidator, { message: '{PATH} doit être unique.' });
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
