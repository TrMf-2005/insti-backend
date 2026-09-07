// Ce fichier définit les "portes d'entrée" (routes) de notre API.
// Chaque route correspond à une action possible sur les entreprises.

const express = require('express');
const router = express.Router();
const Entreprise = require('../models/Entreprise');
const adminAuth = require('../middleware/adminAuth');

// ---------------------------------------------------------
// GET /api/entreprises/:departement
// Récupère toutes les entreprises d'un département donné.
// Utilisée par les pages publiques (utilisateurs simples).
// ---------------------------------------------------------
router.get('/:departement', async (req, res) => {
  try {
    const entreprises = await Entreprise.find({
      departement: req.params.departement
    }).sort({ dateAjout: -1 });

    res.json(entreprises);
  } catch (erreur) {
    res.status(500).json({ erreur: 'Erreur serveur lors de la récupération.' });
  }
});

// ---------------------------------------------------------
// POST /api/entreprises
// Ajoute une nouvelle entreprise.
// PROTÉGÉE : seul l'admin (avec le bon mot de passe) peut l'utiliser.
// Corps attendu (JSON) : { "nom": "...", "ville": "...", "departement": "..." }
// ---------------------------------------------------------
router.post('/', adminAuth, async (req, res) => {
  try {
    const { nom, ville, departement } = req.body;

    if (!nom || !ville || !departement) {
      return res.status(400).json({ erreur: 'Nom, ville et département sont requis.' });
    }

    const nouvelleEntreprise = new Entreprise({ nom, ville, departement });
    await nouvelleEntreprise.save();

    res.status(201).json(nouvelleEntreprise);
  } catch (erreur) {
    res.status(500).json({ erreur: 'Erreur serveur lors de l\'ajout.' });
  }
});

// ---------------------------------------------------------
// DELETE /api/entreprises/:id
// Supprime une entreprise par son identifiant unique.
// PROTÉGÉE : seul l'admin peut l'utiliser.
// ---------------------------------------------------------
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const entrepriseSupprimee = await Entreprise.findByIdAndDelete(req.params.id);

    if (!entrepriseSupprimee) {
      return res.status(404).json({ erreur: 'Entreprise introuvable.' });
    }

    res.json({ message: 'Entreprise supprimée avec succès.', entreprise: entrepriseSupprimee });
  } catch (erreur) {
    res.status(500).json({ erreur: 'Erreur serveur lors de la suppression.' });
  }
});

module.exports = router;
