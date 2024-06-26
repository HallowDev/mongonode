const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    const {name, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword)
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword
    });
    await user.save()
    res.status(201).json({ message: 'Enregistrement réussi !' });
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

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Connexion impossible', error });
  }
};
