import pandas as pd

read_file = pd.read_csv ("../published-data/pge-regional-naf-latest.csv",dtype={'dispositif':str,'nombre_pge':float,'montant_total':float,'reg':str,'libelle_region':str,'code_section':str,'libelle_section':str})
read_file.to_excel ('../published-data/pge-regional-naf-latest.xlsx', index = None, header=True)

read_file = pd.read_csv ("../published-data/pge-departemental-naf-latest.csv",dtype={'dispositif':str,'nombre_pge':float,'montant_total':float,'reg':str,'libelle_region':str,'dep':str,'libelle_departement':str,'code_section':str,'libelle_section':str})
read_file.to_excel ('../published-data/pge-departemental-naf-latest.xlsx', index = None, header=True)