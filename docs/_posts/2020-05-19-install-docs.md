---
title : INSTALL THE DOCS WITH JEKYLL
categories:
  - guide
tags:
  - documentation
  - tutorial
  - installation
  - deployment
  - Jekyll
toc: true
toc_label: " contents"
toc_sticky: true
header:
  overlay_image: /static/screenshots/odamap-map-01.png
  overlay_filter: .15 # same as adding an opacity of 0.5 to a black background
---

Deploy the present documentation

--------

The documentation is produced with : 

  - **[Github pages](https://pages.github.com/)**
  - **[Jekyll](https://jekyllrb.com/)**
  - **[Minimal Mistakes template](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)**

--------

## Local deployment of the documentation project

- Install ruby, Jekyll

  ```bash
  brew install ruby
  gem install jekyll
  ```
<br>

- Install setup (given the `Gemfile`, `Gemfile.lock` and `_config.yml` files)

  ```bash
  gem install bundler
  bundle
  bundle install
  bundle update
  ```
<br>

- Launch Jekyll server

  ```bash
  bundle exec jekyll serve
  
  # or if you want to run the docs server on another port
  bundle exec jekyll serve --port=4001
  ```
<br>

- then check in your browser : [`127.0.0.1:4000`](127.0.0.1:4000)

---

## Deployment on Github pages

Check the following links :

- [Jekyll / gh-pages](https://jekyllrb.com/docs/github-pages/)
- [MMiistakes / gh-pages](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)

----

<br>
<br>
