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
  moreInfosCPSTI: {
    id: 'more-infos-cpsti',
    textClass: 'text-left mx-4 pt-4',
    textContent: {
      fr: `
        Les données utilisées sur ce tableau de bord<a target="_blank" href="https://open.urssaf.fr/explore/dataset/aide-exceptionnelle-cpsti-covid-19">
         sont disponibles sur le portail open data de l'Urssaf</a>
         et
        <a target="_blank" href="https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-aides-exceptionnelles-aux-artisans-et-commercants-dans-le-cadre-de-lepidemie-de-covid-19/">
          sur data.gouv.fr</a>.

      `
    },
    fromUrl: {
      fr: undefined
    }
  },

  moreInfosARPB: {
    id: 'more-infos-arpb',
    textClass: 'text-left mx-4 pt-4',
    textContent: {
      fr: `
      Les données utilisées sur ce tableau de bord
      <a target="_blank" href="https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-prets-directs-de-letat-mis-en-place-dans-le-cadre-de-lepidemie-de-covid-19/">
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
        <a target="_blank" href="https://www.data.gouv.fr/fr/datasets/donnees-relatives-au-dispositif-dactivite-partielle-mis-en-oeuvre-dans-le-cadre-de-lepidemie-de-covid-19/">
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
              colTitleClass: 'text-center',
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
                      L’État et les Régions ont mis en place un fonds de solidarité pour aider les petites entreprises les plus touchées par la crise. Sont concernés par cette aide :
                      <br /><br />
                      <ul>
                        <li>
                          <u>les entreprises visées par une mesure d'interdiction d'accueil du public</u> durant tout le mois au cours duquel l’aide est demandée ou sur une partie dudit mois et ayant perdu 20% de chiffre d’affaires (pour le calcul du pourcentage de perte, le montant des ventes à distance et ventes à emporter est à intégrer) sans condition de nombre de salariés :
                          <br /><br />
                          <ul>
                            <li>pour les entreprises fermées sur la totalité du mois : l’aide correspond au montant de la perte de chiffre d’affaires enregistrée, dans la limite de 10 000 € ou à 20% du chiffre d'affaires de référence dans la limite de 200 000 € ;</li>
                            <br />
                            <li>pour les entreprises fermées sur une partie du mois, l’aide correspond :
                              <br />
                              <ul>
                                <li>au montant de la perte de chiffre d’affaires enregistrée, dans la limite de 1 500 € si cette perte est comprise entre 20% et 50% de leur chiffre d’affaires de référence ;</li>
                                <li>au montant de la perte de chiffre d’affaires enregistrée, dans la limite de 10 000 € ou à 20% du chiffre d'affaires de référence dans la limite de 200 000 € si cette perte est supérieure à 50%.</li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <br />
                        <li>
                          <u>les entreprises appartenant aux secteurs S1</u>, inscrits à l’annexe 1 du décret n°2020-370 du 30 mars 2020, et ayant perdu plus de 50 % de leur chiffre d’affaires.
                          <br /><br />
                          <ul>
                            <li>
                              Elles reçoivent une aide compensant leur perte de chiffre d'affaires plafonnée à 10 000 € ou à 15% du CA (ce taux pouvant être porté à 20% en cas de perte supérieure à 70 % de CA), dans la limite de 200 000 €.
                            </li>
                          </ul>
                        </li>
                        <br />
                        <li>
                          les entreprises qui ont perdu 50% de leur chiffre d’affaires sans condition de nombre de salariés : 
                          <br /><br />
                          <ul>
                            <li>
                              <u>appartenant au secteur S1 bis</u> inscrits à l’annexe 2 du décret n°2020-370 du 30 mars 2020, qui ont perdu plus de 80 % de leur chiffre d’affaires pendant la première ou seconde période de confinement ou 10% de CA annuel entre 2019 et 2020 ;
                            </li>
                            <br />
                            <li>
                              <u>domiciliés dans une commune dites « stations de ski »</u> mentionnée à l’annexe 3 du décret n°2020-370 du 30 mars 2020 qui exercent leur activité principale dans le commerce de détail, à l’exception des automobiles et motocycles, ou la location de biens immobiliers résidentiels ;
                            </li>
                            <br />
                            <li>
                              <u>exerçant leur activité principale dans le commerce de détail avec au moins un de leurs magasins de vente situé dans un centre commercial</u> comportant un ou plusieurs bâtiments dont la surface commerciale utile est supérieure ou égale à dix mille mètres carrés, faisant l’objet d’une interdiction d’accueil du public ;
                            </li>
                            <br />
                            <li>
                              <u>exerçant leur activité principale dans le commerce de détail ou dans la réparation et maintenance navale et étant domiciliées dans certains territoires</u> ultramarins : la Réunion, la Guadeloupe, la Martinique, Saint-Martin, Saint-Barthélemy et la Polynésie française. Sont toutefois exclues les entreprises exerçant une activité commerciale dans les secteurs de l’automobile et des motocycles. 
                            </li>
                            <br /><br />              
                            Ces entreprises perçoivent une subvention égale à :
                            <br />
                            <ul>
                              <li>
                                80 % de leur perte de chiffre d’affaires dans la limite de 10 000 € ou à 15 % du chiffre d'affaires de référence dans la limite de 200 000 €, si leur pourcentage de perte est supérieur ou égal à 50 % et inférieur à 70 % ;
                              </li>
                              <li>
                                80 % de leur perte de chiffre d’affaires dans la limite de 10 000 € ou à 20 % du chiffre d'affaires de référence dans la limite de 200 000 €, si leur pourcentage de perte est supérieur ou égal à 70 % ; 
                              </li>
                              <li>
                                100 % de leur perte si celle-ci est inférieure à 1 500 €.
                              </li>
                            </ul>
                          </ul>
                        </li>
                        <br /><br />
                        <li>
                          <u>Les entreprises  appartenant aux autres secteurs, ayant moins de 50 salariés, et réalisant une perte de CA de 50 %</u>  reçoivent une aide compensant leur perte pouvant aller jusqu'à 1 500€.
                        </li>
                      </ul>
                      <br /><br />
                      L’extinction progressive du fonds de solidarité au cours des mois de juin et juillet est mise en œuvre par le  décret n° 2021-840 du 29 juin 2021 afin d’accompagner les entreprises jusqu’au retour à la normal. Sont concernées :
                      <ul>
                        <li><u>Les entreprises continuant à subir une interdiction d’accueil du public sans interruption</u> et ayant subi une perte de chiffre d'affaires (CA) d'au moins 20 % ; celles-ci bénéficieront d’une subvention mensuelle égale à 20 % du CA de référence, dans la limite de 200 000 euros ;
                        </li>
                        <li>
                        <u>Les entreprises appartenant aux secteurs « S1 », « S1 bis », et « commerce de détail ou réparation navale dans certains territoires ultramarins »</u> et ayant perdu plus de 10% de leur chiffre d’affaire.
                          <br />
                          <ul>
                            <li>
                              Elles reçoivent une aide compensant leur perte de chiffre d'affaires au titre du mois de juin à hauteur de 40% de la perte du chiffre d’affaire dans la limite de 20% du CA de référence et 200 000 euros ; 
                            </li>
                            <li>
                              Elles reçoivent une aide compensant leur perte de chiffre d'affaires au titre du mois de juillet à hauteur de 30% de la perte du chiffre d’affaire dans la limite de 20% du CA de référence et 200 000 euros.
                            </li>
                          </ul>
                        </li>
                        <li>
                        <u>Les entreprises dites « autres » de moins de 50 salariés, ayant perdu 50 % de CA et domiciliées dans un territoire faisant l’objet de mesures de confinement pendant au moins 10 jours au cours de la période mensuelle considérée</u> (sur le fondement de l’article 4-2 du décret du 1er juin 2021) ; elle reçoivent une aide compensant la perte de chiffre d’affaires dans la limite de 1 500 €. 
                        </li>
                      </ul>
                      Un rendez-vous est prévu à la fin du mois d’août avec les professionnels, afin de faire le point sur l’état des différents secteurs d’activité et d’adapter, le cas échéant, les dispositifs. A ce stade de la pandémie, le Gouvernement évalue en permanence les mesures afin que celles-ci soient à même de répondre aux besoins des entreprises, dans le respect du principe d’égalité et en évitant tout frein à la reprise.
                      <br /><br />
                      Ce dispositif du fonds de solidarité sera prolongé au fur et à mesure du retour à la normal. En juin, juillet et août 2021, l’aide versée évoluera pour compenser de manière décroissante les pertes de chiffre d’affaires, respectivement à hauteur de 40 %, 30 % puis 20 %, cela afin d’accompagner la reprise d’activité. Un rendez-vous est également prévu à la fin du mois d’août avec les professionnels, afin de faire le point sur l’état des différents secteurs d’activité et d’adapter, le cas échéant, les dispositifs. A ce stade de l’épidémie, le Gouvernement évalue en permanence les mesures afin que celles-ci soient à même de répondre aux besoins des entreprises, dans le respect du principe d’égalité et en évitant tout frein à la reprise.
                      <br /><br />
                      Cette cartographie présente les montants attribués dans le cadre du fonds de solidarité projetés au niveau départemental et régional avec une ventilation par secteur d'activité, structure juridique et tranche d'effectifs (effectifs pour les entreprises affiliées au régime général). Les données concernent uniquement les entreprises affiliées au régime général 
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
              textClass: 'text-center',
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
              textClass: 'text-center',
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
    // CPSTI
    // ============================================================= //
    {
      id: 'text-cpsti-title',
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
              textClass: 'text-center',
              subTextClass: '',
              sizeDesktop: 'headline mb-0',
              sizeMobile: 'subtitle-1',
              textPrefix: { fr: "Aides artisans / commerçants : " },
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
      id: 'text-cpsti-infos',
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
              colTitle: { fr: "Aides exceptionnelles aux artisans et commerçants" },
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
                  id: 'cpsti-intro',
                  textClass: 'text-left mx-4 pt-4',
                  textContent: {
                    fr: `
                      <p>
                        Le Conseil de la protection sociale des travailleurs indépendants (CPSTI) met en place une aide financière exceptionnelle à destination de tous les commerçants et les artisans qui :
                      <p>
                      <ul>
                        <li>sont en activité au 15 mars 2020</li>
                        <li>ont été immatriculés avant le 1er janvier 2019.</li>
                      </ul>
                      <br>
                      <p>
                        L'aide correspond au montant des cotisations de retraite complémentaire versées
                        par les artisans et les commerçants sur la base de leurs revenus de 2018 et pourra aller jusqu'à 1250 €.
                      </p>
                      <p>
                        Cette aide est versée de manière automatique par les Urssaf et ne nécessite aucune démarche
                        des travailleurs indépendants concernés.
                      </p>
                      <p>
                        Le montant de cette aide est par ailleurs exonéré d'impôt sur le revenu ainsi
                        que de cotisations et de contributions sociales.
                      </p>
                      <p>
                        Cette aide exceptionnelle s'ajoute à l'ensemble des mesures prises en faveur des
                        travailleurs indépendants par le Gouvernement depuis le début de la crise.
                        Elle complète un dispositif massif de soutien à l'activité économique des artisans
                        et des commerçants afin de maintenir leur activité et permettre une reprise rapide et forte de l'économie.
                      </p>
                    `
                  },
                  fromUrl: {
                    fr: undefined
                  }
                },
                COMMON_TEXTS_HTML.moreInfosCPSTI,
                COMMON_TEXTS_HTML.dashboardIntro,
                {
                  id: 'miseAJour',
                  textClass: 'justify-center mx-4 pt-3 pb-5 mb-5',
                  textContent: undefined,
                  fromUrl: {
                    fr:
                      'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/backend/json/cpsti/last_update_data.txt'
                  }
                }
              ]
            }
          ]
        }
      ]
    },


    // ============================================================= //
    // ARPB
    // ============================================================= //
    {
      id: 'text-arpb-title',
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
              textClass: 'text-center',
              subTextClass: '',
              sizeDesktop: 'headline mb-0',
              sizeMobile: 'subtitle-1',
              textPrefix: { fr: "Prêts directs de l'Etat : " },
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
      id: 'text-arpb-infos',
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
              colTitle: { fr: "Avances remboursables et prêts à taux bonifiés" },
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
                  id: 'arpb-intro',
                  textClass: 'text-left mx-4 pt-4',
                  textContent: {
                    fr: `
                    <p>Des mesures spécifiques, sous forme de crédits d’intervention directs de l’Etat, ont été prévues afin de soutenir les entreprises pour lesquelles le recours aux autres dispositifs exceptionnels (Fonds de solidarité, PGE, report des échéances fiscales et sociales, activité partielle, etc.) se révèle inopérant ou insuffisant.</p>

                    <p>Ces prêts visent le sauvetage d’une entreprise présentant un intérêt stratégique en raison notamment de son impact territorial ou de son positionnement industriel.</p>
                    
                    <ul>
                      <li>Ils s’adressent aux PME de 50 à 250 salariés, ou à titre dérogatoire pour les moins de 50 salariés, qui nécessitent un soutien en trésorerie et une restructuration de leur bilan et opérations, et qui ne sont pas ou plus soutenus par leurs financeurs privés ou bancaires.</li>
                      <li>Ils s'adressent aux PME qui font état de perspectives réelles de redressement ou retour à la rentabilité, démontrées par un plan d’affaires, éventuellement audité.</li>
                      <li>Les aides sont accordées après avoir recherché une contribution équilibrée des différents partenaires financiers de l’entreprise : apurement du passif auprès des créanciers publics (CCSF) et privés, apport des actionnaires.</li>
                    </ul>
                    <br>
                    <p>Les préfets au nom des comités départementaux d’examen des problèmes de financement des entreprises (CODEFI) ou les commissaires aux restructurations et à la prévention des difficultés d’entreprises (CRP) sont compétents pour proposer ces mesures aux entreprises qui y sont éligibles. Les décisions finales sont prises par la Direction générale des entreprises (DGE) par arrêté ministériel publiés au Journal Officiel.</p>         
                    `
                  },
                  fromUrl: {
                    fr: undefined
                  }
                },
                COMMON_TEXTS_HTML.moreInfosARPB,
                COMMON_TEXTS_HTML.dashboardIntro,
                {
                  id: 'miseAJour',
                  textClass: 'justify-center mx-4 pt-3 pb-5 mb-5',
                  textContent: undefined,
                  fromUrl: {
                    fr:
                      'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/backend/json/arpb/last_update_data.txt'
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
              textClass: 'text-center',
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
      id: 'text-activitepartielle-note',
      help: '',
      title: { fr: '' },
      titleI18n: '',
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
              colTitle: undefined,
              colTitleClass: 'my-2',
              cols: 12,
              textClass: 'text-center',
              subTextClass: '',
              sizeDesktop: 'pt-2',
              sizeMobile: 'pb-2 body-2',
              textPrefix: undefined ,
              textPrefixClass: undefined,
              textSuffix: undefined,
              textSuffixClass: undefined,
              specialStoreId: undefined,
              specialStoreIdClass: undefined,
              textsHtml: [
                {
                  id: 'activitepartielle-note',
                  textClass: 'justify-center font-weight-light caption mx-4',
                  textContent: {
                    fr: `
                      <em>
                      nota : les chiffres indiqués ci-dessus et sur la carte représentent les valeurs
                      au dernier mois disponible (janvier 2021)
                      </em>
                      `
                  },
                  fromUrl: {
                    fr: undefined
                  }
                }
              ],
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
                      Ces données sont tirées des tableaux de bords mis en place par la DARES.
                      Plus d'informations sur
                      <a href="https://dares.travail-emploi.gouv.fr/dares-etudes-et-statistiques/tableaux-de-bord/le-marche-du-travail-pendant-le-covid-19/tableaux-de-bord-hebdomadaires" target="_blank">
                        le portail de la DARES
                      </a>
                      ainsi que sur
                      <a href="https://activitepartielle.emploi.gouv.fr/apart/" target="_blank">
                        le portail officiel du gouvernement
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
                // COMMON_TEXTS_HTML.moreInfosACTIVITEPARTIELLE,
                COMMON_TEXTS_HTML.dashboardIntro,
                {
                  id: 'miseAJour',
                  textClass: 'justify-center mx-4 pt-3 pb-5 mb-5',
                  textContent: undefined,
                  fromUrl: {
                    fr:
                      'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/backend/json/activite-partielle3/last_update_data.txt'
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
