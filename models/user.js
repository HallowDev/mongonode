const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcryptjs');

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Veuillez fournir une adresse e-mail"],
    unique: true,
    validate: {
      validator: validateEmail,
      message: "Veuillez fournir une adresse e-mail valide",
    },
  },
  password: {
    type: String,
    required: [true, "Veuillez fournir un mot de passe"],
    minlength: [6, "Le mot de passe doit comporter au moins 6 caractères"],
    validate: {
      validator: (value) => {
        const re =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/;
        return re.test(value);
      },
      message:
        "Le mot de passe ne peut pas contenir le mot 'password', et doit comporter au moins 6 caractères, une lettre majuscule, un chiffre et un caractère spécial",
    },
  },
});

userSchema.plugin(uniqueValidator, { message: '{PATH} doit être unique.' });
const User = mongoose.model('User', userSchema);

module.exports = User;
