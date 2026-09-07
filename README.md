# API Backend — INSTI-LOKOSSA

Cette API permet d'ajouter, lister et supprimer des entreprises pour chaque
département, avec un accès protégé par mot de passe pour l'administrateur.

## 1. Créer la base de données (MongoDB Atlas — gratuit)

1. Va sur https://www.mongodb.com/cloud/atlas/register et crée un compte gratuit.
2. Crée un nouveau **Cluster gratuit** (choisis l'option "M0 Free").
3. Dans "Database Access", crée un utilisateur avec un nom et un mot de passe
   (note-les bien, tu en auras besoin).
4. Dans "Network Access", clique "Add IP Address" → "Allow Access from Anywhere"
   (0.0.0.0/0) — nécessaire pour que Render puisse s'y connecter.
5. Clique sur "Connect" → "Drivers" → copie l'URL de connexion.
   Elle ressemble à :
   `mongodb+srv://utilisateur:motdepasse@cluster.mongodb.net/`
6. Ajoute `insti-lokossa` après `.net/` pour nommer ta base :
   `mongodb+srv://utilisateur:motdepasse@cluster.mongodb.net/insti-lokossa`

## 2. Déployer sur Render

1. Mets ce dossier (`insti-backend`) sur un repo GitHub.
2. Va sur https://render.com et connecte ton compte GitHub.
3. Clique "New +" → "Web Service" → sélectionne ton repo.
4. Configure :
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
5. Dans l'onglet "Environment", ajoute ces variables :
   - `MONGODB_URI` → l'URL copiée à l'étape précédente
   - `ADMIN_PASSWORD` → choisis un mot de passe solide pour l'admin
6. Clique "Create Web Service". Render te donne une URL du type :
   `https://insti-backend.onrender.com`

## 3. Tester que ça marche

Une fois déployé, ouvre `https://insti-backend.onrender.com` dans ton
navigateur : tu dois voir "API INSTI-LOKOSSA en ligne ✅".

### Lister les entreprises d'un département (public, pas de mot de passe)
```
GET https://insti-backend.onrender.com/api/entreprises/genie-civil
```

### Ajouter une entreprise (admin uniquement)
```
POST https://insti-backend.onrender.com/api/entreprises
Headers:
  Content-Type: application/json
  x-admin-password: ton-mot-de-passe-admin
Body (JSON):
{
  "nom": "SOBEBRA",
  "ville": "Cotonou",
  "departement": "genie-civil"
}
```

### Supprimer une entreprise (admin uniquement)
```
DELETE https://insti-backend.onrender.com/api/entreprises/ID_DE_L_ENTREPRISE
Headers:
  x-admin-password: ton-mot-de-passe-admin
```

Tu peux tester ces requêtes avec l'application **Postman** ou l'extension
**Thunder Client** (VS Code) avant de les brancher sur ton site.

## 4. Valeurs possibles pour "departement"

Utilise exactement une de ces valeurs (respecte les tirets et minuscules) :
- `genie-civil`
- `genie-mecanique`
- `maintenance-systemes`
- `genie-energetique`
- `genie-electrique-informatique`

## 5. Prochaine étape : brancher le frontend

Une fois l'API en ligne et testée, il faudra modifier tes pages HTML pour :
1. Appeler `fetch()` vers l'API au chargement de la page pour afficher les
   entreprises.
2. Envoyer un `fetch()` en POST quand l'admin clique "Ajouter Entreprise".
3. Demander le mot de passe admin (ex: via une boîte de dialogue `prompt()`
   simple pour commencer) avant d'autoriser l'ajout/suppression.

Dis-moi quand tu en es là, et on avancera sur cette partie ensemble.
