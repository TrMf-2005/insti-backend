// Ce "middleware" est un videur à l'entrée d'une boîte de nuit :
// avant de laisser passer une requête d'ajout ou de suppression,
// il vérifie que le bon mot de passe admin a été fourni.
// Le mot de passe attendu est stocké côté serveur (variable d'environnement),
// jamais visible dans le code du site.

function adminAuth(req, res, next) {
  const motDePasseFourni = req.headers['x-admin-password'];

  if (!motDePasseFourni) {
    return res.status(401).json({ erreur: 'Mot de passe admin manquant.' });
  }

  if (motDePasseFourni !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ erreur: 'Mot de passe admin incorrect.' });
  }

  // Mot de passe correct : on laisse la requête continuer
  next();
}

module.exports = adminAuth;
