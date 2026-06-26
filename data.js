// data.js — Source unique de vérité du cockpit Chiara locale.
// Modifie ce fichier pour changer le contenu : aucune autre édition requise.
// Tout le texte est en français. Les valeurs numériques sont des exemples éditables.

window.CHIARA_DATA = {

  // ─── Métadonnées globales ──────────────────────────────────────────────────
  meta: {
    title: "Chiara Locale",
    subtitle: "Une assistante IA locale, orchestrée, connectée, prudente et évolutive",
    centerName: "Centre de commande Hermes Agent",
    date: "juin 2026",
    badges: ["Hermes Agent v0.16.0", "Cerveau : OpenAI Codex 5.5", "Interface : Telegram + Desktop + CLI PowerShell"],
    hermesPath: "C:\\Users\\esade\\AppData\\Local\\hermes",
    tagline: "Chiara locale — système IA personnel organisé par JLV"
  },

  // ─── Tags de filtrage (8 tags exacts) ─────────────────────────────────────
  tags: ["Cerveau","Orchestration","Skill","Agent","Gateway","Média","Sécurité","Cron"],

  // ─── Section 1 : 5 piliers d'accueil ──────────────────────────────────────
  pillars: [
    {
      icon: "brain",
      title: "Penser",
      text: "Chiara analyse chaque demande grâce à OpenAI Codex 5.5, comprend l'intention de Jean-Louis et choisit la stratégie la plus adaptée avant d'agir."
    },
    {
      icon: "orchestrate",
      title: "Orchestrer",
      text: "Hermes Agent v0.16.0 coordonne les skills, les agents spécialisés et les outils pour que chaque tâche soit traitée dans le bon ordre, sur le bon canal."
    },
    {
      icon: "act",
      title: "Agir",
      text: "Chiara exécute des actions concrètes — rédaction, envoi de messages, création de fichiers — en respectant toujours le principe de validation humaine avant toute opération sensible."
    },
    {
      icon: "produce",
      title: "Produire",
      text: "Le système génère des livrables de qualité professionnelle : rapports HTML, images, narrations audio en français et séquences vidéo Hyperframes prêts à diffuser."
    },
    {
      icon: "automate",
      title: "Automatiser",
      text: "Les tâches récurrentes sont planifiées via Cron — veille, sauvegardes, rapports périodiques — sans jamais automatiser une action destructive sans validation humaine explicite."
    }
  ],

  // ─── Flux principal de traitement ─────────────────────────────────────────
  flow: [
    "Jean-Louis",
    "Telegram / Desktop / CLI PowerShell / Mail / WhatsApp",
    "Chiara orchestratrice",
    "Hermes Agent v0.16.0",
    "OpenAI Codex 5.5 + Skills + Agents + Tools",
    "Rapports / Images / Audio / Vidéo / Actions / Cron"
  ],

  // ─── Section 2 : 11 briques d'architecture ────────────────────────────────
  architecture: [
    {
      key: "llm",
      brique: "LLM (Codex 5.5)",
      role: "Cerveau du système : comprend les demandes en langage naturel, génère du texte, du code et des décisions de routage.",
      exemple: "Analyser une question complexe et produire un plan d'action structuré en français.",
      risque: "vert",
      tag: "Cerveau",
      detail: "OpenAI Codex 5.5 est le moteur de raisonnement principal de Chiara. Il interprète chaque message entrant, détermine l'intention de l'utilisateur et sélectionne le workflow approprié. Son usage est en lecture-inférence : il ne modifie jamais directement les fichiers système. La sécurité repose sur le fait que toute action concrète passe par un skill ou un agent intermédiaire soumis à validation."
    },
    {
      key: "memoire",
      brique: "Mémoire",
      role: "Conserve le contexte des sessions précédentes, les préférences de Jean-Louis et les décisions importantes pour assurer une continuité entre les conversations.",
      exemple: "Retrouver le contexte d'un projet immobilier discuté la semaine précédente.",
      risque: "orange",
      tag: "Orchestration",
      detail: "La mémoire est stockée localement dans le dossier Hermes. Elle peut être lue (vert), mise à jour avec précaution (orange) mais jamais purgée sans confirmation explicite de l'utilisateur. Des sauvegardes régulières protègent contre toute corruption accidentelle."
    },
    {
      key: "sessions",
      brique: "Sessions",
      role: "Gère le cycle de vie de chaque conversation : ouverture, état courant, fermeture propre et archivage des échanges.",
      exemple: "Reprendre une session interrompue avec tout son contexte intact.",
      risque: "vert",
      tag: "Orchestration",
      detail: "Chaque session Hermes est identifiée par un UUID unique et horodatée. La lecture des sessions est toujours sans risque. La fermeture d'une session en cours doit être faite proprement pour éviter la perte de données en mémoire tampon."
    },
    {
      key: "tools",
      brique: "Tools",
      role: "Ensemble de fonctions techniques que Chiara peut appeler pour interagir avec le système de fichiers, le réseau ou des API externes.",
      exemple: "Appeler l'API météo pour enrichir un rapport de veille quotidien.",
      risque: "orange",
      tag: "Gateway",
      detail: "Les tools sont les bras opérationnels de Chiara. Chaque outil dispose d'un niveau de risque déclaré. Les tools en lecture (Get-ChildItem, curl GET) sont verts ; ceux qui écrivent ou appellent des API avec effets de bord sont orange et nécessitent un contrôle préalable."
    },
    {
      key: "skills",
      brique: "Skills",
      role: "Procédures réutilisables pré-définies qui encapsulent un workflow complet : entrée, traitement, sortie, validation.",
      exemple: "Déclencher le skill 'rapport-html-premium' pour générer un document structuré en un seul appel.",
      risque: "vert",
      tag: "Skill",
      detail: "Les skills sont la bibliothèque de savoir-faire de Chiara. Chaque skill est documenté, testé et validé avant intégration. Ils réduisent le risque d'erreur en standardisant les workflows complexes. Un skill orange requiert une confirmation utilisateur avant exécution."
    },
    {
      key: "agents",
      brique: "Agents",
      role: "Modules autonomes spécialisés qui reçoivent une délégation de Chiara pour accomplir une mission ciblée dans leur domaine d'expertise.",
      exemple: "L'Agent Vidéo Hyperframes prend en charge la génération d'un clip à partir d'un script fourni.",
      risque: "orange",
      tag: "Agent",
      detail: "Les agents sont des sous-systèmes semi-autonomes. Chiara leur délègue des tâches mais reste maître d'œuvre. Chaque agent rapporte son résultat pour validation avant livraison finale. Un agent ne peut jamais effectuer d'action destructive sans remontée explicite à l'utilisateur."
    },
    {
      key: "gateways",
      brique: "Gateways",
      role: "Points d'entrée et de sortie vers les interfaces externes : Telegram, Mail, WhatsApp, Desktop — chaque gateway normalise les échanges entrants et sortants.",
      exemple: "Le gateway Telegram reçoit un message vocal, le transcrit et le transmet à Chiara pour traitement.",
      risque: "orange",
      tag: "Gateway",
      detail: "Les gateways sont les frontières du système. Ils filtrent les entrées pour éviter les injections malveillantes et formalisent les sorties pour garantir un rendu cohérent. Tout problème de connectivité (token expiré, timeout réseau) est remonté via un log sans tenter de correction automatique."
    },
    {
      key: "connecteurs",
      brique: "Connecteurs",
      role: "Adaptateurs techniques qui relient Hermes Agent aux services tiers : API REST, webhooks, services cloud — sans exposer de secrets dans les logs.",
      exemple: "Le connecteur OpenAI achemine les prompts vers Codex 5.5 en gérant le retry et le rate-limiting.",
      risque: "orange",
      tag: "Gateway",
      detail: "Les connecteurs gèrent la complexité des protocoles externes (authentification OAuth, HTTPS, JSON Schema). Les tokens et clés API sont stockés dans des variables d'environnement chiffrées, jamais en clair dans le code source. Un connecteur défaillant lève une alerte sans bloquer les autres modules."
    },
    {
      key: "fichiers",
      brique: "Fichiers",
      role: "Gestion locale des données : lecture, écriture, archivage et sauvegarde des documents, rapports et configurations dans la structure Hermes.",
      exemple: "Archiver un rapport HTML quotidien dans reports/ia/ avec horodatage automatique.",
      risque: "orange",
      tag: "Sécurité",
      detail: "L'accès aux fichiers suit une règle stricte : lire est toujours sûr, écrire demande de la prudence, supprimer est interdit sans validation humaine explicite. Toute opération d'écriture est précédée d'une vérification d'existence et d'un backup si le fichier cible est critique."
    },
    {
      key: "rapports",
      brique: "Rapports",
      role: "Production automatique de documents HTML structurés, professionnels et archivables — résumés exécutifs, tableaux, graphiques et recommandations.",
      exemple: "Générer le rapport IA hebdomadaire avec résumé, tableau de bord et actions recommandées, livré par mail.",
      risque: "vert",
      tag: "Média",
      detail: "Les rapports HTML sont le livrable principal de Chiara. Leur génération est entièrement non-destructive : Chiara crée un nouveau fichier horodaté sans jamais écraser les versions précédentes. Le style est sombre, professionnel et conçu pour l'archivage longue durée."
    },
    {
      key: "cron",
      brique: "Cron",
      role: "Planificateur de tâches automatisées : déclenche les workflows récurrents (rapports, sauvegardes, veille) à des fréquences définies.",
      exemple: "Déclencher la veille IA tous les lundis à 7h00 et envoyer le résumé par mail.",
      risque: "orange",
      tag: "Cron",
      detail: "Le Cron est puissant mais doit rester limité aux tâches de production. Il ne doit jamais déclencher une action destructive automatiquement. Toute tâche Cron sensible (sauvegarde avec remplacement, envoi vers des tiers) inclut une étape de validation ou de notification préalable."
    }
  ],

  // ─── Section 3 : Orchestration ────────────────────────────────────────────
  orchestration: {
    loop: [
      "Demande utilisateur",
      "Analyse",
      "Choix du workflow",
      "Skill ou agent",
      "Tool ou connecteur",
      "Production",
      "Vérification",
      "Livraison",
      "Mémoire / capitalisation"
    ],
    steps: [
      "reçoit la demande",
      "comprend l'intention",
      "choisit le bon canal",
      "mobilise un skill",
      "appelle un agent spécialisé si besoin",
      "utilise un outil",
      "produit un livrable",
      "demande validation humaine avant action sensible"
    ],
    joke: "Chiara ne doit pas devenir une stagiaire avec les droits administrateur sur une centrale nucléaire."
  },

  // ─── Section 4 : Interfaces (tableau comparatif, 5 entrées) ───────────────
  interfaces: [
    {
      nom: "Telegram",
      usage: "Interface principale du quotidien : envoi de demandes textuelles, vocales ou avec pièces jointes depuis mobile ou desktop.",
      avantage: "Disponible partout, notifications push instantanées, supporte les fichiers et les messages vocaux.",
      limite: "Requiert un gateway actif et un token valide ; les fichiers volumineux peuvent dépasser les limites de l'API Bot.",
      exemple: "Envoyer 'Génère le rapport IA de cette semaine' depuis le téléphone et recevoir le HTML en retour.",
      tag: "Gateway"
    },
    {
      nom: "Application Desktop",
      usage: "Interface graphique locale pour les sessions de travail longues, la visualisation de rapports et la gestion des fichiers Hermes.",
      avantage: "Accès direct au système de fichiers, interface riche, idéale pour les tâches de configuration ou d'analyse approfondie.",
      limite: "Disponible uniquement sur le poste local ; nécessite que l'application soit lancée manuellement.",
      exemple: "Ouvrir le cockpit pour consulter les logs du cron et ajuster les paramètres de sauvegarde.",
      tag: "Gateway"
    },
    {
      nom: "CLI PowerShell",
      usage: "Interface en ligne de commande pour les opérations techniques avancées, les scripts de maintenance et les diagnostics système.",
      avantage: "Contrôle total sur l'environnement, idéal pour l'automatisation et les tâches de développement ou de débogage.",
      limite: "Réservé aux utilisateurs maîtrisant la ligne de commande ; risque d'erreur élevé sans validation des commandes avant exécution.",
      exemple: "Lancer 'hermes status' pour vérifier l'état de tous les modules en cours d'exécution.",
      tag: "Gateway"
    },
    {
      nom: "Mail",
      usage: "Canal de communication asynchrone pour la livraison de rapports planifiés, les alertes et les échanges avec des tiers.",
      avantage: "Universel, archivable, adapté aux livrables formels et aux communications professionnelles externes.",
      limite: "Non adapté aux échanges temps réel ; la latence peut atteindre plusieurs minutes selon le serveur SMTP.",
      exemple: "Recevoir chaque lundi matin le rapport de veille IA formaté en HTML dans la boîte de réception.",
      tag: "Gateway"
    },
    {
      nom: "WhatsApp",
      usage: "Canal secondaire pour les notifications urgentes et les échanges informels, notamment depuis des contextes mobiles hors Telegram.",
      avantage: "Large adoption, messagerie chiffrée de bout en bout, support des médias et des messages vocaux.",
      limite: "Intégration via API Business uniquement, contraintes de templates pour les messages sortants, maturité plus faible dans Hermes.",
      exemple: "Recevoir une alerte WhatsApp si le gateway Telegram est indisponible depuis plus de 30 minutes.",
      tag: "Gateway"
    }
  ],

  // ─── Section 5 : Skills (8 cartes) ────────────────────────────────────────
  skills: [
    {
      id: "hermes-local-backup",
      objectif: "Effectuer une sauvegarde complète et horodatée de l'environnement Hermes local, incluant mémoire, skills, agents et configurations.",
      entree: "Commande manuelle ou déclencheur Cron avec indication du dossier de destination.",
      sortie: "Archive compressée horodatée déposée dans le dossier de sauvegarde désigné, avec rapport de succès.",
      outils: "PowerShell, compress-archive, outil Fichiers Hermes.",
      risque: "orange",
      validation: true,
      tag: "Skill"
    },
    {
      id: "rapport-html-premium",
      objectif: "Générer un rapport HTML professionnel en français avec résumé exécutif, tableaux, graphiques et recommandations, prêt à archiver ou diffuser.",
      entree: "Sujet du rapport, données brutes ou contexte conversationnel fourni par Jean-Louis.",
      sortie: "Fichier HTML autonome avec style sombre, sections structurées et horodatage, déposé dans reports/.",
      outils: "OpenAI Codex 5.5, template HTML interne, outil Fichiers.",
      risque: "vert",
      validation: false,
      tag: "Skill"
    },
    {
      id: "analyse-document",
      objectif: "Analyser un document (PDF, texte, image numérisée) pour en extraire les points clés, résumés, dates importantes et actions à mener.",
      entree: "Fichier document ou texte brut transmis via Telegram, Desktop ou CLI.",
      sortie: "Résumé structuré en français avec points clés, chronologie et liste d'actions recommandées.",
      outils: "OpenAI Codex 5.5, outil de lecture de fichiers, OCR si besoin.",
      risque: "vert",
      validation: false,
      tag: "Skill"
    },
    {
      id: "tts-audio-fr",
      objectif: "Convertir un texte en français en narration audio de haute qualité grâce à Gemini 3.1 Flash TTS, pour podcasts, messages vocaux ou rapports audio.",
      entree: "Texte en français, style de voix souhaité (neutre, professionnel, narratif), durée cible.",
      sortie: "Fichier audio MP3 ou WAV en français, nommé et horodaté, prêt à envoyer ou archiver.",
      outils: "Gemini 3.1 Flash TTS, outil Fichiers, connecteur Audio.",
      risque: "vert",
      validation: false,
      tag: "Média"
    },
    {
      id: "image-illustration",
      objectif: "Générer des visuels professionnels sur mesure — photos, illustrations, visuels LinkedIn, storyboards ou affiches — via Image 2.0.",
      entree: "Description détaillée du visuel souhaité, style graphique, format de sortie (carré, 16:9, portrait).",
      sortie: "Image en haute résolution au format demandé, nommée et déposée dans le dossier médias.",
      outils: "Image 2.0, outil Fichiers, connecteur Image.",
      risque: "vert",
      validation: false,
      tag: "Média"
    },
    {
      id: "veille-ia",
      objectif: "Effectuer une veille hebdomadaire sur l'actualité IA, les nouveaux modèles, les outils émergents et les bonnes pratiques pertinentes pour Jean-Louis.",
      entree: "Thèmes de veille configurés (IA générative, LLM, outils no-code, actualités sectorielle), fréquence cron.",
      sortie: "Rapport HTML de veille structuré avec résumé, liens sources, points notables et recommandations.",
      outils: "OpenAI Codex 5.5, connecteurs web, template rapport HTML.",
      risque: "vert",
      validation: false,
      tag: "Skill"
    },
    {
      id: "workflow-telegram",
      objectif: "Orchestrer le cycle complet d'une interaction Telegram : réception du message, traitement par Chiara, formatage de la réponse et renvoi sur le bon canal.",
      entree: "Message entrant via gateway Telegram (texte, vocal, fichier, commande).",
      sortie: "Réponse formatée envoyée sur Telegram, avec fichiers attachés si applicable et log de l'échange.",
      outils: "Gateway Telegram, OpenAI Codex 5.5, outil Fichiers, connecteur Bot API.",
      risque: "orange",
      validation: true,
      tag: "Gateway"
    },
    {
      id: "diagnostic-prudent",
      objectif: "Effectuer un diagnostic complet de l'état de Chiara en lecture seule, sans modifier ni redémarrer aucun composant.",
      entree: "Commande de diagnostic manuelle ou planifiée ; aucune donnée sensible requise en entrée.",
      sortie: "Rapport de santé système : état des modules, logs récents, alertes actives et recommandations prudentes.",
      outils: "PowerShell (lecture seule), outil Fichiers (lecture), Get-ChildItem, docker ps.",
      risque: "vert",
      validation: false,
      tag: "Sécurité"
    }
  ],

  // ─── Section 6 : Agents (10 agents + organigramme) ────────────────────────
  agents: [
    {
      nom: "Agent Documents",
      role: "Spécialiste de l'analyse et du traitement documentaire : extrait les informations clés des PDF, contrats, lettres et fichiers administratifs pour en produire des résumés actionnables.",
      tag: "Agent"
    },
    {
      nom: "Agent Vidéo Hyperframes",
      role: "Génère des séquences vidéo et clips courts à partir de scripts ou storyboards, en utilisant Hyperframes pour assembler images, narration et effets de manière cohérente.",
      tag: "Média"
    },
    {
      nom: "Agent Audio TTS",
      role: "Convertit des textes en narrations vocales françaises de haute qualité via Gemini 3.1 Flash TTS, pour les rapports audio, messages vocaux et contenus podcast.",
      tag: "Média"
    },
    {
      nom: "Agent Image 2.0",
      role: "Crée des visuels professionnels sur mesure — illustrations, photos générées, visuels LinkedIn et affiches — en interprétant les briefs créatifs de Jean-Louis.",
      tag: "Média"
    },
    {
      nom: "Agent Mail",
      role: "Gère l'envoi et la réception de courriels professionnels : rédaction, formatage HTML, planification d'envoi et archivage des échanges importants.",
      tag: "Gateway"
    },
    {
      nom: "Agent WhatsApp",
      role: "Assure les communications via WhatsApp Business : envoi de notifications, alertes urgentes et messages formatés selon les templates autorisés par l'API.",
      tag: "Gateway"
    },
    {
      nom: "Agent Maintenance",
      role: "Surveille l'état de santé de l'environnement Hermes, détecte les anomalies, déclenche les sauvegardes planifiées et signale tout écart sans intervenir de façon destructive.",
      tag: "Sécurité"
    },
    {
      nom: "Agent Sécurité",
      role: "Contrôle en permanence que les tokens, clés API et fichiers sensibles restent protégés ; alerte en cas d'exposition accidentelle et propose des actions correctives validées par l'utilisateur.",
      tag: "Sécurité"
    },
    {
      nom: "Agent Veille IA",
      role: "Collecte et synthétise l'actualité sur l'intelligence artificielle, les nouveaux modèles et les tendances technologiques pour fournir une veille hebdomadaire structurée.",
      tag: "Skill"
    },
    {
      nom: "Agent Rapport HTML",
      role: "Produit des rapports HTML premium en français : structure professionnelle, style sombre, graphiques intégrés et livraison automatique sur le canal désigné.",
      tag: "Média"
    }
  ],

  // ─── Organigramme des agents ───────────────────────────────────────────────
  agentTree: {
    root: "Chiara orchestratrice",
    children: [
      { name: "Agent Documents" },
      {
        name: "Agent Média",
        children: [
          { name: "Image 2.0" },
          { name: "Gemini TTS" },
          { name: "Hyperframes" }
        ]
      },
      {
        name: "Agent Communication",
        children: [
          { name: "Telegram" },
          { name: "Mail" },
          { name: "WhatsApp" }
        ]
      },
      { name: "Agent Maintenance" },
      { name: "Agent Veille" }
    ]
  },

  // ─── Section 7 : Médias ───────────────────────────────────────────────────
  media: {
    image: {
      titre: "Image 2.0",
      items: ["Photos","Illustrations","visuels LinkedIn","storyboards","affiches","miniatures"]
    },
    tts: {
      titre: "Gemini 3.1 Flash TTS",
      items: ["voix française","narration","rapports audio","messages vocaux","synthèse vocale"]
    },
    video: {
      titre: "Hyperframes",
      items: ["vidéos","scénarios","séquences animées","clips courts","storytelling visuel"]
    },
    pipeline: [
      "Idée",
      "Prompt",
      "Image / Audio / Vidéo",
      "Vérification",
      "Export",
      "Envoi Telegram / Mail / Archive"
    ],
    matrix: [
      {
        media: "Image",
        outil: "Image 2.0",
        entree: "Description textuelle du visuel : sujet, style graphique, format et ambiance souhaitée.",
        sortie: "Image haute résolution en PNG ou JPEG, nommée et prête à diffuser sur LinkedIn ou à archiver.",
        usage: "Création de visuels professionnels pour les publications, présentations et supports de communication de Jean-Louis."
      },
      {
        media: "Audio",
        outil: "Gemini 3.1 Flash TTS",
        entree: "Texte en français structuré, avec indications de ton (neutre, enthousiaste, professionnel) et durée cible.",
        sortie: "Fichier audio MP3 en voix française naturelle, prêt à intégrer dans un rapport, un podcast ou un message vocal.",
        usage: "Narration de rapports, création de messages vocaux et production de contenus audio pour diffusion Telegram ou archivage."
      },
      {
        media: "Vidéo",
        outil: "Hyperframes",
        entree: "Script narratif ou storyboard séquentiel, avec images sources, textes d'incrustation et rythme souhaité.",
        sortie: "Clip vidéo MP4 assemblé, avec transitions, narration synchronisée et export prêt à publier.",
        usage: "Production de vidéos explicatives, clips de storytelling et séquences animées pour les projets créatifs ou professionnels."
      }
    ]
  },

  // ─── Section 8 : Cron ─────────────────────────────────────────────────────
  cron: {
    timeline: [
      "Tous les jours",
      "Toutes les semaines",
      "Tous les 15 jours",
      "Tous les mois",
      "À la demande"
    ],
    rule: "Automatiser la production, oui. Automatiser une action sensible sans validation, non.",
    tasks: [
      { tache: "Rapport quotidien",      frequence: "Tous les jours",       sortie: "HTML",    canal: "Telegram", validation: "Non" },
      { tache: "Veille hebdomadaire",    frequence: "Toutes les semaines",   sortie: "HTML",    canal: "Mail",     validation: "Non" },
      { tache: "Sauvegarde locale",      frequence: "Tous les 15 jours",     sortie: "Archive", canal: "Desktop",  validation: "Oui" },
      { tache: "Rapport mensuel",        frequence: "Tous les mois",         sortie: "HTML",    canal: "Mail",     validation: "Non" },
      { tache: "Contrôle connecteurs",   frequence: "Toutes les semaines",   sortie: "Log",     canal: "Desktop",  validation: "Non" },
      { tache: "Alertes conditionnelles",frequence: "À la demande",          sortie: "Message", canal: "Telegram", validation: "Oui" }
    ]
  },

  // ─── Section 9 : Rapports ─────────────────────────────────────────────────
  reports: {
    tree: [
      "reports/",
      "  ia/",
      "  documents/",
      "  meteo/",
      "  btc/",
      "  famille/",
      "  maintenance/",
      "  medias/"
    ],
    cards: [
      "Rapport IA hebdomadaire",
      "Rapport document administratif",
      "Rapport météo",
      "Rapport BTC prudent",
      "Rapport maintenance Hermes",
      "Rapport sauvegarde locale",
      "Rapport média"
    ],
    mockup: {
      titre: "Rapport IA hebdomadaire",
      date: "juin 2026",
      sections: [
        "Résumé exécutif",
        "Points clés",
        "Tableau",
        "Graphique",
        "Actions recommandées",
        "Sources",
        "Annexe technique"
      ]
    }
  },

  // ─── Section 10 : Sécurité ────────────────────────────────────────────────
  security: {
    secrets: [
      "Tokens Telegram",
      "API keys",
      ".env",
      "sauvegardes",
      "logs",
      "dossiers sensibles"
    ],
    table: [
      {
        risque: "Fuite de token",
        exemple: "Token Telegram dans un fichier partagé",
        prevention: "Stocker tous les tokens exclusivement dans des variables d'environnement chiffrées ou dans un fichier .env non versionné ; ne jamais les afficher dans les logs.",
        niveau: "rouge"
      },
      {
        risque: "Suppression accidentelle",
        exemple: "rm -rf dans le mauvais dossier",
        prevention: "Toujours demander une confirmation humaine explicite avant toute suppression ; effectuer une sauvegarde préalable et travailler en lecture seule par défaut.",
        niveau: "rouge"
      },
      {
        risque: "Config modifiée sans backup",
        exemple: "Édition directe de hermes.config.json sans copie préalable",
        prevention: "Dupliquer le fichier de configuration en backup horodaté avant toute modification ; utiliser le skill hermes-local-backup systématiquement.",
        niveau: "orange"
      },
      {
        risque: "Lecture de données sensibles",
        exemple: "Affichage du contenu d'un fichier .env dans un rapport",
        prevention: "Filtrer automatiquement les chemins et patterns sensibles (.env, *.key, token, secret) lors de la génération de rapports ou de logs.",
        niveau: "vert"
      }
    ],
    commands: {
      vert:   ["Get-ChildItem", "pwd", "ls -lah", "docker ps"],
      orange: ["cp fichier backup", "nano fichier", "docker compose restart"],
      rouge:  ["rm -rf *", "docker compose down -v", "chmod -R 777"]
    }
  },

  // ─── Section 11 : Diagnostic ──────────────────────────────────────────────
  diagnostic: {
    method: [
      "Est-ce que Desktop fonctionne ?",
      "Est-ce que Telegram répond ?",
      "Est-ce que CLI PowerShell répond ?",
      "Est-ce que le modèle Codex 5.5 est actif ?",
      "Est-ce que le gateway tourne ?",
      "Est-ce que les logs montrent une erreur ?",
      "Est-ce que les fichiers sont accessibles ?",
      "Est-ce qu'une sauvegarde récente existe ?"
    ],
    table: [
      {
        symptome: "Telegram ne répond plus",
        test: "Vérifier le gateway",
        cause: "Gateway arrêté",
        action: "Redémarrage prudent après validation"
      },
      {
        symptome: "Pas de réponse Codex",
        test: "Vérifier l'état du modèle",
        cause: "Modèle inactif",
        action: "Relancer la session"
      },
      {
        symptome: "Rapport non généré",
        test: "Vérifier le cron",
        cause: "Tâche en échec",
        action: "Consulter les logs"
      }
    ]
  },

  // ─── Section 12 : Roadmap (5 priorités) ───────────────────────────────────
  roadmap: [
    {
      priorite: "Priorité 1",
      items: ["cockpit personnel HTML", "documentation premium", "sauvegardes locales", "Telegram stable"]
    },
    {
      priorite: "Priorité 2",
      items: ["documents intelligents", "rapports HTML automatiques", "skills propres", "organisation des dossiers"]
    },
    {
      priorite: "Priorité 3",
      items: ["audio TTS", "images", "vidéo Hyperframes", "mails"]
    },
    {
      priorite: "Priorité 4",
      items: ["WhatsApp", "calendrier", "base documentaire", "veille IA avancée"]
    },
    {
      priorite: "Priorité 5",
      items: ["agents spécialisés", "connecteurs plus profonds", "supervision avancée"]
    }
  ],

  // ─── Section 13 : Maturité (valeurs fictives, exemples éditables, 0–100) ──
  maturity: [
    { domaine: "Orchestration",   valeur: 75 },
    { domaine: "Telegram",        valeur: 80 },
    { domaine: "Desktop",         valeur: 70 },
    { domaine: "CLI",             valeur: 65 },
    { domaine: "Skills",          valeur: 55 },
    { domaine: "Agents",          valeur: 40 },
    { domaine: "Mail",            valeur: 45 },
    { domaine: "WhatsApp",        valeur: 25 },
    { domaine: "Image",           valeur: 60 },
    { domaine: "Audio",           valeur: 50 },
    { domaine: "Vidéo",           valeur: 35 },
    { domaine: "Cron",            valeur: 60 },
    { domaine: "Sécurité",        valeur: 70 },
    { domaine: "Documentation",   valeur: 85 }
  ],

  // ─── Donut répartition modules (valeurs fictives en %) ────────────────────
  modulesShare: [
    { nom: "Orchestration",  valeur: 25, couleur: "#c9a24b" },
    { nom: "Communication",  valeur: 20, couleur: "#4ea3ff" },
    { nom: "Média",          valeur: 18, couleur: "#7c5cff" },
    { nom: "Automatisation", valeur: 15, couleur: "#3fb27f" },
    { nom: "Sécurité",       valeur: 12, couleur: "#e0564a" },
    { nom: "Documentation",  valeur: 10, couleur: "#e6c878" }
  ],

  // ─── Jauges risque familles d'actions ─────────────────────────────────────
  riskFamilies: [
    { famille: "Lecture seule",          niveau: "vert",   valeur: 10 },
    { famille: "Modification prudente",  niveau: "orange", valeur: 55 },
    { famille: "Action destructive",     niveau: "rouge",  valeur: 95 }
  ],

  // ─── Section 14 : Prompts copiables ───────────────────────────────────────
  prompts: [
    {
      titre: "Prompt audit prudent",
      texte: "Fais un audit prudent de Chiara locale en lecture seule.\nNe modifie rien.\nNe redémarre rien.\nNe supprime rien.\nListe uniquement l'état général, les points OK, les alertes et les actions recommandées."
    },
    {
      titre: "Prompt rapport HTML",
      texte: "Crée un rapport HTML premium en français sur le sujet suivant.\nStructure : résumé exécutif, contexte, tableau, graphique, analyse, risques, recommandations, conclusion.\nStyle : sombre, professionnel, clair, prêt à archiver."
    },
    {
      titre: "Prompt média",
      texte: "Prépare un workflow média complet :\n1. idée,\n2. script,\n3. prompt image,\n4. prompt audio TTS,\n5. prompt vidéo Hyperframes,\n6. plan d'export,\n7. message Telegram final."
    },
    {
      titre: "Prompt sauvegarde locale",
      texte: "Vérifie l'état des sauvegardes locales Hermes.\nLecture seule.\nIndique la dernière sauvegarde, le nombre de sauvegardes conservées, la taille approximative et les recommandations."
    }
  ]

};
