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

- Obtenir des renseignements sur un SIRET :

``` 
/siret/<siret> 
```
```
[
  {
    "activiteprincipaleetablissement": "90.01Z", 
    "activiteprincipaleregistremetiersetablissement": "None", 
    "anneeeffectifsetablissement": "None", 
    "arr": "751", 
    "can": "None", 
    "caractereemployeuretablissement": "N", 
    "codecedex2etablissement": "None", 
    "codecedexetablissement": "None", 
    "codecommune2etablissement": "None", 
    "codecommuneetablissement": "75115", 
    "codecommuneetablissementstring": "75115", 
    "codepaysetranger2etablissement": "None", 
    "codepaysetrangeretablissement": "None", 
    "codepostal2etablissement": "None", 
    "codepostaletablissement": "75015.0", 
    "comparent": "75056.0", 
    "complementadresse2etablissement": "None", 
    "complementadresseetablissement": "4EME ETAGE DROITE", 
    "datecreationetablissement": "2008-10-13", 
    "datedebut": "2008-10-13", 
    "datederniertraitementetablissement": "2009-01-19 15:24:54", 
    "denominationusuelleetablissement": "None", 
    "dep": "75", 
    "distributionspeciale2etablissement": "None", 
    "distributionspecialeetablissement": "None", 
    "enseigne1etablissement": "None", 
    "enseigne2etablissement": "None", 
    "enseigne3etablissement": "None", 
    "etablissementsiege": "True", 
    "etatadministratifetablissement": "A", 
    "geo_adresse": "23 Rue Th\u00e9odore Deck 75015 Paris", 
    "geo_id": "75115_9239_00023", 
    "geo_l4": "23 RUE THEODORE DECK", 
    "geo_l5": "None", 
    "geo_ligne": "G", 
    "geo_score": "0.64", 
    "geo_type": "housenumber", 
    "indicerepetition2etablissement": "None", 
    "indicerepetitionetablissement": "None", 
    "latitude": "48.837156", 
    "libelle": "Paris 15e Arrondissement", 
    "libellecedex2etablissement": "None", 
    "libellecedexetablissement": "None", 
    "libellecommune2etablissement": "None", 
    "libellecommuneetablissement": "PARIS 15", 
    "libellecommuneetranger2etablissement": "None", 
    "libellecommuneetrangeretablissement": "None", 
    "libellepaysetranger2etablissement": "None", 
    "libellepaysetrangeretablissement": "None", 
    "libellevoie2etablissement": "None", 
    "libellevoieetablissement": "THEODORE DECK", 
    "longitude": "2.289017", 
    "ncc": "PARIS 15E ARRONDISSEMENT", 
    "nccenr": "Paris 15e Arrondissement", 
    "nic": "13.0", 
    "nombreperiodesetablissement": "1.0", 
    "nomenclatureactiviteprincipaleetablissement": "NAFRev2", 
    "numerovoie2etablissement": "None", 
    "numerovoieetablissement": "23.0", 
    "reg": "11.0", 
    "siren": "509964938", 
    "siret": "50996493800013", 
    "statutdiffusionetablissement": "O", 
    "tncc": "0", 
    "trancheeffectifsetablissement": "None", 
    "typecom": "ARM", 
    "typevoie2etablissement": "None", 
    "typevoieetablissement": "RUE"
  }
]
```

- obtenir l'effectif d'un SIRET (simulé) :
```
/effectif/<siret_id>
```
```
[
  {
    "daterecuperationeffectif": "2020-03-01", 
    "effectif": "85.0", 
    "siret": "50996493800013"
  }, 
  {
    "daterecuperationeffectif": "2020-04-01", 
    "effectif": "35.0", 
    "siret": "50996493800013"
  }
]
```


