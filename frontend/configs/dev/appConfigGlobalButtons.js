const COMMON_FUNCTIONS = {
  resetUrlPath: {
    funcName: 'cleanUrlPath',
    funcParams: {
    //   targets: [
    //     {
    //       from: undefined,
    //       urlArgs: {
    //         // datastore: 'initData',
    //         datasetid: 'regions',
    //         field: 'code',
    //         value: 'national'
    //       }
    //     }
    //   ]
    }
  },
  resetFitToPolygon: {
    funcName: 'resetFitToPolygon',
    funcParams: {}
  },
  resetSelectedPolygons: {
    funcName: 'resetSelectedPolygons',
    funcParams: {}
  }
}
const COMMONS_TARGETS = {
  resetLevelName: {
    from: 'store',
    fromPropKey: undefined,
    fromPropValue: 'national',
    fromStoreData: 'initData',
    fromDatasetId: 'infos',
    fromDatasetKey: 'switchers',
    fromDatasetField: undefined,
    targetSpecialStoreId: 'levelname',
    updatePath: true
  },
  resetMapZoom: {
    from: 'store',
    fromPropKey: undefined,
    fromPropValue: 8,
    fromStoreData: undefined,
    fromDatasetId: undefined,
    fromDatasetKey: undefined,
    fromDatasetField: undefined,
    targetSpecialStoreId: undefined
  }
}

