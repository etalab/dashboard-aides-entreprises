const COMMON_TEXTS_HTML = {
  dashboardIntro: {
    id: 'dashboard-intro',
    textClass: 'text-left mx-4 pt-4 pb-5 mb-5',
    textContent: {
      fr: `
        Ce tableau de bord a été créé par le département Etalab de la
        <a target="_blank" href="https://www.numerique.gouv.fr">
          Direction Interministérielle du Numérique (DINUM)</a>
        et son
        <a target="_blank" href="https://github.com/etalab/dashboard-aides-entreprises">
          code source est libre</a>.
      `
    },
    fromUrl: {
      fr: undefined
    }
  },
  moreInfosFDS: {
    id: 'more-infos-fds',
    textClass: 'text-left mx-4 pt-4',
    textContent: {
      fr: `
        Les données utilisées sur ce tableau de bord
        <a target="_blank" href="https://www.data.gouv.fr/fr/datasets/aides-aux-entreprises-dans-le-cadre-de-lepidemie-de-covid-19-en-france/">
          sont disponibles en open data sur data.gouv.fr</a>.
      `
    },
    fromUrl: {
      fr: undefined
    }
  },
  moreInfosPGE: {
    id: 'more-infos-pge',
    textClass: 'text-left mx-4 pt-4',
    textContent: {
      fr: `
        Les données utilisées sur ce tableau de bord
        <a target="_blank" href="https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-prets-garantis-par-letat-dans-le-cadre-de-lepidemie-de-covid-19/">
          sont disponibles en open data sur data.gouv.fr</a>.
      `
    },
    fromUrl: {
      fr: undefined
    }
  },
  moreInfosREPORT: {
    id: 'more-infos-reports',
    textClass: 'text-left mx-4 pt-4',
    textContent: {
      fr: `
        Les données utilisées sur ce tableau de bord
        <a target="_blank" href="https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-reports-decheances-fiscales-accordes-dans-le-cadre-de-lepidemie-de-covid-19/">
          sont disponibles en open data sur data.gouv.fr</a>.
      `
    },
    fromUrl: {
      fr: undefined
    }
  },
  moreInfosACTIVITEPARTIELLE: {
    id: 'more-infos-activitepartielle',
    textClass: 'text-left mx-4 pt-4',
    textContent: {
      fr: `
        Les données utilisées sur ce tableau de bord
        <a target="_blank" href="https://www.data.gouv.fr/fr">
          sont disponibles en open data sur data.gouv.fr</a>.
      `
    },
    fromUrl: {
      fr: undefined
    }
  }
}

