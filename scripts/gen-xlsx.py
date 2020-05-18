import pandas as pd

read_file = pd.read_csv ("../published-data/fonds-solidarite-volet-1-regional-naf-latest.csv",dtype={'dispositif':str,'volet':str,'nombre_aides':float,'montant_total':float,'reg':str,'libelle_region':str,'code_section':str,'libelle_section':str})
read_file.to_excel ('../published-data/fonds-solidarite-volet-1-regional-naf.xlsx', index = None, header=True)

read_file = pd.read_csv ("../published-data/fonds-solidarite-volet-1-departemental-naf-latest.csv",dtype={'dispositif':str,'volet':str,'nombre_aides':float,'montant_total':float,'reg':str,'libelle_region':str,'dep':str,'libelle_departement':str,'code_section':str,'libelle_section':str})
read_file.to_excel ('../published-data/fonds-solidarite-volet-1-departemental-naf.xlsx', index = None, header=True)


read_file = pd.read_csv ("../published-data/fonds-solidarite-volet-1-regional-categorie-juridique-latest.csv",dtype={'dispositif':str,'volet':str,'nombre_aides':float,'montant_total':float,'reg':str,'libelle_region':str,'code_categorie_juridique':str,'libelle_categorie_juridique':str})
read_file.to_excel ('../published-data/fonds-solidarite-volet-1-regional-categorie-juridique-latest.xlsx', index = None, header=True)

read_file = pd.read_csv ("../published-data/fonds-solidarite-volet-1-departemental-categorie-juridique-latest.csv",dtype={'dispositif':str,'volet':str,'nombre_aides':float,'montant_total':float,'reg':str,'libelle_region':str,'dep':str,'libelle_departement':str,'code_categorie_juridique':str,'libelle_categorie_juridique':str})
read_file.to_excel ('../published-data/fonds-solidarite-volet-1-departemental-categorie-juridique-latest.xlsx', index = None, header=True)


read_file = pd.read_csv ("../published-data/fonds-solidarite-volet-1-regional-classe-effectif-latest.csv",dtype={'dispositif':str,'volet':str,'nombre_aides':float,'montant_total':float,'reg':str,'libelle_region':str,'classe_effectif':str,'libelle_classe_effectif':str})
read_file.to_excel ('../published-data/fonds-solidarite-volet-1-regional-classe-effectif-latest.xlsx', index = None, header=True)

read_file = pd.read_csv ("../published-data/fonds-solidarite-volet-1-departemental-classe-effectif-latest.csv",dtype={'dispositif':str,'volet':str,'nombre_aides':float,'montant_total':float,'reg':str,'libelle_region':str,'dep':str,'libelle_departement':str,'classe_effectif':str,'libelle_classe_effectif':str})
read_file.to_excel ('../published-data/fonds-solidarite-volet-1-departemental-classe-effectif-latest.xlsx', index = None, header=True)