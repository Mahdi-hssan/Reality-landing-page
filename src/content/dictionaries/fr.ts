/** French is the source dictionary: every other language must match this shape. */
const fr = {
  meta: {
    title:
      "Reality Sports — Logiciel de gestion de club sportif & app de réservation de terrains",
    description:
      "Gérez votre club de padel, football, tennis ou pickleball : planning des terrains, réservations, membres, tournois, caisse et highlights vidéo. Vos joueurs réservent et trouvent des partenaires avec l’app Reality Sports.",
    ogDescription:
      "Le logiciel de gestion pour les clubs sportifs et l’app Reality Sports pour réserver un terrain et trouver des partenaires.",
    keywords: [
      "logiciel gestion club sportif",
      "logiciel gestion club padel",
      "réservation terrain padel",
      "réservation terrain foot",
      "logiciel réservation terrain",
      "gestion complexe sportif",
      "application réservation padel",
      "trouver partenaire padel",
      "matchmaking padel",
      "pickleball",
      "Tunisie",
    ],
  },
  nav: {
    links: {
      community: "Communauté",
      theApp: "L’app",
      clubs: "Pour les clubs",
      players: "Pour les joueurs",
      features: "Fonctionnalités",
      mobile: "Mobile",
      premium: "Caméras & highlights",
      why: "Pourquoi Reality",
      pricing: "Tarifs",
      faq: "FAQ",
      app: "Application joueurs",
    },
    audience: {
      label: "Choisissez votre espace",
      clubs: "Clubs",
      players: "Joueurs",
    },
    getApp: "Télécharger l’app",
    demo: "Demander une démo",
    home: "Reality, retour en haut",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    mainNav: "Navigation principale",
    language: "Langue",
  },
  browserTitle: "Reality · Espace club",
  hero: {
    eyebrow: "Logiciel de gestion de club sportif",
    titleA: "Votre club tourne.",
    titleB: "Vous gardez la main.",
    lead: "Reality remplace les fichiers Excel, les groupes WhatsApp et les outils dispersés par une seule plateforme pour gérer, animer et développer votre club.",
    ctaPrimary: "Demander une démo gratuite",
    ctaSecondary: "Voir le produit",
    pills: [
      "Réservations",
      "Membres",
      "Tournois",
      "Paiement",
      "Highlights vidéo",
    ],
    shotAlt:
      "Planning des terrains dans Reality : matchs, coachings, tournois et paiements sur une journée",
    phoneAlt: "Tableau de bord Reality sur mobile",
    statGrowth: "+52,9 %",
    statGrowthLabel: "réservations vs mois dernier",
    statBookings: "312",
    statBookingsLabel: "réservations ce mois",
    statReturn: "64 %",
    statReturnLabel: "des joueurs reviennent",
    beat2A: "Réservations, membres, caisse, tournois.",
    beat2B: "Tout arrive au même endroit.",
    beat3A: "Le terrain est prêt.",
    beat3B: "Vos joueurs aussi.",
    scrollCue: "Faites défiler",
  },
  glass: {
    eyebrow: "Avant / après",
    beforeA: "Quatre outils.",
    beforeB: "Aucune vue d’ensemble.",
    afterA: "Un seul système.",
    afterB: "Reality.",
    afterLead:
      "Le planning, les membres, les matchs et les tournois se parlent enfin. Vous voyez tout le club sur un seul écran.",
    tools: ["Excel", "WhatsApp", "Cahier papier", "Appels"],
  },
  sports: {
    eyebrow: "Multi-sport",
    title: "Un seul planning. Tous vos terrains.",
    lead: "Padel, football, tennis, pickleball et tous les autres : chaque terrain garde ses horaires, ses tarifs et ses règles, et tout vit dans le même planning.",
    prev: "Sport précédent",
    next: "Sport suivant",
    items: [
      { id: "all", name: "Tous les sports", line: "Padel, foot, tennis, pickleball, basket, volley… Si ça se joue sur un terrain, Reality le gère." },
      { id: "padel", name: "Padel", line: "Courts intérieurs et extérieurs, matchs ouverts et americanos." },
      { id: "football", name: "Football", line: "Terrains à 5, à 7 et à 11, réservés à l’heure ou en abonnement." },
      { id: "tennis", name: "Tennis", line: "Créneaux, cours et coachings sur chaque court." },
      { id: "pickleball", name: "Pickleball", line: "Le sport qui monte, prêt dès le premier jour." },
    ],
  },
  pains: {
    builtFor: "Conçu pour",
    sports: [
      "Padel",
      "Football à 5, 7 et 11",
      "Tennis",
      "Pickleball",
      "Académies",
      "Complexes multi-terrains",
    ],
    eyebrow: "La solution",
    title: "Un seul système pour piloter le club",
    lead: "Moins de coordination manuelle, plus de visibilité, plus de réservations. Votre équipe passe moins de temps au téléphone et plus de temps sur le terrain.",
    items: [
      {
        before: "Réservations notées dans Excel et sur papier",
        after: "Un planning en temps réel, terrain par terrain",
      },
      {
        before: "Des groupes WhatsApp pour remplir les matchs",
        after: "Matchs ouverts et matchmaking automatique",
      },
      {
        before: "Ardoises et impayés impossibles à suivre",
        after: "Paiements suivis : payé, partiel ou impayé en un coup d’œil",
      },
      {
        before: "Abonnements et packs gérés à la main",
        after: "Plans, jetons et tarifs membres appliqués automatiquement",
      },
    ],
    stats: [
      { value: "24/7", label: "réservation en ligne pour vos joueurs" },
      {
        value: "Multi-sport",
        label: "padel, foot, tennis, pickleball… dans un seul planning",
      },
      { value: "Multi-sites", label: "tous vos clubs dans un seul compte" },
    ],
  },
  tour: {
    eyebrow: "Le produit",
    title: "Tout ce qu’il faut pour gérer votre activité au quotidien",
    lead: "De vraies captures de l’espace club Reality. Choisissez un module.",
    tablistLabel: "Modules Reality",
    features: {
      planning: {
        label: "Planning",
        title: "Toute la journée du club, terrain par terrain",
        text: "Matchs, coachings, tournois, événements et maintenance sur une seule vue. Le statut de paiement de chaque créneau est visible immédiatement.",
        points: [
          "Calendrier par court ou terrain",
          "Réservations récurrentes",
          "Payé, partiel ou impayé en un coup d’œil",
        ],
        page: "Planning",
      },
      dashboard: {
        label: "Dashboards",
        title: "Les chiffres qui comptent, sans tableur",
        text: "Réservations, matchs joués, annulations, joueurs actifs et taux de retour, comparés automatiquement à la période précédente.",
        points: [
          "Comparaison période sur période",
          "Filtres par date et par sport",
          "Fidélisation des joueurs mesurée",
        ],
        page: "Tableau de bord",
      },
      matches: {
        label: "Matchs",
        title: "Chaque match suivi jusqu’au paiement",
        text: "Retrouvez l’organisateur, le terrain et le statut de paiement de chaque match. Fini les ardoises oubliées.",
        points: [
          "Matchs en cours, à venir et passés",
          "Historique complet par joueur",
          "Modification et annulation en un clic",
        ],
        page: "Matchs",
      },
      customers: {
        label: "Clients",
        title: "Votre base joueurs, enfin centralisée",
        text: "Profils clients, historique, réservations manquées et restrictions. Importez votre fichier Excel existant en quelques minutes.",
        points: [
          "Import clients via Excel",
          "Templates de communication",
          "Gestion des accès de votre équipe",
        ],
        page: "Clients",
      },
      memberships: {
        label: "Abonnements",
        title: "Fidélisez et monétisez vos membres",
        text: "Créez des plans d’abonnement, des packs de matchs (jetons) et des tarifs membres. Les règles d’accès s’appliquent toutes seules.",
        points: [
          "Ventes et renouvellements",
          "Créneaux prioritaires pour les membres",
          "Vérification membre via API",
        ],
        page: "Abonnements",
      },
      tournaments: {
        label: "Tournois",
        title: "Ligues, tournois et americanos sans prise de tête",
        text: "Créez un tournoi en quelques minutes : poules, élimination, americano. Tableaux, planning et résultats sont générés pour vous.",
        points: [
          "Americano, poules, élimination",
          "Gestion des tableaux",
          "Résultats et classements joueurs",
        ],
        page: "Tournois",
      },
      store: {
        label: "Boutique",
        title: "Un point de vente intégré au comptoir",
        text: "Balles, grips, location de raquettes, boissons : vendez au comptoir, suivez le stock et les commandes au même endroit.",
        points: [
          "Caisse (POS) rapide",
          "Gestion de stock et alertes",
          "Ventes rattachées au client",
        ],
        page: "Boutique",
      },
    },
  },
  mobile: {
    eyebrow: "Espace club · Web & mobile",
    title: "Votre club dans la poche",
    lead: "Le même espace club sur ordinateur, tablette et téléphone. Rien à installer pour votre équipe : un navigateur suffit.",
    points: [
      {
        title: "Pensé pour le téléphone",
        text: "Chaque écran de l’espace club s’adapte au mobile. Gérez le club depuis le bord du terrain.",
      },
      {
        title: "Des réponses immédiates",
        text: "Un créneau libre, un paiement en attente, un membre à renouveler : l’info est à un geste.",
      },
      {
        title: "Toujours au courant",
        text: "Notifications des nouvelles réservations et des annulations, en temps réel.",
      },
    ],
    dashboardAlt: "Tableau de bord Reality sur téléphone",
    plansAlt: "Plans d’abonnement Reality sur téléphone",
  },
  why: {
    eyebrow: "Pourquoi Reality",
    title: "Tout ce que font les autres. Et ce qu’ils ne font pas.",
    lead: "Les logiciels de réservation gèrent vos terrains. Reality crée aussi de l’activité : plus de matchs remplis, plus de joueurs qui reviennent, plus de raisons de choisir votre club.",
    exclusive: "Exclusif",
    exclusives: [
      {
        title: "Matchmaking par IA",
        text: "Reality propose automatiquement des partenaires au bon niveau pour remplir vos matchs, sans relances sur WhatsApp.",
      },
      {
        title: "Réseau inter-clubs",
        text: "Vos joueurs trouvent des matchs au-delà de votre club, et les joueurs du réseau découvrent vos créneaux libres.",
      },
      {
        title: "Live scoring",
        text: "Le score en direct, point par point, pour les matchs et les tournois.",
      },
      {
        title: "Live streaming",
        text: "Diffusez vos finales et vos événements en direct.",
      },
      {
        title: "Highlights caméra",
        text: "Les meilleurs points filmés et envoyés aux joueurs, prêts à partager.",
      },
    ],
    tableCaption:
      "Comparaison des fonctionnalités de Reality avec les autres plateformes du marché",
    colFeature: "Fonctionnalité",
    colOthers: "Autres plateformes",
    included: "Inclus",
    partial: "Partiel",
    notAvailable: "Non disponible",
    rows: [
      "Gestion des terrains & réservations en ligne",
      "Abonnements, jetons & tarifs membres",
      "Dashboards & analytics",
      "POS, boutique & gestion de stock",
      "Tournois avancés : Americano, poules, élimination",
      "Calendrier, résultats & classements joueurs",
      "Matchmaking par IA",
      "Réseau & matchmaking inter-clubs",
      "Live scoring",
      "Live streaming",
      "Highlights caméra & VAR",
    ],
    notes: { manual: "souvent manuel", limitedRanking: "classement limité" },
    footnote:
      "« Autres plateformes » : meilleure offre parmi les principales solutions de gestion de clubs, selon leurs fonctionnalités publiques en octobre 2026.",
  },
  premium: {
    eyebrow: "Option Premium",
    title: "Caméras + buzzer : chaque grand point devient un highlight",
    lead: "Un réseau de caméras et un équipement connecté installés sur vos terrains. Un appui sur le buzzer et le point est enregistré, prêt à être revu ou partagé.",
    items: [
      {
        title: "Highlights",
        text: "Captation vidéo des points clés et clips prêts à partager par vos joueurs.",
      },
      {
        title: "VAR / line calls",
        text: "Revue des points litigieux. Plus de confiance, moins de disputes.",
      },
      {
        title: "Installation clé en main",
        text: "Réseau de caméras et équipement connecté installés sur vos terrains.",
      },
      {
        title: "Votre club partout",
        text: "Chaque clip partagé sur les réseaux fait connaître votre club.",
      },
    ],
    note: "Premium = logiciel Reality + caméras + buzzer. Internet privé requis, fourni par le club.",
  },
  pricing: {
    eyebrow: "Tarifs",
    title: "Deux plans simples. Aucune surprise.",
    lead: "Les réservations cash sont incluses dans l’abonnement. Le paiement en ligne est disponible avec des frais par réservation.",
    featuredBadge: "Le plus complet",
    perMonth: "TND / mois",
    plans: [
      {
        name: "Plan de base",
        extra: "",
        pitch: "Le socle opérationnel de votre club.",
        features: [
          "Planning par terrain & réservations récurrentes",
          "Modifications, annulations & notes de réservation",
          "Clients, import Excel & templates de communication",
          "Membres, abonnements, jetons & tarifs privés",
          "Ligues, tournois & americanos",
          "Dashboards, filtres & graphiques",
          "Setup & accompagnement du club",
          "Réservations cash incluses, sans frais",
        ],
        cta: "Démarrer avec le plan de base",
      },
      {
        name: "Plan Premium",
        extra: "+ 700 TND d’installation",
        pitch: "Tout le plan de base, plus les caméras connectées.",
        features: [
          "Tout le plan de base inclus",
          "Réseau de caméras + équipement connecté",
          "Bouton buzzer sur le terrain",
          "Highlights vidéo partageables",
          "VAR / revue des line calls",
          "Installation par l’équipe Reality",
        ],
        cta: "Passer au Premium",
      },
    ],
    onlineA: "Paiement en ligne :",
    onlineB: "7 % par réservation",
    onlineC:
      ". Ces 7 % couvrent les frais du prestataire de paiement en ligne ainsi que la commission Reality.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Vos questions, nos réponses",
    lead: "Une autre question ? Demandez une démo et nous vous montrons Reality sur vos propres terrains.",
    items: [
      {
        q: "Combien de temps faut-il pour lancer Reality dans mon club ?",
        a: "Nous configurons vos terrains, horaires, tarifs et plans d’abonnement avec vous. Vos clients existants s’importent depuis un fichier Excel, et le setup du club est inclus dans l’abonnement.",
      },
      {
        q: "Reality fonctionne-t-il pour d’autres sports que le padel ?",
        a: "Oui. Reality est multi-sport et multi-terrain : padel, football (à 5, à 7 ou à 11), tennis, pickleball et plus, avec des terrains intérieurs et extérieurs dans le même planning.",
      },
      {
        q: "Mes joueurs doivent-ils installer une application ?",
        a: "Vos joueurs utilisent l’application Reality Sports, disponible sur l’App Store et Google Play, pour réserver, rejoindre des matchs et s’inscrire aux tournois. Votre équipe peut aussi créer les réservations depuis le comptoir pour les clients sans application.",
      },
      {
        q: "Que faut-il pour le plan Premium ?",
        a: "Un accès internet privé fourni par le club. Notre équipe installe le réseau de caméras et l’équipement connecté, puis les highlights et la VAR sont disponibles directement dans Reality.",
      },
      {
        q: "Puis-je gérer plusieurs clubs ou sites ?",
        a: "Oui. Reality gère plusieurs sites depuis un seul compte, avec des accès et des rôles distincts pour chaque membre de votre équipe.",
      },
    ],
  },
  cta: {
    title: "Prêt à remplir vos terrains ?",
    lead: "Demandez une démo : nous vous montrons Reality avec des terrains, des horaires et des tarifs comme les vôtres, et répondons à toutes vos questions.",
    primary: "Demander une démo",
    footnote: "Setup du club inclus · Multi-sport · Multi-sites",
    mailSubject: "Demande de démo Reality",
    mailBody:
      "Bonjour,\n\nJe souhaite une démo de Reality pour mon club.\n\nNom du club :\nVille :\nNombre de terrains :\nSports :\nTéléphone :\n",
  },
  app: {
    eyebrow: "Deux produits, un écosystème",
    title:
      "Reality, c’est un logiciel pour le club et une app pour les joueurs",
    lead: "Le logiciel de gestion présenté plus haut est réservé aux clubs. Vos joueurs, eux, utilisent l’application Reality Sports pour réserver et jouer.",
    b2bTag: "Pour les clubs · B2B",
    b2bTitle: "Reality pour les clubs",
    b2bText:
      "Le logiciel de gestion de votre club : planning, réservations, membres, tournois, caisse et dashboards. Dans le navigateur, sur ordinateur, tablette et mobile.",
    b2bCta: "Demander une démo",
    b2cTag: "Pour les joueurs · B2C",
    b2cTitle: "L’app Reality Sports",
    b2cText:
      "L’application mobile pour les joueurs : trouver un club, réserver un créneau, rejoindre un match à son niveau et s’inscrire aux tournois.",
    b2cCta: "Télécharger l’app",
    playersEyebrow: "Application Reality Sports",
    playersTitle:
      "Réservez un terrain et trouvez des partenaires en quelques secondes",
    playersLead:
      "Padel, football, tennis, pickleball : l’app Reality Sports réunit les clubs et les joueurs. Disponible sur iPhone et Android.",
    features: [
      {
        title: "Réservez un créneau",
        text: "Voyez les disponibilités des clubs en temps réel et réservez votre terrain en quelques secondes.",
      },
      {
        title: "Matchmaking",
        text: "Rejoignez un match ouvert ou laissez Reality vous proposer des joueurs de votre niveau.",
      },
      {
        title: "Rejoignez des événements",
        text: "Matchs ouverts et événements près de chez vous : voyez les places libres et rejoignez en un geste.",
      },
      {
        title: "Tournois & classements",
        text: "Inscrivez-vous aux tournois et americanos, suivez vos résultats et votre niveau.",
      },
    ],
    prevFlow: "Écran précédent",
    nextFlow: "Écran suivant",
    flowsLabel: "Parcours dans l’app Reality Sports",
    flowAlt: "Capture de l’app Reality Sports",
    flows: [
      {
        id: "schedule-event",
        screen: "Schedule An Event",
        title: "Trouvez un terrain",
        text: "Choisissez une activité et des dates : les clubs près de vous, avec la distance et les jours disponibles.",
      },
      {
        id: "booking",
        screen: "Booking",
        title: "Réservez votre créneau",
        text: "Choisissez le jour et l’heure, puis ouvrez le match à tous ou invitez vos amis.",
      },
      {
        id: "join-events",
        screen: "Join Events",
        title: "Rejoignez un match",
        text: "Les matchs ouverts du jour, avec les places libres, le club et l’heure. Un geste et vous jouez.",
      },
      {
        id: "tournaments",
        screen: "Tournaments",
        title: "Jouez des tournois",
        text: "Championnats et tournois près de chez vous : dates, format et catégorie en un coup d’œil.",
      },
    ],
    appStoreSmall: "Télécharger dans",
    playStoreSmall: "Disponible sur",
    storeNote:
      "L’app Reality Sports est destinée aux joueurs. Le logiciel de gestion des clubs est une offre séparée.",
    mockTitle: "Matchs ouverts",
    mockToday: "Aujourd’hui",
    mockJoin: "Rejoindre",
    mockLevel: "Niveau",
    mockSpots: "places",
    mockAlt:
      "Illustration de l’app Reality Sports : liste de matchs ouverts à rejoindre",
    mockSports: ["Padel", "Football", "Tennis", "Pickleball"],
  },
  playersMeta: {
    title: "Reality Sports — Réservez un terrain, trouvez des partenaires, rejoignez la communauté",
    description: "L’app Reality Sports pour les joueurs de padel, football, tennis et pickleball : réservez un terrain, rejoignez des matchs ouverts à votre niveau, jouez des tournois et rencontrez les joueurs autour de vous.",
  },
  parts: {
    split: {
      eyebrow: "Deux produits, un écosystème",
      title: "Vous gérez un club, ou vous venez jouer ?",
    },
    clubs: {
      label: "Pour les clubs",
      title: "Le logiciel qui fait tourner votre club",
      lead: "Planning, réservations, membres, paiements et tournois dans un seul espace. Pensé pour les gérants de clubs et leurs équipes.",
      cta: "Voir le logiciel club",
    },
    players: {
      label: "Pour les joueurs",
      titleA: "Pas juste des réservations. Pas juste du matchmaking.",
      titleB: "Une communauté.",
      lead: "Reality Sports réunit les joueurs, les clubs et les matchs autour de vous. Réserver un terrain n’est que le début : on reste pour les gens avec qui on joue.",
      cta: "Découvrir la communauté",
    },
    compare: "Voir le comparatif complet",
  },
  community: {
    eyebrow: "La communauté",
    title: "On vient pour le terrain. On reste pour les gens.",
    clubsBand: {
      title: "Vous gérez un club ?",
      text: "Reality est aussi le logiciel que les clubs utilisent pour gérer leurs terrains, leurs réservations et leurs membres.",
      cta: "Voir Reality pour les clubs",
    },
    pillars: [
      {
        title: "Des partenaires à votre niveau",
        text: "Reality vous propose des joueurs de votre niveau, pour des matchs toujours disputés.",
      },
      {
        title: "Des matchs ouverts chaque jour",
        text: "Voyez qui joue près de chez vous, prenez une place libre et rencontrez de nouveaux joueurs.",
      },
      {
        title: "Vos amis, à un tap",
        text: "Invitez vos amis sur votre réservation, ou ouvrez le match à toute la communauté.",
      },
      {
        title: "Tous les clubs, un seul réseau",
        text: "Jouez au-delà de votre club : tous les clubs Reality partagent la même communauté.",
      },
    ],
    mock: {
      title: "Match ouvert",
      spot: "Plus qu’une place",
      you: "Vous",
      alt: "Illustration : un match ouvert avec trois joueurs inscrits et une place libre",
    },
    flowsEyebrow: "Dans l’app",
    flowsTitle: "Du terrain trouvé au tournoi gagné",
    downloadTitle: "Rejoignez la communauté",
  },
  footer: {
    colProduct: "Produit",
    colPlayers: "Joueurs",
    colHelp: "Aide",
    contact: "Contact",
    backToTop: "Haut de page",
    tagline:
      "La plateforme tout-en-un pour gérer, animer et développer votre club.",
    nav: "Pied de page",
    rights: "© {year} Reality Sports. Tous droits réservés.",
  },
};

/** Same keys as French; arrays may differ in length only where noted by the components. */
export type Dictionary = DeepString<typeof fr>;

type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? DeepString<U>[]
    : { [K in keyof T]: DeepString<T[K]> };

export default fr satisfies Dictionary;
