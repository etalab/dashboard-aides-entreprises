# frontend

----------

## Sites 


#### Preprod 

**live test** : https://covid-aides-entreprises.netlify.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/71e2942d-961b-4f06-8ac3-8dc73dceb6ee/deploy-status)](https://app.netlify.com/sites/covid-aides-entreprises/deploys)


-----------

## Stack 

Single Page App (SPA)

Principales dépendances : 

- Nuxt
- Vuetify
- Axios
- ApexCharts
- MapboxGL
- i18n
- Dotenv

-----------


## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


----------

## Configuration de l'app front

#### configuration de l'app / UI-UX : 

- éditer/créer un fichier `.env` sur le modèle du `example.env`
- éditer le fichier `config/appConfigUIUX.json`


#### configuration de l'app / data: 

- éditer le fichier `config/appConfigData.json`

#### configuration de l'app / carte: 

- éditer le fichier `config/mapboxVectorStyles.json`

#### langues : 

- voir le dossier `/locales` pour les fichiers de traduction
