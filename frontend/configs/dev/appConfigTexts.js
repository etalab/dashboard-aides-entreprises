const COMMON_TEXTS_HTML = {
  dashboardIntro: {
    id: 'dashboard-intro',
    textClass: 'text-left mx-4 pt-4',
    textContent: {
      fr: `
        Afin d’offrir de la visibilité à l’ensemble des Français sur l’attribution de ces aides, 
        Bruno Le Maire et Gérald Darmanin mettent à disposition un tableau de bord accessible à tous. 
        Cette plateforme, créée par le département Etalab de la
        <a target="_blank" href="https://www.numerique.gouv.fr">
          Direction Interministérielle du Numérique (DINUM)</a>
        et dont le 
        <a target="_blank" href="https://github.com/etalab/dashboard-aides-entreprises">
          code source est libre</a>, 
        recense les différentes catégories d'aides apportées par secteur, par région et département.
      `
    },
    fromUrl: {
      fr: undefined
    }
  },
  moreInfos: {
    id: 'more-infos',
    textClass: 'text-left mx-4 pt-4 pb-5 mb-5',
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
              textPrefix: { fr: 'Aides versées : ' },
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
                      Bruno Le Maire et Gérald Darmanin lancent un tableau de bord du fonds de solidarité.
                      <br><br>
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
                          Pour l’aide versée au titre du mois de mars : qui connaissent une perte de chiffre d'affaires d’au moins 50 % au mois de mars 2020 par rapport au mois de mars 2019 ;
                        </li>
                        <li>
                          Pour l’aide versée au titre du mois d’avril : qui connaissent une perte de chiffre d'affaires d’au moins 50 % au mois d’avril 2020 par rapport au mois d’avril 2019 ou au chiffre d’affaires mensuel moyen sur 2019.                  
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
                      Cette cartographie présente les montants attribués dans le cadre du fonds de solidarité projetés au niveau départemental et régional avec une ventilation par secteur d'activité, structure juridique et tranche d'effectifs (effectifs pour les entreprises affiliées au régime général).
                      <br><br>
                      Les données sont mises à jour quotidiennement.
                    `
                  },
                  fromUrl: {
                    fr: undefined
                  }
                },
                COMMON_TEXTS_HTML.moreInfos,
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
                      Les données sous-jacentes sont mises à jour de manière hebdomadaires.
                    `
                  },
                  fromUrl: {
                    fr: undefined
                  }
                },
                COMMON_TEXTS_HTML.moreInfos,
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
              textPrefix: { fr: "Reports d'échéance : " },
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
              colTitle: { fr: "Les reports d'échéance" },
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
                      Bruno Le Maire et Gérald Darmanin lancent un tableau de bord 
                      des reports d'échéance (ou reports de charges).
                    `
                  },
                  fromUrl: {
                    fr: undefined
                  }
                },
                COMMON_TEXTS_HTML.moreInfos,
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
    }

  ]
}