export const configAppGlobalButtons = {
  help: 'this file contains the setup for the numbers components',

  // GLOBAL BUTTONS

  settingsIds: [
    // ============================================================= //
    // === BTN / FDS - FONDS DE SOLIDARITE
    // ============================================================= //
    {
      id: 'global-button-fds',
      help: '',
      title: { fr: '' },
      titleI18n: 'buttons.button01.title',
      dividers: {
        before: false,
        after: false
      },

      btnsRowClass: 'align-center justify-center',
      btnsRowClassMobile: 'mt-0 pt-0 mb-2',

      componentButtons: [
        {
          id: 'first-button',
          title: { fr: 'retour au niveau national' },
          titleI18n: 'buttons.button01.title',

          btnClass: 'justify-center btn-gouv',

          block: false,
          icon: undefined,
          outlined: true,
          fab: false,
          color: 'primary',
          large: false,
          small: false,
          dark: false,
          tile: true,
          rounded: false,
          disabled: false,

          activatedIf: undefined,
          functions: [
            {
              funcName: 'resetStore',
              funcParams: {
                targets: [
                  COMMONS_TARGETS.resetLevelName,
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-aides-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: 'nombre',
                    targetSpecialStoreId: 'nombre'
                  },
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-aides-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: 'nombre_siren',
                    targetSpecialStoreId: 'nombre_siren'
                  },
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-aides-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: 'montant',
                    targetSpecialStoreId: 'montant',
                    format: [
                      {
                        utilsFnName: 'toMillionsOrElse',
                        params: { divider: 1000000, fixed: 2 }
                      }
                    ]
                  },
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-aides-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: undefined,
                    targetSpecialStoreId: 'focusObject'
                  }
                ]
              }
            },
            {
              funcName: 'resetMapZoom',
              funcParams: {
                targets: [
                  COMMONS_TARGETS.resetMapZoom
                ]
              }
            },
            COMMON_FUNCTIONS.resetUrlPath,
            COMMON_FUNCTIONS.resetFitToPolygon,
            COMMON_FUNCTIONS.resetSelectedPolygons
          ],

          hideIfs: [
            { specialStoreId: 'levelname', value: 'échelle nationale' }
          ]
        }
      ]
    },

    // ============================================================= //
    // === BTN : PGE - PRETS GARANTIS PAR L'ETAT
    // ============================================================= //
    {
      id: 'global-button-pge',
      help: '',
      title: { fr: '' },
      titleI18n: 'buttons.button01.title',
      dividers: {
        before: false,
        after: false
      },

      btnsRowClass: 'align-center justify-center',
      btnsRowClassMobile: 'mt-0 pt-0 mb-2',

      componentButtons: [
        {
          id: 'first-button',
          title: { fr: 'retour au niveau national' },
          titleI18n: 'buttons.button01.title',

          btnClass: 'justify-center btn-gouv',

          block: false,
          icon: undefined,
          outlined: true,
          fab: false,
          color: 'primary',
          large: false,
          small: false,
          dark: false,
          tile: true,
          rounded: false,
          disabled: false,

          activatedIf: undefined,
          functions: [
            {
              funcName: 'resetStore',
              funcParams: {
                targets: [
                  COMMONS_TARGETS.resetLevelName,
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-pge-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: 'nombre',
                    targetSpecialStoreId: 'nombre'
                  },
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-pge-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: 'montant',
                    targetSpecialStoreId: 'montant',
                    format: [
                      {
                        utilsFnName: 'toMillionsOrElse',
                        params: { divider: 1000000, fixed: 2 }
                      }
                    ]
                  },
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-pge-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: undefined,
                    targetSpecialStoreId: 'focusObject'
                  }
                ]
              }
            },
            {
              funcName: 'resetMapZoom',
              funcParams: {
                targets: [
                  COMMONS_TARGETS.resetMapZoom
                ]
              }
            },
            COMMON_FUNCTIONS.resetUrlPath,
            COMMON_FUNCTIONS.resetFitToPolygon,
            COMMON_FUNCTIONS.resetSelectedPolygons
          ],

          hideIfs: [
            { specialStoreId: 'levelname', value: 'échelle nationale' }
          ]
        }
      ]
    },

    // ============================================================= //
    // === BTN : REPORT - REPORT D'ECHEANCE / REPORT DE CHARGES
    // ============================================================= //
    {
      id: 'global-button-report',
      help: '',
      title: { fr: '' },
      titleI18n: 'buttons.button01.title',
      dividers: {
        before: false,
        after: false
      },

      btnsRowClass: 'align-center justify-center',
      btnsRowClassMobile: 'mt-0 pt-0 mb-2',

      componentButtons: [
        {
          id: 'first-button',
          title: { fr: 'retour au niveau national' },
          titleI18n: 'buttons.button01.title',

          btnClass: 'justify-center btn-gouv',

          block: false,
          icon: undefined,
          outlined: true,
          fab: false,
          color: 'primary',
          large: false,
          small: false,
          dark: false,
          tile: true,
          rounded: false,
          disabled: false,

          activatedIf: undefined,
          functions: [
            {
              funcName: 'resetStore',
              funcParams: {
                targets: [
                  COMMONS_TARGETS.resetLevelName,
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-report-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: 'nombre',
                    targetSpecialStoreId: 'nombre'
                  },
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-report-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: 'montant',
                    targetSpecialStoreId: 'montant',
                    format: [
                      {
                        utilsFnName: 'toMillionsOrElse',
                        params: { divider: 1000000, fixed: 2 }
                      }
                    ]
                  },
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-report-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: undefined,
                    targetSpecialStoreId: 'focusObject'
                  }
                ]
              }
            },
            {
              funcName: 'resetMapZoom',
              funcParams: {
                targets: [
                  COMMONS_TARGETS.resetMapZoom
                ]
              }
            },
            COMMON_FUNCTIONS.resetUrlPath,
            COMMON_FUNCTIONS.resetFitToPolygon,
            COMMON_FUNCTIONS.resetSelectedPolygons
          ],

          hideIfs: [
            { specialStoreId: 'levelname', value: 'échelle nationale' }
          ]
        }
      ]
    },

    // ============================================================= //
    // === BTN : ACTIVITE PARTIELLE
    // ============================================================= //
    {
      id: 'global-button-activitepartielle',
      help: '',
      title: { fr: '' },
      titleI18n: 'buttons.button01.title',
      dividers: {
        before: false,
        after: false
      },

      btnsRowClass: 'align-center justify-center',
      btnsRowClassMobile: 'mt-0 pt-0 mb-2',

      componentButtons: [
        {
          id: 'first-button',
          title: { fr: 'retour au niveau national' },
          titleI18n: 'buttons.button01.title',

          btnClass: 'justify-center btn-gouv',

          block: false,
          icon: undefined,
          outlined: true,
          fab: false,
          color: 'primary',
          large: false,
          small: false,
          dark: false,
          tile: true,
          rounded: false,
          disabled: false,

          activatedIf: undefined,
          functions: [
            {
              funcName: 'resetStore',
              funcParams: {
                targets: [
                  COMMONS_TARGETS.resetLevelName,
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-activitepartielle-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: 'nombre_etablissements_concernes',
                    targetSpecialStoreId: 'nombre_etablissements_concernes'
                  },
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-activitepartielle-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: 'nombre_salaries_concernes',
                    targetSpecialStoreId: 'nombre_salaries_concernes'
                  },
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-activitepartielle-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: 'nombre_heures_demandees',
                    targetSpecialStoreId: 'nombre_heures_demandees'
                  },
                  {
                    from: 'store',
                    fromPropKey: undefined,
                    fromPropValue: undefined,
                    fromStoreData: 'initData',
                    fromDatasetId: 'national-activitepartielle-raw',
                    fromDatasetKey: undefined,
                    fromDatasetIndex: 0,
                    fromDatasetField: undefined,
                    targetSpecialStoreId: 'focusObject'
                  }
                ]
              }
            },
            {
              funcName: 'resetMapZoom',
              funcParams: {
                targets: [
                  COMMONS_TARGETS.resetMapZoom
                ]
              }
            },
            COMMON_FUNCTIONS.resetUrlPath,
            COMMON_FUNCTIONS.resetFitToPolygon,
            COMMON_FUNCTIONS.resetSelectedPolygons
          ],

          hideIfs: [
            { specialStoreId: 'levelname', value: 'échelle nationale' }
          ]
        }
      ]
    }
  ]
}
