require ("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI,{ ssl : true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Erreur lors de la connexion à MongoDB'));