export const configAppTexts = {
  help: 'this file contains the setup for the texts components',

  // NUMBERS

  settingsIds: [
    // ============================================================= //
    // FDS
    // ============================================================= //
    {
      id: 'text-fds-title',
      help: '',
      title: { fr: '' },
      titleI18n: 'texts.text01.title',
      dividers: {
        before: false,
        after: false
      },
      componentRows: [
        {
          rowNumber: 1,
          help: '',
          columns: [
            {
              colName: '',
              colTitle: { fr: '' },
              colTitleClass: '',
              cols: 12,
              textClass: '',
              subTextClass: '',
              sizeDesktop: 'headline mb-0',
              sizeMobile: 'subtitle-1',
              textPrefix: { fr: 'Fonds de solidarité : ' },
              textPrefixClass: 'font-weight-regular',
              textSuffix: { fr: '' },
              textSuffixClass: undefined,
              specialStoreId: 'levelname',
              specialStoreIdClass: 'font-weight-medium'
            }
          ]
        }
      ]
    },
    {
      id: 'text-fds-infos',
      help: '',
      title: { fr: '' },
      titleI18n: 'texts.text01.title',
      dividers: {
        before: false,
        after: false
      },
      componentRows: [
        {
          rowNumber: 1,
          help: '',
          columns: [
            {
              colName: '',
              colTitle: { fr: 'Le fonds de solidarité' },
              colTitleClass: 'my-5',
              cols: 12,
              textClass: '',
              subTextClass: '',
              sizeDesktop: '',
              sizeMobile: 'body-2',
              textPrefix: { fr: undefined },
              textPrefixClass: undefined,
              textSuffix: { fr: undefined },
              textSuffixClass: undefined,
              specialStoreId: undefined,
              specialStoreIdClass: undefined,
              textsHtml: [
                {
                  id: 'aides-intro',
                  textClass: 'text-left mx-4 pt-4',
                  textContent: {
                    fr: `
                      L’État et les Régions ont mis en place un fonds de solidarité pour 
                      aider les petites entreprises les plus touchées par la crise. 
                      Les intercommunalités et les grandes entreprises pourront contribuer 
                      au financement du fonds. Les compagnies d’assurance ont déjà annoncé 
                      une contribution de 400 millions d’euros.
                      <br><br>
                      Sont concernés par cette aide pouvant aller jusqu’à 1 500 €, 
                      les TPE, indépendants, micro-entrepreneurs et professions 
                      libérales qui ont 10 salariés au plus, qui font moins d’1 million 
                      d’euros de chiffre d’affaires ainsi qu’un bénéfice annuel 
                      imposable inférieur à 60 000 € et qui : 
                      <br><br>
                      <ul>
                        <li>
                          subissent une interdiction d’accueil du public selon l’article 
                          8 du décret du 23 mars 2020 même s’il y a une activité résiduelle 
                          telle que la vente à emporter, la livraison et les retraits de commandes, « room service »
                        </li>
                        <br>
                        OU
                        <br><br>
                        <li>
                          Pour l’aide versée au titre du mois de mars : 
                          qui connaissent une perte de chiffre d'affaires d’au moins 50 % au mois de mars 2020 
                          par rapport au mois de mars 2019 ;
                        </li>
                        <li>
                          Pour l’aide versée au titre du mois d’avril : 
                          qui connaissent une perte de chiffre d'affaires d’au moins 50 % au mois d’avril 2020 
                          par rapport au mois d’avril 2019 ou au chiffre d’affaires mensuel moyen sur 2019.                  
                        </li>
                      </ul>
                      <br>
                      Par ailleurs, Bruno Le Maire, ministre de l’Économie et des Finances, 
                      a annoncé mercredi 15 avril 2020 que les agriculteurs membres d’un 
                      groupement agricole d’exploitation en commun (GAEC), 
                      les artistes-auteurs, et les entreprises en redressement judiciaire 
                      ou en procédure de sauvegarde pourront également bénéficier 
                      du fonds de solidarité.
                      <br><br>
                      Pour les situations les plus difficiles, 
                      un soutien complémentaire d'un montant de 2000 à 5 000 € 
                      pourra être octroyé aux entreprises qui :
                      <br><br>
                      <ul>
                        <li>ont bénéficié du premier volet du fonds (les 1 500 € ou moins)</li>
                        <li>emploient, au 1er mars 2020, au moins un salarié en contrat à durée indéterminée ou déterminée</li>
                        <li>se trouvent dans l'impossibilité de régler leurs dettes exigibles dans les trente jours et le montant de leurs charges fixes, y compris les loyers commerciaux ou professionnels, dues au titre des mois de mars et avril 2020</li>
                        <li>ont vu leur demande d'un prêt de trésorerie faite depuis le 1er mars 2020, auprès d'une banque dont elles étaient clientes à cette date, refusée ou restée sans réponse passé un délai de dix jours.</li>
                      </ul>
                      <br>
                      Cette cartographie présente les montants attribués dans le cadre du fonds de solidarité 
                      projetés au niveau départemental et régional 
                      avec une ventilation par secteur d'activité, structure juridique et 
                      tranche d'effectifs (effectifs pour les entreprises affiliées au régime général).
                      Les données concernent uniquement les entreprises affiliées au régime général
                      <br><br>
                      Les données sont mises à jour quotidiennement.
                    `
                  },
                  fromUrl: {
                    fr: undefined
                  }
                },
                COMMON_TEXTS_HTML.moreInfosFDS,
                COMMON_TEXTS_HTML.dashboardIntro,
                {
                  id: 'miseAJour',
                  textClass: 'justify-center mx-4 pt-3 pb-5 mb-5',
                  textContent: undefined,
                  fromUrl: {
                    fr:
                      'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/backend/json/aides/last_update_data.txt'
                  }
                }
              ]
            }
          ]
        }
      ]
    },

    // ============================================================= //
    // PGE
    // ============================================================= //
    {
      id: 'text-pge-title',
      help: '',
      title: { fr: '' },
      titleI18n: 'texts.text01.title',
      dividers: {
        before: false,
        after: false
      },
      componentRows: [
        {
          rowNumber: 1,
          help: '',
          columns: [
            {
              colName: '',
              colTitle: { fr: '' },
              colTitleClass: '',
              cols: 12,
              textClass: '',
              subTextClass: '',
              sizeDesktop: 'headline mb-0',
              sizeMobile: 'subtitle-1',
              textPrefix: { fr: "Prêts garantis par l'Etat : " },
              textPrefixClass: 'font-weight-regular',
              textSuffix: { fr: '' },
              textSuffixClass: undefined,
              specialStoreId: 'levelname',
              specialStoreIdClass: 'font-weight-medium'
            }
          ]
        }
      ]
    },
    {
      id: 'text-pge-infos',
      help: '',
      title: { fr: '' },
      titleI18n: 'texts.text01.title',
      dividers: {
        before: false,
        after: false
      },
      componentRows: [
        {
          rowNumber: 1,
          help: '',
          columns: [
            {
              colName: '',
              colTitle: { fr: "Les prêts garantis par l'Etat" },
              colTitleClass: 'my-5',
              cols: 12,
              textClass: '',
              subTextClass: '',
              sizeDesktop: '',
              sizeMobile: 'body-2',
              textPrefix: { fr: undefined },
              textPrefixClass: undefined,
              textSuffix: { fr: undefined },
              textSuffixClass: undefined,
              specialStoreId: undefined,
              specialStoreIdClass: undefined,
              textsHtml: [
                {
                  id: 'pge-intro',
                  textClass: 'text-left mx-4 pt-4',
                  textContent: {
                    fr: `
                      Le Gouvernement met en œuvre un dispositif exceptionnel de garanties 
                      permettant de soutenir le financement bancaire des entreprises, 
                      à hauteur de 300 milliards d’euros.
                      <br><br>
                      Jusqu’au 31 décembre prochain, les entreprises de toute taille, 
                      quelle que soit la forme juridique de l’entreprise 
                      (notamment sociétés, commerçants, artisans, exploitants agricoles, 
                        professions libérales, micro-entrepreneurs, associations et fondations 
                        ayant une activité économique
                      ), 
                      à l’exception des sociétés civiles immobilières, des établissements de crédit 
                      et des sociétés de financement, pourront demander à leur banque habituelle 
                      un prêt garanti par l’État pour soutenir leur trésorerie.
                      <br><br>
                      Ce prêt pourra représenter jusqu’à 3 mois de chiffre d'affaires 2019, 
                      ou deux années de masse salariale pour les entreprises innovantes 
                      ou créées depuis le 1er janvier 2019. 
                      Aucun remboursement ne sera exigé la première année ; 
                      l’entreprise pourra choisir d’amortir le prêt sur une durée maximale de cinq ans.
                      <br><br>
                      Les banques s’engagent à examiner toutes les demandes qui leur seront adressées 
                      et à leur donner une réponse rapide. 
                      Elles s’engagent à distribuer massivement, à prix coûtant, 
                      les prêts garantis par l’État pour soulager sans délai la trésorerie 
                      des entreprises et des professionnels.
                      <br><br>
                      Néanmoins, toutes les entreprises, en particulier les plus grandes, 
                      qui ne respecteraient pas leurs obligations en termes de délais de paiement, 
                      n'auront pas accès à cette garantie de l'État pour leurs crédits bancaires.
                      <br><br>
                      Par ailleurs, les banques françaises se sont engagées à reporter 
                      jusqu’à 6 mois le remboursement de crédits des entreprises, sans frais.
                      <br><br>
                      Cette cartographie présente les montants de prêts garantis Etat 
                      projetés au niveau départemental et régional avec une ventilation 
                      par secteur d'activité.
                      <br><br>
                      Les données sous-jacentes sont mises à jour 
                      de manière hebdomadaire.
                    `
                  },
                  fromUrl: {
                    fr: undefined
                  }
                },
                COMMON_TEXTS_HTML.moreInfosPGE,
                COMMON_TEXTS_HTML.dashboardIntro,
                {
                  id: 'miseAJour',
                  textClass: 'justify-center mx-4 pt-3 pb-5 mb-5',
                  textContent: undefined,
                  fromUrl: {
                    fr:
                      'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/backend/json/pge/last_update_data.txt'
                  }
                }
              ]
            }
          ]
        }
      ]
    },

    // ============================================================= //
    // REPORT
    // ============================================================= //
    {
      id: 'text-report-title',
      help: '',
      title: { fr: '' },
      titleI18n: 'texts.text01.title',
      dividers: {
        before: false,
        after: false
      },
      componentRows: [
        {
          rowNumber: 1,
          help: '',
          columns: [
            {
              colName: '',
              colTitle: { fr: '' },
              colTitleClass: '',
              cols: 12,
              textClass: '',
              subTextClass: '',
              sizeDesktop: 'headline mb-0',
              sizeMobile: 'subtitle-1',
              textPrefix: { fr: "Reports d'échéances fiscales: " },
              textPrefixClass: 'font-weight-regular',
              textSuffix: { fr: '' },
              textSuffixClass: undefined,
              specialStoreId: 'levelname',
              specialStoreIdClass: 'font-weight-medium'
            }
          ]
        }
      ]
    },
    {
      id: 'text-report-infos',
      help: '',
      title: { fr: '' },
      titleI18n: 'texts.text01.title',
      dividers: {
        before: false,
        after: false
      },
      componentRows: [
        {
          rowNumber: 1,
          help: '',
          columns: [
            {
              colName: '',
              colTitle: { fr: "Les reports d'échéances fiscales" },
              colTitleClass: 'my-5',
              cols: 12,
              textClass: '',
              subTextClass: '',
              sizeDesktop: '',
              sizeMobile: 'body-2',
              textPrefix: { fr: undefined },
              textPrefixClass: undefined,
              textSuffix: { fr: undefined },
              textSuffixClass: undefined,
              specialStoreId: undefined,
              specialStoreIdClass: undefined,
              textsHtml: [
                {
                  id: 'report-intro',
                  textClass: 'text-left mx-4 pt-4',
                  textContent: {
                    fr: `
                      Le Gouvernement a annoncé le report des principales 
                      échéances fiscales des professionnels afin de tenir 
                      compte de leurs difficultés liées à la crise sanitaire du coronavirus.
                      <br><br>
                      Le report fiscal concerne :
                      <br><br>
                      <ul>
                        <li>
                        Les entreprises ou les experts-comptables qui 
                        interviennent pour des clients, pour qui il est possible 
                        de demander au service des impôts des entreprises 
                        le report sans pénalité du règlement de leurs prochaines 
                        échéances d'impôts directs 
                        (acompte d'impôt sur les sociétés, taxe sur les salaires).
                        </li>
                        <li>
                        Les travailleurs indépendants qui peuvent moduler à 
                        tout moment le taux et les acomptes de prélèvement à la source. 
                        Il est aussi possible de reporter le paiement 
                        des acomptes de prélèvement à la source sur les revenus 
                        professionnels d’un mois sur l’autre, jusqu’à trois fois 
                        si les acomptes sont mensuels, ou d’un trimestre sur l’autre 
                        si les acomptes sont trimestriels.
                        </li>
                      </ul>
                      <br>
                      Afin d'apporter une aide financière aux entreprises 
                      en difficulté, une procédure accélérée de remboursement 
                      des créances d'impôt sur les sociétés restituables en 2020 
                      est mise en œuvre.
                      <br><br>
                      Enfin, la Commission des chefs de services financiers (CCSF) 
                      peut accorder aux entreprises qui rencontrent des difficultés 
                      financières des délais de paiement pour s’acquitter de 
                      leurs dettes fiscales et sociales en toute confidentialité.
                      <br><br>
                      Cette cartographie présente les montants associés 
                      aux reports d'échéances fiscales projetés au niveau départemental 
                      et régional avec une ventilation par secteur d'activité.
                      <br><br>
                      Les données utilisées pour ce tableau de bord sont 
                      mises à jour de manière hebdomadaire.
                    `
                  },
                  fromUrl: {
                    fr: undefined
                  }
                },
                COMMON_TEXTS_HTML.moreInfosREPORT,
                COMMON_TEXTS_HTML.dashboardIntro,
                {
                  id: 'miseAJour',
                  textClass: 'justify-center mx-4 pt-3 pb-5 mb-5',
                  textContent: undefined,
                  fromUrl: {
                    fr:
                      'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/backend/json/report/last_update_data.txt'
                  }
                }
              ]
            }
          ]
        }
      ]
    },

    // ============================================================= //
    // ACTIVITE PARTIELLE
    // ============================================================= //
    {
      id: 'text-activitepartielle-title',
      help: '',
      title: { fr: '' },
      titleI18n: 'texts.text01.title',
      dividers: {
        before: false,
        after: false
      },
      componentRows: [
        {
          rowNumber: 1,
          help: '',
          columns: [
            {
              colName: '',
              colTitle: { fr: '' },
              colTitleClass: '',
              cols: 12,
              textClass: '',
              subTextClass: '',
              sizeDesktop: 'headline mb-0',
              sizeMobile: 'subtitle-1',
              textPrefix: { fr: 'Activité Partielle : ' },
              textPrefixClass: 'font-weight-regular',
              textSuffix: { fr: '' },
              textSuffixClass: undefined,
              specialStoreId: 'levelname',
              specialStoreIdClass: 'font-weight-medium'
            }
          ]
        }
      ]
    },
    {
      id: 'text-activitepartielle-infos',
      help: '',
      title: { fr: '' },
      titleI18n: 'texts.text01.title',
      dividers: {
        before: false,
        after: false
      },
      componentRows: [
        {
          rowNumber: 1,
          help: '',
          columns: [
            {
              colName: '',
              colTitle: { fr: 'Activité Partielle' },
              colTitleClass: 'my-5',
              cols: 12,
              textClass: '',
              subTextClass: '',
              sizeDesktop: '',
              sizeMobile: 'body-2',
              textPrefix: { fr: undefined },
              textPrefixClass: undefined,
              textSuffix: { fr: undefined },
              textSuffixClass: undefined,
              specialStoreId: undefined,
              specialStoreIdClass: undefined,
              textsHtml: [
                {
                  id: 'activitepartielle-intro',
                  textClass: 'text-left mx-4 pt-4',
                  textContent: {
                    fr: `
                      Face à l’ampleur de la crise sanitaire liée au COVID-19, 
                      le Gouvernement a décidé de transformer structurellement 
                      le dispositif d’activité partielle, pour doter la France du système 
                      le plus protecteur d’Europe.
                      <br><br>
                      L’activité partielle est un outil au service de la politique publique 
                      de prévention des licenciements économiques qui permet à l’employeur 
                      en difficulté de faire prendre en charge tout ou partie 
                      du coût de la rémunération de ses salariés.
                      <br><br>
                      L’activité partielle s’adresse à tous les salariés qui subissent une baisse de rémunération imputable  :
                      <br><br>
                      <ul>
                        <li>
                        soit à une réduction de l’horaire de travail pratiqué dans l’établissement ou partie de l’établissement en deçà de la durée légale de travail ;
                        </li>
                        <li>
                        soit à une fermeture temporaire de tout ou partie de l’établissement.
                        </li>
                      </ul>
                      <br>
                      Pendant la période d’activité partielle :
                      <br><br>
                      <ul>
                        <li>
                        L’employeur reçoit de l’Agence de services et de paiement (ASP) une allocation équivalent à une part de la rémunération horaire du salarié placé en activité partielle ;
                        </li>
                        <li>
                        Le salarié reçoit de son employeur une indemnité d’activité partielle, en lieu et place de son salaire pour la période durant laquelle il est placé en activité partielle.
                        </li>
                      </ul>
                      <br><br>
                      Plus d'informations sur la prise en charge de l'activité partielle sur
                      <a href="https://travail-emploi.gouv.fr/le-ministere-en-action/coronavirus-covid-19/questions-reponses-par-theme/faq-chomage-partiel-activite-partielle" target="_blank">
                        la page des FAQ
                      </a>
                      ainsi que sur 
                      <a href="https://activitepartielle.emploi.gouv.fr/apart/" target="_blank">
                        le portail officiel
                      </a>.
                      <br><br>
                      Les données utilisées pour ce tableau de bord sont 
                      mises à jour de manière 
                      hebdomadaire.
                    `
                  },
                  fromUrl: {
                    fr: undefined
                  }
                },
                COMMON_TEXTS_HTML.moreInfosACTIVITEPARTIELLE,
                COMMON_TEXTS_HTML.dashboardIntro,
                {
                  id: 'miseAJour',
                  textClass: 'justify-center mx-4 pt-3 pb-5 mb-5',
                  textContent: undefined,
                  fromUrl: {
                    fr:
                      'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/backend/json/activite-partielle/last_update_data.txt'
                  }
                }
              ]
            }
          ]
        }
      ]
    }

  ]
}
