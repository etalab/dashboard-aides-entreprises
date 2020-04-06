# Backend (Flask)

## Installation

Pour faire fonctionner le backend, il suffit d'effectuer les commandes ci-dessous :

```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

## API

Un certain nombre d'API sont disponibles :

- Obtenir des renseignements sur un SIRET :

``` 
/siret/<siret> 
```

- obtenir l'effectif d'un SIRET (simulé) :
```
/effectif/<siret_id>
```

- obtenir les aides accordées à un SIREN (simulé) :
```
/aide/siren/<siren_id>
```

- obtenir les aides accordées à un SIRET (simulé) :
```
/aide/siret/<siret_id>
```

- obtenir les aides accordées à la maille régionale (simulé) :
```
/aide/reg/<reg>
```

- obtenir les aides accordées à la maille départementale (simulé) :
```
/aide/dep/<dep>
```

- obtenir les aides accordées à la maille code insee (simulé) :
```
/aide/codeinsee/<codecommuneetablissementstring>
```

- obtenir des statistiques sur les aides accordées à la maille régionale (simulé) :
```
/stat/aide/reg
```

- obtenir des statistiques sur les aides accordées à la maille départementale (simulé) :
```
/stat/aide/dep
```

- obtenir des statistiques sur les aides accordées à la maille code insee (simulé) :
```
/stat/aide/dep/<dep>
```

- obtenir des statistiques sur les aides accordées à la maille code APE (simulé) :
```
/stat/aide/ape
```

- obtenir des statistiques sur les aides accordées à la maille classe_effectif (simulé) :
```
/stat/aide/classeeffectif
```

- obtenir des statistiques global à la maille régionale (simulé) :
```
/stat/global/reg
```

- obtenir des statistiques global à la maille départementale (simulé) :
```
/stat/global/dep
```

- obtenir des statistiques global à la maille code insee (simulé) :
```
/stat/global/dep/<codeinsee>
```

- obtenir des statistiques global à la maille classe effectif (simulé) :
```
/stat/global/classeeffectif
```

- obtenir des statistiques global à la maille code APE (simulé) :
```
/stat/global/ape
```