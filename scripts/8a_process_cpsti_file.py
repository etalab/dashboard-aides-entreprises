import pandas as pd
from xlsx2csv import Xlsx2csv
import sys

daytoprocess = sys.argv[1]
#print("Read XLSX")
#xls_file = pd.ExcelFile("../data/cpsti/xlsx/"+daytoprocess+".xls")
#sheet_names = xls_file.sheet_names

#df = xls_file.parse("OPEND_AIDE_CPSTI")

df = pd.read_csv("../data/cpsti/csv/"+daytoprocess+".csv",dtype=str,sep=";")

print("Processing")
df = df[['code_region','code_departement','code_na21','nombre_de_beneficiaires','montant_total_de_l_aide']]

df['code_na21'] = df['code_na21'].apply(lambda x: 'Z' if x == 'nca' else x)

df['code_departement'] = df['code_departement'].apply(lambda x: None if x == 'nca' else x)

df['code_region'] = df['code_region'].apply(lambda x: None if x == 'nca' else x)

df['last_update'] = daytoprocess

print("Save in ../data/cpsti/")
df.to_csv("../data/cpsti/cpsti-"+daytoprocess+".csv",index=False)
