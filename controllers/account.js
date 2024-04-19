const Account = require('../models/account');

exports.readAll = async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    const accounts = await Account.find({ userId: userId });
    res.status(200).json(accounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur Serveur');
  }
};

exports.create = async (req, res) => {
  try {
    const { bankName, customName } = req.body;
    const userId = req.auth.userId;
    const lastUpdated = Date.now()
    
    const newAccount = new Account({
      bankName,
      customName,
      lastUpdated,
      userId: userId
    });

    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur Serveur');
  }
};

exports.update = async (req, res) => {
  try {
    const accountId = req.params.id;
    const { bankName, customName } = req.body;
    const lastUpdated = Date.now()

    let account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: 'Compte non trouvé' });
    }

    if (account.userId.toString() !== req.auth.userId) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    account = await Account.findByIdAndUpdate(
      accountId,
      { $set: { bankName, customName, lastUpdated } },
      { new: true }
    );

    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur Serveur');
  }
};

exports.delete = async (req, res) => {
  try {
    const accountId = req.params.id;

    let account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: 'Compte non trouvé' });
    }

    if (account.userId.toString() !== req.auth.userId) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    await Account.findByIdAndDelete(accountId);

    res.json({ message: 'Compte supprimé' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur Serveur');
  }
};
