
<h1 align="center">
  ODAMAP 
</h1>
<p align="center">
  ...stands for "Open-Dashboard-And-MAP"
</p>


---------

<p align="center">
  A generic and customizable map/dashboard solution for open data visualisation
</p>

----------

#### Documentation

Check our brand new documentation website : 

https://etalab.github.io/dashboard-aides-entreprises/


----------

#### Version : v.2.xxx (beta)

- Check the [versions logs here](VERSIONS.md)

- See also our roadmaps : 
  - [page "project" on Github][kanban]
  - [roadmap (pdf) / wireframe][wireframe_pdf]
  - [roadmap (slides) / wireframe][wireframe_slides]

----------
#### Co-authors : 

- Julien Paris
- Alexandre Bulté
- Geoffrey Aldebert

----------

## Sites 

- **live / prod** : https://aides-entreprises.data.gouv.fr/
[![Netlify Status](https://api.netlify.com/api/v1/badges/f09c4d46-99a4-4fdf-8c4a-34b38f4d6a26/deploy-status)](https://app.netlify.com/sites/aides-entreprises-covid19/deploys)


<!-- #### - Preprod 

**live / test** : https://covid-aides-entreprises.netlify.com
[![Netlify Status](https://api.netlify.com/api/v1/badges/71e2942d-961b-4f06-8ac3-8dc73dceb6ee/deploy-status)](https://app.netlify.com/sites/covid-aides-entreprises/deploys) -->

-----------


## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
npm run build
npm run start

# generate static project
npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

----------

## Linting

<br>

#### Linting avec `standard`

Vous pouvez lancer `standard` pour simplement vérifier les erreurs :

```bash
npx standard
```

pour corriger ce qui peut l'être

```bash
npx standard --fix
```

<br>

#### Linting avec `lint`

Vous pouvez lancer `lint` pour simplement vérifier les erreurs :

```bash
npm run lint
```

ou `lintfix` pour corriger ce qui peut l'être

```bash
npm run lintfix
```

---------

## Déploiement sur Netlify

#### Build settings

- Repository : `github.com/etalab/dashboard-aides-entreprises`
- Build command : `npm run build`
- Publish directory : `dist`

#### Deploy contexts

- Production branch : `master`
- ( ou : Production branch : `preprod` )

#### Environment variables

- `NUXT_ENV_RUN_MODE` = `prod` (ou `preprod` pour avoir les logs dans la console)
- voir également les autres variables possibles en regardant le fichier d'exemple [`.envExample`](.envExample)

---------

## Configuration de l'application ODAMAP

#### Variables d'environnement :

- éditer/créer un fichier `.env` sur le modèle du fichier [`.envExample`](.envExample)

#### configuration de l'app / UI-UX / routes / navbar ...: 

- éditer le fichier [`configs/dev/appConfigUIUX.js`](./configs/dev/appConfigUIUX.js) : 
- éditer le fichier [`configs/dev/appConfigRoutes.js`](./configs/dev/appConfigRoutes.js) : 


#### configuration de l'app / data: 

- éditer le fichier [`configs/dev/appConfigData.js`](./configs/dev/appConfigData.js) : 

#### configuration de l'app / carte: 

- éditer le fichier [`configs/dev/mapboxVectorStyles.js`](./configs/dev/mapboxVectorStyles.js) : 

#### configuration de l'app / vues données :

- éditer le fichier [`configs/dev/appConfigMap.js`](./configs/dev/appConfigMap.js) : 
- éditer le fichier [`configs/dev/appConfigData.js`](./configs/dev/appConfigData.js) : 
- éditer le fichier [`configs/dev/appConfigNumbers.js`](./configs/dev/appConfigNumbers.js) : 
- éditer le fichier [`configs/dev/appConfigGlobalButtons.js`](./configs/dev/appConfigGlobalButtons.js) : 
- éditer le fichier [`configs/dev/appConfigTexts.js`](./configs/dev/appConfigTexts.js) : 
- éditer le fichier [`configs/dev/appConfigTables.js`](./configs/dev/appConfigTables.js) : 
- éditer le fichier [`configs/dev/appConfigRawData.js`](./configs/dev/appConfigRawData.js) : 

#### langues : 

- voir le dossier [`/locales`](./locales/) pour les fichiers de traduction


---------------

### ce qu’il n’y a pas encore :

- afficher les départements dépendants d’une région et uniquement eux ;
- minivues pour les dom-tom en dessous ou à côté de la carte principale ;
- settings pour connexion à une API de backend, mais sketché pour quand même ;
- footer “officiel” + liens ;
- meilleure gestion du zoom et des largeurs de cercles en fonction de l’altitude ;
- ...

### ce qu’il y a dedans :

- responsive a minima (chart puis carte sur mobile) ;
- interaction avec les régions et/ou les départements -> change les chiffres dans les autres composants ;
- chargement des données json et geojson, ventilées soit dans le store soit uniquement dans la carte.. ;
- bouton de switch ‘calques’ pour intéragir soit avec le calque région ou le calque départements (pas destiné à rester obligatoirement) ;
- totaux par région/departement (et au lancement au niveau national) du montant des aides et du nombre d’aides ;
- design a minima avec des couleurs piquées chez Jérôme ;
- code le plus factorisé et générique possible (enfin autant que j’ai pu) pour pouvoir ajouter / dupliquer des composants et/ou changer des sources, ... j’ai tenté de faire une “souche” qui pourrait servir autant aux données DVF qu’aux aides aux entreprises qu’aux fonds de carte écolos...
- le mapping des données avec les variables de l’appli se font via les différents fichiers de configuration dans le dossier /config
- switch de la carte en 1er + chiffres clés en version mobile ;
- wording et CSS ;
- tiles Etalab (bug relou de mon wrapper mapbox pour charger le style ?!!!) ;
- repasse sur l’UX (notamment sur l’usage de la barre de gauche par exemple) ;
- pages/url de textes statiques pour afficher des infos ;
- scrolling uniquement sur la colonne de gauche pour pouvoir ajouter d’autres charts en dessous de la première ;
- revenir aux chiffres nationaux (réinitialiser) ;



-----------

### stack :

- vuejs / nuxt / axios / dotenv /
- vuetify / fontawesome / material Design
- i18n /
- mapboxGL.js / vue-mapbox / Apexcharts / vue-apexCharts / turf
déploiement : SPA mais plusieurs urls possibles pour afficher des pages / netlify (sur mon compte Netlify pour le moment mais assez simple à déployer)

-----------


### Variables de configuration remarquables

------------

#### fichier : [`appConfigMap.js`](./configs/appConfigMap.js)

Pour le composant [`MapboxGL`](./componenents/DataViews/MapboxGL.vue) : 

- `settingsIds[-].map.clicEvents[-].functions` : (array)
  - liste des fonctions à déclencher lors d'un événement sur un élément de la carte
<br>

- `settingsIds[-].map.clicEvents[-].functions[-].funcName` : (string)
  - choix : 
    - `goToPolygon` : zoom sur polygon `target`
    - `updateDisplayedData` : mise à jour de données du store
    - `setChildrenPolygons` : ( non codé )
    - `updateQuery` : (non codé )
<br>

- `settingsIds[-].map.clicEvents[-].functions[-].funcParams.zoomRange` : object)
  - `minZoom` : fonction inactive en deçà
  - `maxZoom` : fonction inactive au-delà
<br>

- `settingsIds[-].map.clicEvents[-].functions[-].funcParams.propName` : 
  - propriété de la `feature` à récupérer comme valeur à passer dans la fonction
<br>

- `settingsIds[-].map.clicEvents[-].functions[-].funcParams.targets` : array
  - liste des références des données à mettre à jour et des données cibles
<br>

----------------

#### fichier : [`appConfigGlobalButtons.js`](./configs/appConfigGlobalButtons.js)

Pour le composant [`GlobalButton`](./components/UX/GlobalButton.vue) : 

- `settingsIds[-].componentButtons.functions[-]` : (array)
  - liste des fonctions à déclencher lors d'un clic sur le bouton
<br>

- `settingsIds[-].componentButtons.functions[-].funcName` : (string)
  - choix : 
    - `resetStore` : reinitiélisation du store
    - `resetMapZoom` : reinitialisation du zoom du/des composants 
<br>


----------------

[branch_front]: https://github.com/etalab/dashboard-aides-entreprises/tree/j_front/frontend
[kanban]: https://github.com/etalab/dashboard-aides-entreprises/projects/1 
[wireframe_slides]: https://docs.google.com/presentation/d/1j_0xaJzPIjmuDSQG-nNYzADad4pFaf8E3VBkggFu1FY/edit?usp=sharing
[wireframe_pdf]: ../screeshots/DASHBOARD_WIREFRAME_v.1.0-2.0.pdf
