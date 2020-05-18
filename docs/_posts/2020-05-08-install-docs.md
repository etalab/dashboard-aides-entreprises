---
title : INSTALL THE DOCS WITH JEKYLL
categories:
  - guide
tags:
  - documentation
  - configuration
  - installation
  - Jekyll
---

--------

The documentation is produced with : 

  - **[Github pages](https://pages.github.com/)**
  - **[Jekyll](https://jekyllrb.com/)**
  - **[Minimal Mistakes template](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)**

--------

#### For a local deployment of the documentation project (Jekyll + MMistakes template)

--------

- Install ruby, Jekyll
  <br>

  ```bash
  brew install ruby
  gem install jekyll
  ```

- Install setup (given the `Gemfile`, `Gemfile.lock` and `_config.yml` files)
  <br>

  ```bash
  gem install bundler
  bundle
  bundle install
  bundle update
  ```


- Launch Jekyll server 
  <br>

  ```bash
  cd docs

  bundle exec jekyll serve
  # or if you want to run the docs server on another port
  bundle exec jekyll serve --port=4001
  ```

- then check in your browser : [`127.0.0.1:4000`](127.0.0.1:4000) 


------------

<br>
<br>
