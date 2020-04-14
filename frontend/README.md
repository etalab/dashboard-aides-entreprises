
<h1 align="center">
ODAMAP 
</h1>
<p align="center">
for Open-Dashboard-Map
</p>


---------

a generic map/dashboard solution for open data 

----------

#### Version : 0.1

----------
#### Co-auteurs : 

- Julien Paris
- Alexandre Bulté
- 
----------

## Sites 


#### Preprod 

**live test** : https://covid-aides-entreprises.netlify.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/71e2942d-961b-4f06-8ac3-8dc73dceb6ee/deploy-status)](https://app.netlify.com/sites/covid-aides-entreprises/deploys)


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

#### configuration de l'app / UI-UX / routes / navbar ...: 

- éditer/créer un fichier `.env` sur le modèle du `example.env`
- éditer le fichier `config/appConfigUIUX.json`
- éditer le fichier `config/appConfigRoutes.json`


#### configuration de l'app / data: 

- éditer le fichier `config/appConfigData.json`

#### configuration de l'app / carte: 

- éditer le fichier `config/mapboxVectorStyles.json`

#### configuration de l'app / vues données : 

- éditer le fichier `config/appConfigMap.json`
- éditer le fichier `config/appConfigData.json`
- éditer le fichier `config/appConfigNumbers.json`
- éditer le fichier `config/appConfigTexts.json`
- éditer le fichier `config/appConfigTables.json`
- éditer le fichier `config/appConfigRawData.json`

#### langues : 

- voir le dossier `/locales` pour les fichiers de traduction


----------------


### ce qu’il y a dedans :

- responsive a minima (chart puis carte sur mobile) ;
- interaction avec les régions et/ou les départements -> change les chiffres dans les autres composants ;
- chargement des données json et geojson, ventilées soit dans le store soit uniquement dans la carte.. ;
- bouton de switch ‘calques’ pour intéragir soit avec le calque région ou le calque départements (pas destiné à rester obligatoirement) ;
- totaux par région/departement (et au lancement au niveau national) du montant des aides et du nombre d’aides ;
- design a minima avec des couleurs piquées chez Jérôme ;
- code le plus factorisé et générique possible (enfin autant que j’ai pu) pour pouvoir ajouter / dupliquer des composants et/ou changer des sources, ... j’ai tenté de faire une “souche” qui pourrait servir autant aux données DVF qu’aux aides aux entreprises qu’aux fonds de carte écolos...
- le mapping des données avec les variables de l’appli se font via les différents fichiers de configuration dans le dossier /config

### ce qu’il n’y a pas encore (pour jeudi idéalement) :

- afficher les départements dépendants d’une région et uniquement eux ;
- revenir aux chiffres nationaux (réinitialiser) ;
- tiles Etalab (bug relou de mon wrapper mapbox pour charger le style ?!!!) ;
- scrolling uniquement sur la colonne de gauche pour pouvoir ajouter d’autres charts en dessous de la première ;
- minivues pour les dom-tom en dessous ou à côté de la carte principale ;
- settings pour connexion à une API de backend, mais sketché pour quand même ;
- pages/utl de textes statiques pour afficher des infos ;
- footer “officiel” + liens ;
- meilleure gestion du zoom et des largeurs de cercles en fonction de l’altitude ;
- switch de la carte en 1er + chiffres clés en version mobile ;
- repasse sur l’UX (notamment sur l’usage de la barre de gauche par exemple) ;
- wording et autres joyeuseries CSS ;
- ...

-----------

### stack :

- vuejs / nuxt / axios / dotenv /
- vuetify / fontawesome / material Design
- i18n /
- mapboxGL.js / vue-mapbox / Apexcharts / vue-apexCharts / turf
déploiement : SPA mais plusieurs urls possibles pour afficher des pages / netlify (sur mon compte Netlify pour le moment mais assez simple à déployer)

-----------
## repo : 
- branche j_front / dossier frontend du repo qu’on se partage avec Geoffrey => https://github.com/etalab/dashboard-aides-entreprises/tree/j_front/frontend