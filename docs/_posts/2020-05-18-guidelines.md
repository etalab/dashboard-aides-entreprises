---
title : GUIDELINES FOR DEVELOPMENT
categories:
  - dev
tags:
  - tech
  - guidelines
  - contribute
  - maintain
  - principles
toc: true
toc_label: " contents"
toc_sticky: true
---

-----
This project is prone to be developped by several developpers, so we agreed on some basic rules...

## GENERAL 

- we try to comment and document in english
- check out our ["project" boards](https://github.com/etalab/dashboard-aides-entreprises/projects) to have an idea about the priorities we collectively decided to work on
- "see something, say something" : open new issues when you see problems to solve
- document your own issues with everything you have : images, references, snippets, etc... 
- for the markdown files try to [follow those advices](http://www.cirosantilli.com/markdown-style-guide/#dollar-signs-in-shell-code)...

## JAVASCRIPT

- camelcase your functions' and variables' names
- lint off your code as mush as possible
- comment your code
- factorize what you can 

## GIT MANAGEMENT

We are following this git principles : [link to blog](https://guillim.github.io/git/2018/04/24/Git-workflow.html). In brief : 
- there are 2 main branches : `master` and `preprod`
- new features must be code reviewed and then (if accepted) pulled into the branch `preprod`
- once every new feature is accepted and merged into `preprod`, `preprod` must be merged into `master` to constitute a new release

Please follow those rules when developping new features : 
- locally : create a new branch to work on your own feature(s) named like `mypseudo/mynewfeature`
- before pushing your changes pull the remote `preprod` branch to be merged with your changes in `mypseudo/mynewfeature` branch (so to be sure the features you just developped are compatible with the checked/reviewed `develop` branch):
  >
  ```shell
  git pull origin preprod
  ```
- then push your branch to the remote repo (github repo) : 
  > 
  ```shell
  git push origin <mypseudo/mynewfeature>
  ```
- ask for a pull request on Github from `mypseudo/mynewfeature` to `develop`
- someone else must be assigned as a code reviewer, whose in charge to accept your code changes and merge
- once accepted / reviewed delete `mypseudo/mynewfeature` from the repo to keep the branches clean
