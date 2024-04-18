const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà existant' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Enregistrement impossible', error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Email déjà existant' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe invalide' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Connexion impossible', error });
  }
};
