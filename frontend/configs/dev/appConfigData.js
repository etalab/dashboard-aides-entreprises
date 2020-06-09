// const DATASETS_REPO_BASE = 'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/frontend/static/' // in repo folder
const DATASETS_REPO_BASE =
  'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/backend/json/' // in repo folder
const DATASETS_FOLDER = '/datasets' // in static folder

export const configAppData = {
  help: 'this file contains the data setup for the app',

  // DESCRIBE THE BACKEND API
  dataSource: {
    docs:
      'https://github.com/etalab/dashboard-aides-entreprises/tree/j_front/frontend',

    apiBackendUrl: {
      dev: 'http://pad-01.infra.data.gouv.fr:5000/',
      prod: 'http://pad-01.infra.data.gouv.fr:5000/',
      preprod: 'http://pad-01.infra.data.gouv.fr:5000/'
    },

    // TO DO ... INTEGRATE TO getDataInit etc...
    apiBackendSchema: [
      {
        arg: 'naf',
        id: 'list_nafs',
        argType: 'const',
        help: 'Liste de tous les codes APE/NAF ',
        jsonFile: 'nafs.json',
        return: 'list',
        subArgs: null
      },
      {
        arg: 'nace17',
        id: 'list_nace17',
        argType: 'const',
        help: 'Liste de tous les codes NACE 17 ',
        jsonFile: 'sections-nace17.json',
        return: 'list',
        subArgs: null
      },

      {
        arg: 'departement',
        id: 'list_deps',
        argType: 'const',
        help: 'Liste de tous les départements',
        jsonFile: 'departements.json',
        return: 'list',
        subArgs: null
      },

      {
        arg: 'region',
        id: 'list_regs',
        argType: 'const',
        help: 'Liste de toutes les régions',
        jsonFile: 'regions.json',
        return: 'list',
        subArgs: null
      },

      {
        arg: 'stat/aide',
        id: 'list_aides_national',
        argType: 'const',
        help: 'Liste des aides au niveau national',
        jsonFile: 'aides-maille-national.json',
        return: 'list',
        subArgs: [
          {
            arg: 'reg',
            id: 'list_aides_regional',
            argType: 'const',
            help: 'liste des aides au niveau régional',
            jsonFile: 'aides-maille-regional.json',
            return: 'list',
            subArgs: [
              {
                arg: '<REG_ID>/dep',
                id: 'list_aides_departemental',
                argType: 'var/const',
                help: 'Liste des aides au niveau départemental',
                jsonFile: 'aides-maille-departemental.json',
                return: 'list',
                subArgs: null
              }
            ]
          }
        ]
      }
    ]
  },

  // FILTERS
  filters: [
    {
      arg: 'departement',
      filterCode: 'DEP',
      filterType: 'checkbox',
      isActivated: true,
      name: {
        fr: 'départements'
      },
      populate: 'from_options', // "from_api"
      options: [
        { value: '0', label: { fr: 'dep_1' } },
        { value: '1', label: { fr: 'dep_2' } }
      ]
    },

    {
      arg: 'effectif',
      filterCode: 'EFF',
      filterType: 'checkbox',
      isActivated: true,
      name: {
        fr: 'catégories effectifs'
      },
      populate: 'from_options',
      options: [
        { value: '0', label: { fr: 'eff_1' } },
        { value: '1', label: { fr: 'eff_2' } }
      ]
    },

    {
      arg: 'naf',
      filterCode: 'NAF',
      filterType: 'checkbox',
      isActivated: true,
      name: {
        fr: 'codes naf'
      },
      populate: 'from_options',
      options: [
        { value: '0', label: { fr: 'naf_1' } },
        { value: '1', label: { fr: 'naf_2' } }
      ]
    },

    {
      arg: 'nace17',
      filterCode: 'NACE17',
      filterType: 'checkbox',
      isActivated: true,
      name: {
        fr: 'codes nace17'
      },
      populate: 'from_options',
      options: [
        { value: '0', label: { fr: 'nace17_1' } },
        { value: '1', label: { fr: 'nace17_2' } }
      ]
    }
  ],

  // DEFAULT SETUP
  defaultDataSetup: {
    initData: {
      help:
        "populate 'store.data.state.initData' @ middleware getIniitData.js / from : url | localFile",
      store: [
        // ============================================================= //
        // INFOS
        // ============================================================= //
        {
          id: 'infos',
          help: '',
          from: 'rawObject',
          rawObject: {
            numbers: {
              montant: undefined,
              nombre: undefined,
              effectifs: undefined,
              nafs: undefined
            },
            texts: {
              levelname: 'échelle nationale',
              levelcode: 'national'
            },
            focusObject: undefined,
            switchers: {
              national: 'échelle nationale',
              regional: 'échelle régionale',
              departement: 'échelle départementale'
            }
          },
          displayed: true,
          copyTo: [
            {
              fieldToCopy: 'levelname',
              from: { objectRef: 'texts' },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'levelname',
              format: undefined
            },
            {
              fieldToCopy: 'levelcode',
              from: { objectRef: 'texts' },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'levelcode',
              format: undefined
            }
          ]
        },

        // ============================================================= //
        // TAXONOMIES
        // ============================================================= //
        {
          id: 'taxo-nafs',
          help: '',
          from: 'static',
          //   url  : "http://pad-01.infra.data.gouv.fr:5000/naf"
          url: `${DATASETS_REPO_BASE}/taxonomies/nafs-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/taxonomies/nafs.json`,
          displayed: false
        },
        {
          id: 'taxo-regions',
          help: '',
          from: 'static',
          //   url  : "http://pad-01.infra.data.gouv.fr:5000/region"
          url: `${DATASETS_REPO_BASE}/taxonomies/regions-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/taxonomies/regions.json`,
          displayed: false
        },
        {
          id: 'taxo-departements',
          help: '',
          from: 'static',
          //   url  : "http://pad-01.infra.data.gouv.fr:5000/departement"
          url: `${DATASETS_REPO_BASE}/taxonomies/departements-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/taxonomies/departements.json`,
          displayed: false
        },
        {
          id: 'taxo-classes-effectifs',
          help: '',
          from: 'static',
          //   url  : "http://pad-01.infra.data.gouv.fr:5000/classeeffectif"
          url: `${DATASETS_REPO_BASE}/taxonomies/classes-effectifs-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/taxonomies/classes-effectifs.json`,
          displayed: false
        },
        {
          id: 'taxo-nafs-colors',
          help: '',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/taxonomies/sections-naf-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/taxonomies/sections-naf.json`,
          displayed: false
        },
        {
          id: 'taxo-nace17-colors',
          help: '',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/taxonomies/sections-nace17-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/taxonomies/sections-nace17.json`,
          displayed: false
        },
        {
          id: 'taxo-categ-juridiques',
          help: '',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/taxonomies/categories-juridiques-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/taxonomies/categories-juridiques.json`,
          displayed: false
        },

        // ============================================================= //
        // GEOJSON (NO NEED EXCEPT CENTERS : SOURCES LOADED IN MAPBOX COMPONENT )
        // ============================================================= //
        {
          id: 'centers',
          help: 'geo centres régions et départements',
          from: 'static',
          // url: `${DATASETS_FOLDER}/geodata/centers.json`,
          // backupUrl: `${DATASETS_FOLDER}/geodata/centers.json`,
          url: `${DATASETS_FOLDER}/geodata/centers_corrected.json`,
          backupUrl: `${DATASETS_FOLDER}/geodata/centers_corrected.json`,
          displayed: true
        }

      ]
    }
  },

  // SOURCES FOR ROUTES
  routesData: {
    help: 'data sources not loaded at init but depending on routes',
    initData: {
      help: '',
      store: [
        // ============================================================= //
        // === DATASET : FDS - FONDS DE SOLIDARITE
        // ============================================================= //
        {
          id: 'national-aides-raw',
          dataset: 'fds',
          help: 'serie chiffres aides à la maille nationale',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/aides/aides-maille-national-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/aides/aides-maille-national.json`,
          displayed: true,
          copyTo: [
            {
              fieldToCopy: undefined,
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'focusObject',
              format: undefined
            },
            {
              fieldToCopy: 'montant',
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'montant',
              format: [
                {
                  utilsFnName: 'toMillionsOrElse',
                  params: { divider: 1000000, fixed: 2 }
                }
              ]
            },
            {
              fieldToCopy: 'nombre',
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'nombre',
              format: undefined
            }
          ]
        },
        {
          id: 'regions-aides-raw',
          dataset: 'fds',
          help: 'serie chiffres aides à la maille regionale',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/aides/aides-maille-regional-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/aides/aides-maille-regional.json`,
          displayed: true
        },
        {
          id: 'departements-aides-raw',
          dataset: 'fds',
          help: 'serie chiffres aides à la maille departementale',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/aides/aides-maille-departemental-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/aides/aides-maille-departemental.json`,
          displayed: false
        },

        // ============================================================= //
        // === DATASET : PGE - PRETS GARANTIS PAR L'ETAT
        // ============================================================= //
        {
          id: 'national-pge-raw',
          dataset: 'pge',
          help: 'serie chiffres pge à la maille nationale',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/pge/pge-maille-national-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/pge/pge-maille-national.json`,
          displayed: true,
          copyTo: [
            {
              fieldToCopy: undefined,
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'focusObject',
              format: undefined
            },
            {
              fieldToCopy: 'montant',
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'montant',
              format: [
                {
                  utilsFnName: 'toMillionsOrElse',
                  params: { divider: 1000000, fixed: 2 }
                }
              ]
            },
            {
              fieldToCopy: 'nombre',
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'nombre',
              format: undefined
            }
          ]
        },
        {
          id: 'regions-pge-raw',
          dataset: 'pge',
          help: 'serie chiffres pge à la maille regionale',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/pge/pge-maille-regional-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/pge/pge-maille-regional.json`,
          displayed: true
        },
        {
          id: 'departements-pge-raw',
          dataset: 'pge',
          help: 'serie chiffres pge à la maille departementale',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/pge/pge-maille-departemental-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/pge/pge-maille-departemental.json`,
          displayed: false
        },

        // ============================================================= //
        // === DATASET : REPORT - REPORT D'ECHEANCE / REPORT DE CHARGES
        // ============================================================= //
        {
          id: 'national-report-raw',
          dataset: 'report',
          help: 'serie chiffres report à la maille nationale',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/report/report-maille-national-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/report/report-maille-national.json`,
          displayed: true,
          copyTo: [
            {
              fieldToCopy: undefined,
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'focusObject',
              format: undefined
            },
            {
              fieldToCopy: 'montant',
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'montant',
              format: [
                {
                  utilsFnName: 'toMillionsOrElse',
                  params: { divider: 1000000, fixed: 2 }
                }
              ]
            },
            {
              fieldToCopy: 'nombre',
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'nombre',
              format: undefined
            }
          ]
        },
        {
          id: 'regions-report-raw',
          dataset: 'report',
          help: 'serie chiffres report à la maille regionale',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/report/report-maille-regional-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/report/report-maille-regional.json`,
          displayed: true
        },
        {
          id: 'departements-report-raw',
          dataset: 'report',
          help: 'serie chiffres report à la maille departementale',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/report/report-maille-departemental-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/report/report-maille-departemental.json`,
          displayed: false
        },

        // ============================================================= //
        // === DATASET : ACTIVITE PARTIELLE
        // ============================================================= //
        {
          id: 'national-activitepartielle-raw',
          dataset: 'activitepartielle',
          help: 'serie chiffres activite partielle à la maille nationale',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/activite-partielle/activite-partielle-maille-national-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/activite-partielle/activite-partielle-maille-national.json`,
          displayed: true,
          copyTo: [
            {
              fieldToCopy: undefined,
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'focusObject',
              format: undefined
            },
            {
              fieldToCopy: 'nombre_salaries_concernes',
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'nombre_salaries_concernes'
            },
            {
              fieldToCopy: 'nombre_etablissements_concernes',
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'nombre_etablissements_concernes',
              format: undefined
            },
            {
              fieldToCopy: 'nombre_heures_demandees',
              from: { objectRef: 0 },
              help: 'copy to another dataset (id) in displayedData | initData',
              toSpecialStore: 'nombre_heures_demandees',
              format: undefined
            }
          ]
        },
        {
          id: 'regions-activitepartielle-raw',
          dataset: 'activitepartielle',
          help: 'serie chiffres activite partielle à la maille regionale',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/activite-partielle/activite-partielle-maille-regional-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/activite-partielle/activite-partielle-maille-regional.json`,
          displayed: true
        },
        {
          id: 'departements-activitepartielle-raw',
          dataset: 'activitepartielle',
          help: 'serie chiffres activite partielle à la maille departementale',
          from: 'static',
          url: `${DATASETS_REPO_BASE}/activite-partielle/activite-partielle-maille-departemental-minify.json`,
          backupUrl: `${DATASETS_FOLDER}/prod/activite-partielle/activite-partielle-maille-departemental.json`,
          displayed: false
        }
      ]
    }
  }
}
