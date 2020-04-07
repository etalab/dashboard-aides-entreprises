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
    "delta_effectif": "-234739.00", 
    "delta_effectif_percent": "-0.08840530865758447388", 
    "kpi_classe_effectif": [
      {
        "classe_effectif": "0.00", 
        "delta_effectif": "0.00", 
        "delta_effectif_percent": "0E-24", 
        "montant": "150859500.00", 
        "nombre": "100573"
      },
      ...
    ], 
    "kpi_top_10_naf": [
      {
        "delta_effectif": "-55588.00", 
        "delta_effectif_percent": "-0.08844904309421841542", 
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "89664000.00", 
        "nombre": "59776"
      }, 
      ...
    ], 
    "montant": "379644000.00", 
    "nombre": "253096"
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
    "delta_effectif": "-1712.00", 
    "delta_effectif_percent": "-0.08715570545250140528", 
    "kpi_classe_effectif": [
      {
        "classe_effectif": "1.00", 
        "delta_effectif": "-211.00", 
        "delta_effectif_percent": "-0.18389021479713603819", 
        "montant": "628500.00", 
        "nombre": "419"
      },
      ...
    ], 
    "kpi_top_10_naf": [
      {
        "delta_effectif": "-418.00", 
        "delta_effectif_percent": "-0.08397058823529411765", 
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "612000.00", 
        "nombre": "408"
      }, 
      ...
    ], 
    "libelle": "Corse", 
    "montant": "2668500.00", 
    "nombre": "1779", 
    "reg": "94"
  }, 
  {
    "delta_effectif": "-384.00", 
    "delta_effectif_percent": "-0.10208430913348946136", 
    "kpi_classe_effectif": [
      {
        "classe_effectif": "1.00", 
        "delta_effectif": "-62.00", 
        "delta_effectif_percent": "-0.24056603773584905660", 
        "montant": "159000.00", 
        "nombre": "106"
      }, 
      ...
    ], 
    "kpi_top_10_naf": [
      {
        "delta_effectif": "-121.00", 
        "delta_effectif_percent": "-0.12578947368421052632", 
        "division_naf": "47", 
        "libelle_division_naf": "Commerce de d\u00e9tail, \u00e0 l\u2019exception des automobiles et des motocycles", 
        "montant": "171000.00", 
        "nombre": "114"
      }, 
      ...
    ], 
    "libelle": "Mayotte", 
    "montant": "640500.00", 
    "nombre": "427", 
    "reg": "06"
  }, 
  ...
]
```


- Obtenir des informations départementales :

``` 
/stat/aide/reg/<REG-ID>/dep
```
```
[
  {
    "delta_effectif": "-18486.00", 
    "delta_effectif_percent": "-0.08782050651585935579", 
    "dep": "75", 
    "kpi_classe_effectif": [
      {
        "classe_effectif": "1.00", 
        "delta_effectif": "-2314.00", 
        "delta_effectif_percent": "-0.19543112857454704213", 
        "montant": "6871500.00", 
        "nombre": "4581"
      }, 
      ...
    ], 
    "kpi_top_10_naf": [
      {
        "delta_effectif": "-4110.00", 
        "delta_effectif_percent": "-0.09311212266411116435", 
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "6261000.00", 
        "nombre": "4174"
      }, 
      ...
    ], 
    "libelle": "Paris", 
    "montant": "30502500.00", 
    "nombre": "20335"
  }, 
  {
    "delta_effectif": "-3989.00", 
    "delta_effectif_percent": "-0.09235163204747774481", 
    "dep": "77", 
    "kpi_classe_effectif": [
      {
        "classe_effectif": "1.00", 
        "delta_effectif": "-480.00", 
        "delta_effectif_percent": "-0.20892737430167597765", 
        "montant": "1342500.00", 
        "nombre": "895"
      }, 
      ...
    ], 
    "kpi_top_10_naf": [
      {
        "delta_effectif": "-946.00", 
        "delta_effectif_percent": "-0.09312500000000000000", 
        "division_naf": "68", 
        "libelle_division_naf": "Activit\u00e9s immobili\u00e8res", 
        "montant": "1416000.00", 
        "nombre": "944"
      }, 
      ...
    ], 
    "libelle": "Seine-et-Marne", 
    "montant": "6066000.00", 
    "nombre": "4044"
  }, 
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

