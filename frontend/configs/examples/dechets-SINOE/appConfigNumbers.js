export const configAppNumbers = {
  help: "this file contains the setup for the numbers components",

  // NUMBERS

  settingsIds: [
    {
      id: "numbers-01",
      help: "",
      title: { fr: "" },
      titleI18n: "numbers.numbers01.title",
      dividers: {
        before: false,
        after: true,
      },
      componentRows: [
        {
          rowNumber: 1,
          help: "",
          columns: [
            {
              colName: "",
              colTitle: { fr: "Poids Total (en Millions de tonnes)" },
              titleI18n: "numbers.numbers01.amount",
              colClass: "",
              cols: 6,
              titleClass: "",
              numberClass: "title font-weight-bold",
              legendClass: "",
              unit: { fr: "Mt" },
              legend: { fr: "" },
              textPrefix: { fr: "" },
              textSuffix: { fr: "" },
              specialStoreId: "tonnage",
            },

            {
              colName: "",
              colTitle: { fr: "Poids par Habitant (en kilos)" },
              titleI18n: "numbers.numbers01.total",
              colClass: "",
              cols: 6,
              titleClass: "",
              numberClass: "title font-weight-bold",
              legendClass: "",
              unit: { fr: "kg" },
              legend: { fr: "" },
              textPrefix: { fr: "" },
              textSuffix: { fr: "" },
              specialStoreId: "kg_par_habitant",
            },
          ],
        },
      ],
    },
  ],
}
