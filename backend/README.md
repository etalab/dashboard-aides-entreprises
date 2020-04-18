# Backend (Flask)

## Installation

Pour faire fonctionner le backend, il suffit d'effectuer les commandes ci-dessous :

```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd backend/
python app.py
```

## API

Un certain nombre d'API sont disponibles :

- Obtenir des informations nationales :

``` 
/stat/aide 
```
```
[
  {
    "kpi_classe_effectif": [
      {
        "classe_effectif": "00", 
        "libelle_classe_effectif": "0 salari\u00e9", 
        "montant": "150406500.00", 
        "nombre": "100271"
      }, 
      ...
    ], 
    "kpi_top_10_naf": [
      {
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "89446500.00", 
        "nombre": "59631"
      }, 
      ...
    ]
    "kpi_all_naf": [
      {
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "89446500.00", 
        "nombre": "59631"
      }, 
      ...
    ], 
    "montant": "379774500.00", 
    "nombre": "253183"
  }
]
```

- Obtenir des informations régionales :

``` 
/stat/aide/reg
```
```
[
  {
    "kpi_classe_effectif": [
      {
        "classe_effectif": "02", 
        "libelle_classe_effectif": "3 \u00e0 5 salari\u00e9s", 
        "montant": "220500.00", 
        "nombre": "147"
      }, 
      ...
    ], 
    "kpi_top_10_naf": [
      {
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "375000.00", 
        "nombre": "250"
      }, 
      ...
    ]
    "kpi_all_naf": [
      {
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "89446500.00", 
        "nombre": "59631"
      }, 
      ...
    ], 
    "libelle": "Corse", 
    "montant": "1587000.00", 
    "nombre": "1058", 
    "reg": "94"
  }, 
  {
    "kpi_classe_effectif": [
      {
        "classe_effectif": "02", 
        "libelle_classe_effectif": "3 \u00e0 5 salari\u00e9s", 
        "montant": "76500.00", 
        "nombre": "51"
      }, 
      ...
    ], 
    "kpi_top_10_naf": [
      {
        "division_naf": "47", 
        "libelle_division_naf": "Commerce de d\u00e9tail, \u00e0 l\u2019exception des automobiles et des motocycles", 
        "montant": "177000.00", 
        "nombre": "118"
      }, 
      ...
    ]
    "kpi_all_naf": [
      {
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "89446500.00", 
        "nombre": "59631"
      }, 
      ...
    ], 
    "libelle": "Mayotte", 
    "montant": "642000.00", 
    "nombre": "428", 
    "reg": "06"
  }, 
  ...
]
```


- Obtenir des informations départementales :

``` 
/stat/aide/dep
```
```
[
  {
    "dep": "94", 
    "kpi_classe_effectif": [
      {
        "classe_effectif": "02", 
        "libelle_classe_effectif": "3 \u00e0 5 salari\u00e9s", 
        "montant": "946500.00", 
        "nombre": "631"
      },
      ...
    ], 
    "kpi_top_10_naf": [
      {
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "1629000.00", 
        "nombre": "1086"
      }, 
      ...
    ]
    "kpi_all_naf": [
      {
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "89446500.00", 
        "nombre": "59631"
      }, 
      ...
    ], 
    "libelle": "Val-de-Marne", 
    "montant": "7111500.00", 
    "nombre": "4741"
  }, 
  {
    "dep": "77", 
    "kpi_classe_effectif": [
      {
        "classe_effectif": "02", 
        "libelle_classe_effectif": "3 \u00e0 5 salari\u00e9s", 
        "montant": "819000.00", 
        "nombre": "546"
      }, 
      ...
    ], 
    "kpi_top_10_naf": [
      {
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "1396500.00", 
        "nombre": "931"
      }, 
      ...
    ]
    "kpi_all_naf": [
      {
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "89446500.00", 
        "nombre": "59631"
      }, 
      ...
    ], 
    "libelle": "Seine-et-Marne", 
    "montant": "6102000.00", 
    "nombre": "4068"
  }, 
  ...
]
```

- Liste de toutes les régions :

``` 
/region
```
```
[
  {
    "cheflieu": "97105", 
    "libelle": "Guadeloupe", 
    "ncc": "GUADELOUPE", 
    "nccenr": "Guadeloupe", 
    "reg": "01", 
    "tncc": "3"
  }, 
  {
    "cheflieu": "97209", 
    "libelle": "Martinique", 
    "ncc": "MARTINIQUE", 
    "nccenr": "Martinique", 
    "reg": "02", 
    "tncc": "3"
  }, 
  {
    "cheflieu": "97302", 
    "libelle": "Guyane", 
    "ncc": "GUYANE", 
    "nccenr": "Guyane", 
    "reg": "03", 
    "tncc": "3"
  },
  ...
]
```

- Liste de tous les départements :

``` 
/departement
```
```
[
  {
    "cheflieu": "01053", 
    "dep": "01", 
    "libelle": "Ain", 
    "ncc": "AIN", 
    "nccenr": "Ain", 
    "reg": "84", 
    "tncc": "5"
  }, 
  {
    "cheflieu": "02408", 
    "dep": "02", 
    "libelle": "Aisne", 
    "ncc": "AISNE", 
    "nccenr": "Aisne", 
    "reg": "32", 
    "tncc": "5"
  }, 
  {
    "cheflieu": "03190", 
    "dep": "03", 
    "libelle": "Allier", 
    "ncc": "ALLIER", 
    "nccenr": "Allier", 
    "reg": "84", 
    "tncc": "5"
  }, 
 ...
]
```

- Liste de tous les codes APE/NAF :

``` 
/naf
```
```
[
[
  {
    "code_naf": "1020Z", 
    "intitule_naf": "Transformation et conservation de poisson, de crustac\u00e9s et de mollusques", 
    "intitule_naf_40": "Transf. & conserv. poisson, crust., etc.", 
    "intitule_naf_65": "Transform. & conserv. poisson, crustac\u00e9s & mollusques"
  }, 
  {
    "code_naf": "812", 
    "intitule_naf": "Exploitation de gravi\u00e8res et sabli\u00e8res, extraction d\u2019argiles et de kaolin", 
    "intitule_naf_40": "Exploit. gravi\u00e8re & sabl., extr. argile", 
    "intitule_naf_65": "Exploit gravieres & sablieres, extraction argiles & kaolin"
  }, 
  {
    "code_naf": "1610B", 
    "intitule_naf": "Impr\u00e9gnation du bois", 
    "intitule_naf_40": "Impr\u00e9gnation du bois", 
    "intitule_naf_65": "Impr\u00e9gnation du bois"
  }, 
 ...
]
```

- Liste de toutes les classes d'effectifs :

``` 
/classeeffectif
```
```
[
[
  {
    "denomination": "NN", 
    "libelle": "Etablissement non employeur", 
    "libelle_long": "Etablissement non employeur (pas de salari\u00e9 au cours de l'ann\u00e9e de r\u00e9f\u00e9rence et pas d'effectif au 31"
  }, 
  {
    "denomination": "00", 
    "libelle": "0 salari\u00e9", 
    "libelle_long": "0 salari\u00e9 (n'ayant pas d'effectif au 31"
  }, 
  {
    "denomination": "01", 
    "libelle": "1 ou 2 salari\u00e9s", 
    "libelle_long": "1 ou 2 salari\u00e9s"
  }, 
 ...
]
```

