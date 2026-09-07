// C'est le fichier "chef d'orchestre" : il démarre le serveur,
// se connecte à la base de données, et branche les routes.

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const entreprisesRoutes = require('./routes/entreprises');

const app = express();

// Autorise le site (Vercel) à appeler cette API depuis un autre nom de domaine
app.use(cors());

// Permet de lire le JSON envoyé dans les requêtes (ex: le corps d'un POST)
app.use(express.json());

// Toutes les routes commençant par /api/entreprises sont gérées
// par le fichier routes/entreprises.js
app.use('/api/entreprises', entreprisesRoutes);

// Route de test toute simple pour vérifier que le serveur tourne
app.get('/', (req, res) => {
  res.send('API INSTI-LOKOSSA en ligne ✅');
});

// Connexion à la base de données MongoDB, puis démarrage du serveur
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connecté à MongoDB ✅');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((erreur) => {
    console.error('Erreur de connexion à MongoDB ❌', erreur);
  });
