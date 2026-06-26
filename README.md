# Chiara Locale — Cockpit de commande Hermes Agent v0.16.0

> Application web statique locale — aucune dépendance, aucun serveur, zéro installation.
> Documentée et produite par **JLV** — juin 2026.

---

## Objectif de l'application

**Chiara Locale** est un cockpit de documentation et de référence pour Hermes Agent v0.16.0.
Il présente en une seule page HTML autonome :

- L'architecture du système IA personnel (11 briques) avec panneau de détail par brique.
- Les 8 skills disponibles, les agents spécialisés et leurs arbres de délégation.
- Les 5 interfaces de communication (Telegram, Desktop, CLI PowerShell, Mail, WhatsApp).
- Le planning Cron, les gabarits de rapports HTML, la roadmap priorisée.
- Les graphiques de maturité des modules, de partage de charge et de familles de risque.
- La section Sécurité avec classification des commandes (vert / orange / rouge).
- Les prompts de démarrage rapide, les diagnostics et les guides d'utilisation.

L'application fonctionne entièrement **en local**, sans connexion réseau, sans backend, sans cookies.

---

## Comment ouvrir l'application

Double-cliquer sur **`index.html`** — c'est tout.

Le fichier s'ouvre dans votre navigateur via le protocole `file://`.
Aucune installation, aucun serveur local, aucun `npm install` n'est nécessaire.

> Navigateurs recommandés : Chrome, Edge, Firefox (versions récentes).
> Safari sur macOS fonctionne également.

---

## Structure des fichiers

```
chiara-locale-mode-emploi-premium/
├── index.html               — Squelette HTML (nav, sections vides, balises canvas)
├── styles.css               — Thème sombre, responsive, animations CSS
├── data.js                  — Source unique de vérité (window.CHIARA_DATA)
├── app.js                   — Moteur de rendu data-driven + interactions
├── README.md                — Ce fichier
└── assets/
    ├── logo_JLV.jpg         — Logo JLV affiché dans l'en-tête
    ├── favicon.svg          — Icône d'onglet
    ├── hermes-logo.svg      — Logo Hermes Agent
    ├── chiara-avatar.svg    — Avatar Chiara
    └── architecture-schema.svg — Schéma visuel du flux global, affiché en tête de la section Architecture
```

---

## Modifier le contenu

### Principe

**`data.js` est la source unique de vérité.**
Toutes les données affichées (textes, exemples, valeurs numériques, commandes) sont définies dans l'objet `window.CHIARA_DATA` de ce fichier.
Modifier `data.js` suffit pour mettre à jour le contenu de l'ensemble de l'application — sans toucher à `app.js`, `styles.css` ou `index.html`.

### Clés principales de `window.CHIARA_DATA`

| Clé              | Contenu                                                        |
|------------------|----------------------------------------------------------------|
| `meta`           | Titre, sous-titre, badges de version, date, tagline           |
| `pillars`        | 5 piliers d'accueil (icône, titre, texte)                     |
| `flow`           | Étapes du flux principal de traitement                        |
| `architecture`   | 11 briques (brique, rôle, exemple, risque, tag, détail)       |
| `orchestration`  | Boucle d'orchestration et étapes de Chiara                    |
| `interfaces`     | 5 connecteurs/interfaces comparatifs                          |
| `skills`         | 8 skills documentés                                           |
| `agents`         | Agents spécialisés et arbre de délégation                     |
| `agentTree`      | Hiérarchie d'agents (arbre imbriqué)                          |
| `media`          | Modules du studio média                                       |
| `cron`           | Tâches planifiées avec fréquence et niveau de risque          |
| `reports`        | Gabarits de rapports HTML disponibles                         |
| `security`       | Secrets à protéger, risques, commandes classifiées            |
| `diagnostic`     | Points de diagnostic système                                  |
| `roadmap`        | Jalons de la roadmap avec priorité et statut                  |
| `maturity`       | Niveau de maturité de chaque module (0–100)                   |
| `modulesShare`   | Répartition de charge par module (graphique donut)            |
| `riskFamilies`   | Familles de risque avec score (jauges)                        |
| `prompts`        | Prompts de démarrage rapide                                   |

> **Note :** Les valeurs numériques (`maturity`, `modulesShare`, scores de risque) sont des **exemples éditables**.
> Remplacez-les par les valeurs réelles de votre déploiement.

---

## Ajouter un skill

Ouvrir `data.js`, localiser le tableau `skills` et ajouter un objet à la fin du tableau :

```js
// Dans data.js — tableau skills
{
  id:         "mon-nouveau-skill",          // identifiant unique, kebab-case
  objectif:   "Ce que fait ce skill.",      // description courte de l'objectif
  entree:     "Ce qui déclenche le skill.", // entrée attendue
  sortie:     "Ce que produit le skill.",   // sortie livrée
  outils:     "Outil A, Outil B.",          // outils utilisés
  risque:     "vert",                       // "vert" | "orange" | "rouge"
  validation: false,                        // true = validation humaine requise
  tag:        "Skill"                       // tag de filtrage
}
```

Enregistrer le fichier et rafraîchir `index.html` — la carte apparaît automatiquement dans la section **Skills**.

---

## Ajouter un connecteur / interface

Ouvrir `data.js`, localiser le tableau `interfaces` et ajouter un objet :

```js
// Dans data.js — tableau interfaces
{
  nom:      "Nom de l'interface",           // affiché dans le tableau comparatif
  usage:    "Cas d'usage principal.",
  avantage: "Ce que cette interface apporte.",
  limite:   "Contraintes ou limitations connues.",
  exemple:  "Exemple concret d'utilisation.",
  tag:      "Gateway"                       // tag de filtrage
}
```

La nouvelle ligne apparaît automatiquement dans le tableau comparatif de la section **Interfaces**.

---

## Publier sur GitHub Pages

1. Pousser le dossier `chiara-locale-mode-emploi-premium/` (ou l'ensemble du dépôt) sur GitHub.
2. Dans les **Settings** du dépôt → section **Pages** → choisir la branche source (`main`) et le dossier racine ou `/docs`.
3. GitHub Pages sert `index.html` directement.

Tous les chemins (scripts, styles, images) sont **relatifs** — aucune modification n'est nécessaire pour que l'application fonctionne sur GitHub Pages.

---

## Précautions de sécurité

### Commandes rouges — exemples à ne jamais lancer

La section **Sécurité** de l'application affiche des commandes classifiées en trois niveaux :

- **Vert** — lecture seule, sans risque.
- **Orange** — modification possible, prudence requise, vérifier avant d'exécuter.
- **Rouge** — commandes **dangereuses présentées comme exemples pédagogiques uniquement**. Elles ne doivent jamais être copiées ou exécutées. Elles n'ont **pas de bouton de copie** dans l'interface.

### Bonnes pratiques

- **Lire avant de modifier** : inspecter le contenu de `data.js` dans un éditeur de texte avant toute modification.
- **Validation humaine** : toute action sensible déclenchée via Hermes Agent doit être confirmée manuellement avant exécution.
- **Sauvegarder** : conserver une copie de `data.js` avant de le modifier.

### Rappel important

> **Ne jamais stocker de tokens, de clés API ou de mots de passe dans cette application.**
> `data.js` est un fichier source, non chiffré, potentiellement versionné et partageable.
> Les secrets appartiennent exclusivement à des variables d'environnement chiffrées ou à un fichier `.env` non versionné, côté serveur.

---

## Crédits

Logo et conception : **JLV** — juin 2026.
Application produite dans le cadre du projet **Hermes Agent v0.16.0**.
