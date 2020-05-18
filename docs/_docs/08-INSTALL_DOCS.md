---
layout : single 
title : INSTALL THE DOCS WITH JEKYLL
# permalink : /docs/install-docs
# categories:
#   - documentation
# tags:
#   - configuration
#   - deployment
#   - ecosystem
sidebar:
  nav: "docs"
---


--------

- Install ruby, Jekyll

``` bash
gem install jekyll
```

---
- Install setup 

``` bash
gem install bundler
bundle
bundle install
bundle update
```

---
- Launch server 

``` bash
cd docs
bundle exec jekyll serve
```

... then check in your browser : 

[`127.0.0.1:4000`](127.0.0.1:4000)

