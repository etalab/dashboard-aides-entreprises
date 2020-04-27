// const DATASETS_REPO_BASE = 'https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/frontend/static/' // in repo folder
const DATASETS_REPO_BASE =
  "https://raw.githubusercontent.com/etalab/dashboard-aides-entreprises/master/backend/json/" // in repo folder
const DATASETS_FOLDER = "/datasets" // in static folder

export const configAppData = {
  help: "this file contains the data setup for the app",

  // DESCRIBE THE BACKEND API
  dataSource: {
    docs:
      "https://github.com/etalab/dashboard-aides-entreprises/tree/j_front/frontend",

    apiBackendUrl: {
    },

    // TO DO ... INTEGRATE TO getDataInit etc...
    apiBackendSchema: [
    ],
  },

  // FILTERS
  filters: [
  ],

  // DEFAULT SETUP
  defaultDataSetup: {
    initData: {
      help:
        "populate 'store.data.state.initData' @ middleware getIniitData.js / from : url | localFile",

      store: [
        // INFOS

        {
          id: "infos",
          help: "",
          from: "rawObject",
          rawObject: {
            numbers: {
              effectifs: undefined,
              nafs: undefined,
              tonnage:undefined,
              kg_par_habitant:undefined
            },
            texts: {
              levelname: "échelle nationale",
              levelcode: "national",
            },
            focusObject: undefined,
            switchers: {
              national: "échelle nationale",
              regional: "échelle régionale",
              departement: "échelle départementale",
            },
          },
          displayed: true,
          copyTo: [
            {
              fieldToCopy: "levelname",
              from: { objectRef: "texts" },
              help: "copy to another dataset (id) in displayedData | initData",
              toSpecialStore: "levelname",
              format: undefined,
            },
            {
              fieldToCopy: "levelcode",
              from: { objectRef: "texts" },
              help: "copy to another dataset (id) in displayedData | initData",
              toSpecialStore: "levelcode",
              format: undefined,
            },
          ],
        },

        // TAXONOMIES

        {
          id: "taxo-nafs",
          help: "",
          from: "static",
          //url: `${DATASETS_REPO_BASE}/taxonomies/nafs.json`,
           url   : `${DATASETS_FOLDER}/taxonomies/nafs.json`,
          //   url  : "http://pad-01.infra.data.gouv.fr:5000/naf"
          displayed: false,
        },
        {
          id: "taxo-regions",
          help: "",
          from: "static",
          //url: `${DATASETS_REPO_BASE}/taxonomies/regions.json`,
          url   : `${DATASETS_FOLDER}/taxonomies/regions.json`,
          //   url  : "http://pad-01.infra.data.gouv.fr:5000/region"
          displayed: false,
        },
        {
          id: "taxo-departements",
          help: "",
          from: "static",
          //url: `${DATASETS_REPO_BASE}/taxonomies/departements.json`,
          url   : `${DATASETS_FOLDER}/taxonomies/departements.json`,
          //   url  : "http://pad-01.infra.data.gouv.fr:5000/departement"
          displayed: false,
        },

        // GEOJSON (NO NEED EXCEPT CENTERS : SOURCES LOADED IN MAPBOX COMPONENT )

        {
          id: "centers",
          help: "geo centres régions et départements",
          from: "static",
          url: `${DATASETS_FOLDER}/geodata/centers.json`,
          displayed: true,
        },

        // DECHETS

        {
          id: "national-aides-raw",
          help: "serie chiffres aides à la maille nationale",
          from: "static",
          // url: `${DATASETS_REPO_BASE}/aides/aides-maille-national.json`,
          url   : `${DATASETS_FOLDER}/dechets/dechets-maille-national.json`,
          //url   : `${DATASETS_FOLDER}/aides/prod/aides-maille-national.json`,
          displayed: true,
          copyTo: [
            {
              fieldToCopy: undefined,
              from: { objectRef: 0 },
              help: "copy to another dataset (id) in displayedData | initData",
              toSpecialStore: "focusObject",
              format: undefined,
            },
            {
              fieldToCopy: "tonnage",
              from: { objectRef: 0 },
              help: "copy to another dataset (id) in displayedData | initData",
              toSpecialStore: "tonnage",
              format: [
                {
                  utilsFnName: "toMillionsOrElse",
                  params: { divider: 1000000, fixed: 2 },
                },
              ],
              //format: undefined,
            },
            {
              fieldToCopy: "kg_par_habitant",
              from: { objectRef: 0 },
              help: "copy to another dataset (id) in displayedData | initData",
              toSpecialStore: "kg_par_habitant",
              format: [
                {
                  utilsFnName: "toMillionsOrElse",
                  params: { divider: 1, fixed: 0 },
                },
              ],
            },
          ],
        },
        {
          id: "regions-aides-raw",
          help: "serie chiffres aides à la maille regionale",
          from: "static",
          //url: `${DATASETS_REPO_BASE}/aides/aides-maille-regional.json`,
          url   : `${DATASETS_FOLDER}/dechets/dechets-maille-regional.json`,
          // url   : `${DATASETS_FOLDER}/aides/${AIDES_FILES_VERSION}/aides-maille-regional.json`,
          displayed: true,
        },
        {
          id: "departements-aides-raw",
          help: "serie chiffres aides à la maille departementale",
          from: "static",
          //url: `${DATASETS_REPO_BASE}/aides/aides-maille-departemental.json`,
          url   : `${DATASETS_FOLDER}/dechets/dechets-maille-departemental.json`,
          // url   : `${DATASETS_FOLDER}/aides/${AIDES_FILES_VERSION}/aides-maille-departemental.json`,
          displayed: false,
        },
      ],
    },
  },
}
