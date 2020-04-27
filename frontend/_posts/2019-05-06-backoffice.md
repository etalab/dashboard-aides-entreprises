---
title : ACCESS YOUR BACK OFFICE
categories:
  - guide
tags:
  - documentation
  - tutorial
  - configuration
  - backoffice
toc: true
toc_label: " contents"
toc_sticky: true
---

{% include figure image_path="/documentation/screenshots/backoffice-sonum-06.png" alt="admin view" %}


-----
## Create an admin user

- register an user (user data will stored and managed in TokTok, so you'd need to install Toktok locally) ;

{% include figure image_path="/documentation/screenshots/backoffice-register-01.png" alt="admin view" %}

- make this user an `admin` (in TokTok) ;

## Go to the back office

- log in (`admin` link in the default footer, `/login` route by default) ;

{% include figure image_path="/documentation/screenshots/backoffice-login-01.png" alt="admin view" %}

- go to the `/backoffice` route by clicking on the button `back office`. You should now see this ...


--------

{% include figure image_path="/documentation/screenshots/backoffice-sonum-06.png" alt="admin view" %}

-----------

## Configure your website 

- set up your ApiViz configuration : 
    
  ```
    - set up the global variables ; 
    - set up your data endpoints ; 
    - set up your authentication endpoints ; 
    - set up your routes (pages must point out to html contents, f.e. on Github) ; 
    - set up the styles ;
    - set up your navbar ; 
    - set up your footer ;
  ```


- save your configuration. You should immediatly see the result.  

- To know more about the back-office please read the [back-office tutorial](/guide/backoffice-tuto/)

## (optional) redeploy

- deploy (if not done already) and enjoy ;

More detailed configuration documentation on its way...
