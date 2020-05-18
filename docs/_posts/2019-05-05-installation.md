---
title : INSTALLATION WALKTHROUGH
categories:
  - guide
tags:
  - documentation
  - tutorial
  - configuration
  - installation
toc: true
toc_label: " contents"
toc_sticky: true
---

--------
## Development 


### Shortcut

The quickest way to install and run ODAMAP on your computer

  ```shell
  ### clone the repository
  git clone https://github.com/etalab/dashboard-aides-entreprises.git

  ### go to frontend folder and copy default environment variables
  cd frontend
  cp .envExample .env

  ### shortcut to install ODAMAP
  npm install
  npm run dev
  ```

--------

### Step-by-step

#### Create a `.env` file at the folder's root 

You can create the `.env` file content based on the `.envExample` file : 

  ```shell
  ### MAIN 
  NUXT_ENV_RUN_MODE=dev
  NUXT_ENV_HOST=localhost
  NUXT_ENV_PORT_DEV=8000
  NUXT_ENV_APP_TITLE=Aides aux entreprises

  ### OVERRIDES
  NUXT_ENV_APP_IFRAME_OVERRIDE=no
  NUXT_ENV_APP_ROUTESTABS_OVERRIDE=no
  NUXT_ENV_APP_NOMAPSCROLL_OVERRIDE=no

  ### LOCALES
  NUXT_ENV_LANG_DEFAULT_LOCALE=fr
  NUXT_ENV_LANG_DEFAULT_LOCALES=fr:Français:fr-FR.js

  ### ETC...
  ```

#### Build setup with Node/Nuxt

Note : this configuration needs Node previously installed on your computer/server

  ```bash
  # install dependencies
  npm install

  # serve with hot reload at localhost:8000
  # get env vars from .env file
  npm run dev
  ```

... then check in your browser : [`localhost:8000`](localhost:8000)

Other options for deployment :

  ```bash

  # build for production and launch server
  npm run build
  npm start

  # generate static project
  npm run generate
  ```

### Linting

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Check for linting errors :

  ```shell
  npx standard
  ```

Try to lint and fix what could be : 
  ```shell
  npx standard --fix
  ```

<br>

---------
## Deployment 

On Netlify

```bash
(to do)
```

------------


<br>
<br>
