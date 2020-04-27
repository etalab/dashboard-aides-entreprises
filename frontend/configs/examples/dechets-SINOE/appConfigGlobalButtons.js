export const configAppGlobalButtons = {
  help: "this file contains the setup for the numbers components",

  // GLOBAL BUTTONS

  settingsIds: [
    {
      id: "global-button-01",
      help: "",
      title: { fr: "" },
      titleI18n: "buttons.button01.title",
      dividers: {
        before: false,
        after: false,
      },

      btnsRowClass: "align-center justify-center",

      componentButtons: [
        {
          id: "first-button",
          title: { fr: "retour au niveau national" },
          titleI18n: "buttons.button01.title",

          btnClass: "justify-center btn-gouv",

          block: false,
          icon: undefined,
          outlined: true,
          fab: false,
          color: "primary",
          large: false,
          small: false,
          dark: false,
          tile: true,
          rounded: false,
          disabled: false,

          activatedIf: undefined,
          functions: [
            {
              funcName: "resetStore",
              funcParams: {
                targets: [
                  {
                    from: "store",
                    fromPropKey: undefined,
                    fromPropValue: "national",
                    fromStoreData: "initData",
                    fromDatasetId: "infos",
                    fromDatasetKey: "switchers",
                    fromDatasetField: undefined,
                    targetSpecialStoreId: "levelname",
                  },

                  {
                    from: "store",
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: "initData",
                    fromDatasetId: "national-aides-raw",
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: "kg_par_habitant",
                    targetSpecialStoreId: "kg_par_habitant",
                    format: [
                      {
                        utilsFnName: "toMillionsOrElse",
                        params: { divider: 1, fixed: 0 },
                      },
                    ],
                  },

                  {
                    from: "store",
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: "initData",
                    fromDatasetId: "national-aides-raw",
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: "tonnage",
                    targetSpecialStoreId: "tonnage",
                    format: [
                      {
                        utilsFnName: "toMillionsOrElse",
                        params: { divider: 1000000, fixed: 2 },
                      },
                    ],
                  },

                  {
                    from: "store",
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: "initData",
                    fromDatasetId: "national-aides-raw",
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: undefined,
                    targetSpecialStoreId: "focusObject",
                  },
                ],
              },
            },

            {
              funcName: "resetMapZoom",
              funcParams: {
                targets: [
                  {
                    from: "store",
                    fromPropKey: undefined,
                    fromPropValue: 8,
                    fromStoreData: undefined,
                    fromDatasetId: undefined,
                    fromDatasetKey: undefined,
                    fromDatasetField: undefined,
                    targetSpecialStoreId: undefined,
                  },
                ],
              },
            },

            "",
          ],
        },
      ],
    },
  ],
}
