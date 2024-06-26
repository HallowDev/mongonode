const Account = require('../models/account');

exports.readAll = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const accounts = await Account.find({ userId: userId });
    res.status(200).json(accounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erreur Serveur' });
  }
};

exports.create = async (req, res) => {
  try {
    const { bankName, customName } = req.body;
    const userId = req.auth.userId;
    
    const newAccount = new Account({
      bankName,
      customName,
      userId
    });

    await newAccount.save();
    res.status(201).json(newAccount);
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
    const accountId = req.params.id;
    const { bankName, customName } = req.body;

    let account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ error: 'Compte non trouvé' });
    }

    if (account.userId.toString() !== req.auth.userId) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    account = await Account.findByIdAndUpdate(
      accountId,
      { $set: { bankName, customName } },
      { new: true }
    );

    res.status(200).json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erreur Serveur' });
  }
};

exports.delete = async (req, res) => {
  try {
    const accountId = req.params.id;

    let account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ error: 'Compte non trouvé' });
    }

    if (account.userId.toString() !== req.auth.userId) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    await Account.findByIdAndDelete(accountId);

    res.status(200).json({ message: 'Compte supprimé' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erreur Serveur' });
  }
};
