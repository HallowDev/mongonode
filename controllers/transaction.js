const Transaction = require('../models/transaction')

exports.create = async (req, res) => {
  const { accountId } = req.params
  try {
    const newTransaction = new Transaction({
      ...req.body,
      accountId
    })
    newTransaction.save()
    res.status(201).json(newTransaction)
  } catch (error) {
    res.status(500).json({ message: 'Impossible de créer la ligne', error: error.message })
  }
}

exports.readAllByAccount = async (req, res) => {
  const { accountId } = req.params
  try {
    const transactions = await Transaction.find({ accountId }).populate('accountId')
    transactions.forEach(transaction => {
      if (transaction.accountId.userId.toString() !== req.auth.userId) {
        res.status(401).json({ message: 'Requête non autorisée' })
      }
    })
    res.status(200).json({
        transactions
    })
  } catch (error) {
    res.status(500).json({ message: 'Impossible de lire les lignes', error: error.message })

  }
}

exports.update = async (req, res) => {
  const transactionId = req.params.id
  try {
    const transaction = await Transaction.findOneAndUpdate({ _id: transactionId }, req.body).exec()

    if (!transaction) {
      return res.status(404).json({ message: 'Ligne de compte non trouvée' })
    }

    res.status(200).json({ message: 'Ligne de compte mise à jour avec succès', transaction })
  } catch (error) {
    res.status(500).json({ message: 'Impossible de mettre à jour la ligne de compte', error: error.message })
  }
}

exports.delete = async (req, res) => {
  const transactionId = req.params.id
  try {
    const account = await Transaction.findOneAndDelete({ _id: transactionId })
    if (!account) {
      return res.status(404).json({ message: 'Ligne non trouvée' })
    }
    res.status(204).json({ message: 'la ligne a bien étée supprimée' })
  } catch (error) {
    res.status(500).json({ message: 'Impossible de supprimer la ligne', error: error.message })
  }
}
