const DATE_UPLOAD_DATA = "17 avril 2020"
// let fs = require('fs')
// let DATE_UPLOAD_DATA = fs.readFileSync('~/static/datasets/aides/prod/date_update.txt').toString().split("\n")
// let DATE_UPLOAD_DATA = fetch('/static/datasets/aides/prod/date_update.txt')

export const configAppTexts = {
  help: "this file contains the setup for the texts components",

  // NUMBERS

  settingsIds: [
    {
      id: "text-01",
      help: "",
      title: { fr: "" },
      titleI18n: "texts.text01.title",
      dividers: {
        before: false,
        after: false,
      },
      componentRows: [
        {
          rowNumber: 1,
          help: "",
          columns: [
            {
              colName: "",
              colTitle: { fr: "" },
              colTitleClass: "",
              cols: 12,
              textClass: "headline",
              subTextClass: "",
              textPrefix: { fr: "Données Déchets : " },
              textSuffix: { fr: "" },
              specialStoreId: "levelname",
              specialStoreIdClass: "font-weight-medium",
            },
          ],
        },
      ],
    },

    {
      id: "text-02",
      help: "",
      title: { fr: "" },
      titleI18n: "texts.text01.title",
      dividers: {
        before: false,
        after: false,
      },
      componentRows: [
        {
          rowNumber: 1,
          help: "",
          columns: [
            {
              colName: "",
              colTitle: { fr: "Informations" },
              colTitleClass: "my-5",
              cols: 12,
              textClass: "",
              subTextClass: "",
              textPrefix: { fr: undefined },
              textSuffix: { fr: undefined },
              specialStoreId: undefined,
              specialStoreIdClass: undefined,
              textsHtml: [
                {
                  id: "intro",
                  textClass: "text-left mx-4 pt-4",
                  textContent: {
                    fr: `
                    Ce tableau de bord est tiré des données publiées par <a href="https://www.sinoe.org/">SINOE</a> sur 
                    la plateforme <a href="http://data.gouv.fr">data.gouv.fr</a>
                    `,
                  },
                  // Plus d'informations sur les mesures de soutien aux entreprises sur le
                  // <a target="_blank" href="https://www.economie.gouv.fr/coronavirus-soutien-entreprises">
                  //   portail de l'Economie, des Finances, de l'Action et des Comptes publics</a>.
                  fromUrl: {
                    fr: undefined,
                  },
                },

                {
                  id: "aides-textes",
                  textClass: "text-left mx-4 pt-4",
                  textContent: {
                    fr: `

                    Afin d’offrir de la visibilité à l’ensemble des Français 
                    sur les quantités de production de déchets, ce tableau de bord a été développé par les
                    équipes d'Etalab.

                  `,
                  },
                  fromUrl: {
                    fr: undefined,
                  },
                },

                {
                  id: "more-infos",
                  textClass: "text-left mx-4 pt-4 pb-5 mb-5",
                  textContent: {
                    fr: `
                    
                  `,
                  },
                  fromUrl: {
                    fr: undefined,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
