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

## Shortcut

Time is precious. The quickest way to install and run ODAMAP on your computer for development :

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

  ... then open your browser and enter the following url
  
  ```http
  http://localhost:8000
  ````

--------

## Step-by-step

Okay... you want to take your time, so let's unwrap the pack...

### Clone the ODAMAP repository

  ```shell
  git clone https://github.com/etalab/dashboard-aides-entreprises.git
  ```

### Clone `.env` file

  ```shell
  cd frontend
  cp .envExample .env
  ```

### Create a `.env` file at the folder's root 

You can create/modify the `.env` file content based on the `.envExample` file :

More on that topic [here](/configuration/config-envfile)

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

### Install dependencies

Note : this configuration needs Node previously installed on your computer/server

  ```bash
  # install dependencies
  npm install
  ```

### Run the app

  ```bash
  # serve with hot reload at localhost:8000
  # get env vars from .env file
  npm run dev
  ```


Other options for deployment :

  ```bash

  # build for production and launch server
  npm run build
  npm start

  # generate static project
  npm run generate
  ```

### Run in browser 

... check in your browser at [`localhost:8000`](http://localhost:8000)

-----

## Development tools

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


------------

<br>
<br>
