---
layout : single 
title : INSTALLATION WALKTHROUGH
# permalink : /docs/installation
categories:
  - documentation
tags:
  - configuration
  - installation
sidebar:
  nav: "docs"
---


--------

## WARNING

Before anything you need to install **[Apiviz-backend](https://github.com/co-demos/apiviz-backend)** to serve your configuration to the frontend.

-------

## Build setup (with Nuxt)

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
# get env vars from .env file
$ npm run dev

# overwrites .env file with env vars from script in package.json
$ npm run dev-test

# get env vars from .env file but overwrites NUXT_BACKEND_MODE as local backend served with Docker
$ npm run dev-docker

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

... then check in your browser : [`localhost:3000`](localhost:3000)

## Build setup (with Docker)

``` bash
# install / stop / restart

$ make up # run app with Docker
$ make restart # restart app with Docker
$ make down # stop app with Docker
```

... then check in your browser : [`localhost:3333`](localhost:3333)

