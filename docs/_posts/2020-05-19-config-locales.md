---
title : CONFIGURE YOUR LOCALES
categories:
  - configuration
tags:
  - documentation
  - tutorial
  - configuration
  - installation
  - internationalization
toc: true
toc_label: " contents"
toc_sticky: true
---

--------

## Configure your ODAMAP locales
 
### What you have to know

You can set several languages for your ODAMAP instance. After having set in the `.env` file which languages you want to use, the files contained in the `frontend/locales` folder will allow you to translate the default fields of nuxt components (or new ones if you add some to your code).

ODAMAP uses the [nuxt i18n](https://github.com/nuxt-community/nuxt-i18n) module to internationalize your instance.

### ODAMAP `frontend/locales` folder's location and structure

```shell
frontend
│   README.md
│   .env
│   nuxt.config.js
│
└─── locales
    │ ... <locale-LOCALE>.js
    │ ... <LOCALE>.json

```

----------

## The locales files structure

### file : `<locale-LOCALE>.js`

This is just a file which need to contain something like :

  ```js
  export default require('./<LOCALE>.json')
  ```


### file : `<LOCALE>.json`

This is a JSON file which need to contain the field / nested fields of the texts i18n will translate each time it will be activated in a nuxt component.

For instance when in a vue component you'll cross :

```vue
$t('my.nested.field', locale)
```

It will fetch the value in your JSON locale file `<LOCALE>.json`:

```json
{
  "my" : {
    "nested": {
      "field": "My translation into <LOCALE> language"
    }
  }
}
```

------------

<br>
<br>
