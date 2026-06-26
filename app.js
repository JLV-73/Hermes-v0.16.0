// app.js — Moteur de rendu data-driven + interactions. Aucune dépendance.
(function () {
  "use strict";

  // Source de données injectée par data.js
  var D = window.CHIARA_DATA;

  // ─────────────────────────────────────────────────────────────
  // Helpers DOM
  // ─────────────────────────────────────────────────────────────

  /**
   * Crée un élément HTML avec attributs et enfants optionnels.
   * @param {string} tag  - nom de la balise
   * @param {Object} attrs - { class, html, text, href, ... }
   * @param {Array}  children - tableau de nœuds ou chaînes
   */
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class")      n.className = attrs[k];
        else if (k === "html")  n.innerHTML = attrs[k];
        else if (k === "text")  n.textContent = attrs[k];
        else                    n.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      n.appendChild(
        typeof c === "string" ? document.createTextNode(c) : c
      );
    });
    return n;
  }

  /**
   * Retourne un <span class="tag"> pour une étiquette donnée.
   * @param {string} t - texte de l'étiquette
   */
  function tagPill(t) {
    return el("span", { class: "tag", "data-tag": t, text: t });
  }

  /**
   * Retourne un badge de niveau de risque coloré.
   * @param {string} level - "vert" | "orange" | "rouge"
   */
  function riskBadge(level) {
    var map = { vert: "Lecture seule", orange: "Prudence", rouge: "Danger" };
    return el("span", {
      class: "risk-" + level + " risk-badge",
      text: map[level] || level
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Tableau des 13 sections (id, libellé affiché dans la nav)
  // ─────────────────────────────────────────────────────────────
  var SECTIONS = [
    ["accueil",       "Accueil"],
    ["architecture",  "Architecture"],
    ["orchestratrice","Orchestratrice"],
    ["interfaces",    "Interfaces"],
    ["skills",        "Skills"],
    ["agents",        "Agents"],
    ["media",         "Studio Média"],
    ["cron",          "Cron"],
    ["rapports",      "Rapports HTML"],
    ["securite",      "Sécurité"],
    ["diagnostic",    "Diagnostic"],
    ["roadmap",       "Roadmap"],
    ["prompts",       "Prompts"]
  ];

  // ─────────────────────────────────────────────────────────────
  // Navigation latérale — construction dynamique
  // ─────────────────────────────────────────────────────────────

  /**
   * Injecte les <li><a> dans la liste de navigation latérale.
   * Adapation : l'index.html expose <ul id="sidebar-nav"> ;
   * on cible cet id directement (plus précis que #sidebar ul).
   */
  function buildNav() {
    var ul = document.getElementById("sidebar-nav");
    if (!ul) { console.warn("buildNav : #sidebar-nav introuvable"); return; }
    ul.innerHTML = "";
    SECTIONS.forEach(function (s) {
      var a = el("a", { href: "#" + s[0], text: s[1] });
      // Fermer le drawer mobile au clic
      a.addEventListener("click", function () { closeDrawer(); });
      ul.appendChild(el("li", null, [a]));
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Scroll-spy — IntersectionObserver sur les sections
  // ─────────────────────────────────────────────────────────────

  /**
   * Surveille la visibilité de chaque section et met à jour
   * la classe .is-active sur le lien de nav correspondant.
   */
  function initScrollSpy() {
    // Construire un index id → <a>
    var links = {};
    document.querySelectorAll("#sidebar-nav a").forEach(function (a) {
      var id = a.getAttribute("href").slice(1); // retire le '#'
      links[id] = a;
    });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          // Retirer is-active de tous les liens
          Object.keys(links).forEach(function (id) {
            links[id].classList.remove("is-active");
          });
          // Activer le lien de la section visible
          if (links[e.target.id]) {
            links[e.target.id].classList.add("is-active");
          }
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    // Observer toutes les sections du main
    document.querySelectorAll("main .section").forEach(function (s) {
      obs.observe(s);
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Drawer mobile — ouverture / fermeture de la sidebar
  // ─────────────────────────────────────────────────────────────

  /**
   * Ferme la sidebar en retirant la classe .open.
   */
  function closeDrawer() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.remove("open");
  }

  /**
   * Branche l'événement click sur le bouton #navToggle
   * pour basculer la classe .open sur la sidebar.
   */
  function initDrawer() {
    var toggle = document.getElementById("navToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        document.getElementById("sidebar").classList.toggle("open");
      });
    }
  }

  // ─────────────────────────────────────────────────────────────
  // API interne — partagée avec les tâches 5-7 (même fichier)
  // ─────────────────────────────────────────────────────────────
  window.__chiara = { el: el, tagPill: tagPill, riskBadge: riskBadge };

  // ═════════════════════════════════════════════════════════════
  // HELPERS PARTAGÉS — Tâche 5
  // ═════════════════════════════════════════════════════════════

  /**
   * Construit un tableau HTML enveloppé dans .table-wrap.
   * @param {string[]} headers  - libellés de colonnes
   * @param {Element[]} rows    - nœuds <tr> déjà construits
   * @returns {Element} div.table-wrap
   */
  function buildTable(headers, rows) {
    var wrap  = el("div", { class: "table-wrap" });
    var t     = el("table", { class: "table" });
    var thead = el("thead", null, [
      el("tr", null, headers.map(function (h) { return el("th", { text: h }); }))
    ]);
    var tbody = el("tbody", null, rows);
    t.appendChild(thead);
    t.appendChild(tbody);
    wrap.appendChild(t);
    return wrap;
  }

  /**
   * Construit récursivement un nœud <li> pour un arbre d'agents.
   * @param {Object} node - { name|root, children? }
   * @returns {Element} li
   */
  function renderTree(node) {
    var label = node.name || node.root;
    var li    = el("li", null, [el("span", { class: "tree-node", text: label })]);
    var kids  = node.children;
    if (kids && kids.length) {
      var ul = el("ul", { class: "tree" });
      kids.forEach(function (c) { ul.appendChild(renderTree(c)); });
      li.appendChild(ul);
    }
    return li;
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 1 — Accueil
  // ═════════════════════════════════════════════════════════════

  function renderAccueil() {
    var b = document.getElementById("accueil-body");

    // Sous-titre et badges depuis D.meta
    b.appendChild(el("p", { class: "lead", text: D.meta.subtitle }));

    var badges = el("div", { class: "badge-row" });
    D.meta.badges.forEach(function (x) {
      badges.appendChild(el("span", { class: "badge", text: x }));
    });
    b.appendChild(badges);

    // 5 piliers en grille de cartes
    var grid = el("div", { class: "card-grid" });
    D.pillars.forEach(function (p) {
      grid.appendChild(el("article", { class: "card glass reveal" }, [
        el("h3", { text: p.title }),
        el("p",  { text: p.text  })
      ]));
    });
    b.appendChild(grid);

    // Flux principal de traitement avec flèches verticales
    var flow = el("div", { class: "flow" });
    D.flow.forEach(function (step, i) {
      flow.appendChild(el("div", { class: "flow-step glass reveal", text: step }));
      if (i < D.flow.length - 1) {
        flow.appendChild(el("div", { class: "flow-arrow", html: "&#x2193;" }));
      }
    });
    b.appendChild(flow);

    // Point de montage du donut répartition modules (Tâche 7)
    b.appendChild(el("div", { id: "chart-modules", class: "chart-mount" }));
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 2 — Architecture
  // ═════════════════════════════════════════════════════════════

  function renderArchitecture() {
    var b = document.getElementById("architecture-body");

    // Schéma visuel du flux global (asset livré avec l'application)
    var fig = el("figure", { class: "schema-figure" }, [
      el("img", { class: "schema-img", src: "assets/architecture-schema.svg", alt: "Schéma vertical du flux : Jean-Louis → interfaces → Chiara → Hermes Agent → Codex/Skills/Agents/Tools → livrables", loading: "lazy" }),
      el("figcaption", { class: "muted small", text: "Flux global de la Chiara locale (schéma éditable : assets/architecture-schema.svg)." })
    ]);
    b.appendChild(fig);

    // Tableau des 11 briques, chaque ligne cliquable via data-detail-key
    var rows = D.architecture.map(function (a) {
      return el("tr", { "data-tags": a.tag, "data-detail-key": a.key }, [
        el("td", null, [
          el("button", { class: "link-cell", "data-detail-key": a.key, text: a.brique })
        ]),
        el("td", { text: a.role }),
        el("td", { text: a.exemple }),
        el("td", null, [riskBadge(a.risque)])
      ]);
    });
    b.appendChild(buildTable(["Brique", "Rôle", "Exemple dans Chiara locale", "Niveau de risque"], rows));

    // Panneau de détail vide — câblage Tâche 6
    b.appendChild(el("div", {
      class: "detail-panel glass",
      id: "arch-detail",
      html: "<em>Clique une brique pour voir le détail.</em>"
    }));
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 3 — Orchestratrice
  // ═════════════════════════════════════════════════════════════

  function renderOrchestratrice() {
    var b = document.getElementById("orchestratrice-body");

    // Liste numérotée des étapes de l'orchestratrice
    var ol = el("ol", { class: "steps-list" });
    D.orchestration.steps.forEach(function (s) {
      ol.appendChild(el("li", { text: s }));
    });
    b.appendChild(ol);

    // Boucle d'orchestration en flux vertical
    b.appendChild(el("h3", { class: "subsection-title", text: "Boucle d'orchestration" }));
    var flow = el("div", { class: "flow" });
    D.orchestration.loop.forEach(function (step, i) {
      flow.appendChild(el("div", { class: "flow-step glass reveal", text: step }));
      if (i < D.orchestration.loop.length - 1) {
        flow.appendChild(el("div", { class: "flow-arrow", html: "&#x2193;" }));
      }
    });
    b.appendChild(flow);

    // Callout humour / mise en garde
    b.appendChild(el("div", { class: "callout joke", text: D.orchestration.joke }));
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 4 — Interfaces
  // ═════════════════════════════════════════════════════════════

  function renderInterfaces() {
    var b = document.getElementById("interfaces-body");

    // Tableau comparatif des 5 interfaces
    var rows = D.interfaces.map(function (iface) {
      return el("tr", { "data-tags": iface.tag }, [
        el("td", null, [el("strong", { text: iface.nom })]),
        el("td", { text: iface.usage }),
        el("td", { text: iface.avantage }),
        el("td", { text: iface.limite }),
        el("td", { text: iface.exemple })
      ]);
    });
    b.appendChild(buildTable(
      ["Interface", "Usage idéal", "Avantage", "Limite", "Exemple de demande"],
      rows
    ));
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 5 — Skills
  // ═════════════════════════════════════════════════════════════

  function renderSkills() {
    var b    = document.getElementById("skills-body");
    var grid = el("div", { class: "card-grid" });

    D.skills.forEach(function (s) {
      // Blob de recherche pour filtrage Tâche 6
      var searchBlob = [s.id, s.objectif, s.entree, s.sortie, s.outils, s.tag].join(" ");

      var card = el("article", {
        class: "card glass reveal",
        "data-tags": s.tag,
        "data-search": searchBlob
      }, [
        el("h3", { text: s.id }),
        el("p",  { class: "skill-objectif", text: s.objectif }),
        el("dl", { class: "skill-details" }, [
          el("dt", { text: "Entrée" }), el("dd", { text: s.entree }),
          el("dt", { text: "Sortie" }), el("dd", { text: s.sortie }),
          el("dt", { text: "Outils" }), el("dd", { text: s.outils })
        ]),
        riskBadge(s.risque),
        el("span", {
          class: "validation-chip",
          text: "Validation humaine : " + (s.validation ? "oui" : "non")
        }),
        tagPill(s.tag)
      ]);
      grid.appendChild(card);
    });

    b.appendChild(grid);
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 6 — Agents
  // ═════════════════════════════════════════════════════════════

  function renderAgents() {
    var b    = document.getElementById("agents-body");
    var grid = el("div", { class: "card-grid" });

    // Cartes des 10 agents
    D.agents.forEach(function (agent) {
      grid.appendChild(el("article", {
        class: "card glass reveal",
        "data-tags": agent.tag
      }, [
        el("h3", { text: agent.nom }),
        el("p",  { text: agent.role }),
        tagPill(agent.tag)
      ]));
    });
    b.appendChild(grid);

    // Organigramme récursif
    b.appendChild(el("h3", { class: "subsection-title", text: "Organigramme des agents" }));
    var rootUl = el("ul", { class: "tree" });
    rootUl.appendChild(renderTree(D.agentTree));
    b.appendChild(rootUl);
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 7 — Médias
  // ═════════════════════════════════════════════════════════════

  function renderMedia() {
    var b = document.getElementById("media-body");

    // 3 cartes : image / tts / vidéo
    var mediaKeys = ["image", "tts", "video"];
    var grid = el("div", { class: "card-grid" });
    mediaKeys.forEach(function (k) {
      var m   = D.media[k];
      var ul  = el("ul", null);
      m.items.forEach(function (item) { ul.appendChild(el("li", { text: item })); });
      grid.appendChild(el("article", { class: "card glass reveal" }, [
        el("h3", { text: m.titre }),
        ul
      ]));
    });
    b.appendChild(grid);

    // Pipeline de production en flux vertical
    b.appendChild(el("h3", { class: "subsection-title", text: "Pipeline de production" }));
    var flow = el("div", { class: "flow" });
    D.media.pipeline.forEach(function (step, i) {
      flow.appendChild(el("div", { class: "flow-step glass reveal", text: step }));
      if (i < D.media.pipeline.length - 1) {
        flow.appendChild(el("div", { class: "flow-arrow", html: "&#x2193;" }));
      }
    });
    b.appendChild(flow);

    // Matrice outil / entrée / sortie / usage
    b.appendChild(el("h3", { class: "subsection-title", text: "Matrice des outils médias" }));
    var rows = D.media.matrix.map(function (m) {
      return el("tr", null, [
        el("td", { text: m.media }),
        el("td", { text: m.outil }),
        el("td", { text: m.entree }),
        el("td", { text: m.sortie }),
        el("td", { text: m.usage })
      ]);
    });
    b.appendChild(buildTable(["Média", "Outil", "Entrée", "Sortie", "Usage"], rows));
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 8 — Cron
  // ═════════════════════════════════════════════════════════════

  function renderCron() {
    var b = document.getElementById("cron-body");

    // Frise chronologique des fréquences
    var timeline = el("div", { class: "timeline" });
    D.cron.timeline.forEach(function (t) {
      timeline.appendChild(el("div", { class: "timeline-item glass", text: t }));
    });
    b.appendChild(timeline);

    // Tableau des tâches planifiées
    b.appendChild(el("h3", { class: "subsection-title", text: "Tâches planifiées" }));
    var rows = D.cron.tasks.map(function (task) {
      return el("tr", null, [
        el("td", { text: task.tache }),
        el("td", { text: task.frequence }),
        el("td", { text: task.sortie }),
        el("td", { text: task.canal }),
        el("td", { text: task.validation })
      ]);
    });
    b.appendChild(buildTable(["Tâche", "Fréquence", "Sortie", "Canal", "Validation"], rows));

    // Règle d'or du Cron
    b.appendChild(el("div", { class: "callout", text: D.cron.rule }));
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 9 — Rapports
  // ═════════════════════════════════════════════════════════════

  function renderRapports() {
    var b = document.getElementById("rapports-body");

    // Arborescence des dossiers
    b.appendChild(el("h3", { class: "subsection-title", text: "Arborescence des rapports" }));
    var pre = el("pre", { class: "tree-pre" });
    pre.textContent = D.reports.tree.join("\n");
    b.appendChild(pre);

    // Grille des types de rapports
    b.appendChild(el("h3", { class: "subsection-title", text: "Types de rapports" }));
    var grid = el("div", { class: "card-grid" });
    D.reports.cards.forEach(function (name) {
      grid.appendChild(el("article", { class: "card glass reveal" }, [
        el("h3", { text: name })
      ]));
    });
    b.appendChild(grid);

    // Maquette d'un rapport HTML premium
    b.appendChild(el("h3", { class: "subsection-title", text: "Maquette de rapport" }));
    var mock = D.reports.mockup;
    var sectList = el("ol", { class: "mockup-sections" });
    mock.sections.forEach(function (s) {
      sectList.appendChild(el("li", { text: s }));
    });
    b.appendChild(el("div", { class: "report-mockup glass" }, [
      el("div", { class: "mockup-header" }, [
        el("h3", { text: mock.titre }),
        el("span", { class: "mockup-date", text: mock.date })
      ]),
      sectList
    ]));
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 10 — Sécurité
  // ═════════════════════════════════════════════════════════════

  /**
   * Construit une ligne de commande dans un panneau de risque.
   * @param {string} cmd   - texte de la commande
   * @param {string} level - "vert" | "orange" | "rouge"
   * @returns {Element} div.command-line
   */
  function renderCommand(cmd, level) {
    var wrap = el("div", { class: "command-line command-" + level });
    wrap.appendChild(el("code", { text: cmd }));
    if (level === "rouge") {
      // Commandes dangereuses : label d'avertissement, sans bouton copie
      wrap.setAttribute("data-danger", "true");
      wrap.appendChild(el("span", { class: "danger-label", text: "⚠ à ne jamais lancer" }));
    } else {
      // Vert et orange : bouton copie câblé par Tâche 6
      var btn = el("button", {
        class: "copy-btn",
        "data-copy": cmd,
        text: "Copier",
        "aria-label": "Copier la commande"
      });
      wrap.appendChild(btn);
    }
    return wrap;
  }

  function renderSecurite() {
    var b = document.getElementById("securite-body");

    // Liste des secrets à protéger
    b.appendChild(el("h3", { class: "subsection-title", text: "Secrets à ne jamais exposer" }));
    var ul = el("ul", { class: "secrets-list" });
    D.security.secrets.forEach(function (s) { ul.appendChild(el("li", { text: s })); });
    b.appendChild(ul);

    // Tableau des risques avec badges
    b.appendChild(el("h3", { class: "subsection-title", text: "Tableau des risques" }));
    var rows = D.security.table.map(function (row) {
      return el("tr", { "data-tags": "Sécurité" }, [
        el("td", { text: row.risque }),
        el("td", { text: row.exemple }),
        el("td", { text: row.prevention }),
        el("td", null, [riskBadge(row.niveau)])
      ]);
    });
    b.appendChild(buildTable(["Risque", "Exemple", "Prévention", "Niveau"], rows));

    // Trois panneaux de commandes par niveau de risque
    b.appendChild(el("h3", { class: "subsection-title", text: "Commandes par niveau de risque" }));

    // Panneau vert — commandes sûres
    var panelVert = el("div", { class: "risk-vert risk-panel" });
    panelVert.appendChild(el("h4", { text: "Commandes vertes (lecture seule)" }));
    D.security.commands.vert.forEach(function (cmd) {
      panelVert.appendChild(renderCommand(cmd, "vert"));
    });
    b.appendChild(panelVert);

    // Panneau orange — commandes avec prudence
    var panelOrange = el("div", { class: "risk-orange risk-panel" });
    panelOrange.appendChild(el("h4", { text: "Commandes orange (prudence requise)" }));
    D.security.commands.orange.forEach(function (cmd) {
      panelOrange.appendChild(renderCommand(cmd, "orange"));
    });
    b.appendChild(panelOrange);

    // Panneau rouge — commandes interdites, sans copie
    var panelRouge = el("div", { class: "risk-rouge risk-panel" });
    panelRouge.appendChild(el("h4", { text: "Commandes rouges (à ne jamais lancer)" }));
    D.security.commands.rouge.forEach(function (cmd) {
      panelRouge.appendChild(renderCommand(cmd, "rouge"));
    });
    b.appendChild(panelRouge);
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 11 — Diagnostic
  // ═════════════════════════════════════════════════════════════

  function renderDiagnostic() {
    var b = document.getElementById("diagnostic-body");

    // Liste ordonnée de la méthode de diagnostic
    b.appendChild(el("h3", { class: "subsection-title", text: "Méthode de diagnostic prudente" }));
    var ol = el("ol", { class: "steps-list" });
    D.diagnostic.method.forEach(function (q) {
      ol.appendChild(el("li", { text: q }));
    });
    b.appendChild(ol);

    // Tableau symptôme / test / cause / action
    b.appendChild(el("h3", { class: "subsection-title", text: "Cas courants" }));
    var rows = D.diagnostic.table.map(function (row) {
      return el("tr", null, [
        el("td", { text: row.symptome }),
        el("td", { text: row.test }),
        el("td", { text: row.cause }),
        el("td", { text: row.action })
      ]);
    });
    b.appendChild(buildTable(
      ["Symptôme", "Test prudent", "Cause probable", "Action recommandée"],
      rows
    ));
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 12 — Roadmap
  // ═════════════════════════════════════════════════════════════

  function renderRoadmap() {
    var b    = document.getElementById("roadmap-body");
    var grid = el("div", { class: "card-grid" });

    // 5 cartes de priorités
    D.roadmap.forEach(function (p) {
      var ul = el("ul", null);
      p.items.forEach(function (item) { ul.appendChild(el("li", { text: item })); });
      grid.appendChild(el("article", { class: "card glass reveal" }, [
        el("h3", { text: p.priorite }),
        ul
      ]));
    });
    b.appendChild(grid);

    // Points de montage graphiques (Tâche 7)
    b.appendChild(el("div", { id: "chart-maturity", class: "chart-mount" }));
    b.appendChild(el("div", { id: "chart-risk",     class: "chart-mount" }));
  }

  // ═════════════════════════════════════════════════════════════
  // SECTION 13 — Prompts
  // ═════════════════════════════════════════════════════════════

  function renderPrompts() {
    var b    = document.getElementById("prompts-body");
    var grid = el("div", { class: "card-grid" });

    D.prompts.forEach(function (p) {
      var copyBtn = el("button", {
        class: "copy-btn",
        "data-copy": p.texte,
        text: "Copier",
        "aria-label": "Copier le prompt " + p.titre
      });

      grid.appendChild(el("article", {
        class: "card glass reveal",
        "data-search": p.titre + " " + p.texte
      }, [
        el("h3",  { text: p.titre }),
        el("pre", { class: "prompt-text", text: p.texte }),
        copyBtn
      ]));
    });

    b.appendChild(grid);
  }

  // ═════════════════════════════════════════════════════════════
  // INTERACTIONS — Tâche 6 : copie, recherche, filtres, détail
  // ═════════════════════════════════════════════════════════════

  // ── Copie fiable avec fallback file:// ──────────────────────

  function showToast(msg){
    var t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(function(){ t.classList.remove("show"); }, 1800);
  }
  function copyText(str){
    // navigator.clipboard échoue souvent en file:// → fallback execCommand
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(str).then(function(){ showToast("Copié ✓"); },
        function(){ legacyCopy(str); });
    } else { legacyCopy(str); }
  }
  function legacyCopy(str){
    var ta = document.createElement("textarea");
    ta.value = str; ta.setAttribute("readonly","");
    ta.style.position = "fixed"; ta.style.top = "-1000px";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); showToast("Copié ✓"); }
    catch(e){ showToast("Copie impossible — sélectionne et Ctrl+C"); }
    document.body.removeChild(ta);
  }
  function initCopy(){
    document.addEventListener("click", function(e){
      var btn = e.target.closest(".copy-btn"); if(!btn) return;
      copyText(btn.getAttribute("data-copy") || "");
    });
  }

  // ── Recherche + filtres par tag ──────────────────────────────

  function getFilterable(){ // cartes + lignes marquées (sections exclues)
    return Array.prototype.slice.call(document.querySelectorAll("[data-tags]:not(.section)"));
  }
  function applyFilters(){
    var searchEl = document.getElementById("search");
    var q = searchEl ? (searchEl.value || "").toLowerCase().trim() : "";
    var active = activeTag; // null = tous
    getFilterable().forEach(function(node){
      var tags = (node.getAttribute("data-tags")||"");
      var text = (node.getAttribute("data-search")|| node.textContent || "").toLowerCase();
      var okTag = !active || tags.split(/[ ,]+/).indexOf(active) !== -1;
      var okText = !q || text.indexOf(q) !== -1;
      node.classList.toggle("filtered-out", !(okTag && okText));
    });
  }
  var activeTag = null;
  function initSearch(){
    var s = document.getElementById("search");
    if (s) s.addEventListener("input", applyFilters);
  }
  function initFilters(){
    // barre de tags sous le header
    var bar = document.getElementById("tagbar");
    if (!bar) return;
    D.tags.forEach(function(t){
      var b = el("button",{class:"tag-filter","data-tag":t,text:t});
      b.addEventListener("click", function(){
        activeTag = (activeTag===t)? null : t;
        document.querySelectorAll(".tag-filter").forEach(function(x){ x.classList.remove("active"); });
        if (activeTag) b.classList.add("active");
        applyFilters();
      });
      bar.appendChild(b);
    });
    var clear = el("button",{class:"tag-filter clear",text:"Tout"});
    clear.addEventListener("click", function(){ activeTag=null; document.querySelectorAll(".tag-filter").forEach(function(x){x.classList.remove("active");}); applyFilters(); });
    bar.appendChild(clear);
  }

  // ─────────────────────────────────────────────────────────────
  // GRAPHIQUES SVG + ANIMATIONS — Tâche 7
  // ─────────────────────────────────────────────────────────────

  /**
   * Rend un donut SVG à partir de D.modulesShare.
   * Chaque segment est un cercle avec stroke-dasharray calculé.
   * @param {Element} mount - conteneur cible
   * @param {Array}   data  - [{nom, valeur, couleur}]
   */
  function renderDonut(mount, data){
    if(!mount) return;
    var total = data.reduce(function(s,d){return s+d.valeur;},0);
    var R=70, C=2*Math.PI*R, off=0, cx=90, cy=90;
    var svgNS="http://www.w3.org/2000/svg";
    var svg=document.createElementNS(svgNS,"svg");
    svg.setAttribute("viewBox","0 0 180 180"); svg.setAttribute("class","donut");
    data.forEach(function(d){
      var frac=d.valeur/total, len=frac*C;
      var c=document.createElementNS(svgNS,"circle");
      c.setAttribute("cx",cx);c.setAttribute("cy",cy);c.setAttribute("r",R);
      c.setAttribute("fill","none");c.setAttribute("stroke",d.couleur);
      c.setAttribute("stroke-width","24");
      c.setAttribute("stroke-dasharray",len+" "+(C-len));
      c.setAttribute("stroke-dashoffset",-off);
      c.setAttribute("transform","rotate(-90 "+cx+" "+cy+")");
      // Titre accessible (valeurs fictives — exemples éditables)
      var title=document.createElementNS(svgNS,"title");
      title.textContent=d.nom+" : "+d.valeur+"% (exemple éditable)";
      c.appendChild(title); svg.appendChild(c); off+=len;
    });
    mount.appendChild(svg);
    // Légende colorée sous le donut
    var leg=el("ul",{class:"legend"});
    data.forEach(function(d){ leg.appendChild(el("li",{html:'<span class="swatch" style="background:'+d.couleur+'"></span>'+d.nom+' — '+d.valeur+'%'})); });
    mount.appendChild(leg);
  }

  /**
   * Rend des barres horizontales de maturité avec animation CSS via --target.
   * @param {Element} mount - conteneur cible
   * @param {Array}   data  - [{domaine, valeur}]
   */
  function renderBars(mount, data){
    if(!mount) return;
    data.forEach(function(d){
      var row=el("div",{class:"bar-row reveal"});
      row.appendChild(el("span",{class:"bar-label",text:d.domaine}));
      var track=el("div",{class:"bar-track"});
      var fill=el("div",{class:"bar-fill"});
      // Valeur cible CSS pour l'animation .grow
      fill.style.setProperty("--target", d.valeur+"%");
      fill.setAttribute("data-val", d.valeur);
      track.appendChild(fill);
      row.appendChild(track);
      // Valeur numérique — comptée par animateCount au scroll
      row.appendChild(el("span",{class:"bar-val",text:d.valeur}));
      mount.appendChild(row);
    });
    // Note fictive — toutes les valeurs sont des exemples éditables dans data.js
    mount.appendChild(el("p",{class:"muted small",text:"Valeurs fictives — exemples éditables dans data.js."}));
  }

  /**
   * Rend des jauges de risque colorées selon le niveau (vert/orange/rouge).
   * @param {Element} mount - conteneur cible
   * @param {Array}   data  - [{famille, niveau, valeur}]
   */
  function renderRiskGauges(mount, data){
    if(!mount) return;
    data.forEach(function(d){
      var g=el("div",{class:"gauge risk-"+d.niveau+" reveal"});
      g.appendChild(el("span",{class:"gauge-label",text:d.famille}));
      var track=el("div",{class:"bar-track"});
      var fill=el("div",{class:"bar-fill gauge-"+d.niveau});
      fill.style.setProperty("--target", d.valeur+"%");
      track.appendChild(fill); g.appendChild(track);
      mount.appendChild(g);
    });
  }

  /**
   * IntersectionObserver : ajoute .visible, déclenche .bar-fill.grow
   * et lance le compteur animé sur .bar-val dès qu'un .reveal entre dans la vue.
   */
  function initReveal(){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        e.target.classList.add("visible");
        // Déclenchement de l'animation de largeur
        var fill=e.target.querySelector(".bar-fill");
        if(fill) fill.classList.add("grow");
        // Compteur animé sur la valeur numérique
        var valEl=e.target.querySelector(".bar-val");
        if(valEl) animateCount(valEl, parseInt(valEl.textContent,10)||0);
        io.unobserve(e.target);
      });
    },{threshold:0.2});
    document.querySelectorAll(".reveal").forEach(function(n){ io.observe(n); });
  }

  /**
   * Anime le contenu textuel d'un nœud de 0 jusqu'à target en ~900ms.
   * @param {Element} node   - nœud dont textContent sera mis à jour
   * @param {number}  target - valeur finale
   */
  function animateCount(node, target){
    var start=0, t0=null, dur=900;
    function tick(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1);
      node.textContent=Math.round(start+(target-start)*p);
      if(p<1) requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  }

  // ── Panneau de détail architecture ──────────────────────────

  function initArchDetail(){
    var panel = document.getElementById("arch-detail"); if(!panel) return;
    document.addEventListener("click", function(e){
      var t = e.target.closest("[data-detail-key]"); if(!t) return;
      var key = t.getAttribute("data-detail-key");
      var item = D.architecture.filter(function(a){return a.key===key;})[0];
      if(!item) return;
      panel.innerHTML = "";
      panel.appendChild(el("h4",{text:item.brique}));
      panel.appendChild(el("p",{text:item.detail}));
      panel.appendChild(el("p",{class:"muted",text:"Rôle : "+item.role}));
      panel.scrollIntoView({behavior:"smooth", block:"nearest"});
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Point d'entrée principal
  // ─────────────────────────────────────────────────────────────

  /**
   * Initialise l'application : navigation, drawer, renders, scroll-spy.
   * Appelé à DOMContentLoaded.
   */
  function init() {
    if (!D) { console.error("CHIARA_DATA manquant — data.js chargé ?"); return; }

    buildNav();
    initDrawer();

    // ── Renders des 13 sections (Tâche 5) ──
    renderAccueil();
    renderArchitecture();
    renderOrchestratrice();
    renderInterfaces();
    renderSkills();
    renderAgents();
    renderMedia();
    renderCron();
    renderRapports();
    renderSecurite();
    renderDiagnostic();
    renderRoadmap();
    renderPrompts();
    // ──────────────────────────────────────

    // ── Interactions (Tâche 6) ──
    initCopy();
    initSearch();
    initFilters();
    initArchDetail();
    // ────────────────────────────

    // ── Graphiques SVG + animations (Tâche 7) ──
    renderDonut(document.getElementById("chart-modules"), D.modulesShare);
    renderBars(document.getElementById("chart-maturity"), D.maturity);
    renderRiskGauges(document.getElementById("chart-risk"), D.riskFamilies);
    initReveal();
    // ───────────────────────────────────────────

    initScrollSpy();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
