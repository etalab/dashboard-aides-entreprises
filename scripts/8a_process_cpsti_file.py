import pandas as pd
from xlsx2csv import Xlsx2csv
import sys

daytoprocess = sys.argv[1]
print("Read XLSX")
xls_file = pd.ExcelFile("../data/cpsti/xlsx/"+daytoprocess+".xlsx")
sheet_names = xls_file.sheet_names

df = xls_file.parse("OPEND_AIDE_CPSTI")
print("Processing")
df = df[['Code région','Code département','Code NA21','Nombre de bénéficiaires','Montant total de l\'aide']]

df['Code NA21'] = df['Code NA21'].apply(lambda x: 'Z' if x == 'nca' else x)

df['Code département'] = df['Code département'].apply(lambda x: None if x == 'nca' else x)

df['Code région'] = df['Code région'].apply(lambda x: None if x == 'nca' else x)

df['last_update'] = daytoprocess

print("Save in ../data/cpsti/")
df.to_csv("../data/cpsti/cpsti-"+daytoprocess+".csv",index=False)