- obtenir les aides accordées à un SIREN (simulé) :
```
/aide/siren/<siren_id>
```
```
[
  {
    "activiteprincipaleetablissement": "85.59A", 
    "classe_effectif": "2.0", 
    "code_application": "Volet1", 
    "codecommuneetablissementstring": "75115", 
    "count_siren_nb": "1.0", 
    "date_dp": "2020-03-10", 
    "date_paiement": "2020-03-25", 
    "delta_effectif": "-1.0", 
    "delta_effectif_global": "-0.13", 
    "dep": "75", 
    "devise": "euros", 
    "effectif": "8.0", 
    "mois": "mars", 
    "montant": "1500.0", 
    "montant_modifie": "1500.0", 
    "nom1": "Martin", 
    "nom2": "None", 
    "numero_sequentiel": "485070718XXX", 
    "reg": "11", 
    "siren": "485070718", 
    "siret": "48507071800013"
  }
]
```


- obtenir les aides accordées à un SIRET (simulé) :
```
/aide/siret/<siret_id>
```
```
[
  {
    "activiteprincipaleetablissement": "85.59A", 
    "classe_effectif": "2.0", 
    "code_application": "Volet1", 
    "codecommuneetablissementstring": "75115", 
    "count_siren_nb": "1.0", 
    "date_dp": "2020-03-10", 
    "date_paiement": "2020-03-25", 
    "delta_effectif": "-1.0", 
    "delta_effectif_global": "-0.13", 
    "dep": "75", 
    "devise": "euros", 
    "effectif": "8.0", 
    "mois": "mars", 
    "montant": "1500.0", 
    "montant_modifie": "1500.0", 
    "nom1": "Martin", 
    "nom2": "None", 
    "numero_sequentiel": "485070718XXX", 
    "reg": "11", 
    "siren": "485070718", 
    "siret": "48507071800013"
  }
]
```

- obtenir les aides accordées à la maille régionale (simulé) :
```
/aide/reg/<reg>
```
Liste d'objets :
```
{
    "activiteprincipaleetablissement": "85.59A", 
    "classe_effectif": "2.0", 
    "code_application": "Volet1", 
    "codecommuneetablissementstring": "75115", 
    "count_siren_nb": "1.0", 
    "date_dp": "2020-03-10", 
    "date_paiement": "2020-03-25", 
    "delta_effectif": "-1.0", 
    "delta_effectif_global": "-0.13", 
    "dep": "75", 
    "devise": "euros", 
    "effectif": "8.0", 
    "mois": "mars", 
    "montant": "1500.0", 
    "montant_modifie": "1500.0", 
    "nom1": "Martin", 
    "nom2": "None", 
    "numero_sequentiel": "485070718XXX", 
    "reg": "11", 
    "siren": "485070718", 
    "siret": "48507071800013"
}
```

- obtenir les aides accordées à la maille départementale (simulé) :
```
/aide/dep/<dep>
```
Liste d'objets :
```
{
    "activiteprincipaleetablissement": "85.59A", 
    "classe_effectif": "2.0", 
    "code_application": "Volet1", 
    "codecommuneetablissementstring": "75115", 
    "count_siren_nb": "1.0", 
    "date_dp": "2020-03-10", 
    "date_paiement": "2020-03-25", 
    "delta_effectif": "-1.0", 
    "delta_effectif_global": "-0.13", 
    "dep": "75", 
    "devise": "euros", 
    "effectif": "8.0", 
    "mois": "mars", 
    "montant": "1500.0", 
    "montant_modifie": "1500.0", 
    "nom1": "Martin", 
    "nom2": "None", 
    "numero_sequentiel": "485070718XXX", 
    "reg": "11", 
    "siren": "485070718", 
    "siret": "48507071800013"
}
```

