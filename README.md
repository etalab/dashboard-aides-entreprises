# Dashboard Aides aux Entreprises

----------------

### Scripts

Un certain nombre d'opérations sont nécessaires pour faire fonctionner l'application. Ces opérations sont décrites [ici](scripts/README.md)

### Backend (Flask)

Pour faire fonctionner le backend, rendez-vous [ici](backend/README.md)


### Frontend (Nuxt)

Pour faire fonctionner le frontend, rendez-vous [ici](frontend/README.md)

### Sites internet

- [aides-entreprises.data.gouv.fr][site_prod]
[![Netlify Status](https://api.netlify.com/api/v1/badges/f09c4d46-99a4-4fdf-8c4a-34b38f4d6a26/deploy-status)](https://app.netlify.com/sites/aides-entreprises-covid19/deploys)

<br>

- (preprod) : [covid-aides-entreprises.netlify.app][site_preprod]
[![Netlify Status](https://api.netlify.com/api/v1/badges/71e2942d-961b-4f06-8ac3-8dc73dceb6ee/deploy-status)](https://app.netlify.com/sites/covid-aides-entreprises/deploys)

----------

### Architecture technique

Le schéma ci-dessous représente l'architecture cible à date de l'application :

![Architecture](screenshots/architecture.png)


-------------
## Documentation 

- Install ruby, Jekyll

```bash
gem install jekyll
```

---
- Install setup 

```bash
gem install bundler
bundle
bundle install
bundle update
```

---
- Launch server 

```bash
bundle exec jekyll serve
```

... then check in your browser : 

[`127.0.0.1:4000`](http://127.0.0.1:4000)

----------


[site_prod]: https://aides-entreprises.data.gouv.fr/
[site_preprod]: https://covid-aides-entreprises.netlify.app

### Auteurs et licence

2020 DINUM, Etalab et les contributeurs du dépôt.

Ce dépôt est publié sous [licence MIT](LICENSE).
