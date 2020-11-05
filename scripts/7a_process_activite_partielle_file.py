import pandas as pd
from xlsx2csv import Xlsx2csv
import sys

daytoprocess = sys.argv[1]

xls_file = pd.ExcelFile("../data/activite-partielle/xlsx/"+daytoprocess+".xlsx")

df = xls_file.parse('Annexe 1',dtype=str,header=2)

df = df[:-4]

df = df.rename(columns={'a17':'code_section_nace17','Nombre de DI':'nombre_demandes_deposees','Effectif en DI':'nombre_salarie_concernes','Heures en DI':'nombre_heures_demandees'})

df = df[['reg','code_section_nace17','nombre_demandes_deposees','nombre_salarie_concernes','nombre_heures_demandees']]

df['last_update'] = '2020-10-27'

df.to_csv("../data/activite-partielle/activite-partielle-"+daytoprocess+".csv",index=False)
