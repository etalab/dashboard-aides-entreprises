
export const configAppTexts = {
  
  help : "this file contains the setup for the texts components",

  // NUMBERS



  settingsIds : [

    { id : "text-01",
      help : '',
      title : { fr : '' },
      titleI18n : "texts.text01.title",
      dividers : {
        before : false,
        after : false,
      },
      componentRows : [

        { rowNumber : 1,
          help : '',
          columns : [
          
            { colName : '',
              colTitle : { fr : '' },
              colTitleClass : '',
              cols : 12,
              textClass : 'headline',
              subTextClass : '',
              textPrefix : { fr : 'Aides versées : ' },
              textSuffix : { fr : '' },
              specialStoreId : 'levelname',
              specialStoreIdClass : 'font-weight-medium',
            },
          
          ]
        }

      ],
    },

    { id : "text-02",
      help : '',
      title : { fr : '' },
      titleI18n : "texts.text01.title",
      dividers : {
        before : false,
        after : false,
      },
      componentRows : [

        { rowNumber : 1,
          help : '',
          columns : [
          
            { colName : '',
              colTitle : { fr : "Informations" },
              colTitleClass : 'my-5',
              cols : 12,
              textClass : '',
              subTextClass : '',
              textPrefix : { fr : undefined },
              textSuffix : { fr : undefined },
              specialStoreId : undefined,
              specialStoreIdClass : undefined,
              textsHtml : [

                { id : 'intro',
                  textClass : 'text-left mx-4 pt-4',
                  textContent : { fr : `
                    L’Etat a mis en place, avec les Régions, un fonds de solidarité doté d’1,7 milliard d’euros 
                    pour le mois de mars qui permettra le versement d’une aide défiscalisée 
                    allant jusqu’à 1500 euros aux plus petites entreprises, aux indépendants, 
                    aux micro-entrepreneurs et aux professions libérales touchés par la crise du coronavirus. 
                    Ce fonds sera maintenu autant que durera l’urgence sanitaire.
                    ` },
                    fromUrl : { fr : undefined },
                  },
                  // Plus d'informations sur les mesures de soutien aux entreprises sur le 
                  // <a target="_blank" href="https://www.economie.gouv.fr/coronavirus-soutien-entreprises">
                  //   portail de l'Economie, des Finances, de l'Action et des Comptes publics</a>.

                { id : 'aides-textes',
                  textClass : 'text-left mx-4 pt-4',
                  textContent : { fr : `

                    Afin d’offrir de la visibilité à l’ensemble des Français 
                    sur l’attribution des aides versées aux entreprises 
                    dans le cadre de ce fonds de solidarité, 
                    le ministre de l’action et des comptes publics, 
                    avec le soutien technique du département 
                    Etalab de la 
                    
                    <a target="_blank" href="https://www.numerique.gouv.fr">
                      Direction Interministérielle du Numérique (DINUM)</a>, 

                    mettent à disposition un tableau de bord dont le 

                    <a target="_blank" href="https://github.com/etalab/dashboard-aides-entreprises">
                      code source est libre</a>
                    qui propose une vision consolidée 
                    des aides aux entreprises effectivement versées.

                  ` },
                  fromUrl : { fr : undefined },
                },

                { id : 'more-infos',
                  textClass : 'text-left mx-4 pt-4 pb-5 mb-5',
                  textContent : { fr : `
                    Pour obtenir d’autres informations relatives au fonds de solidarité, il est possible de 
                    consulter la page d’information disponible sur 
                    <a target="_blank" href="https://www.impots.gouv.fr/portail/">
                      https://www.impots.gouv.fr/portail/</a>.
                  ` },
                  fromUrl : { fr : undefined },
                },

                { id : 'mise-a-jour',
                  textClass : 'text-left mx-4 pt-4 pb-5 mb-5',
                  textContent : { fr : `
                    
                  ` },
                  fromUrl : { fr : undefined },
                },

              ] 
            },
          
          ]
        }

      ],
    },


  ]


}