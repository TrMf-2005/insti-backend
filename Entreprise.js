// Ce fichier définit à quoi ressemble UNE entreprise dans la base de données.
// C'est comme définir les colonnes d'un tableau Excel : chaque entreprise
// aura obligatoirement un nom, une ville, et un département.

const mongoose = require('mongoose');

const entrepriseSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  ville: {
    type: String,
    required: true,
    trim: true
  },
  departement: {
    type: String,
    required: true,
    enum: [
      'genie-civil',
      'genie-mecanique',
      'maintenance-systemes',
      'genie-energetique',
      'genie-electrique-informatique'
    ]
  },
  dateAjout: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Entreprise', entrepriseSchema);
