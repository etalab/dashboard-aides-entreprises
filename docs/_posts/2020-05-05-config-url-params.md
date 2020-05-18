---
title : URL PARAMETERS
categories:
  - configuration
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

## Use the ODAMAP url's parameters

### What you have to know

Your ODAMAP instance uses a router, which you can pass parameters to. 


-------
## Global url parameters

Those parameters don't rely on the datasets or connfiguration you will use. They still can be overriden with your `.env` file (more on that topic [here](/configuration/config-envfile) )

Those parameters are the following : 

### iframing

Hides the main navbar 

- `iframe` : boolean string (`yes` | `no`)

URL example : 

```http
https://localhost:8000/?iframe=yes
```

-------
### tabs routes

Hides the routes tabs 

- `notabs` : boolean string (`yes` | `no`)

URL example :

```http
https://localhost:8000/?notabs=yes
```

------
### scrolling on map

Disable the scrolling on the map component (but mapbox controls still works) 

- `nomapscroll` : boolean string (`yes` | `no`)

URL example :

```http
https://localhost:8000/?nomapscroll=yes
```

------------

### chained parameters

URL example :

```http
https://localhost:8000/?nomapscroll=yes&notabs=yes&iframe=yes
```



-------
## Datasets-related url parameters

(to do )

------


<br>
<br>
