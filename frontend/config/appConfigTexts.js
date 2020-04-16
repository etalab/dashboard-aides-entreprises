
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
        after : true,
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
        after : true,
      },
      componentRows : [

        { rowNumber : 1,
          help : '',
          columns : [
          
            { colName : '',
              colTitle : { fr : "Plus d'informations sur les mesures de soutien aux entreprises" },
              colTitleClass : 'mt-5',
              cols : 12,
              textClass : '',
              subTextClass : '',
              textPrefix : { fr : undefined },
              textSuffix : { fr : undefined },
              specialStoreId : undefined,
              specialStoreIdClass : undefined,
              textsHtml : [

                { id : 'aides-links',
                  textClass : 'text-left mx-4 pt-4',
                  textContent : { fr : `
                    Face à l’épidémie du Coronavirus Covid-19, le Gouvernement met en place des mesures immédiates de soutien aux entreprises. 

                    Pour obtenir plus de détails sur ces mesures vous pouvez consulter la
                    <a target="_top" href="https://www.economie.gouv.fr/coronavirus-soutien-entreprises">
                      page d'informations dédiée</a>.
                    sur le portail du ministère de l'économie, des finances, de l'action et des comptes publics
                  ` },
                  fromUrl : undefined,
                },

                { id : 'intro',
                  textClass : 'text-left mx-4 pt-4',
                  textContent : { fr : `
                    L’information officielle sur la progression de l’épidémie en France est consolidée par 
                    <a target="_top" href="https://www.santepubliquefrance.fr">
                      Santé publique France</a>.
                    L’agence propose un 
                    <a target="_top" href="https://www.santepubliquefrance.fr/maladies-et-traumatismes/maladies-et-infections-respiratoires/infection-a-coronavirus/articles/infection-au-nouveau-coronavirus-sars-cov-2-covid-19-france-et-monde">
                      point épidémiologique quotidien</a>, 
                    qui comprend les chiffres-clés nationaux. 
                    Elle propose également des 
                    <a target="_top" href="https://www.data.gouv.fr/fr/organizations/sante-publique-france/">
                      données relatives à l’épidémie plus précises</a> 
                    sur la plateforme 
                    <a target="_top" href="https://www.data.gouv.fr">
                      www.data.gouv.fr</a>
                  ` },
                  fromUrl : undefined,
                },

                { id : 'repo-01',
                  textClass : 'text-left mx-4 pt-4 pb-5',
                  textContent : { fr : `

                    Cet outil 
                      <a target="_top" href="https://github.com/etalab/dashboard-aides-entreprises">
                        dont le code source est libre</a>, 
                      développé sous l’impulsion d’
                      <a target="_top" href="https://www.etalab.gouv.fr">
                        Etalab</a>, 
                      au sein de la 
                      <a target="_top" href="https://www.numerique.gouv.fr/dinum/">
                        direction interministérielle du numérique</a>, 
                      propose une vision consolidée des données officielles disponibles.

                  ` },
                  fromUrl : undefined,
                },
              ] 
            },
          
          ]
        }

      ],
    },


  ]


}