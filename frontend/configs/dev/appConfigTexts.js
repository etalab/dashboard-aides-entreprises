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
              textClass: "",
              subTextClass: "",
              sizeDesktop: "headline mb-0",
              sizeMobile: "subtitle-1",
              textPrefix: { fr: "Aides versées : " },
              textPrefixClass: "font-weight-regular",
              textSuffix: { fr: "" },
              textSuffixClass: undefined,
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
              textPrefixClass: undefined,
              textSuffix: { fr: undefined },
              textSuffixClass: undefined,
              specialStoreId: undefined,
              specialStoreIdClass: undefined,
              textsHtml: [
                {
                  id: "intro",
                  textClass: "text-left mx-4 pt-4",
                  textContent: {
                    fr: `
                    Bruno Le Maire et Gérald Darmanin lancent un tableau de bord du fonds de solidarité.
                    <br><br>
                    Créé par l’Etat et les Régions, le Fonds de solidarité est désormais doté de 7 milliards d’euros dont 500 millions d’euros apportés par les Régions. Depuis le 1er avril, le Fonds de solidarité a permis, au titre de son 1er volet mis en œuvre par la Direction générale des finances publiques, d’octroyer 1,29 milliards d’euros d’aides à 971 000 bénéficiaires, sous la forme d’une aide défiscalisée et exonérée de charges sociales pouvant aller jusqu’à 1500 euros.
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
                    Afin d’offrir de la visibilité à l’ensemble des Français sur l’attribution de ces aides, Bruno Le Maire et Gérald Darmanin mettent à disposition un tableau de bord accessible à tous. Cette plateforme, créée par le département Etalab de la
                    <a target="_blank" href="https://www.numerique.gouv.fr">
                      Direction Interministérielle du Numérique (DINUM)</a>
                    et dont le <a target="_blank" href="https://github.com/etalab/dashboard-aides-entreprises">code source est libre</a>, recense les aides apportées par secteur, par région et département au titre de ce fonds. Elle est mise à jour en temps réel.
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
                    Les données utilisées sur ce tableau de bord
                    <a target="_blank" href="https://www.data.gouv.fr/fr/datasets/aides-aux-entreprises-dans-le-cadre-de-lepidemie-de-covid-19-en-france/">
                      sont disponibles sur data.gouv.fr</a>.
                  `,
                  },
                  fromUrl: {
                    fr: undefined,
                  },
                },

                {
                  id: "miseAJour",
                  textClass: "justify-center mx-4 pt-3 pb-5 mb-5",
                  textContent: undefined,
                  fromUrl: {
                    fr:
                      "https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/backend/json/last_update_data.txt",
                    // fr: "/datasets/aides/prod/last_update_data.txt",
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
