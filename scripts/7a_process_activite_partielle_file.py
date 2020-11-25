import pandas as pd
from xlsx2csv import Xlsx2csv
import sys

daytoprocess = sys.argv[1]

xls_file = pd.ExcelFile("../data/activite-partielle/xlsx/"+daytoprocess+".xlsx")

df = xls_file.parse('Annexe 3',dtype=str,header=3)

df = df[:-5]

df = df.rename(columns={'A17':'code_section_nace17','Code du département':'dep','Nombre de demandes déposées':'nombre_demandes_deposees','Nombre de salariés concernés':'nombre_salarie_concernes','Nombre d\'heures demandées':'nombre_heures_demandees','Nombre d\'établissements concernés':'nombre_etablissements_concernes'})

df = df[['dep','code_section_nace17','nombre_demandes_deposees','nombre_salarie_concernes','nombre_heures_demandees','nombre_etablissements_concernes']]

df['dep'] = df['dep'].apply(lambda x: None if x != x else str(x)[-2:] if str(x)[0] == '0' else x)

dfcom = pd.read_csv("../utils/departement2019.csv",dtype=str)

dfcom = dfcom[['dep','reg']]

dfcom.drop_duplicates(keep="first")

df = pd.merge(df,dfcom,on='dep',how='left')

df = df[['reg','dep','code_section_nace17','nombre_demandes_deposees','nombre_salarie_concernes','nombre_heures_demandees','nombre_etablissements_concernes']]

df['last_update'] = daytoprocess

df.to_csv("../data/activite-partielle/activite-partielle-"+daytoprocess+".csv",index=False)