- obtenir les aides accordées à la maille code insee (simulé) :
```
/aide/codeinsee/<codecommuneetablissementstring>
```
Liste d'objets :
```
{
    "activiteprincipaleetablissement": "85.59A", 
    "classe_effectif": "2.0", 
    "code_application": "Volet1", 
    "codecommuneetablissementstring": "75115", 
    "count_siren_nb": "1.0", 
    "date_dp": "2020-03-10", 
    "date_paiement": "2020-03-25", 
    "delta_effectif": "-1.0", 
    "delta_effectif_global": "-0.13", 
    "dep": "75", 
    "devise": "euros", 
    "effectif": "8.0", 
    "mois": "mars", 
    "montant": "1500.0", 
    "montant_modifie": "1500.0", 
    "nom1": "Martin", 
    "nom2": "None", 
    "numero_sequentiel": "485070718XXX", 
    "reg": "11", 
    "siren": "485070718", 
    "siret": "48507071800013"
}
```

- obtenir des statistiques sur les aides accordées à la maille régionale (simulé) :
```
/stat/aide/reg
```
Liste d'objet :
```
{
    "delta_effectif": -2029.0, 
    "delta_effectif_percent": "-0.07993427230046948357", 
    "montant": 3160250.0, 
    "nombre": 2130, 
    "reg": "1"
}
```

- obtenir des statistiques sur les aides accordées à la maille départementale (simulé) :
```
/stat/aide/dep
```
Liste d'objets :
```
{
    "delta_effectif": -2029.0, 
    "delta_effectif_percent": "-0.07993427230046948357", 
    "montant": 3160250.0, 
    "nombre": 2130, 
    "dep": "1"
}
```

- obtenir des statistiques sur les aides accordées à la maille code insee (simulé) :
```
/stat/aide/dep/<dep>
```
Liste d'objets :
```
{
    "delta_effectif": -2029.0, 
    "delta_effectif_percent": "-0.07993427230046948357", 
    "montant": 3160250.0, 
    "nombre": 2130, 
    "codeinsee": "75115"
}
```

- obtenir des statistiques sur les aides accordées à la maille code APE (simulé) :
```
/stat/aide/ape
```
Liste d'objets :
```
  {
    "activiteprincipaleetablissement": "01.11Z", 
    "delta_effectif": -3437.0, 
    "delta_effectif_percent": "-0.08745415318230852211", 
    "montant": 5515250.0, 
    "nombre": 3708
  }
```

- obtenir des statistiques sur les aides accordées à la maille classe_effectif (simulé) :
```
/stat/aide/classeeffectif
```
Liste d'objets :
```
  {
    "activiteprincipaleetablissement": 0.0, 
    "delta_effectif": 0.0, 
    "delta_effectif_percent": "0E-24", 
    "montant": 149727000.0, 
    "nombre": 100300
  }
```

- obtenir des statistiques global à la maille régionale (simulé) :
```
/stat/global/reg
```
Liste d'objets :
```
  {
    "delta_effectif_percent_mean": -0.06, 
    "delta_effectif_total": -1905485.0, 
    "reg": "1.0", 
    "total_siret": 98556.0
  }
```

- obtenir des statistiques global à la maille départementale (simulé) :
```
/stat/global/dep
```
Liste d'objet s:
```
  {
    "delta_effectif_percent_mean": -0.06, 
    "delta_effectif_total": -1905485.0, 
    "dep": "1.0", 
    "total_siret": 98556.0
  }
```

- obtenir des statistiques global à la maille code insee (simulé) :
```
/stat/global/dep/<codeinsee>
```
```
[
  {
    "codeinsee": "75115", 
    "delta_effectif_percent_mean": -0.06, 
    "delta_effectif_total": -1209392.0, 
    "total_siret": 63244.0
  }
]
```

- obtenir des statistiques global à la maille classe effectif (simulé) :
```
/stat/global/classeeffectif
```
Liste d'objets :
```
  {
    "classe_effectif": "0", 
    "delta_effectif_percent_mean": 0.0, 
    "delta_effectif_total": 0.0, 
    "total_siret": 1182174.0
  }
```

- obtenir des statistiques global à la maille code APE (simulé) :
```
/stat/global/ape
```
Liste d'objets :
```
  {
    "ape": "00.00Z", 
    "delta_effectif_percent_mean": -0.04, 
    "delta_effectif_total": -337.0, 
    "total_siret": 43.0
  }
```
