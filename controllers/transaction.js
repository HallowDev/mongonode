const Transaction = require('../models/transaction')
const mongoose = require("mongoose")

const checkUserAccess = async (match, userId) => {
    const lines = await Transaction.aggregate([
        {
            $match: match,
        },
        {
            $lookup: {
                from: "accounts",
                localField: "accountId",
                foreignField: "_id",
                as: "accountDetails",
            },
        },
        {
            $unwind: "$accountDetails",
        },
        {
            $match: {
                "accountDetails.userId": mongoose.Types.ObjectId.createFromHexString(userId),
            },
        },
        {
            $project: {
                accountDetails: 0,
            },
        },
    ])

    if (lines.length === 0) {
        return false
    }
        return lines
}

exports.readAllByAccount = async (req, res) => {
    const { accountId } = req.params
    try {
      const transactions = await checkUserAccess(
        {
            accountId: mongoose.Types.ObjectId.createFromHexString(
                accountId
            )
        },
        req.auth.userId
      )
      console.log(transactions)

      if (!transactions) {
        return res.status(404).json({ message: "Aucune ligne récupérable" })
      }
      res.status(200).json({
          transactions
      })
    } catch (error) {
      res.status(500).json({ message: 'Impossible de lire les lignes', error: error.message })
  
    }
  }
  
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
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Impossible de supprimer la ligne', error: error.message })
  }
}
